self.addEventListener('push', function(event) {
  if (!event.data) {
    console.log('Push event has no data.');
    return;
  }

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.log('Push event data is not JSON:', event.data.text());
    data = {
      title: 'Lynqo',
      body: event.data.text(),
      url: '/'
    };
  }

  const title = data.title || 'Lynqo';
  const options = {
    body: data.body || '',
    icon: '/favicon.svg',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const url = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Try to find an existing window and focus it
      for (const client of clientList) {
        if ('focus' in client) {
          // Focus the client window and redirect it
          return client.focus().then(function(focusedClient) {
            if ('navigate' in focusedClient) {
              return focusedClient.navigate(url);
            }
          });
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
