/**
 * src/components/PDIGrid/index.tsx
 * Individual Development Plan — Mid-level → Senior
 * Based on: Java + Go production experience at Itaú Unibanco (6+ yrs),
 * Apache TomEE committer, 11 community talks, active technical blog,
 * and current Rust learning journey.
 */
import React, { useState } from 'react';
import styles from './styles.module.css';

/* ─── TYPES ─────────────────────────────────────────────────── */
type Tab       = 'diagnosis' | 'pillars' | 'plan' | 'metrics' | 'resources';
type ResKind   = 'book' | 'site' | 'practice' | 'community';

/* ─── DIAGNOSIS DATA ─────────────────────────────────────────── */
type DiagCard = { id: string; icon: string; label: string; color: string; items: string[] };

const DIAGNOSIS: DiagCard[] = [
  {
    id: 'strengths', icon: '✦', label: 'Strengths', color: '#00e5a0',
    items: [
      '6+ years building distributed systems at Itaú Unibanco (Java + Go)',
      'Apache TomEE Committer — active in Jakarta EE ecosystem',
      '11 community talks (SouJava, TDC, Campus Party, JUG Nicaragua)',
      'Active technical blog: Rust, load testing, observability, Pulsar',
      'Hands-on Rust project: User CRUD with SQLx, async, layered arch',
    ],
  },
  {
    id: 'gaps', icon: '●', label: 'Identified Gaps', color: '#f87171',
    items: [
      'Software architecture at scale: DDD, Hexagonal, Event-Driven design docs',
      'Technical leadership and influence without formal authority',
      'Writing explicit trade-off records (ADRs, RFCs) at work',
      'Mentoring and actively developing other engineers',
    ],
  },
  {
    id: 'opportunities', icon: '→', label: 'Opportunities', color: '#0ea5e9',
    items: [
      'Blog already covers real systems — evolve to architecture decision posts',
      'Rust differentiates: rare profile in Brazilian backend market',
      'Existing talks history → natural path to tech lead presentations',
      'Apache committer role → influence in open source architecture',
    ],
  },
  {
    id: 'senior', icon: '◆', label: 'What Senior Demands More', color: '#f59e0b',
    items: [
      'Own technical decisions end-to-end without supervision',
      'Guide engineers by teaching, not just doing',
      'Think in systemic trade-offs, not just working solutions',
      'Translate technical complexity into business language',
    ],
  },
];

const COMPARE_ROWS = [
  ['Implements what was asked well',            'Defines what should be built and why'],
  ['Follows patterns in the codebase',          'Questions, evolves, and documents patterns'],
  ['Solves the ticket',                         'Identifies problems before they become tickets'],
  ['Asks for technical direction',              'Gives technical direction to the team'],
  ['Uses Kafka because the team uses Kafka',    'Knows when not to use Kafka — and documents it'],
  ['Blogs about how something works',           'Blogs about why a trade-off was made'],
];

/* ─── PILLARS DATA ───────────────────────────────────────────── */
type Pillar = { id: string; num: string; icon: string; label: string; color: string; points: string[] };

const PILLARS: Pillar[] = [
  {
    id: 'arch', num: '01', icon: '🏗️', label: 'Architecture & System Design', color: '#00e5a0',
    points: [
      'Go beyond "how to implement" → "why this approach in this context"',
      'Write ADRs for real decisions at Itaú: Kafka vs Pulsar, DynamoDB vs RDS, ECS vs Lambda',
      'Deepen DDD patterns — you already use Spring Boot; apply bounded contexts intentionally',
      'Study Hexagonal Architecture — aligns with your Jakarta EE and MicroProfile background',
      'Document trade-offs in blog posts (you already write; shift to architecture-focused)',
    ],
  },
  {
    id: 'leadership', num: '02', icon: '🧭', label: 'Technical Leadership & Influence', color: '#0ea5e9',
    points: [
      'Leverage your 11 talks experience — bring that voice to internal design reviews',
      'Conduct code reviews that explain the why, not just request changes',
      'Facilitate technical decisions in the team using structured trade-off analysis',
      'Use your Apache committer role to practice async written leadership (PRs, mailing lists)',
      'Mentor 1 junior or mid-level engineer: you have enough depth now',
    ],
  },
  {
    id: 'depth', num: '03', icon: '⚙️', label: 'Depth in Java and Go', color: '#f59e0b',
    points: [
      'Java: JVM internals, GC tuning (G1 vs ZGC), Virtual Threads (Project Loom), JFR profiling',
      'Go: goroutine scheduler internals, pprof profiling (you did load testing — go deeper)',
      'Kafka: offset management, consumer group rebalancing, exactly-once semantics',
      'AWS: cost/performance trade-offs between ECS, Lambda, SQS, DynamoDB — not just "it works"',
      'Testcontainers: you already use it — lead the team on integration test strategy',
    ],
  },
  {
    id: 'rust', num: '04', icon: '🦀', label: 'Rust as a Strategic Differentiator', color: '#e07040',
    points: [
      'You already built: User CRUD with SQLx, async/await, layered Service/Repository arch',
      'You already blogged: testing in Rust, module system, learning journey',
      'Next: contribute to an Apache project or open source tool in Rust',
      'Ownership + lifetimes rewire how you reason about memory in Java/Go too',
      'Rare profile: Java + Go + Rust backend engineer in Brazil — lean into this',
    ],
  },
];

