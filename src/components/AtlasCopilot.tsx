'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { BrainCircuit, Loader2, Mic, PanelRightOpen, Sparkles, Volume2, Wand2 } from 'lucide-react';
import { assistantQuickPrompts } from '@/lib/ai/atlasContext';

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    SpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<{
    0: { transcript: string };
  }>;
}

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const OPENING_MESSAGE = 'I know the stack, the flagship systems, the live rails, the capital surfaces, and the next-step paths. Ask me what this machine does, what is live, or how to move forward.';

export default function AtlasCopilot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState('');
  const [source, setSource] = useState<'openai' | 'fallback' | ''>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: OPENING_MESSAGE },
  ]);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const canUseSpeech = useMemo(
    () => typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
    []
  );

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        URL.revokeObjectURL(audioRef.current.src);
      }
    };
  }, []);

  const submit = async (prompt?: string) => {
    const next = (prompt ?? message).trim();
    if (!next || loading) return;

    setLoading(true);
    setError('');
    setOpen(true);
    setMessages((current) => [...current, { role: 'user', content: next }]);

    try {
      const response = await fetch('/api/atlas-copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: next }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
        source?: 'openai' | 'fallback';
      };

      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to answer right now.');
      }

      const answer = payload.answer ?? 'No response returned.';
      setSource(payload.source ?? '');
      setMessages((current) => [...current, { role: 'assistant', content: answer }]);
      setMessage(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to answer right now.');
    } finally {
      setLoading(false);
    }
  };

  const speakLatest = async () => {
    const latestAssistant = [...messages].reverse().find((entry) => entry.role === 'assistant');
    if (!latestAssistant || voiceLoading) return;

    setVoiceLoading(true);
    setError('');

    try {
      const response = await fetch('/api/atlas-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: latestAssistant.content }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({ error: 'Voice unavailable' }))) as { error?: string };
        throw new Error(payload.error ?? 'Voice unavailable');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      if (audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }

      audioRef.current.src = url;
      await audioRef.current.play();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Voice unavailable');
    } finally {
      setVoiceLoading(false);
    }
  };

  const startListening = () => {
    if (!canUseSpeech || recognizing) return;

    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      if (transcript) {
        setMessage(transcript);
      }
    };
    recognition.onerror = () => {
      setRecognizing(false);
    };
    recognition.onend = () => {
      setRecognizing(false);
    };

    recognitionRef.current = recognition;
    setRecognizing(true);
    recognition.start();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3">
      {open && (
        <div className="w-[24rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-[#25253a] bg-[#090910]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="border-b border-[#1e1e2e] bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_top_left,rgba(168,85,247,0.18),transparent_35%)] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Atlas Copilot</div>
                  <div className="text-xs text-[#9ca3af]">Grounded stack intelligence + OpenAI voice</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[#2a2a3c] px-2.5 py-1 text-xs text-[#9ca3af] transition-colors hover:text-white"
              >
                Close
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="max-h-[28rem] space-y-3 overflow-y-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {assistantQuickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void submit(prompt)}
                  className="rounded-full border border-[#2a2a3c] bg-[#11111a] px-3 py-1.5 text-xs text-[#c7c9d9] transition-colors hover:border-blue-500/30 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {messages.map((entry, index) => (
              <div
                key={`${entry.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${entry.role === 'assistant' ? 'border border-[#1e1e2e] bg-[#12121a] text-[#e7e7f2]' : 'ml-8 bg-blue-600 text-white'}`}
              >
                <div className="mb-1 text-[10px] font-mono uppercase tracking-wider text-[#7d8096]">
                  {entry.role === 'assistant' ? 'Atlas Copilot' : 'You'}
                </div>
                <div className="whitespace-pre-wrap">{entry.content}</div>
              </div>
            ))}

            {loading && (
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a] px-4 py-3 text-sm text-[#c7c9d9]">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking through the stack…
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-[#1e1e2e] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-wider text-[#7d8096]">
              <span>{source === 'openai' ? 'OpenAI grounded' : 'Local grounded fallback'}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void speakLatest()}
                  disabled={voiceLoading}
                  className="inline-flex items-center gap-1 rounded-full border border-[#2a2a3c] px-2.5 py-1 text-[#c7c9d9] transition-colors hover:text-white disabled:opacity-50"
                >
                  {voiceLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Volume2 className="h-3.5 w-3.5" />}
                  Voice
                </button>
                <button
                  type="button"
                  onClick={startListening}
                  disabled={!canUseSpeech || recognizing}
                  className="inline-flex items-center gap-1 rounded-full border border-[#2a2a3c] px-2.5 py-1 text-[#c7c9d9] transition-colors hover:text-white disabled:opacity-50"
                >
                  <Mic className="h-3.5 w-3.5" />
                  {recognizing ? 'Listening' : 'Mic'}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                placeholder="Ask what the stack is, what is live, what it can do, or the best next move."
                className="min-h-[90px] flex-1 rounded-2xl border border-[#2a2a3c] bg-[#0f0f16] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#686b81] focus:border-blue-500/40"
              />
              <button
                type="button"
                onClick={() => void submit()}
                disabled={!message.trim() || loading}
                className="inline-flex min-w-[5.5rem] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                Ask
              </button>
            </div>

            {error && <div className="mt-3 text-xs text-red-300">{error}</div>}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-[#0d1220]/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)] backdrop-blur-xl transition-transform hover:-translate-y-0.5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          {open ? <PanelRightOpen className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </div>
        <div className="text-left">
          <div>Atlas Copilot</div>
          <div className="text-[11px] font-normal text-[#aeb4cf]">Ask anything about the stack</div>
        </div>
      </button>
    </div>
  );
}
