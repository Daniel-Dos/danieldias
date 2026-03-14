/**
 * src/components/AudioReader/index.tsx
 * Reads the current blog post aloud using the Web Speech API.
 * Supports language selection — zero cost, zero backend.
 *
 * NOTE: render this component directly inside your MDX or via the
 * BlogPostPage swizzle wrapper — no manual DOM insertion needed.
 */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.css';

/* ─── LANGUAGES ──────────────────────────────────────────────── */
type LangOption = { code: string; label: string; flag: string };

const LANGUAGES: LangOption[] = [
  { code: 'en-US', label: 'English',   flag: '🇺🇸' },
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'es-ES', label: 'Español',   flag: '🇪🇸' },
  { code: 'de-DE', label: 'Deutsch',   flag: '🇩🇪' },
  { code: 'fr-FR', label: 'Français',  flag: '🇫🇷' },
  { code: 'ja-JP', label: '日本語',     flag: '🇯🇵' },
];

/* ─── HELPERS ────────────────────────────────────────────────── */
function extractArticleText(): string {
  const article =
    document.querySelector('article') ||
    document.querySelector('.markdown') ||
    document.querySelector('main');
  if (!article) return '';

  const clone = article.cloneNode(true) as HTMLElement;
  clone
    .querySelectorAll([
      'pre', 'code', '.theme-code-block',
      'nav', 'footer', '.pagination-nav',
      '[aria-hidden]', '.audio-reader-root',
      // exclude the player itself so it doesn't read its own UI
      '[data-audio-reader]',
    ].join(','))
    .forEach(el => el.remove());

  return (clone.textContent || '').replace(/\s+/g, ' ').trim();
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function getBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang.split('-')[0];
  return (
    voices.find(v => v.lang === lang && /Google|Natural|Premium|Enhanced/i.test(v.name)) ||
    voices.find(v => v.lang === lang) ||
    voices.find(v => v.lang.startsWith(prefix)) ||
    null
  );
}

/* ─── TYPES ──────────────────────────────────────────────────── */
type State = 'idle' | 'playing' | 'paused' | 'unsupported';