/* ─── ACTION PLAN DATA ───────────────────────────────────────── */
type ActionItem = { text: string };
type Phase = { id: string; period: string; label: string; color: string; goal: string; items: ActionItem[] };

const PHASES: Phase[] = [
  {
    id: 'foundation', period: 'Months 1–4', label: 'Foundation', color: '#00e5a0',
    goal: 'Architecture base + consolidate Rust fundamentals',
    items: [
      { text: 'Read Designing Data-Intensive Applications — Kleppmann' },
      { text: 'Read A Philosophy of Software Design — Ousterhout' },
      { text: 'Write the first ADR at work (Kafka, AWS infra, or data layer decision)' },
      { text: 'Study DDD Distilled — apply bounded contexts to a real Itaú domain' },
      { text: 'Rust: expand rust-learning project with error handling patterns and traits' },
      { text: 'Blog post: first architecture decision walkthrough (not just "how" — "why")' },
    ],
  },
  {
    id: 'expansion', period: 'Months 5–8', label: 'Expansion', color: '#0ea5e9',
    goal: 'Leadership, distributed systems depth, and intermediate Rust',
    items: [
      { text: 'Lead 1 technical design review per sprint — document the decision' },
      { text: 'Deep dive: Kafka exactly-once, consumer group internals, backpressure' },
      { text: 'Java: GC tuning with JFR, Virtual Threads — benchmark in a real service' },
      { text: 'Go: goroutine leak detection, pprof profiling on a real load scenario' },
      { text: 'Rust: async with tokio, write a small HTTP service (axum or actix)' },
      { text: 'Mentor 1 engineer informally — document what you teach' },
      { text: 'Blog post: real post-mortem from a production incident or experiment' },
    ],
  },
  {
    id: 'consolidation', period: 'Months 9–12', label: 'Consolidation', color: '#e07040',
    goal: 'Position yourself as a technical reference — build evidence for promotion',
    items: [
      { text: 'Propose and lead a technical initiative at Itaú (arch improvement, tooling, observability)' },
      { text: 'Give a talk at SouJava or GophersBR: "Architecture Decisions in a Financial System"' },
      { text: 'Write a full RFC for an architectural decision — share with the team' },
      { text: 'Rust: contribute a PR or issue to an Apache or Jakarta EE related project' },
      { text: 'Blog series: "Real Architecture Decisions" — 3+ posts with trade-offs' },
      { text: 'Career review: map your ADRs, talks, mentoring, and initiatives as promotion evidence' },
    ],
  },
];

/* ─── METRICS DATA ───────────────────────────────────────────── */
const METRICS = [
  { value: '6+',  label: 'blog posts published',    color: '#00e5a0' },
  { value: '3+',  label: 'ADRs written at work',    color: '#0ea5e9' },
  { value: '1+',  label: 'RFC completed',           color: '#f59e0b' },
  { value: '1+',  label: 'Rust project in prod',    color: '#e07040' },
  { value: '1+',  label: 'initiative led at Itaú',  color: '#f87171' },
  { value: '1+',  label: 'engineer mentored',       color: '#a78bfa' },
];

/* ─── RESOURCES DATA ─────────────────────────────────────────── */
type Resource = { kind: ResKind; name: string; desc: string; url: string };

