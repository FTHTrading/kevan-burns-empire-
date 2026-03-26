'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, Loader2, Play, Pause, RotateCcw } from 'lucide-react';
import { textToSpeech, buildSystemNarration, isElevenLabsConfigured } from '@/lib/elevenlabs';
import type { System } from '@/types/system';

interface Props {
  system: System;
}

type AudioState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export default function SystemAudioNarrator({ system }: Props) {
  const [state, setState] = useState<AudioState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const animFrameRef = useRef<number>(0);

  // Check if ElevenLabs is configured
  const configured = isElevenLabsConfigured();

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const trackProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
    if (!audio.paused && !audio.ended) {
      animFrameRef.current = requestAnimationFrame(trackProgress);
    }
  }, []);

  const generateAndPlay = useCallback(async () => {
    try {
      setState('loading');
      setError(null);

      // Build narration text
      const narration = buildSystemNarration(system);

      // Call ElevenLabs API
      const blob = await textToSpeech(narration);

      // Revoke old URL if exists
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }

      // Create audio element
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener('ended', () => {
        setState('idle');
        setProgress(100);
      });

      audio.addEventListener('error', () => {
        setState('error');
        setError('Audio playback failed');
      });

      await audio.play();
      setState('playing');
      trackProgress();
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    }
  }, [system, trackProgress]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      generateAndPlay();
      return;
    }

    if (state === 'playing') {
      audio.pause();
      setState('paused');
    } else if (state === 'paused') {
      audio.play();
      setState('playing');
      trackProgress();
    } else {
      generateAndPlay();
    }
  }, [state, generateAndPlay, trackProgress]);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setState('playing');
      setProgress(0);
      trackProgress();
    } else {
      generateAndPlay();
    }
  }, [generateAndPlay, trackProgress]);

  if (!configured) {
    return null; // Don't render anything if not configured
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-colors">
      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        disabled={state === 'loading'}
        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50"
        style={{
          background: `${system.color}18`,
          border: `1px solid ${system.color}30`,
        }}
        aria-label={state === 'playing' ? 'Pause narration' : 'Play system narration'}
      >
        {state === 'loading' ? (
          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
        ) : state === 'playing' ? (
          <Pause className="w-4 h-4 text-blue-400" />
        ) : state === 'error' ? (
          <VolumeX className="w-4 h-4 text-red-400" />
        ) : (
          <Play className="w-4 h-4 text-blue-400 ml-0.5" />
        )}
      </button>

      {/* Info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="w-3 h-3 text-[#8888a0] flex-shrink-0" />
          <span className="text-[11px] text-[#8888a0] font-medium truncate">
            {state === 'loading'
              ? 'Generating audio...'
              : state === 'playing'
                ? 'Playing system overview'
                : state === 'paused'
                  ? 'Paused'
                  : state === 'error'
                    ? error || 'Error'
                    : 'Listen to system overview'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: state === 'error' ? '#ef4444' : system.color,
              opacity: state === 'idle' && progress === 0 ? 0 : 0.7,
            }}
          />
        </div>
      </div>

      {/* Replay button (show when finished or paused) */}
      {(state === 'idle' && progress === 100) || state === 'paused' ? (
        <button
          onClick={replay}
          className="flex-shrink-0 p-1.5 rounded-md text-[#8888a0] hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Replay narration"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      ) : null}
    </div>
  );
}
