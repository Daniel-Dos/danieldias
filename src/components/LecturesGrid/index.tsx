/**
 * src/components/LecturesGrid/index.tsx
 * Grid de palestras agrupado por tema.
 * Iframes carregam só ao clicar no card.
 */
import React, { useState } from 'react';
import styles from './styles.module.css';

/* ─── DATA ──────────────────────────────────────────────────── */
type Resource = { kind: 'youtube' | 'speakerdeck' | 'slideshare'; url: string };

type Lecture = {
  id:        number;
  title:     string;
  event:     string;
  lang:      'pt' | 'es';
  resources: Resource[];
  links?:    { label: string; url: string }[];
};

type Group = { id: string; label: string; icon: string; lectures: Lecture[] };

const GROUPS: Group[] = [
  {
    id: 'mvc', label: 'Jakarta MVC / Eclipse Krazo', icon: '🏗️',
    lectures: [
      {
        id: 1, title: 'JSR-371 Model-View-Controller', event: 'SouJava', lang: 'pt',
        resources: [
          { kind: 'youtube',     url: 'https://www.youtube.com/embed/hRQ5E80ehdw' },
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/2a196cec68bf4bbc908ba15e96d0899f' },
        ],
      },
      {
        id: 2, title: '#TCMaoNaMassa — Eclipse Krazo (MVC) Live Code', event: 'TDC', lang: 'pt',
        resources: [
          { kind: 'youtube', url: 'https://www.youtube.com/embed/e5gsX5lMlrY' },
        ],
        links: [
          { label: 'eclipse-krazo-demo', url: 'https://github.com/Daniel-Dos/eclipse-krazo-demo' },
          { label: 'MVC1.0.Ozark',       url: 'https://github.com/Adopt-a-JSR/MVC1.0.Ozark' },
          { label: 'Spec',               url: 'https://github.com/eclipse-ee4j/krazo' },
        ],
      },
      {
        id: 4, title: 'Tudo o que você queria saber sobre MVC no Jakarta EE', event: 'Campus Party SP 2018', lang: 'pt',
        resources: [
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/0fd8905fffd847a0ae7767026da56460' },
        ],
      },
      {
        id: 6, title: 'Todo lo que querías saber sobre MVC en Jakarta EE', event: 'SouJava ES', lang: 'es',
        resources: [
          { kind: 'youtube',     url: 'https://www.youtube.com/embed/dUrP9C0iXqE' },
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/727817975f4a43f2bf45a0e0b606db08' },
        ],
        links: [{ label: 'mvc-cxf-tomee', url: 'https://github.com/soujava/mvc-cxf-tomee' }],
      },
      {
        id: 9, title: 'Todo lo que querías saber sobre MVC en Jakarta EE', event: 'Comunidad Hispana JUGs', lang: 'es',
        resources: [
          { kind: 'youtube', url: 'https://www.youtube.com/embed/o-OoTLqVjNk' },
        ],
      },
    ],
  },
  {
    id: 'opensource', label: 'Open Source & Apache TomEE', icon: '🪶',
    lectures: [
      {
        id: 5, title: 'Conviértete en un Contributor de Open Source con Apache TomEE', event: 'SouJava ES', lang: 'es',
        resources: [
          { kind: 'youtube',    url: 'https://www.youtube.com/embed/3XZjdiVGVbM' },
          { kind: 'slideshare', url: 'https://www.slideshare.net/slideshow/embed_code/key/7ZMD6RSvCoAPwG?startSlide=1' },
        ],
      },
      {
        id: 8, title: 'Cómo contribuir en proyectos Open Source', event: 'HackDay Comunidad Hispana JUGs', lang: 'es',
        resources: [
          { kind: 'youtube', url: 'https://www.youtube.com/embed/0bVqbh7TBY4' },
        ],
      },
      {
        id: 10, title: 'Tornando-se um contribuidor Open Source com Apache TomEE', event: 'SouJava', lang: 'pt',
        resources: [
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/1ac6c18f968c4a60901ffbd2263c8132' },
        ],
      },
    ],
  },
  {
    id: 'deltaspike', label: 'Apache DeltaSpike', icon: '⚡',
    lectures: [
      {
        id: 3, title: 'Simplificando persistência de Dados com Apache DeltaSpike Data', event: 'Estácio', lang: 'pt',
        resources: [
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/11f5c1b15782410a97e7bb49a42bf0a2' },
        ],
      },
      {
        id: 7, title: 'Simplificando la persistencia de datos con Apache DeltaSpike Data', event: 'JUG Nicaragua', lang: 'es',
        resources: [
          { kind: 'youtube',     url: 'https://www.youtube.com/embed/djM51tlJuLs' },
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/0a743a36397d400c94aa48fb8d5f30c5' },
        ],
        links: [{ label: 'JUGNicaragua code', url: 'https://github.com/Daniel-Dos/danieldiasjava-palestras/tree/master/JUGNicaragua' }],
      },
    ],
  },
  {
    id: 'Rust', label: 'Rust', icon: '🦀',
    lectures: [
      {
        id: 11, title: 'Rust para Iniciantes: Do Java/Go para Rust ', event: 'outro', lang: 'pt',
        resources: [
          { kind: 'speakerdeck', url: 'https://speakerdeck.com/player/ad4c27022b174aeb847e848c148db64b' },
        ],
      },
    ],
  },
];