const RESOURCES: Resource[] = [
  {
    kind: 'book', url: 'https://dataintensive.net',
    name: 'Designing Data-Intensive Applications',
    desc: 'Kleppmann — Essential for your Kafka + DynamoDB + distributed systems work at Itaú.',
  },
  {
    kind: 'book', url: 'https://www.amazon.com/dp/173210221X',
    name: 'A Philosophy of Software Design',
    desc: 'Ousterhout — Deep complexity thinking. Pairs with your Jakarta EE module experience.',
  },
  {
    kind: 'book', url: 'https://staffeng.com/book',
    name: 'Staff Engineer',
    desc: 'Will Larson — Reframes what "senior" means. Leadership without authority.',
  },
  {
    kind: 'book', url: 'https://www.amazon.com/dp/0134434420',
    name: 'Domain-Driven Design Distilled',
    desc: 'Vernon — Apply bounded contexts to your Spring Boot / Jakarta EE services.',
  },
  {
    kind: 'book', url: 'https://doc.rust-lang.org/book',
    name: 'The Rust Programming Language',
    desc: 'Official book — you started here. Keep it as reference for ownership edge cases.',
  },
  {
    kind: 'book', url: 'https://nostarch.com/rust-rustaceans',
    name: 'Rust for Rustaceans',
    desc: 'Jon Gjengset — Next level after your rust-learning CRUD project.',
  },
  {
    kind: 'book', url: 'https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/',
    name: 'Fundamentals of Software Architecture',
    desc: 'Richards & Ford — You already read this. Re-read with ADR writing in mind.',
  },
  {
    kind: 'site', url: 'https://martinfowler.com',
    name: 'martinfowler.com',
    desc: 'ADRs, event sourcing, microservices patterns. Direct reference for your blog posts.',
  },
  {
    kind: 'site', url: 'https://go.dev/blog',
    name: 'go.dev/blog',
    desc: 'Go depth from the source — scheduler, memory model, concurrency patterns.',
  },
  {
    kind: 'site', url: 'https://docs.rs',
    name: 'docs.rs + tokio.rs',
    desc: 'Rust crate documentation and tokio async runtime — your next Rust frontier.',
  },
  {
    kind: 'practice', url: 'https://github.com/Daniel-Dos/rust-learning',
    name: 'Your rust-learning repo',
    desc: 'Already started. Evolve it: add tokio, axum HTTP layer, integration tests.',
  },
  {
    kind: 'practice', url: 'https://fundamentalsofsoftwarearchitecture.com/katas/',
    name: 'Architecture Katas',
    desc: 'System design exercises — practice writing ADRs from scenarios.',
  },
  {
    kind: 'community', url: 'https://soujava.org.br',
    name: 'SouJava',
    desc: 'You already spoke here (JSR-371, TomEE). Come back as a senior voice.',
  },
  {
    kind: 'community', url: 'https://gophers.slack.com',
    name: 'GophersBR',
    desc: 'Brazilian Go community — propose a talk on Go at Itaú financial scale.',
  },
  {
    kind: 'community', url: 'https://t.me/rustlangbr',
    name: 'Rust Brasil',
    desc: 'Brazilian Rust community — your blog posts are already good content to share here.',
  },
];

const KIND_LABEL: Record<ResKind, string> = {
  book:      '📘 Book',
  site:      '🌐 Site',
  practice:  '🛠️ Practice',
  community: '💬 Community',
};
const KIND_COLOR: Record<ResKind, string> = {
  book:      '#0ea5e9',
  site:      '#00e5a0',
  practice:  '#f59e0b',
  community: '#a78bfa',
};

