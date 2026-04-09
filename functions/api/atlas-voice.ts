interface Env {
  OPENAI_API_KEY?: string;
}

interface VoiceBody {
  text?: string;
}

const TTS_MODEL = 'gpt-4o-mini-tts';
const TTS_VOICE = 'alloy';
const TTS_INSTRUCTIONS = 'Sound warm, highly capable, natural, and confident. Deliver the response like a world-class systems operator speaking clearly to a serious user.';

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  let body: VoiceBody;

  try {
    body = (await request.json()) as VoiceBody;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const text = body.text?.trim();
  if (!text) {
    return new Response(JSON.stringify({ error: 'Text is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  if (!env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Voice service is not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: TTS_VOICE,
        input: text.slice(0, 4000),
        instructions: TTS_INSTRUCTIONS,
        format: 'mp3',
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Voice generation failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    const buffer = await response.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Voice generation failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }
};
