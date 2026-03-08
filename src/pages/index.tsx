import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

/* ── SVG helpers ────────────────────────────────────────────── */

function JavaLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.85 14.65s-.9.52.64.7c1.87.21 2.82.18 4.88-.2 0 0 .54.34 1.3.63-4.62 1.98-10.45-.11-6.82-1.13zm-.56-2.56s-1.01.75.53.9c2 .21 3.57.22 6.3-.3 0 0 .38.38.97.59-5.58 1.63-11.8.13-7.8-1.19zm4.89-6.34c1.14 1.31-.3 2.49-.3 2.49s2.89-1.49 1.56-3.36C13.2 2.68 12.25 1.81 17.4.82c0 0-8.09 2.02-4.22 6.47z" fill="#f89820"/>
      <path d="M19.49 16.67s.67.55-.73.97c-2.67.8-11.1 1.05-13.44.03-.84-.36.74-.87 1.23-.97.52-.11.81-.09.81-.09-.93-.66-6.02 1.28-2.58 1.84 9.36 1.52 17.07-.69 14.71-1.78zm-10.3-7.5s-4.26 1.01-1.51 1.38c1.16.16 3.48.12 5.64-.06 1.77-.15 3.54-.47 3.54-.47s-.62.27-1.07.57c-4.32 1.14-12.67.61-10.27-.55 2.02-1 3.67-.87 3.67-.87zm7.67 4.29c4.4-2.28 2.36-4.48.94-4.19-.35.07-.5.14-.5.14s.13-.2.37-.28c2.77-1 4.9 2.87-1 4.39 0-.01.12-.1.19-.06zM14.19 0s2.43 2.44-2.31 6.19c-3.8 3-1.87 5.12-.01 7.25-2.41-2.18-4.18-4.1-2.99-5.9C10.6 5.23 15.35 3.99 14.19 0zm-4.89 21.95c4.22.27 10.7-.15 10.86-2.15 0 0-.3.76-3.49 1.36-3.6.68-8.04.6-10.68.16 0 0 .54.45 3.31.63z" fill="#f89820"/>
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
      style={{ display: 'block', objectFit: 'contain' }}
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
      style={{ display: 'block', objectFit: 'contain', filter: 'invert(38%) sepia(90%) saturate(600%) hue-rotate(340deg) brightness(90%)' }}
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
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

