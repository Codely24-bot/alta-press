import { buildMockReply, buildSystemPrompt, sanitizeConversation } from '../shared/supportKnowledge.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-5.6';

export const config = {
  maxDuration: 30,
};

function extractOutputText(payload) {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  if (!Array.isArray(payload?.output)) {
    return '';
  }

  const chunks = [];

  for (const item of payload.output) {
    if (!Array.isArray(item?.content)) {
      continue;
    }

    for (const content of item.content) {
      if (typeof content?.text === 'string' && content.text.trim()) {
        chunks.push(content.text.trim());
      }
    }
  }

  return chunks.join('\n').trim();
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Metodo nao permitido.' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
    const messages = sanitizeConversation(body.messages);
    const systemPrompt = buildSystemPrompt();

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');

    if (!lastUserMessage) {
      return response.status(400).json({ error: 'Nenhuma mensagem de usuario foi enviada.' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return response.status(200).json({
        reply: buildMockReply(lastUserMessage.content),
        source: 'mock',
      });
    }

    const openAiResponse = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        reasoning: { effort: 'low' },
        input: [
          {
            role: 'developer',
            content: [
              {
                type: 'input_text',
                text: systemPrompt,
              },
            ],
          },
          ...messages.map((message) => ({
            role: message.role,
            content: [
              {
                type: 'input_text',
                text: message.content,
              },
            ],
          })),
        ],
      }),
    });

    const payload = await openAiResponse.json();

    if (!openAiResponse.ok) {
      return response.status(openAiResponse.status).json({
        error: payload?.error?.message || 'Falha ao consultar a OpenAI.',
      });
    }

    const reply = extractOutputText(payload);

    if (!reply) {
      return response.status(502).json({ error: 'A OpenAI nao retornou texto utilizavel.' });
    }

    return response.status(200).json({
      reply,
      source: 'openai',
      model: DEFAULT_MODEL,
    });
  } catch (error) {
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'Erro interno ao processar o chat.',
    });
  }
}
