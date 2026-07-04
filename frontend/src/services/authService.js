import client from '../api/client';

export const authService = {
  async signup(fullName, username, email, phone, password, confirmPassword) {
    return client.post('/api/auth/signup/', {
      full_name: fullName,
      username: username,
      email: email,
      phone: phone,
      password: password,
      confirm_password: confirmPassword,
    });
  },

  async login(identifier, password) {
    return client.post('/api/auth/login/', {
      identifier: identifier,
      password: password,
    });
  },

  async logout() {
    return client.post('/api/auth/logout/');
  },
};