/* ── Left panel SVG (terminal) ─────────────────────────────── */
function TerminalPanel() {
  return (
    <svg viewBox="0 0 310 400" width="310" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="panelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(4,12,28,0.96)"/>
          <stop offset="100%" stopColor="rgba(2,8,18,0.96)"/>
        </linearGradient>
        <linearGradient id="panelBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="rgba(0,172,215,0.8)"/>
          <stop offset="50%"  stopColor="rgba(0,80,140,0.4)"/>
          <stop offset="100%" stopColor="rgba(0,172,215,0.8)"/>
        </linearGradient>
        <clipPath id="panelClip"><rect x="2" y="2" width="306" height="396" rx="12"/></clipPath>
        <filter id="glowBlue">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* frame */}
      <rect x="0.5" y="0.5" width="309" height="399" rx="13"
            fill="url(#panelBg)" stroke="url(#panelBorder)" strokeWidth="1.5"/>
      {/* scanline */}
      <rect x="2" y="2" width="306" height="3" rx="1"
            fill="rgba(0,172,215,0.05)" clipPath="url(#panelClip)"
            style={{animation:'scan 5s linear infinite'}}/>
      {/* titlebar */}
      <rect x="2" y="2" width="306" height="28" rx="11" fill="rgba(0,30,55,0.95)"/>
      <circle cx="18" cy="16" r="5" fill="#ff5f56"/>
      <circle cx="34" cy="16" r="5" fill="#ffbd2e"/>
      <circle cx="50" cy="16" r="5" fill="#27c93f"/>
      <text x="98" y="20" fontFamily="'Fira Code',monospace" fontSize="9" fill="rgba(0,172,215,0.75)">~/daniel/projects</text>

      {/* corner accents */}
      {[
        [292,2,16,2],[306,2,2,16],
        [292,396,16,2],[306,382,2,16],
        [2,396,16,2],[2,382,2,16],
        [2,2,16,2],[2,2,2,16],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(0,172,215,0.6)" rx="1"/>
      ))}

      {/* prompt */}
      <text x="14" y="50" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#27c93f">❯</text>
      <text x="26" y="50" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#8ab4cc">daniel</text>
      <text x="70" y="50" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#569cd6">@</text>
      <text x="80" y="50" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#4ec9b0">dev</text>
      <text x="108" y="50" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#f0f8ff"> $ cat stack.rs</text>

      {/* Rust code block */}
      {[
        [14,68, '#569cd6','use'],
        [34,68, '#4ec9b0',' std::collections::HashMap;'],
        [14,84, '#569cd6','fn'],
        [28,84, '#dcdcaa',' main'],
        [68,84, '#f0f8ff','() {'],
        [22,100,'#569cd6','  let mut'],
        [82,100,'#9cdcfe',' stack'],
        [116,100,'#f0f8ff',' = vec!['],
        [32,116,'#ce9178','    "Java"'],
        [90,116,'#f0f8ff',', '],
        [102,116,'#ce9178','"Go"'],
        [126,116,'#f0f8ff',', '],
        [138,116,'#ce9178','"Rust"'],
        [172,116,'#f0f8ff','];'],
        [22,132,'#c586c0','  for'],
        [46,132,'#9cdcfe',' lang'],
        [76,132,'#c586c0',' in'],
        [90,132,'#f0f8ff',' &stack {'],
        [32,148,'#dcdcaa','    println!'],
        [98,148,'#f0f8ff','('],
        [104,148,'#ce9178','"{}"'],
        [130,148,'#f0f8ff',', lang);'],
        [22,164,'#f0f8ff','  }'],
        [14,180,'#f0f8ff','}'],
      ].map(([x,y,fill,text],i) => (
        <text key={i} x={x} y={y} fontFamily="'Fira Code',monospace" fontSize="9" fill={fill as string}>{text as string}</text>
      ))}

      <line x1="10" y1="190" x2="300" y2="190" stroke="rgba(0,172,215,0.18)" strokeWidth="1"/>
      <text x="14" y="205" fontFamily="'Fira Code',monospace" fontSize="8" fill="rgba(0,172,215,0.65)">// observability metrics</text>

      {/* bar chart */}
      {[
        [14,212,11,32,'#00acd7',.7],[29,220,11,24,'#00acd7',.55],[44,208,11,36,'#00acd7',.8],
        [59,216,11,28,'#00acd7',.65],[74,210,11,34,'#f89820',.75],[89,218,11,26,'#f89820',.6],
        [104,206,11,38,'#27c93f',.7],[119,222,11,22,'#27c93f',.55],
      ].map(([x,y,w,h,fill,op],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill={fill as string} opacity={op as number}/>
      ))}

      {/* line chart */}
      <polyline points="146,240 162,222 178,230 194,212 210,218 226,204 242,210 258,196"
                stroke="#64d8f8" strokeWidth="2" fill="none"/>
      <circle cx="258" cy="196" r="3.5" fill="#64d8f8" filter="url(#glowBlue)"/>
      <polyline points="146,240 162,222 178,230 194,212 210,218 226,204 242,210 258,196"
                stroke="rgba(100,216,248,0.18)" strokeWidth="7" fill="none"/>

      {/* cursor */}
      <text x="14" y="376" fontFamily="'Fira Code',monospace" fontSize="9.5" fill="#27c93f">❯</text>
      <rect x="26" y="364" width="8" height="13" fill="rgba(240,248,255,0.8)"
            style={{animation:'blink 1s infinite'}}/>
    </svg>
  );
}

