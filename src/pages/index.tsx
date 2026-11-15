import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Gear from '@site/src/components/Gear';
import styles from './index.module.css';

/* ── SVG helpers ────────────────────────────────────────────── */

function JavaLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.85 14.65s-.9.52.64.7c1.87.21 2.82.18 4.88-.2 0 0 .54.34 1.3.63-4.62 1.98-10.45-.11-6.82-1.13zm-.56-2.56s-1.01.75.53.9c2 .21 3.57.22 6.3-.3 0 0 .38.38.97.59-5.58 1.63-11.8.13-7.8-1.19zm4.89-6.34c1.14 1.31-.3 2.49-.3 2.49s2.89-1.49 1.56-3.36C13.2 2.68 12.25 1.81 17.4.82c0 0-8.09 2.02-4.22 6.47z" fill="#f0a94a"/>
      <path d="M19.49 16.67s.67.55-.73.97c-2.67.8-11.1 1.05-13.44.03-.84-.36.74-.87 1.23-.97.52-.11.81-.09.81-.09-.93-.66-6.02 1.28-2.58 1.84 9.36 1.52 17.07-.69 14.71-1.78zm-10.3-7.5s-4.26 1.01-1.51 1.38c1.16.16 3.48.12 5.64-.06 1.77-.15 3.54-.47 3.54-.47s-.62.27-1.07.57c-4.32 1.14-12.67.61-10.27-.55 2.02-1 3.67-.87 3.67-.87zm7.67 4.29c4.4-2.28 2.36-4.48.94-4.19-.35.07-.5.14-.5.14s.13-.2.37-.28c2.77-1 4.9 2.87-1 4.39 0-.01.12-.1.19-.06zM14.19 0s2.43 2.44-2.31 6.19c-3.8 3-1.87 5.12-.01 7.25-2.41-2.18-4.18-4.1-2.99-5.9C10.6 5.23 15.35 3.99 14.19 0zm-4.89 21.95c4.22.27 10.7-.15 10.86-2.15 0 0-.3.76-3.49 1.36-3.6.68-8.04.6-10.68.16 0 0 .54.45 3.31.63z" fill="#e8912b"/>
    </svg>
  );
}

function GoLogo() {
  return (
    <img
      src="https://go.dev/images/go-logo-white.svg"
      alt="Go"
      width="48"
      height="19"
      style={{ display: 'block', objectFit: 'contain', filter: 'sepia(1) saturate(3) hue-rotate(-12deg) brightness(0.95)' }}
    />
  );
}

function RustLogo() {
  return (
    <img
      src="https://rust-lang.org/static/images/rust-logo-blk.svg"
      alt="Rust"
      width="22"
      height="22"
      style={{ display: 'block', objectFit: 'contain', filter: 'invert(62%) sepia(56%) saturate(700%) hue-rotate(357deg) brightness(93%)' }}
    />
  );
}

function ApacheLogo() {
  return (
    <img
      src="https://www.apache.org/images/asflogo_horizontal_color.svg"
      alt="Apache Software Foundation"
      width="80"
      height="22"
      style={{ display: 'block', objectFit: 'contain', filter: 'sepia(0.45) saturate(1.35) brightness(0.98)' }}
    />
  );
}