/* ─── ICONS ─────────────────────────────────────────────────── */
const KIND_LABEL: Record<Resource['kind'], string> = {
  youtube:     '▶ YouTube',
  speakerdeck: '🗂 Slides',
  slideshare:  '📊 SlideShare',
};
const KIND_COLOR: Record<Resource['kind'], string> = {
  youtube:     '#ce412b',
  speakerdeck: '#00acd7',
  slideshare:  '#f89820',
};

/* ─── COMPONENT ─────────────────────────────────────────────── */
type OpenState = { lectureId: number; resourceIndex: number } | null;

export default function LecturesGrid() {
  const [open, setOpen]         = useState<OpenState>(null);
  const [activeGroup, setActive] = useState<string | null>(null);

  const toggle = (lectureId: number, resourceIndex: number) => {
    setOpen(prev =>
      prev?.lectureId === lectureId && prev?.resourceIndex === resourceIndex
        ? null
        : { lectureId, resourceIndex }
    );
  };

  const visibleGroups = activeGroup
    ? GROUPS.filter(g => g.id === activeGroup)
    : GROUPS;

  const totalLectures = GROUPS.reduce((s, g) => s + g.lectures.length, 0);

  return (
    <div className={styles.root}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.headerBar}>
          <div className={styles.dots}>
            <span className={styles.dotR}/><span className={styles.dotY}/><span className={styles.dotG}/>
          </div>
          <span className={styles.headerTitle}>lectures.rs</span>
          <span className={styles.headerCount}>{totalLectures} talks</span>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.comment}>{'// talks, workshops & live coding sessions'}</span>
        </div>
      </div>

      {/* ── Group filter ── */}
      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${!activeGroup ? styles.filterActive : ''}`}
          onClick={() => setActive(null)}
        >
          all
        </button>
        {GROUPS.map(g => (
          <button
            key={g.id}
            className={`${styles.filterBtn} ${activeGroup === g.id ? styles.filterActive : ''}`}
            onClick={() => setActive(prev => prev === g.id ? null : g.id)}
          >
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      {/* ── Groups ── */}
      {visibleGroups.map(group => (
        <div key={group.id} className={styles.group}>

          <div className={styles.groupHeader}>
            <span className={styles.groupIcon}>{group.icon}</span>
            <span className={styles.groupLabel}>{group.label}</span>
            <span className={styles.groupCount}>{group.lectures.length} talks</span>
          </div>

          <div className={styles.grid}>
            {group.lectures.map(lecture => (
              <div key={lecture.id} className={styles.card}>

                {/* card header */}
                <div className={styles.cardTop}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardNum}>#{String(lecture.id).padStart(2,'0')}</span>
                    <span className={`${styles.langBadge} ${lecture.lang === 'es' ? styles.langEs : styles.langPt}`}>
                      {lecture.lang === 'pt' ? '🇧🇷 pt' : '🇪🇸 es'}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{lecture.title}</h3>
                  <span className={styles.cardEvent}>{lecture.event}</span>
                </div>

                {/* resource buttons */}
                <div className={styles.cardResources}>
                  {lecture.resources.map((res, ri) => {
                    const isOpen = open?.lectureId === lecture.id && open?.resourceIndex === ri;
                    return (
                      <button
                        key={ri}
                        className={`${styles.resBtn} ${isOpen ? styles.resBtnActive : ''}`}
                        style={{ '--accent': KIND_COLOR[res.kind] } as React.CSSProperties}
                        onClick={() => toggle(lecture.id, ri)}
                      >
                        {KIND_LABEL[res.kind]}
                        <span className={styles.resBtnArrow}>{isOpen ? '▲' : '▼'}</span>
                      </button>
                    );
                  })}
                </div>

                {/* inline iframe — only renders when open */}
                {lecture.resources.map((res, ri) => {
                  const isOpen = open?.lectureId === lecture.id && open?.resourceIndex === ri;
                  if (!isOpen) return null;
                  return (
                    <div key={ri} className={styles.iframeWrap}>
                      <div className={styles.iframeBar}>
                        <span className={styles.iframeBarTitle}>{KIND_LABEL[res.kind]}</span>
                        <button className={styles.iframeClose} onClick={() => setOpen(null)}>✕</button>
                      </div>
                      <iframe
                        src={res.url}
                        allowFullScreen
                        loading="lazy"
                        className={styles.iframe}
                        title={lecture.title}
                      />
                    </div>
                  );
                })}

                {/* external links */}
                {lecture.links && (
                  <div className={styles.cardLinks}>
                    {lecture.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        {'⎋ '}{link.label}
                      </a>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
