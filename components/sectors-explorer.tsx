'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/i18n'
import { sectorIcons } from '@/components/icons'
import { cn } from '@/lib/utils'

export function SectorsExplorer({ dict }: { dict: Dictionary }) {
  const items = dict.sectorsPage.items
  const [active, setActive] = useState(0)
  const current = items[active]
  const ActiveIcon = sectorIcons[active] ?? sectorIcons[0]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.4fr]">
      <div className="flex flex-col gap-2" role="tablist" aria-label={dict.sectorsPage.title}>
        {items.map((item, i) => {
          const Icon = sectorIcons[i] ?? sectorIcons[0]
          const selected = i === active
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={cn(
                'flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-start transition-all duration-300',
                selected
                  ? 'border-gold/50 bg-gold/10'
                  : 'border-hairline bg-surface/40 hover:border-gold/30 hover:bg-surface/70',
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
                  selected ? 'border-gold/40 bg-gold/15 text-gold' : 'border-hairline text-sand-muted',
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
              </span>
              <span className={cn('text-sm font-medium', selected ? 'text-sand' : 'text-sand-muted')}>
                {item.name}
              </span>
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        className="flex flex-col gap-6 rounded-3xl border border-hairline bg-surface/50 p-7 sm:p-9"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
            <ActiveIcon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
          </span>
          <h2 className="font-display text-2xl font-medium text-sand">{current.name}</h2>
        </div>

        <div className="flex flex-col gap-2 rounded-2xl border border-gold/25 bg-gold/5 p-5">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold/80">
            {dict.sectorsPage.valueLabel}
          </span>
          <p className="text-base font-medium text-sand">{current.value}</p>
        </div>

        <p className="text-base leading-relaxed text-sand-muted">{current.detail}</p>
      </div>
    </div>
  )
}
