// ─────────────────────────────────────────────────────────────────────────────
// ElevenLabs Text-to-Speech — client-side API wrapper
// Uses the ElevenLabs REST API to convert system descriptions into audio.
// ─────────────────────────────────────────────────────────────────────────────

const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Rachel — clear, professional female voice (default)
// To use a different voice, change this ID or make it configurable
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel

export interface ElevenLabsConfig {
  apiKey: string;
  voiceId?: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
}

function getConfig(): ElevenLabsConfig {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '';
  return {
    apiKey,
    voiceId: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || DEFAULT_VOICE_ID,
    modelId: 'eleven_multilingual_v2',
    stability: 0.5,
    similarityBoost: 0.75,
    style: 0.3,
  };
}

export function isElevenLabsConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
  return !!key && key.length > 10 && !key.includes('YOUR_');
}

/**
 * Generate speech audio from text using ElevenLabs TTS API.
 * Returns an audio Blob (mp3) that can be played via URL.createObjectURL.
 */
export async function textToSpeech(text: string): Promise<Blob> {
  const config = getConfig();

  if (!config.apiKey) {
    throw new Error('ElevenLabs API key not configured');
  }

  const response = await fetch(
    `${ELEVENLABS_API_URL}/text-to-speech/${config.voiceId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': config.apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: config.modelId,
        voice_settings: {
          stability: config.stability,
          similarity_boost: config.similarityBoost,
          style: config.style,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
  }

  return response.blob();
}

/**
 * Build a concise, natural-sounding narration script from system data.
 * Designed for TTS — avoids acronyms, symbols, and overly technical jargon.
 */
export function buildSystemNarration(system: {
  name: string;
  subtitle: string;
  tagline: string;
  category: string;
  brand: string;
  maturity: string;
  features: string[];
  techStack?: string[];
  chainTargets?: string[];
  business?: {
    targetUsers?: string[];
    revenueRole?: string;
    strategicRole?: string;
    marketCategory?: string;
    capitalFunction?: string;
  };
}): string {
  const parts: string[] = [];

  // Opening
  parts.push(`${system.name}. ${system.subtitle}.`);

  // Tagline (cleaned up for speech)
  const cleanTagline = system.tagline
    .replace(/→/g, 'to')
    .replace(/—/g, ', ')
    .replace(/\$/g, '')
    .replace(/\+/g, ' plus');
  parts.push(cleanTagline);

  // Status
  const maturityLabel = system.maturity.charAt(0).toUpperCase() + system.maturity.slice(1);
  parts.push(`Current status: ${maturityLabel}.`);

  // Key features (top 5 for brevity)
  const topFeatures = system.features.slice(0, 5);
  if (topFeatures.length > 0) {
    parts.push(`Key capabilities include: ${topFeatures.join('. ')}.`);
  }

  // Tech stack summary
  if (system.techStack && system.techStack.length > 0) {
    const stackSummary = system.techStack.slice(0, 6).join(', ');
    parts.push(`Built with ${stackSummary}.`);
  }

  // Chain targets
  if (system.chainTargets && system.chainTargets.length > 0) {
    const chains = system.chainTargets
      .map((c) => c.replace('xrpl', 'X R P L').replace('bnb-chain', 'B N B Chain'))
      .join(' and ');
    parts.push(`Targeting ${chains}.`);
  }

  // Business layer
  if (system.business) {
    if (system.business.strategicRole) {
      parts.push(system.business.strategicRole + '.');
    }
    if (system.business.targetUsers && system.business.targetUsers.length > 0) {
      parts.push(`Designed for ${system.business.targetUsers.slice(0, 3).join(', ')}.`);
    }
  }

  return parts.join(' ');
}
