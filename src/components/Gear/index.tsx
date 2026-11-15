import React from 'react';

type GearProps = {
  /** Unique id — used to namespace the SVG gradient/filter defs. */
  id: string;
  size?: number;
  teeth?: number;
  /** root radius as a fraction of the outer radius (0–1). */
  toothDepth?: number;
  spokes?: number;
  hole?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Builds a closed gear silhouette around a 100×100 viewBox.
 */
function gearPath(teeth: number, outer: number, root: number): string {
  const step = (Math.PI * 2) / teeth;
  const point = (angle: number, radius: number) =>
    `${(50 + Math.cos(angle) * radius).toFixed(2)},${(
      50 +
      Math.sin(angle) * radius
    ).toFixed(2)}`;

  const points: string[] = [];
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step - Math.PI / 2;
    points.push(point(a, root));
    points.push(point(a + step * 0.16, outer));
    points.push(point(a + step * 0.38, outer));
    points.push(point(a + step * 0.54, root));
  }
  return `M${points.join('L')}Z`;
}

export default function Gear({
  id,
  size = 120,
  teeth = 14,
  toothDepth = 0.82,
  spokes = 5,
  hole = 7,
  className,
  style,
}: GearProps) {
  const outer = 46;
  const root = outer * toothDepth;
  const bodyId = `${id}-body`;
  const glowId = `${id}-glow`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={bodyId} cx="34%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#f7e2ad" />
          <stop offset="38%" stopColor="#d8a63f" />
          <stop offset="72%" stopColor="#a5701f" />
          <stop offset="100%" stopColor="#54330c" />
        </radialGradient>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${glowId})`}>
        <path
          d={gearPath(teeth, outer, root)}
          fill={`url(#${bodyId})`}
          stroke="#3a2308"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* inner rim */}
        <circle
          cx="50"
          cy="50"
          r={root * 0.72}
          fill="none"
          stroke="#4a2d09"
          strokeWidth="1.4"
          opacity="0.85"
        />

        {/* spokes */}
        <g stroke="#4a2d09" strokeWidth="3" strokeLinecap="round" opacity="0.55">
          {Array.from({ length: spokes }).map((_, i) => {
            const angle = (360 / spokes) * i;
            return (
              <line
                key={i}
                x1="50"
                y1={50 - root * 0.22}
                x2="50"
                y2={50 - root * 0.66}
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
        </g>

        {/* hub */}
        <circle cx="50" cy="50" r={root * 0.3} fill="#8a5a1a" stroke="#3a2308" strokeWidth="1.2" />
        <circle cx="50" cy="50" r={hole} fill="#150d07" stroke="#c9962f" strokeWidth="1.4" />
        <circle cx="38" cy="38" r="2" fill="#ffe8b0" opacity="0.5" />
      </g>
    </svg>
  );
}
