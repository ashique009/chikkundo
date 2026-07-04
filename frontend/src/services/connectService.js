import client from '../api/client';

export const connectService = {
  async sendConnectRequest(receiverId, reason) {
    return client.post('/api/auth/requests/send/', {
      receiver: receiverId,
      reason: reason,
    });
  },

  async getPendingRequests() {
    return client.get('/api/auth/requests/pending/');
  },

  async getSentRequests() {
    return client.get('/api/auth/requests/sent/');
  },

  async acceptRequest(requestId) {
    return client.post('/api/auth/requests/accept/', {
      request_id: requestId,
    });
  },

  async declineRequest(requestId) {
    return client.post('/api/auth/requests/decline/', {
      request_id: requestId,
    });
  },
};
export default connectService;