/* ─── COMPONENT ─────────────────────────────────────────────── */
export default function PDIGrid() {
  const [activeTab,    setTab]    = useState<Tab>('diagnosis');
  const [checkedItems, setChecked] = useState<Set<string>>(new Set());
  const [resFilter,    setFilter] = useState<ResKind | 'all'>('all');

  const toggleCheck = (key: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const totalItems  = PHASES.reduce((s, p) => s + p.items.length, 0);
  const doneCount   = checkedItems.size;
  const progressPct = Math.round((doneCount / totalItems) * 100);

  const filteredRes = resFilter === 'all'
    ? RESOURCES
    : RESOURCES.filter(r => r.kind === resFilter);

  const TABS: { id: Tab; icon: string; label: string }[] = [
    { id: 'diagnosis', icon: '🔍', label: 'Diagnosis'   },
    { id: 'pillars',   icon: '🏛️', label: 'Pillars'     },
    { id: 'plan',      icon: '📅', label: 'Action Plan' },
    { id: 'metrics',   icon: '📊', label: 'Metrics'     },
    { id: 'resources', icon: '📚', label: 'Resources'   },
  ];

  return (
    <div className={styles.root}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.dots}>
            <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
          </div>
          <span className={styles.headerTitle}>idp.rs</span>
          <span className={styles.headerBadge}>Mid-level → Senior</span>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.comment}>{'// individual development plan · Java · Go · Rust · 12 months'}</span>
        </div>
        <div className={styles.stackRow}>
          <span className={styles.pillJava}>Java</span>
          <span className={styles.pillGo}>Go</span>
          <span className={styles.pillRust}>🦀 Rust ↗ learning</span>
          <span className={styles.pillTag}>Apache TomEE Committer</span>
          <span className={styles.pillTag}>11 Talks</span>
          <span className={styles.pillTag}>Itaú Unibanco · 6+ yrs</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`${styles.tabBtn} ${activeTab === t.id ? styles.tabActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* ══ DIAGNOSIS ══════════════════════════════════════════ */}
      {activeTab === 'diagnosis' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🔍</span>
            <span className={styles.sectionLabel}>Current Diagnosis</span>
          </div>

          <div className={styles.diagGrid}>
            {DIAGNOSIS.map(g => (
              <div
                key={g.id}
                className={styles.diagCard}
                style={{ '--card-color': g.color } as React.CSSProperties}
              >
                <div className={styles.diagCardLabel}>
                  <span>{g.icon}</span>{g.label}
                </div>
                <ul className={styles.diagList}>
                  {g.items.map((item, i) => (
                    <li key={i} className={styles.diagItem}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* compare table */}
          <div className={styles.tableWrap}>
            <div className={styles.tableTopBar}>
              <span className={styles.comment}>{'// mid-level vs senior — the real difference'}</span>
            </div>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th>Mid-level does today</th>
                  <th>Senior does differently</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([left, right], i) => (
                  <tr key={i}>
                    <td>{left}</td>
                    <td className={styles.tdAccent}>{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ PILLARS ════════════════════════════════════════════ */}
      {activeTab === 'pillars' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🏛️</span>
            <span className={styles.sectionLabel}>The 4 Pillars</span>
          </div>

          <div className={styles.pillarsCol}>
            {PILLARS.map(p => (
              <div
                key={p.id}
                className={styles.pillarCard}
                style={{ '--pillar-color': p.color } as React.CSSProperties}
              >
                <div className={styles.pillarNum}>{p.num}</div>
                <div className={styles.pillarBody}>
                  <div className={styles.pillarTitle}>
                    <span>{p.icon}</span>{p.label}
                  </div>
                  <ul className={styles.pillarList}>
                    {p.points.map((pt, i) => (
                      <li key={i} className={styles.pillarItem}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ ACTION PLAN ════════════════════════════════════════ */}
      {activeTab === 'plan' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📅</span>
            <span className={styles.sectionLabel}>12-Month Action Plan</span>
            <span className={styles.progressBadge}>{doneCount}/{totalItems} done</span>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>

          <div className={styles.phasesCol}>
            {PHASES.map(phase => (
              <div
                key={phase.id}
                className={styles.phaseCard}
                style={{ '--phase-color': phase.color } as React.CSSProperties}
              >
                <div className={styles.phaseHeader}>
                  <span className={styles.phasePeriod}>{phase.period}</span>
                  <span className={styles.phaseLabel}>{phase.label}</span>
                </div>
                <div className={styles.phaseGoal}>
                  <span className={styles.comment}>{'// '}{phase.goal}</span>
                </div>
                <ul className={styles.checkList}>
                  {phase.items.map((item, i) => {
                    const key  = `${phase.id}-${i}`;
                    const done = checkedItems.has(key);
                    return (
                      <li
                        key={i}
                        className={`${styles.checkItem} ${done ? styles.checkDone : ''}`}
                        onClick={() => toggleCheck(key)}
                      >
                        <span className={styles.checkbox}>{done ? '✓' : ''}</span>
                        <span className={styles.checkText}>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ METRICS ════════════════════════════════════════════ */}
      {activeTab === 'metrics' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📊</span>
            <span className={styles.sectionLabel}>How to Measure Progress</span>
          </div>

          <div className={styles.metricsGrid}>
            {METRICS.map((m, i) => (
              <div
                key={i}
                className={styles.metricCard}
                style={{ '--m-color': m.color } as React.CSSProperties}
              >
                <div className={styles.metricValue}>{m.value}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.metricNote}>
            <span className={styles.comment}>
              {'// Review this IDP every 3 months. Your blog posts, ADRs, and talks ARE the evidence for promotion.'}
            </span>
          </div>
        </div>
      )}

      {/* ══ RESOURCES ══════════════════════════════════════════ */}
      {activeTab === 'resources' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📚</span>
            <span className={styles.sectionLabel}>Recommended Resources</span>
          </div>

          <div className={styles.filters}>
            {(['all', 'book', 'site', 'practice', 'community'] as const).map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${resFilter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'all' : KIND_LABEL[f as ResKind]}
              </button>
            ))}
          </div>

          <div className={styles.resourceGrid}>
            {filteredRes.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resourceCard}
                style={{ '--res-color': KIND_COLOR[r.kind] } as React.CSSProperties}
              >
                <div className={styles.resKind}>{KIND_LABEL[r.kind]}</div>
                <div className={styles.resName}>{r.name}</div>
                <div className={styles.resDesc}>{r.desc}</div>
                <span className={styles.resArrow}>↗</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <span className={styles.comment}>{'// Still learning. Still building. 🚀'}</span>
        <span className={styles.footerDate}>March 2026</span>
      </div>

    </div>
  );
}
