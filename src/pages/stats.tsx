/**
 * src/pages/stats.tsx
 * Busca posts lendo o /blog page e counters via CounterAPI v1.
 * Auto-refresh a cada 30s com barras animadas.
 */
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './stats.module.css';

const NAMESPACE  = 'danieldias-blog';
const PROXY      = 'https://corsproxy.io/?url=';
const API_BASE   = 'https://api.counterapi.dev/v1';
const REFRESH_MS = 30_000;

// ─── Ajuste a lista com seus posts ──────────────────────────────
// Formato: só o permalink completo. Título vem do próprio array.
// Adicione novos posts aqui conforme for publicando.
const POSTS = [
  {
    title:     'Java Talks, Go Listens: My First Apache Pulsar App',
    permalink: '/danieldias/blog/java-talks-go-listens-my-first-apache-pulsar-app',
    date:      '2025-08-09',
    tags:      ['java', 'go', 'pulsar'],
  },
  {
    title:     'Testing in Rust: A Practical Guide',
    permalink: '/danieldias/rust/2026/02/25/testing-in-rust/test-in-rust',
    date:      '2026-02-25',
    tags:      ['rust', 'testing'],
  },
  // ✏️ Adicione novos posts aqui:
  // { title: '...', permalink: '/danieldias/blog/...', date: 'YYYY-MM-DD', tags: [] },
];
// ────────────────────────────────────────────────────────────────

