import { capitalPositions } from '../../src/lib/portfolio/capitalPositions';
import { legalDocuments } from '../../src/lib/portfolio/legalDocs';

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

interface Env {
  DILIGENCE_TOKENS: KVNamespace;
  AI?: {
    run: (
      model: string,
      input: {
        messages: { role: 'system' | 'user'; content: string }[];
        max_tokens?: number;
        temperature?: number;
      }
    ) => Promise<{ response?: string }>;
  };
}

interface TokenRecord {
  name: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
}

interface ChatBody {
  question?: string;
}

const MAX_QUESTIONS_PER_HOUR = 5;
const MODEL = '@cf/meta/llama-3.1-8b-instruct';

const CORE_FACTS = [
  'Estoppel-confirmed amount due: $502,465,753.42 as of March 3, 2026.',
  'Sponsor Consideration Note principal: $500,000,000 at 5% per annum, PIK permitted.',
  'CUSIP referenced in the participation documents: 87225HAB4.',
  'ISIN referenced in the participation documents: US87225HAB42.',
  'NDCF participation: 10% of Net Distributable Cash Flows, not 10% of the $5B principal.',
  'NDCF10 issuance transaction: B68A33F006996B569F79827E4937ACFF5A912FDC4F69F74881064E625E8F93F4.',
  'The same individual, Kevan Burns, signs on both sides of the OPTKAS related instruments.',
  'This diligence room is informational only and is not investment advice.',
];

const LEGAL_CONTEXT = legalDocuments
  .map(
    (doc) =>
      `${doc.title} (${doc.date}) — What: ${doc.what} Why it matters: ${doc.why} Caution: ${doc.cautionNote}`
  )
  .join('\n\n');

const POSITION_CONTEXT = capitalPositions
  .map(
    (position) =>
      `${position.title} — ${position.amountLabel}. ${position.summary} Financeability note: ${position.financeabilityNote}`
  )
  .join('\n\n');

const SYSTEM_PROMPT = [
  'You are a diligence-room assistant for a financing counterparty review workflow.',
  'Answer only from the supplied context.',
  'If the answer is not established by the supplied context, say so plainly.',
  'Do not present speculation as fact.',
  'Do not give investment advice, legal advice, or underwriting advice.',
  'When relevant, preserve these distinctions: the Sponsor Note is separate from the 10% NDCF participation right; 10% NDCF is not 10% of $5B principal; related-party execution is a core diligence issue.',
  'Keep answers concise and factual.',
  '',
  'Core facts:',
  ...CORE_FACTS.map((fact) => `- ${fact}`),
  '',
  'Capital positions:',
  POSITION_CONTEXT,
  '',
  'Legal document summaries:',
  LEGAL_CONTEXT,
].join('\n');

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  const token = getTokenFromCookie(request.headers.get('Cookie') ?? '');
  if (!token) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const tokenRecord = await validateToken(env, token);
  if (!tokenRecord) {
    return json({ error: 'Unauthorized' }, 401);
  }

  const hourlyKey = getHourlyRateLimitKey(token);
  const currentCount = Number((await env.DILIGENCE_TOKENS.get(hourlyKey)) ?? '0');
  if (currentCount >= MAX_QUESTIONS_PER_HOUR) {
    return json(
      {
        error: 'Rate limit exceeded',
        detail: `Limit is ${MAX_QUESTIONS_PER_HOUR} questions per hour per token.`,
      },
      429
    );
  }

  let body: ChatBody;
  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const question = body.question?.trim();
  if (!question) {
    return json({ error: 'Question is required' }, 400);
  }

  if (question.length > 600) {
    return json({ error: 'Question is too long' }, 400);
  }

  await env.DILIGENCE_TOKENS.put(hourlyKey, String(currentCount + 1), {
    expirationTtl: 60 * 60,
  });

  const fallback = buildFallbackAnswer(question, tokenRecord.name);

  if (!env.AI) {
    return json({ answer: fallback, source: 'fallback' });
  }

  try {
    const result = await env.AI.run(MODEL, {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: question },
      ],
      max_tokens: 500,
      temperature: 0.2,
    });

    return json({
      answer: (result.response ?? fallback).trim(),
      source: result.response ? 'workers-ai' : 'fallback',
    });
  } catch {
    return json({ answer: fallback, source: 'fallback' });
  }
};

function getTokenFromCookie(header: string): string | null {
  const match = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('diligence-token='));

  return match ? decodeURIComponent(match.slice('diligence-token='.length)) : null;
}

async function validateToken(env: Env, token: string): Promise<TokenRecord | null> {
  const raw = await env.DILIGENCE_TOKENS.get(token);
  if (!raw) {
    return null;
  }

  try {
    const record = JSON.parse(raw) as TokenRecord;
    if (Date.now() > record.expiresAt) {
      await env.DILIGENCE_TOKENS.delete(token);
      return null;
    }
    return record;
  } catch {
    return null;
  }
}

function getHourlyRateLimitKey(token: string): string {
  const currentHour = new Date().toISOString().slice(0, 13);
  return `chatrl:${token}:${currentHour}`;
}

function buildFallbackAnswer(question: string, name: string): string {
  const q = question.toLowerCase();

  if (q.includes('estoppel') || q.includes('amount due') || q.includes('502')) {
    return 'The diligence room states that the estoppel-confirmed amount due is $502,465,753.42 as of March 3, 2026, comprising $500,000,000 principal plus $2,465,753.42 accrued PIK interest.';
  }

  if (q.includes('cusip') || q.includes('isin')) {
    return 'The participation documents reference CUSIP 87225HAB4 and ISIN US87225HAB42.';
  }

  if (q.includes('sign') || q.includes('both sides') || q.includes('related')) {
    return 'The diligence materials state that Kevan Burns signs on both sides of the related OPTKAS instruments, which is disclosed as a related-party diligence issue.';
  }

  if (q.includes('ndcf') || q.includes('10%')) {
    return 'The diligence room distinguishes the participation right from the Sponsor Note: it is a 10% participation in Net Distributable Cash Flows, not 10% of the $5,000,000,000 principal amount.';
  }

  return `I could not verify a more specific answer from the cached diligence facts alone, ${name}. Based on the room materials, the safest grounded summary is that the Sponsor Note, estoppel-confirmed balance, and NDCF participation are separate positions, and related-party execution remains a central diligence issue.`;
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
