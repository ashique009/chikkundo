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

  async sendTypingSignal(conversationId) {
    return client.post('/api/auth/messages/typing/', {
      conversation_id: conversationId,
    });
  },

  async getTypingStatus(conversationId) {
    return client.get(`/api/auth/messages/typing-status/${conversationId}/`);
  },
};
export default chatService;
