'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function HeroMapArc({ pointA, pointB }: { pointA: string; pointB: string }) {
  const reduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e7a4b" stopOpacity="0.2" />
          <stop offset="45%" stopColor="#c9a227" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e0c463" stopOpacity="0.95" />
        </linearGradient>
        <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

        {/* faint circuit ties near Hangzhou */}
      <g stroke="#0e7a4b" strokeOpacity="0.25" strokeWidth="1">
        <line x1="200" y1="560" x2="330" y2="520" />
        <line x1="270" y1="620" x2="330" y2="520" />
        <line x1="160" y1="500" x2="330" y2="520" />
      </g>

      <motion.path
        d="M330 520 Q 660 150 980 300"
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#arcGlow)"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.4 }}
      />

        {/* node A — Hangzhou */}
      <g>
        <motion.circle
          cx="330"
          cy="520"
          r="5"
          fill="#c9a227"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
        <circle cx="330" cy="520" r="11" fill="none" stroke="#c9a227" strokeOpacity="0.4" strokeWidth="1" />
        <text x="352" y="516" fill="#e8dcc8" fontSize="15" letterSpacing="2" className="uppercase">
          {pointA}
        </text>
      </g>

      {/* node B — Nouakchott */}
      <g>
        <motion.circle
          cx="980"
          cy="300"
          r="5"
          fill="#e0c463"
          initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.6, duration: 0.5 }}
        />
        <circle cx="980" cy="300" r="11" fill="none" stroke="#e0c463" strokeOpacity="0.5" strokeWidth="1" />
        <text x="1002" y="296" fill="#e8dcc8" fontSize="15" letterSpacing="2" className="uppercase">
          {pointB}
        </text>
      </g>
    </svg>
  )
}
