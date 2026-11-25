'use client'

import { useEffect, useRef, useState } from 'react'

export type Kpi = { value: string; prefix: string; suffix: string; label: string }

function formatNumber(n: number, hasComma: boolean) {
  return hasComma ? n.toLocaleString('en-US') : String(n)
}

export function KpiMeter({ kpi, targetLabel }: { kpi: Kpi; targetLabel: string }) {
  const target = Number(kpi.value.replace(/[^0-9.]/g, '')) || 0
  const hasComma = kpi.value.includes(',')
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplay(target)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const duration = 1600
            const start = performance.now()
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setDisplay(target * eased)
              if (progress < 1) requestAnimationFrame(tick)
              else setDisplay(target)
            }
            requestAnimationFrame(tick)
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-gold/80">
        {targetLabel}
      </span>
      <div className="font-display text-4xl font-medium tabular-nums text-sand sm:text-5xl">
        {kpi.prefix}
        {formatNumber(Math.round(display), hasComma)}
        {kpi.suffix}
      </div>
      <p className="text-sm text-sand-muted">{kpi.label}</p>
    </div>
  )
}