/* ── Right panel SVG (network graph) ───────────────────────── */
function NetworkGraph() {
  const dashAnim = (dur: string) => ({
    attributeName: 'stroke-dashoffset',
    values: '28;0',
    dur,
    repeatCount: 'indefinite',
  });
  return (
    <svg viewBox="0 0 270 400" width="270" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="nGlow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="nGlowSm">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* connection lines */}
      <g fill="none">
        <line x1="135" y1="52"  x2="52"  y2="148" stroke="rgba(0,172,215,0.35)"  strokeWidth="1.5" strokeDasharray="7 4"><animate {...dashAnim('2s')}/></line>
        <line x1="135" y1="52"  x2="218" y2="148" stroke="rgba(206,65,43,0.35)"  strokeWidth="1.5" strokeDasharray="7 4"><animate {...dashAnim('2.6s')}/></line>
        <line x1="52"  y1="148" x2="135" y2="248" stroke="rgba(0,172,215,0.28)"  strokeWidth="1.5" strokeDasharray="7 4"><animate {...dashAnim('1.9s')}/></line>
        <line x1="218" y1="148" x2="135" y2="248" stroke="rgba(206,65,43,0.28)"  strokeWidth="1.5" strokeDasharray="7 4"><animate {...dashAnim('3.1s')}/></line>
        <line x1="52"  y1="148" x2="26"  y2="248" stroke="rgba(210,57,30,0.25)"  strokeWidth="1"   strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" values="20;0" dur="2.2s" repeatCount="indefinite"/></line>
        <line x1="218" y1="148" x2="244" y2="248" stroke="rgba(210,57,30,0.25)"  strokeWidth="1"   strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" values="20;0" dur="2.8s" repeatCount="indefinite"/></line>
        <line x1="135" y1="248" x2="26"  y2="248" stroke="rgba(210,57,30,0.2)"   strokeWidth="1"   strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" values="20;0" dur="3.4s" repeatCount="indefinite"/></line>
        <line x1="135" y1="248" x2="244" y2="248" stroke="rgba(210,57,30,0.2)"   strokeWidth="1"   strokeDasharray="5 4"><animate attributeName="stroke-dashoffset" values="20;0" dur="2.5s" repeatCount="indefinite"/></line>
        <line x1="135" y1="52"  x2="135" y2="248" stroke="rgba(142,207,112,0.12)" strokeWidth="1"  strokeDasharray="5 5"><animate attributeName="stroke-dashoffset" values="30;0" dur="4s" repeatCount="indefinite"/></line>
      </g>

      {/* data packets */}
      <circle r="3.5" fill="#00acd7" opacity=".9"><animateMotion dur="2s"   repeatCount="indefinite"><mpath href="#p1"/></animateMotion></circle>
      <path id="p1" d="M135,52 L52,148" fill="none"/>
      <circle r="3.5" fill="#ce412b" opacity=".9"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href="#p2"/></animateMotion></circle>
      <path id="p2" d="M135,52 L218,148" fill="none"/>
      <circle r="3"   fill="#8ecf70" opacity=".85"><animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#p3"/></animateMotion></circle>
      <path id="p3" d="M52,148 L135,248" fill="none"/>
      <circle r="2.5" fill="#d2391e" opacity=".8"><animateMotion dur="3.5s" repeatCount="indefinite"><mpath href="#p4"/></animateMotion></circle>
      <path id="p4" d="M218,148 L135,248" fill="none"/>

      {/* halos */}
      <circle cx="135" cy="52"  r="36" fill="rgba(248,152,32,0.05)"  stroke="rgba(248,152,32,0.12)"  strokeWidth="1"/>
      <circle cx="52"  cy="148" r="30" fill="rgba(0,172,215,0.05)"   stroke="rgba(0,172,215,0.12)"   strokeWidth="1"/>
      <circle cx="218" cy="148" r="30" fill="rgba(206,65,43,0.05)"   stroke="rgba(206,65,43,0.12)"   strokeWidth="1"/>
      <circle cx="135" cy="248" r="32" fill="rgba(142,207,112,0.05)" stroke="rgba(142,207,112,0.12)" strokeWidth="1"/>

      {/* JAVA node */}
      <circle cx="135" cy="52" r="28" fill="rgba(6,10,22,0.92)" stroke="#f89820" strokeWidth="2" filter="url(#nGlow)"/>
      <path d="M127,40 Q129,34 135,34 Q141,34 143,40 L142,50 Q135,53 128,50 Z" fill="none" stroke="#f89820" strokeWidth="1.8"/>
      <path d="M143,42 Q148,42 148,45 Q148,48 143,48" fill="none" stroke="#f89820" strokeWidth="1.8"/>
      <line x1="128" y1="52" x2="142" y2="52" stroke="#f89820" strokeWidth="1.8"/>
      <circle cx="135" cy="52" r="5" fill="#f89820"><animate attributeName="r" values="4;6.5;4" dur="2s" repeatCount="indefinite"/></circle>
      {/* <text x="122" y="72" fontFamily="'Nunito',sans-serif" fontSize="7.5" fontWeight="800" fill="#f89820">JAVA</text> */}

      {/* GO node */}
      <circle cx="52" cy="148" r="24" fill="rgba(6,10,22,0.92)" stroke="#00acd7" strokeWidth="2" filter="url(#nGlow)"/>
      <path d="M39,141 A13,13 0 1,1 39,155 L39,150 L46,150" fill="none" stroke="#00acd7" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="63" cy="148" r="8.5" fill="none" stroke="#00acd7" strokeWidth="3.2"/>
      <circle cx="52" cy="148" r="4.5" fill="#00acd7"><animate attributeName="r" values="3.5;5.5;3.5" dur="2.4s" repeatCount="indefinite"/></circle>
      {/* <text x="37" y="166" fontFamily="'Nunito',sans-serif" fontSize="7.5" fontWeight="800" fill="#00acd7">GOLANG</text> */}

      {/* RUST node */}
      <circle cx="218" cy="148" r="24" fill="rgba(6,10,22,0.92)" stroke="#ce412b" strokeWidth="2" filter="url(#nGlow)"/>
      <circle cx="218" cy="148" r="14" fill="none" stroke="#ce412b" strokeWidth="2.5"/>
      <g fill="#ce412b">
        <rect x="216" y="130" width="4" height="5" rx="1"/><rect x="216" y="161" width="4" height="5" rx="1"/>
        <rect x="199" y="146" width="5" height="4" rx="1"/><rect x="230" y="146" width="5" height="4" rx="1"/>
        <rect x="226.5" y="133.5" width="4" height="5" rx="1" transform="rotate(45 228.5 136)"/>
        <rect x="205.5" y="156.5" width="4" height="5" rx="1" transform="rotate(45 207.5 159)"/>
        <rect x="205.5" y="133.5" width="4" height="5" rx="1" transform="rotate(-45 207.5 136)"/>
        <rect x="226.5" y="156.5" width="4" height="5" rx="1" transform="rotate(-45 228.5 159)"/>
      </g>
      <circle cx="218" cy="148" r="7" fill="none" stroke="#ce412b" strokeWidth="2"/>
      <g stroke="#ce412b" strokeWidth="2" strokeLinecap="round">
        <line x1="218" y1="136" x2="218" y2="141"/><line x1="218" y1="155" x2="218" y2="160"/>
        <line x1="206" y1="148" x2="211" y2="148"/><line x1="225" y1="148" x2="230" y2="148"/>
      </g>
      <circle cx="218" cy="148" r="3.5" fill="#ce412b"/>
      <circle cx="218" cy="148" r="4.5" fill="#ce412b" opacity="0"><animate attributeName="r" values="3.5;5.5;3.5" dur="2.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;1;.8" dur="2.8s" repeatCount="indefinite"/></circle>
      {/* <text x="203" y="166" fontFamily="'Nunito',sans-serif" fontSize="7.5" fontWeight="800" fill="#ce412b">RUST</text> */}

      {/* OSS node */}
      <circle cx="135" cy="248" r="26" fill="rgba(6,10,22,0.92)" stroke="#8ecf70" strokeWidth="2" filter="url(#nGlow)"/>
      <path d="M135,234 A14,14 0 1,1 122,242" fill="none" stroke="#8ecf70" strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="121,236 116,246 127,244" fill="#8ecf70"/>
      <circle cx="135" cy="248" r="4.5" fill="#8ecf70"><animate attributeName="r" values="3.5;6;3.5" dur="3s" repeatCount="indefinite"/></circle>
      {/* <text x="116" y="268" fontFamily="'Nunito',sans-serif" fontSize="7" fontWeight="800" fill="#8ecf70">OPEN SOURCE</text> */}

      {/* Apache satellite nodes */}
      <circle cx="26"  cy="248" r="15" fill="rgba(6,10,22,0.9)" stroke="rgba(210,57,30,0.65)" strokeWidth="1.5" filter="url(#nGlowSm)"/>
      <path d="M20,243 Q21,237 26,232 Q28,235 26,239 Q28,237 31,236 Q29,240 26,242 Q28,243 27,248 Q24,245 22,242 Q20,244 20,243Z" fill="#d2391e" opacity=".9"/>
      {/* <text x="11" y="262" fontFamily="'Nunito',sans-serif" fontSize="7" fontWeight="800" fill="rgba(210,57,30,0.9)">Apache</text> */}

      <circle cx="244" cy="248" r="15" fill="rgba(6,10,22,0.9)" stroke="rgba(210,57,30,0.65)" strokeWidth="1.5" filter="url(#nGlowSm)"/>
      <path d="M238,243 Q239,237 244,232 Q246,235 244,239 Q246,237 249,236 Q247,240 244,242 Q246,243 245,248 Q242,245 240,242 Q238,244 238,243Z" fill="#d2391e" opacity=".9"/>
      {/* <text x="229" y="262" fontFamily="'Nunito',sans-serif" fontSize="7" fontWeight="800" fill="rgba(210,57,30,0.9)">Apache</text> */}

      {/* particles */}
      <circle cx="94"  cy="100" r="2"  fill="rgba(0,172,215,0.6)"><animate attributeName="cy" values="100;93;100" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="176" cy="100" r="1.5" fill="rgba(206,65,43,0.6)"><animate attributeName="cy" values="100;94;100" dur="2.5s" repeatCount="indefinite"/></circle>
      <circle cx="80"  cy="200" r="2"  fill="rgba(0,172,215,0.5)"><animate attributeName="cy" values="200;193;200" dur="1.8s" repeatCount="indefinite"/></circle>
      <circle cx="190" cy="195" r="1.5" fill="rgba(142,207,112,0.5)"><animate attributeName="cy" values="195;189;195" dur="2.6s" repeatCount="indefinite"/></circle>

      <text x="60" y="330" fontFamily="'Fira Code',monospace" fontSize="8" fill="rgba(0,172,215,0.35)">// distributed systems</text>
      <text x="72" y="345" fontFamily="'Fira Code',monospace" fontSize="8" fill="rgba(0,172,215,0.25)">// open source ❤</text>
    </svg>
  );
}

