import client from '../api/client';

export const chatService = {
  async getConversations() {
    return client.get('/api/auth/conversations/');
  },

  async getConversationDetail(conversationId) {
    return client.get(`/api/auth/conversations/${conversationId}/`);
  },

  async getMessages(conversationId) {
    return client.get(`/api/auth/messages/${conversationId}/`);
  },

  async sendMessage(conversationId, content) {
    return client.post('/api/auth/messages/send/', {
      conversation_id: conversationId,
      content: content,
    });
  },
};
export default chatService;
