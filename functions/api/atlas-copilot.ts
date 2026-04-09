import { buildAtlasContext, buildLocalFallback } from '../../src/lib/ai/atlasContext';

interface Env {
  OPENAI_API_KEY?: string;
}

interface ChatBody {
  message?: string;
}

const OPENAI_MODEL = 'gpt-4o-mini';
const STACK_CONTEXT = buildAtlasContext();

const SYSTEM_PROMPT = [
  'You are Atlas Copilot, the on-site AI guide for Kevan Burns\' infrastructure portfolio.',
  'Be confident, sharp, direct, and helpful without being hype-only.',
  'You are fully grounded in the provided stack context and should answer as a portfolio operator who knows the systems cold.',
  'Explain what the stack is, what it can do, what is live, what is research, and what the clearest next move is.',
  'When useful, structure answers as: summary, what it does, why it matters, next move.',
  'For capital questions, distinguish the built systems portfolio, Sponsor Note, and NDCF participation right.',
  'Do not fabricate capabilities or metrics not found in context.',
  'Do not provide legal advice or investment advice.',
  '',
  STACK_CONTEXT,
].join('\n');

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let body: ChatBody;

  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const message = body.message?.trim();
  if (!message) {
    return json({ error: 'Message is required' }, 400);
  }

  if (message.length > 1200) {
    return json({ error: 'Message is too long' }, 400);
  }

  const fallback = buildLocalFallback(message);

  if (!env.OPENAI_API_KEY) {
    return json({ answer: fallback, source: 'fallback' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.5,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      }),
    });

    if (!response.ok) {
      return json({ answer: fallback, source: 'fallback' });
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const answer = payload.choices?.[0]?.message?.content?.trim() || fallback;
    return json({ answer, source: 'openai' });
  } catch {
    return json({ answer: fallback, source: 'fallback' });
  }
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