/* ── Perspective grid ──────────────────────────────────────── */
function PerspectiveGrid() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(0,172,215,0.3)"/>
          <stop offset="100%" stopColor="rgba(0,172,215,0.01)"/>
        </linearGradient>
        <linearGradient id="gfh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,172,215,0)"/>
          <stop offset="50%"  stopColor="rgba(0,172,215,0.25)"/>
          <stop offset="100%" stopColor="rgba(0,172,215,0)"/>
        </linearGradient>
        <filter id="hg"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <g stroke="url(#gf)" strokeWidth="0.8" opacity="0.55">
        {[0,144,288,432,576,720,864,1008,1152,1296,1440].map((x,i) => (
          <line key={i} x1="720" y1="155" x2={x} y2="400"/>
        ))}
      </g>
      <g fill="none">
        {[
          [0,400,1440,400,1.2],[80,350,1360,350,1],[190,300,1250,300,.9],
          [300,258,1140,258,.8],[390,224,1050,224,.7],[518,180,922,180,.6],
          [565,168,875,168,.5],
        ].map(([x1,y1,x2,y2,op],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#gfh)" strokeWidth={op as number}/>
        ))}
        <line x1="460" y1="198" x2="980" y2="198" stroke="rgba(0,172,215,0.5)" strokeWidth="1.4"/>
      </g>
      <g fill="#00acd7">
        <circle cx="480" cy="198" r="2.5" opacity=".6"/>
        <circle cx="576" cy="198" r="2"   opacity=".5"/>
        <circle cx="720" cy="198" r="3"   opacity=".7"/>
        <circle cx="864" cy="198" r="2"   opacity=".5"/>
        <circle cx="960" cy="198" r="2.5" opacity=".6"/>
      </g>
      <line x1="420" y1="198" x2="1020" y2="198" stroke="#00acd7" strokeWidth="2" opacity="0.7" filter="url(#hg)"/>
    </svg>
  );
}

