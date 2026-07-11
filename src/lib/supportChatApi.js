import {
  buildMockReply,
  sanitizeConversation,
  welcomeMessage,
} from '../../shared/supportKnowledge';

const CHAT_ENDPOINT = '/.netlify/functions/support-chat';

export function createInitialMessages() {
  return [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: welcomeMessage,
    },
  ];
}

export async function requestSupportReply(messages) {
  const conversation = sanitizeConversation(messages);
  const lastUserMessage = [...conversation].reverse().find((message) => message.role === 'user');
  const mockReply = buildMockReply(lastUserMessage?.content);

  if (import.meta.env.VITE_CHATBOT_MODE === 'mock') {
    return { reply: mockReply, source: 'mock' };
  }

  try {
    const response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: conversation,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || typeof payload.reply !== 'string' || !payload.reply.trim()) {
      throw new Error(payload.error || 'Falha ao consultar o assistente.');
    }

    return {
      reply: payload.reply.trim(),
      source: payload.source || 'openai',
    };
  } catch (error) {
    if (import.meta.env.DEV) {
      return {
        reply: mockReply,
        source: 'mock',
      };
    }

    throw error;
  }
}
