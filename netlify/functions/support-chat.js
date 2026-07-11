import { buildMockReply, buildSystemPrompt, sanitizeConversation } from '../../shared/supportKnowledge.js';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-5.6';

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(payload),
  };
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

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Metodo nao permitido.' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const messages = sanitizeConversation(body.messages);
    const systemPrompt = buildSystemPrompt();

    const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');

    if (!lastUserMessage) {
      return jsonResponse(400, { error: 'Nenhuma mensagem de usuario foi enviada.' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return jsonResponse(200, {
        reply: buildMockReply(lastUserMessage.content),
        source: 'mock',
      });
    }

    const response = await fetch(OPENAI_API_URL, {
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

    const payload = await response.json();

    if (!response.ok) {
      return jsonResponse(response.status, {
        error: payload?.error?.message || 'Falha ao consultar a OpenAI.',
      });
    }

    const reply = extractOutputText(payload);

    if (!reply) {
      return jsonResponse(502, { error: 'A OpenAI nao retornou texto utilizavel.' });
    }

    return jsonResponse(200, {
      reply,
      source: 'openai',
      model: DEFAULT_MODEL,
    });
  } catch (error) {
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : 'Erro interno ao processar o chat.',
    });
  }
}