function permalinkToKey(permalink: string): string {
  return permalink
    .replace(/^\/[^/]+\//, '')
    .replace(/\/$/, '')
    .replace(/\//g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

// async function fetchCount(key: string): Promise<number> {
//   const url = `${PROXY}${encodeURIComponent(`${API_BASE}/${NAMESPACE}/${key}/up`)}`;
//   const res  = await fetch(url);
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   const data: { count: number } = await res.json();
//   return data.count ?? 0;
// }

async function fetchCount(key: string): Promise<number> {
  const url = `${PROXY}${encodeURIComponent(`${API_BASE}/${NAMESPACE}/${key}`)}&t=${Date.now()}`;

  const res = await fetch(url, {
    cache: "no-store"
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  return data.count ?? 0;
}

type Post = typeof POSTS[0];
type PostStat = Post & {
  key:    string;
  count:  number | null;
  prev:   number | null;
  status: 'loading' | 'done' | 'error';
};

export default function StatsPage() {
  const [stats, setStats]           = useState<PostStat[]>(() =>
    POSTS.map(p => ({ ...p, key: permalinkToKey(p.permalink), count: null, prev: null, status: 'loading' as const }))
  );
  const [loading, setLoading]       = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [lines, setLines]           = useState<string[]>([]);
  const termRef                     = useRef<HTMLDivElement>(null);

  const addLine = (line: string) =>
    setLines(prev => [...prev.slice(-60), line]);

  // auto-scroll terminal
  useEffect(() => {
    if (termRef.current)
      termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    addLine(`$ refresh — ${new Date().toLocaleTimeString()}`);

    const results: Record<string, { count: number; prev: number | null }> = {};

    await Promise.all(POSTS.map(async post => {
      const key = permalinkToKey(post.permalink);
      try {
        const count = await fetchCount(key);
        setStats(prev => prev.map(s =>
          s.key === key ? { ...s, prev: s.count, count, status: 'done' } : s
        ));
        results[key] = { count, prev: null };
        addLine(`  ✓ ${key.slice(0, 44)} → ${count}`);
      } catch (e) {
        setStats(prev => prev.map(s =>
          s.key === key ? { ...s, count: 0, status: 'error' } : s
        ));
        addLine(`  ✗ ${key.slice(0, 44)} → error`);
      }
    }));

    const total = Object.values(results).reduce((s, r) => s + r.count, 0);
    addLine(`$ done — total: ${total}`);
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  // mount
  useEffect(() => {
    addLine(`$ blog_stats.rs — ${NAMESPACE}`);
    addLine(`$ ${POSTS.length} posts tracked`);
    loadAll();
  }, []);

  // auto-refresh
  useEffect(() => {
    const t = setInterval(loadAll, REFRESH_MS);
    return () => clearInterval(t);
  }, [loadAll]);

  const total    = stats.reduce((s, p) => s + (p.count ?? 0), 0);
  const maxCount = Math.max(...stats.map(s => s.count ?? 0), 1);
  const sorted   = [...stats].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));

  return (
    <Layout title="Blog Stats" description="Live visitor counter">
      <div className={styles.page}>

        {/* ── Hero ── */}
        <div className={styles.hero}>

          {/* titlebar */}
          <div className={styles.heroBar}>
            <div className={styles.heroDots}>
              <span className={styles.dotR}/>
              <span className={styles.dotY}/>
              <span className={styles.dotG}/>
            </div>
            <span className={styles.heroBarTitle}>blog_stats.rs — {NAMESPACE}</span>
            <span className={styles.liveChip}>
              <span className={loading ? styles.liveDotBlink : styles.liveDot}/>
              {loading ? ' FETCHING' : ' LIVE'}
            </span>
          </div>

          <div className={styles.heroBody}>

            {/* left — big total */}
            <div className={styles.heroLeft}>
              <span className={styles.heroLabel}>{'// total_visitors'}</span>
              {!total && loading
                ? <span className={styles.skeletonBig}/>
                : <span className={styles.heroNumber} key={total}>
                    {total.toLocaleString('en-US')}
                  </span>
              }
              <span className={styles.heroSub}>
                {`${POSTS.length} posts · auto-refresh 30s`}
              </span>
              {lastUpdate && (
                <span className={styles.heroUpdated}>
                  {'↻ updated '}{lastUpdate.toLocaleTimeString()}
                </span>
              )}
              <button
                className={styles.refreshBtn}
                onClick={loadAll}
                disabled={loading}
              >
                {loading ? '⟳ fetching…' : '⟳ refresh now'}
              </button>
            </div>

            {/* right — per post */}
            <div className={styles.heroRight}>
              <span className={styles.heroLabel}>{'// per_post_visitors'}</span>
              <div className={styles.postList}>
                {sorted.map((post, i) => {
                  const pct     = ((post.count ?? 0) / maxCount) * 100;
                  const changed = post.prev !== null && post.count !== post.prev;
                  return (
                    <a key={post.permalink} href={post.permalink} className={styles.postRow}>
                      <span className={styles.postRank}>{String(i+1).padStart(2,'0')}</span>
                      <span className={styles.postName}>
                        {post.title.length > 38 ? post.title.slice(0, 38) + '…' : post.title}
                      </span>
                      <div className={styles.postBar}>
                        <div
                          className={styles.postBarFill}
                          style={{ width: post.status === 'done' ? `${pct}%` : '0%' }}
                        />
                      </div>
                      <span className={`${styles.postCount} ${changed ? styles.postCountChanged : ''}`}>
                        {post.status === 'loading'
                          ? <span className={styles.skeletonNum}/>
                          : (post.count ?? 0).toLocaleString('en-US')
                        }
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ── Terminal log ── */}
        <div className={styles.terminal}>
          <div className={styles.termBar}>
            <div className={styles.termDots}>
              <span className={styles.dotR}/>
              <span className={styles.dotY}/>
              <span className={styles.dotG}/>
            </div>
            <span className={styles.termTitle}>
              {`counterapi.dev/v1/${NAMESPACE}`}
            </span>
          </div>
          <div className={styles.termBody} ref={termRef}>
            {lines.map((line, i) => (
              <div key={i} className={styles.termLine}>
                <span className={styles.termPrompt}>❯</span>
                <span className={
                  line.startsWith('  ✓') ? styles.termOk  :
                  line.startsWith('  ✗') ? styles.termErr :
                  line.startsWith('$ done') || line.startsWith('$ blog') ? styles.termDone :
                  styles.termText
                }>{line}</span>
              </div>
            ))}
            {loading && (
              <div className={styles.termLine}>
                <span className={styles.termPrompt}>❯</span>
                <span className={styles.termCursor}>█</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
}