/* ── Circuit traces ────────────────────────────────────────── */
function CircuitTraces() {
  return (
    <svg style={{position:'absolute',inset:0,zIndex:2,pointerEvents:'none',width:'100%',height:'100%'}}
         viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
      <g stroke="rgba(0,172,215,0.055)" strokeWidth="1" fill="none">
        <polyline points="0,110 180,110 180,165 460,165 460,110 760,110"/>
        <polyline points="880,75 1080,75 1080,130 1260,130 1260,75 1440,75"/>
        <polyline points="0,710 140,710 140,660 320,660 320,710 580,710"/>
        <polyline points="780,770 960,770 960,715 1180,715 1180,770 1440,770"/>
      </g>
      <g fill="rgba(0,172,215,0.07)">
        <circle cx="180" cy="110" r="3.5"/><circle cx="460" cy="165" r="3.5"/>
        <circle cx="1080" cy="130" r="3.5"/><circle cx="320" cy="660" r="3.5"/>
      </g>
      <text x="55"  y="490" fontFamily="'Fira Code'" fontSize="10" fill="rgba(0,172,215,0.04)">
        01001010 01100001 01110110 01100001 00100000 01000111 01101111 00100000 01010010 01110101 01110011 01110100
      </text>
      <text x="820" y="290" fontFamily="'Fira Code'" fontSize="10" fill="rgba(206,65,43,0.04)">
        {'fn main() { println!("Hello, World!"); }'}
      </text>
    </svg>
  );
}