/* ── Left panel: brass console with phosphor screen ─────────── */
function BrassConsole() {
  return (
    <svg viewBox="0 0 320 404" width="320" height="404" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brassFrame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3d792" />
          <stop offset="35%" stopColor="#c9962f" />
          <stop offset="70%" stopColor="#8a5a1a" />
          <stop offset="100%" stopColor="#d9ab4d" />
        </linearGradient>
        <linearGradient id="brassDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a0e" />
          <stop offset="100%" stopColor="#170e07" />
        </linearGradient>
        <linearGradient id="screenBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07160e" />
          <stop offset="100%" stopColor="#04100a" />
        </linearGradient>
        <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="1" fill="rgba(140,255,190,0.05)" />
        </pattern>
        <filter id="greenGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="screenClip">
          <rect x="18" y="52" width="284" height="288" rx="8" />
        </clipPath>
      </defs>

      {/* wood body */}
      <rect x="1" y="1" width="318" height="402" rx="20" fill="url(#brassDark)" stroke="url(#brassFrame)" strokeWidth="2.5" />
      <rect x="9" y="9" width="302" height="386" rx="15" fill="none" stroke="rgba(201,150,47,0.35)" strokeWidth="1" />

      {/* corner rivets */}
      {[
        [20, 20], [300, 20], [20, 384], [300, 384],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="5.5" fill="#7c4f12" stroke="#f0cd7a" strokeWidth="1.2" />
          <circle cx={cx - 1.2} cy={cy - 1.4} r="1.6" fill="#ffe6ad" opacity="0.65" />
        </g>
      ))}

      {/* title plate */}
      <rect x="30" y="16" width="260" height="24" rx="6" fill="rgba(201,150,47,0.12)" stroke="rgba(201,150,47,0.5)" strokeWidth="1" />
      <text x="160" y="32" textAnchor="middle" fontFamily="'Cinzel', serif" fontSize="10.5" letterSpacing="2.4" fill="#e9c97f">
        BRASS CONSOLE · MG-01
      </text>

      {/* screen */}
      <rect x="18" y="52" width="284" height="288" rx="8" fill="url(#screenBg)" stroke="rgba(126,255,184,0.42)" strokeWidth="1.5" filter="url(#greenGlow)" />
      <g clipPath="url(#screenClip)">
        <rect x="18" y="52" width="284" height="288" fill="url(#scanlines)" />
        <rect x="18" y="52" width="284" height="288" fill="url(#screenBg)" opacity="0.5" />
      </g>

      {/* prompt */}
      <text x="30" y="76" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#57e58a">❯</text>
      <text x="42" y="76" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#8fe6b0">daniel@gearworks</text>
      <text x="152" y="76" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#4fae7a">:~$</text>
      <text x="182" y="76" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#d6ffe6">cat stack.rs</text>

      {/* code */}
      {[
        [30, 96, '#6fd3f7', 'use'],
        [50, 96, '#a8f5c8', ' std::collections::HashMap;'],
        [30, 114, '#6fd3f7', 'fn'],
        [44, 114, '#ffe08a', ' main'],
        [84, 114, '#d6ffe6', '() {'],
        [38, 132, '#6fd3f7', '  let mut'],
        [98, 132, '#a8f5c8', ' stack'],
        [132, 132, '#d6ffe6', ' = vec!['],
        [48, 150, '#f2c98a', '    "Java"'],
        [106, 150, '#d6ffe6', ', '],
        [118, 150, '#f2c98a', '"Go"'],
        [142, 150, '#d6ffe6', ', '],
        [154, 150, '#f2c98a', '"Rust"'],
        [188, 150, '#d6ffe6', '];'],
        [38, 168, '#c79bf0', '  for'],
        [62, 168, '#a8f5c8', ' lang'],
        [92, 168, '#c79bf0', ' in'],
        [106, 168, '#d6ffe6', ' &stack {'],
        [48, 186, '#ffe08a', '    println!'],
        [114, 186, '#d6ffe6', '('],
        [120, 186, '#f2c98a', '"{}"'],
        [146, 186, '#d6ffe6', ', lang);'],
        [38, 204, '#d6ffe6', '  }'],
        [30, 222, '#d6ffe6', '}'],
      ].map(([x, y, fill, text], i) => (
        <text key={i} x={x} y={y} fontFamily="'Fira Code',monospace" fontSize="9.4" fill={fill as string}>
          {text as string}
        </text>
      ))}

      <line x1="26" y1="238" x2="294" y2="238" stroke="rgba(126,255,184,0.22)" strokeWidth="1" />
      <text x="30" y="256" fontFamily="'Fira Code',monospace" fontSize="8.2" fill="rgba(126,255,184,0.62)">
        // telemetry · gearbox pressure
      </text>

      {/* bar chart */}
      {[
        [30, 268, 11, 30, '#d8a63f', 0.85], [45, 276, 11, 22, '#d8a63f', 0.62],
        [60, 264, 11, 34, '#d8a63f', 0.95], [75, 272, 11, 26, '#e8912b', 0.72],
        [90, 266, 11, 32, '#e8912b', 0.88], [105, 274, 11, 24, '#57e58a', 0.7],
        [120, 260, 11, 38, '#57e58a', 0.9], [135, 278, 11, 20, '#57e58a', 0.6],
      ].map(([x, y, w, h, fill, op], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={fill as string} opacity={op as number} />
      ))}

      {/* spark line */}
      <polyline points="166,304 184,284 202,292 220,274 238,280 256,266 274,272 292,258"
        stroke="#8bffbe" strokeWidth="1.8" fill="none" />
      <polyline points="166,304 184,284 202,292 220,274 238,280 256,266 274,272 292,258"
        stroke="rgba(139,255,190,0.18)" strokeWidth="7" fill="none" />

      {/* bottom readout */}
      <rect x="18" y="350" width="284" height="38" rx="8" fill="rgba(201,150,47,0.1)" stroke="rgba(201,150,47,0.45)" strokeWidth="1" />
      <text x="32" y="368" fontFamily="'Fira Code',monospace" fontSize="8.4" fill="#d8b56a">PWR</text>
      <text x="32" y="380" fontFamily="'Fira Code',monospace" fontSize="8.4" fill="#8d6a2c">TMP</text>
      <text x="70" y="380" fontFamily="'Fira Code',monospace" fontSize="8.4" fill="#e0c07a">68°C</text>
      <rect x="120" y="360" width="96" height="6" rx="3" fill="rgba(0,0,0,0.55)" stroke="rgba(201,150,47,0.4)" />
      <rect x="122" y="362" width="66" height="2" rx="1" fill="#e8912b" />
      <text x="232" y="368" fontFamily="'Fira Code',monospace" fontSize="8.4" fill="#8d6a2c">OIL</text>
      <text x="232" y="380" fontFamily="'Fira Code',monospace" fontSize="8.4" fill="#e0c07a">96%</text>
    </svg>
  );
}

