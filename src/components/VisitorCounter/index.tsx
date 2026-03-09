import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

type Status = 'loading' | 'done' | 'error';

const NAMESPACE = 'danieldias-blog';

function getKey(): string {
  if (typeof window === 'undefined') return '';
  const raw = window.location.pathname
    .replace(/^\/[^/]+\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '-');
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

export default function VisitorCounter() {
  const [count, setCount]   = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [key, setKey]       = useState('');

  useEffect(() => {
    const k = getKey();
    setKey(k);
    if (!k) return;

    let cancelled = false;

    // Fetch direto para v1 — sem pacote npm, sem ambiguidade
    fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${k}/up`, { method: 'GET', mode: 'cors', headers: { 'Accept': 'application/json' } })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { count: number }) => {
        // CounterAPI v1 retorna { count: number }
        if (!cancelled) {
          setCount(data.count ?? 0);
          setStatus('done');
        }
      })
      .catch(err => {
        console.warn('[VisitorCounter] error:', err);
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  if (status === 'error') return null;

  return (
    <div className={styles.card}>

      {/* ── Titlebar ── */}
      <div className={styles.bar}>
        <div className={styles.barDots}>
          <span className={styles.dotRed}   />
          <span className={styles.dotYellow}/>
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.barTitle}>visitor_counter.rs</span>
        <span className={styles.barLive}>
          <span className={styles.liveDot} />
          {' LIVE'}
        </span>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* Left — big number */}
        <div className={styles.left}>
          <span className={styles.counterLabel}>{'// total_visitors'}</span>

          {status === 'loading' && (
            <span className={styles.skeleton} />
          )}

          {status === 'done' && (
            <span className={styles.number}>
              {(count ?? 0).toLocaleString('en-US')}
            </span>
          )}

          <span className={styles.subLabel}>since publication</span>

          <div className={styles.sparkline}>
            {[18,30,22,40,28,52,35,60,42,70,55,90].map((h, i, arr) => (
              <div
                key={i}
                className={i === arr.length - 1 ? styles.sparkLast : styles.sparkBar}
                style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
        </div>

        {/* Right — stats */}
        <div className={styles.right}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>namespace</span>
            <span className={styles.statValue}>{NAMESPACE}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>key</span>
            <span className={styles.statValue}>{key}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>api</span>
            <span className={styles.statValue}>v1 / free</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>status</span>
            <span className={status === 'done' ? styles.statOk : styles.statValue}>
              {status === 'loading' ? 'fetching…' : '200 OK'}
            </span>
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <span className={styles.footerCode}>
          {'// powered by '}
          <a
            href="https://counterapi.dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            counterapi.dev
          </a>
          {' /v1'}
        </span>
        <span className={styles.footerKey}>{'GET …/' + key + '/up'}</span>
      </div>

    </div>
  );
}