/* ── Main page component ───────────────────────────────────── */
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.bgGradient}/>

        {/* Grid */}
        <div className={styles.gridWrap}><PerspectiveGrid/></div>

        {/* Circuit */}
        <CircuitTraces/>

        {/* Left panel */}
        <div className={styles.panelLeft}><TerminalPanel/></div>

        {/* Right panel */}
        <div className={styles.panelRight}><NetworkGraph/></div>

        {/* Floating ecosystem icons — spread around the scene */}
        {/* Docker — bottom left area */}
        <div className={styles.floatIcon} style={{bottom:'12%', left:'30%', animationDuration:'3s'}}>
          <svg viewBox="0 0 70 60" width="70" height="60" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="12" width="52" height="32" rx="5" fill="none" stroke="#2496ed" strokeWidth="2"/>
            <rect x="5"  y="17" width="9" height="9" rx="2" fill="#2496ed" opacity={.85}/>
            <rect x="18" y="17" width="9" height="9" rx="2" fill="#2496ed" opacity={.85}/>
            <rect x="31" y="17" width="9" height="9" rx="2" fill="#2496ed" opacity={.85}/>
            <rect x="5"  y="5"  width="9" height="9" rx="2" fill="#2496ed" opacity={.5}/>
            <rect x="18" y="5"  width="9" height="9" rx="2" fill="#2496ed" opacity={.5}/>
            <path d="M52 26 Q62 22 60 32 Q58 37 52 36" fill="#2496ed" opacity={.5}/>
            <text x="0" y="57" fontFamily="'Nunito',sans-serif" fontSize="11" fontWeight="800" fill="#2496ed">Docker</text>
          </svg>
        </div>

        {/* Golang */}
        <div className={styles.floatIcon} style={{bottom:'10%', left:'25%', animationDuration:'3.8s', animationDelay:'0.4s'}}>
           <img
              src="https://go.dev/images/go-logo-white.svg"
              alt="Go"
              width="48"
              height="19"
              style={{ display: 'block', objectFit: 'contain' }}
            />
        </div>

          {/* Rust */}
         <div className={styles.floatIcon} style={{top:'8%', right:'25%', animationDuration:'3.8s', animationDelay:'0.4s'}}>
            <img
      src="https://rust-lang.org/static/images/rust-logo-blk.svg"
      alt="Rust"
      width="50"
      height="50"
      style={{ display: 'block', objectFit: 'contain', filter: 'invert(38%) sepia(90%) saturate(600%) hue-rotate(340deg) brightness(90%)' }}
    />

      {/* Java */}
        </div>

           <div className={styles.floatIcon} style={{bottom:'10%', left:'50%', animationDuration:'3.8s', animationDelay:'0.4s'}}>
            <svg viewBox="0 0 24 24" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.85 14.65s-.9.52.64.7c1.87.21 2.82.18 4.88-.2 0 0 .54.34 1.3.63-4.62 1.98-10.45-.11-6.82-1.13zm-.56-2.56s-1.01.75.53.9c2 .21 3.57.22 6.3-.3 0 0 .38.38.97.59-5.58 1.63-11.8.13-7.8-1.19zm4.89-6.34c1.14 1.31-.3 2.49-.3 2.49s2.89-1.49 1.56-3.36C13.2 2.68 12.25 1.81 17.4.82c0 0-8.09 2.02-4.22 6.47z" fill="#f89820"/>
      <path d="M19.49 16.67s.67.55-.73.97c-2.67.8-11.1 1.05-13.44.03-.84-.36.74-.87 1.23-.97.52-.11.81-.09.81-.09-.93-.66-6.02 1.28-2.58 1.84 9.36 1.52 17.07-.69 14.71-1.78zm-10.3-7.5s-4.26 1.01-1.51 1.38c1.16.16 3.48.12 5.64-.06 1.77-.15 3.54-.47 3.54-.47s-.62.27-1.07.57c-4.32 1.14-12.67.61-10.27-.55 2.02-1 3.67-.87 3.67-.87zm7.67 4.29c4.4-2.28 2.36-4.48.94-4.19-.35.07-.5.14-.5.14s.13-.2.37-.28c2.77-1 4.9 2.87-1 4.39 0-.01.12-.1.19-.06zM14.19 0s2.43 2.44-2.31 6.19c-3.8 3-1.87 5.12-.01 7.25-2.41-2.18-4.18-4.1-2.99-5.9C10.6 5.23 15.35 3.99 14.19 0zm-4.89 21.95c4.22.27 10.7-.15 10.86-2.15 0 0-.3.76-3.49 1.36-3.6.68-8.04.6-10.68.16 0 0 .54.45 3.31.63z" fill="#f89820"/>
    </svg>
        </div>

        {/* Apache Pulsar — top right area */}
        <div className={styles.floatIcon} style={{top:'8%', right:'30%', animationDuration:'3.5s', animationDelay:'0.5s'}}>
          <svg viewBox="0 0 70 60" width="70" height="60" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="22" r="20" fill="none" stroke="#188fff" strokeWidth="2.5"/>
            <circle cx="26" cy="22" r="12" fill="none" stroke="#188fff" strokeWidth="2"   opacity={.6}/>
            <circle cx="26" cy="22" r="5"  fill="#188fff" opacity={.85}/>
            <line x1="26" y1="2"  x2="26" y2="9"  stroke="#188fff" strokeWidth="2"/>
            <line x1="26" y1="35" x2="26" y2="42" stroke="#188fff" strokeWidth="2"/>
            <line x1="6"  y1="22" x2="13" y2="22" stroke="#188fff" strokeWidth="2"/>
            <line x1="39" y1="22" x2="46" y2="22" stroke="#188fff" strokeWidth="2"/>
            <text x="0" y="57" fontFamily="'Nunito',sans-serif" fontSize="11" fontWeight="800" fill="#188fff">Pulsar</text>
          </svg>
        </div>

        {/* Apache Foundation feather — top left, above terminal */}
        <div className={styles.floatIcon} style={{top:'6%', left:'30%', animationDuration:'4s', animationDelay:'1s'}}>
          <svg viewBox="0 0 80 65" width="80" height="65" xmlns="http://www.w3.org/2000/svg">
            <path d="M14,52 Q18,34 30,18 Q37,8 50,4
                     Q44,14 38,24
                     Q44,18 54,16
                     Q48,26 40,31
                     Q48,29 54,30
                     Q46,38 36,40
                     Q40,44 37,54
                     Q30,46 26,38
                     Q19,44 14,52 Z"
                  fill="#d2391e" opacity={.9}/>
            <line x1="14" y1="52" x2="37" y2="24" stroke="#a0200e" strokeWidth="1.5" opacity={.45}/>
            <text x="0" y="63" fontFamily="'Nunito',sans-serif" fontSize="11" fontWeight="800" fill="#d2391e">Apache</text>
          </svg>
        </div>

        {/* OSS — bottom right, above network graph */}
        <div className={styles.floatIcon} style={{bottom:'14%', right:'4%', animationDuration:'3.2s', animationDelay:'0.8s'}}>
          <svg viewBox="0 0 60 58" width="60" height="58" xmlns="http://www.w3.org/2000/svg">
            <path d="M28,46 Q8,34 8,18 A20,20 0 0,1 28,4 A20,20 0 0,1 48,18 Q48,34 28,46Z"
                  fill="none" stroke="#8ecf70" strokeWidth="2.5"/>
            <circle cx="28" cy="20" r="7" fill="rgba(142,207,112,0.2)" stroke="#8ecf70" strokeWidth="2"/>
            <circle cx="28" cy="20" r="3" fill="#8ecf70"/>
            <text x="5" y="57" fontFamily="'Nunito',sans-serif" fontSize="11" fontWeight="800" fill="#8ecf70">OSS</text>
          </svg>
        </div>

        {/* Butterfly */}
        {/* <div className={styles.butterfly}>
          <svg viewBox="0 0 64 52" width="58" height="47" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="19" cy="20" rx="17" ry="13" fill="#3aa8d8" opacity=".82" transform="rotate(-22 19 20)"/>
            <ellipse cx="15" cy="35" rx="13" ry="9"  fill="#1e88c0" opacity=".72" transform="rotate(18 15 35)"/>
            <ellipse cx="45" cy="20" rx="17" ry="13" fill="#3aa8d8" opacity=".82" transform="rotate(22 45 20)"/>
            <ellipse cx="49" cy="35" rx="13" ry="9"  fill="#1e88c0" opacity=".72" transform="rotate(-18 49 35)"/>
            <line x1="15" y1="22" x2="27" y2="17" stroke="rgba(0,220,255,0.5)" strokeWidth="0.9"/>
            <line x1="37" y1="22" x2="49" y2="17" stroke="rgba(0,220,255,0.5)" strokeWidth="0.9"/>
            <ellipse cx="32" cy="26" rx="3.5" ry="14" fill="#051828"/>
            <line x1="32" y1="12" x2="23" y2="2" stroke="#051828" strokeWidth="1.6"/>
            <line x1="32" y1="12" x2="41" y2="2" stroke="#051828" strokeWidth="1.6"/>
            <circle cx="23" cy="2" r="2.2" fill="#051828"/>
            <circle cx="41" cy="2" r="2.2" fill="#051828"/>
          </svg>
        </div> */}

        {/* Birds */}
        <svg className={styles.bird1} viewBox="0 0 72 26" width="72" height="26" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 13 Q10 4 20 13 Q30 4 40 13" stroke="rgba(80,180,220,0.35)" strokeWidth="2.2" fill="none"/>
          <path d="M45 9 Q52 2 59 9 Q66 2 73 9" stroke="rgba(80,180,220,0.28)" strokeWidth="1.8" fill="none"/>
        </svg>
        <svg className={styles.bird2} viewBox="0 0 55 20" width="55" height="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10 Q8 2 16 10 Q24 2 32 10" stroke="rgba(80,180,220,0.28)" strokeWidth="1.8" fill="none"/>
          <path d="M38 7 Q44 1 50 7 Q56 1 62 7" stroke="rgba(80,180,220,0.22)" strokeWidth="1.5" fill="none"/>
        </svg>

        {/* Center content */}
        <div className={styles.heroContent}>
          <span className={styles.roleBadge}>Software Engineer</span>
          <h1 className={styles.heroTitle}>Daniel Dias</h1>
          <p className={styles.heroSub}>Java · Go · Rust · Distributed Systems · Open Source</p>

          <div className={styles.techBadges}>
            <a href="https://www.java.com" target="_blank" rel="noopener noreferrer"
               className={`${styles.techBadge} ${styles.javaBadge}`}>
              <JavaLogo/><span className={`${styles.techLabel} ${styles.javaLabel}`}>Java</span>
            </a>
            <a href="https://go.dev" target="_blank" rel="noopener noreferrer"
               className={`${styles.techBadge} ${styles.goBadge}`}>
              <GoLogo/><span className={`${styles.techLabel} ${styles.goLabel}`}>Golang</span>
            </a>
            <a href="https://www.rust-lang.org" target="_blank" rel="noopener noreferrer"
               className={`${styles.techBadge} ${styles.rustBadge}`}>
              <RustLogo/><span className={`${styles.techLabel} ${styles.rustLabel}`}>Rust</span>
            </a>
            <a href="https://www.apache.org" target="_blank" rel="noopener noreferrer"
               className={`${styles.techBadge} ${styles.apacheBadge}`}>
              <ApacheLogo/>
            </a>
          </div>

          <div className={styles.btns}>
            <Link to="/blog" className={styles.btnPrimary}>📖 Read the Blog</Link>
            <Link to="/docs" className={styles.btnSecondary}>About Me</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <HomepageFeatures/>
    </Layout>
  );
}