/* ── Right panel: clockwork mechanism ─────────────────────── */
function Clockwork() {
  return (
    <div className={styles.clockwork}>
      <div className={styles.clockPlate} />
      <Gear id="cw-big" size={214} teeth={20} spokes={6} hole={10} className={styles.spinSlow} />
      <Gear
        id="cw-mid"
        size={112}
        teeth={14}
        spokes={5}
        className={`${styles.gearOrbit} ${styles.spinRev}`}
        style={{ top: '-16px', left: '-18px' }}
      />
      <Gear
        id="cw-small"
        size={88}
        teeth={12}
        spokes={4}
        className={`${styles.gearOrbit} ${styles.spinSlowRev}`}
        style={{ top: '4px', right: '-14px' }}
      />
      <Gear
        id="cw-tiny"
        size={66}
        teeth={10}
        spokes={4}
        hole={5}
        className={`${styles.gearOrbit} ${styles.spin}`}
        style={{ bottom: '-8px', left: '34px' }}
      />
      <span className={styles.mechCaption}>clockwork</span>
      <span className={styles.mechCaptionSub}>// distributed systems</span>
    </div>
  );
}

/* ── Main page component ───────────────────────────────────── */
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <section className={styles.hero}>
        <div className={styles.bgGradient} />
        <div className={styles.vignette} />

        {/* Grand gear cluster behind the title */}
        <div className={styles.gearField} aria-hidden="true">
          <Gear
            id="hero-main"
            size={430}
            teeth={26}
            spokes={8}
            hole={16}
            className={`${styles.gearHero} ${styles.spinSlow}`}
          />
          <Gear
            id="hero-left"
            size={210}
            teeth={16}
            spokes={6}
            className={`${styles.gearLeft} ${styles.spinRev}`}
          />
          <Gear
            id="hero-right"
            size={186}
            teeth={15}
            spokes={5}
            className={`${styles.gearRight} ${styles.spinSlowRev}`}
          />
          <Gear
            id="hero-low"
            size={96}
            teeth={12}
            spokes={4}
            className={`${styles.gearLow} ${styles.spin}`}
          />
        </div>

        {/* Embers / steam motes */}
        <div className={styles.embers} aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={styles.ember} />
          ))}
        </div>

        {/* Left brass console */}
        <div className={styles.panelLeft}>
          <BrassConsole />
        </div>

        {/* Right clockwork */}
        <div className={styles.panelRight}>
          <Clockwork />
        </div>

        {/* Center content */}
        <div className={styles.heroContent}>
          <span className={styles.roleBadge}>Software Engineer</span>
          <h1 className={styles.heroTitle}>Daniel Dias</h1>
          <p className={styles.heroSub}>Java · Go · Rust · Distributed Systems · Open Source</p>

          <div className={styles.techBadges}>
            <a href="https://www.java.com" target="_blank" rel="noopener noreferrer"
              className={`${styles.techBadge} ${styles.javaBadge}`}>
              <JavaLogo /><span className={`${styles.techLabel} ${styles.javaLabel}`}>Java</span>
            </a>
            <a href="https://go.dev" target="_blank" rel="noopener noreferrer"
              className={`${styles.techBadge} ${styles.goBadge}`}>
              <GoLogo /><span className={`${styles.techLabel} ${styles.goLabel}`}>Golang</span>
            </a>
            <a href="https://www.rust-lang.org" target="_blank" rel="noopener noreferrer"
              className={`${styles.techBadge} ${styles.rustBadge}`}>
              <RustLogo /><span className={`${styles.techLabel} ${styles.rustLabel}`}>Rust</span>
            </a>
            <a href="https://www.apache.org" target="_blank" rel="noopener noreferrer"
              className={`${styles.techBadge} ${styles.apacheBadge}`}>
              <ApacheLogo />
            </a>
          </div>

          <div className={styles.btns}>
            <Link to="/blog" className={styles.btnPrimary}>📖 Read the Blog</Link>
            <Link to="/docs/about-me" className={styles.btnSecondary}>About Me</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <HomepageFeatures />
    </Layout>
  );
}
