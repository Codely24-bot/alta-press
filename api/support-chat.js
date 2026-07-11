import { buildMockReply, buildSystemPrompt, sanitizeConversation } from '../shared/supportKnowledge.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-5.6';

export const config = {
  maxDuration: 30,
};

async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body) && !('on' in request.body)) {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return request.body ? JSON.parse(request.body) : {};
  }

  if (Buffer.isBuffer(request.body)) {
    return request.body.length ? JSON.parse(request.body.toString('utf8')) : {};
  }

  const chunks = [];

  for await (const chunk of request) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

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
    const body = await readJsonBody(request);
    const messages = sanitizeConversation(body.messages);
    const systemPrompt = buildSystemPrompt();

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');

    if (!lastUserMessage) {
      console.warn('support-chat request without user message', {
        hasBody: Boolean(body),
        messageCount: Array.isArray(body?.messages) ? body.messages.length : 0,
      });
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
      console.error('openai support-chat error', payload);
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
    console.error('support-chat internal error', error);
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'Erro interno ao processar o chat.',
    });
  }
}