/* ─── COMPONENT ──────────────────────────────────────────────── */
export default function AudioReader() {
  const [state,       setState]    = useState<State>('idle');
  const [progress,    setProgress] = useState(0);
  const [elapsed,     setElapsed]  = useState(0);
  const [duration,    setDuration] = useState(0);
  const [rate,        setRate]     = useState(1);
  const [lang,        setLang]     = useState('en-US');
  const [langOpen,    setLangOpen] = useState(false);
  const [text,        setText]     = useState('');
  const [voiceReady,  setVoiceReady] = useState(false);

  const tickRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef(0);
  const pausedAt  = useRef(0);

  /* ── Support + voice load ── */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setState('unsupported');
      return;
    }
    const t = extractArticleText();
    setText(t);
    setDuration(Math.round((t.length / 5) / 150 * 60));

    const onVoices = () => setVoiceReady(true);
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoiceReady(true);
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', onVoices, { once: true });
    }
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
    };
  }, []);

  /* ── Full cleanup on unmount (page navigation) ── */
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, []);

  /* ── Close lang dropdown on outside click ── */
  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent) => setLangOpen(false);
    document.addEventListener('click', close, { once: true });
    return () => document.removeEventListener('click', close);
  }, [langOpen]);

  /* ── Tick ── */
  const startTick = useCallback(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    startedAt.current = Date.now() - pausedAt.current * 1000;
    tickRef.current = setInterval(() => {
      const secs = (Date.now() - startedAt.current) / 1000;
      setElapsed(secs);
      setProgress(prev => {
        const next = duration > 0 ? Math.min((secs / duration) * 100, 100) : prev;
        return next;
      });
    }, 300);
  }, [duration]);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  /* ── Stop ── */
  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState('idle');
    stopTick();
    setProgress(0);
    setElapsed(0);
    pausedAt.current = 0;
  }, [stopTick]);

  /* ── Play ── */
  const play = useCallback(() => {
    if (!text) return;
    const synth = window.speechSynthesis;

    if (state === 'paused') {
      synth.resume();
      setState('playing');
      startTick();
      return;
    }

    synth.cancel();

    const utt   = new SpeechSynthesisUtterance(text);
    utt.lang    = lang;
    utt.rate    = rate;
    utt.pitch   = 1;

    const voice = getBestVoice(lang);
    if (voice) utt.voice = voice;

    utt.onstart = () => {
      setState('playing');
      pausedAt.current = 0;
      startTick();
    };
    utt.onend = () => {
      setState('idle');
      stopTick();
      setProgress(100);
      setElapsed(duration);
    };
    utt.onerror = () => {
      setState('idle');
      stopTick();
    };

    synth.speak(utt);
  }, [text, state, lang, rate, startTick, stopTick, duration]);

  /* ── Pause ── */
  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setState('paused');
    pausedAt.current = elapsed;
    stopTick();
  }, [elapsed, stopTick]);

  /* ── Rate change ── */
  const changeRate = useCallback((r: number) => {
    setRate(r);
    if (state === 'playing') stop();
  }, [state, stop]);

  /* ── Language change ── */
  const changeLang = useCallback((code: string) => {
    setLang(code);
    setLangOpen(false);
    if (state === 'playing' || state === 'paused') stop();
  }, [state, stop]);

  if (state === 'unsupported') return null;

  const isPlaying = state === 'playing';
  const isPaused  = state === 'paused';
  const isActive  = isPlaying || isPaused;
  const activeLang = LANGUAGES.find(l => l.code === lang)!;

  return (
    <div className={`${styles.root} audio-reader-root`} data-audio-reader>

      {/* ── Top bar ── */}
      <div className={styles.bar}>
        <div className={styles.dots}>
          <span className={styles.dotR} />
          <span className={styles.dotY} />
          <span className={styles.dotG} />
        </div>
        <span className={styles.title}>audio.rs</span>
        <span className={styles.comment}>{'// listen to this post'}</span>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>

        {/* Play / Pause */}
        <button
          className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
          onClick={isPlaying ? pause : play}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1"/>
              <rect x="9" y="2" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2.5l11 5.5-11 5.5V2.5z"/>
            </svg>
          )}
        </button>

        {/* Stop */}
        <button
          className={`${styles.iconBtn} ${!isActive ? styles.iconBtnDisabled : ''}`}
          onClick={stop}
          aria-label="Stop"
          disabled={!isActive}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <rect x="1" y="1" width="10" height="10" rx="1"/>
          </svg>
        </button>

        {/* Progress */}
        <div className={styles.progressWrap}>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            <div className={styles.progressThumb} style={{ left: `${progress}%` }} />
          </div>
          <div className={styles.timeRow}>
            <span className={styles.time}>{formatTime(elapsed)}</span>
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Speed */}
        <div className={styles.speedGroup}>
          {[0.75, 1, 1.25, 1.5, 2].map(r => (
            <button
              key={r}
              className={`${styles.speedBtn} ${rate === r ? styles.speedActive : ''}`}
              onClick={() => changeRate(r)}
            >
              {r}×
            </button>
          ))}
        </div>

        {/* Language */}
        <div className={styles.langWrap} onClick={e => e.stopPropagation()}>
          <button
            className={`${styles.langBtn} ${langOpen ? styles.langBtnOpen : ''}`}
            onClick={() => setLangOpen(v => !v)}
            aria-label="Select language"
          >
            <span>{activeLang.flag}</span>
            <span className={styles.langCode}>{activeLang.code.split('-')[0]}</span>
            <svg
              width="8" height="8" viewBox="0 0 8 8"
              fill="none" stroke="currentColor" strokeWidth="1.5"
              className={`${styles.langArrow} ${langOpen ? styles.langArrowOpen : ''}`}
            >
              <path d="M1 2.5l3 3 3-3"/>
            </svg>
          </button>

          {langOpen && (
            <div className={styles.langDropdown}>
              {LANGUAGES.map(l => {
                const available = voiceReady
                  ? window.speechSynthesis.getVoices().some(v =>
                      v.lang.startsWith(l.code.split('-')[0])
                    )
                  : true;
                return (
                  <button
                    key={l.code}
                    className={[
                      styles.langOption,
                      lang === l.code   ? styles.langOptionActive      : '',
                      !available        ? styles.langOptionUnavailable  : '',
                    ].join(' ')}
                    onClick={() => changeLang(l.code)}
                    title={!available ? 'Voice not available in this browser' : undefined}
                  >
                    <span>{l.flag}</span>
                    <span className={styles.langOptionLabel}>{l.label}</span>
                    <span className={styles.langOptionCode}>{l.code}</span>
                    {!available && <span className={styles.langUnavailableDot}>·</span>}
                  </button>
                );
              })}
              <div className={styles.langDropdownNote}>
                Voice availability depends on your OS / browser
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ── Status ── */}
      <div className={styles.status}>
        {isPlaying && (
          <span className={styles.statusPlaying}>
            <span className={styles.pulse} />
            reading in {activeLang.flag} {activeLang.label}
          </span>
        )}
        {isPaused && <span className={styles.statusPaused}>paused</span>}
        {state === 'idle' && progress === 100 && (
          <span className={styles.statusDone}>✓ done</span>
        )}
        {state === 'idle' && progress === 0 && (
          <span className={styles.statusIdle}>
            ~{Math.ceil(duration / 60)} min read · {activeLang.flag} {activeLang.label} · click ▶ to listen
          </span>
        )}
      </div>

    </div>
  );
}
