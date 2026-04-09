'use client';

import { useMemo, useState } from 'react';
import { Bot, Loader2, MessageSquareText, Send } from 'lucide-react';

const QUICK_QUESTIONS = [
  'What is the estoppel amount due?',
  'Who signs the note documents on each side?',
  'What does 10% NDCF actually mean?',
  'What CUSIP and ISIN are referenced?',
];

export default function DiligenceChat() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [source, setSource] = useState<'workers-ai' | 'fallback' | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => question.trim().length > 0 && !loading, [question, loading]);

  const ask = async (nextQuestion?: string) => {
    const prompt = (nextQuestion ?? question).trim();
    if (!prompt || loading) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/diligence-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
        detail?: string;
        source?: 'workers-ai' | 'fallback';
      };

      if (!response.ok) {
        throw new Error(payload.detail ?? payload.error ?? 'Unable to answer right now.');
      }

      setAnswer(payload.answer ?? 'No answer returned.');
      setSource(payload.source ?? '');
      setQuestion(prompt);
      setOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to answer right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-16 rounded-2xl border border-[#1e1e2e] bg-[#0e0e1a] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-controls="diligence-chat-panel"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Diligence AI Chat</div>
            <div className="text-xs text-[#8888a0]">
              Grounded Q&amp;A for note, estoppel, NDCF, and document distinctions.
            </div>
          </div>
        </div>
        <div className="text-xs font-mono uppercase tracking-wider text-[#8888a0]">
          {open ? 'Hide' : 'Open'}
        </div>
      </button>

      {open && (
        <div id="diligence-chat-panel" className="border-t border-[#1e1e2e] px-6 py-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuestion(item);
                  void ask(item);
                }}
                className="rounded-full border border-[#2a2a3c] bg-[#12121a] px-3 py-1.5 text-xs text-[#c0c0d0] transition-colors hover:border-blue-500/30 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <label className="sr-only" htmlFor="diligence-chat-input">
              Ask a diligence question
            </label>
            <div className="relative flex-1">
              <MessageSquareText className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-[#666680]" />
              <textarea
                id="diligence-chat-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                placeholder="Ask about the estoppel amount, same-signer issue, CUSIP, ISIN, or the 10% NDCF distinction."
                className="min-h-[92px] w-full rounded-xl border border-[#2a2a3c] bg-[#0a0a0f] py-3 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-[#666680] focus:border-blue-500/40"
              />
            </div>
            <button
              type="button"
              onClick={() => void ask()}
              disabled={!canSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 md:self-stretch"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Ask
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {(answer || loading) && (
            <div className="mt-4 rounded-xl border border-[#1e1e2e] bg-[#12121a] px-4 py-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8888a0]">
                  Response
                </div>
                {source && (
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#666680]">
                    {source === 'workers-ai' ? 'Workers AI' : 'Grounded fallback'}
                  </div>
                )}
              </div>
              <div className="whitespace-pre-wrap text-sm leading-6 text-[#d6d6e7]">
                {loading ? 'Thinking through the documented facts…' : answer}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
