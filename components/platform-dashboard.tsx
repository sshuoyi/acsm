import { ShieldCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'
import { moduleIcons } from '@/components/icons'

export function PlatformDashboard({ dict }: { dict: Dictionary }) {
  const p = dict.platformPreview
  const pp = dict.platformPage

  return (
    <div className="glass-strong overflow-hidden rounded-3xl border border-hairline">
      {/* window bar */}
      <div className="flex items-center justify-between border-b border-hairline bg-ink/40 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-seal/70" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-gold/60" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald/60" aria-hidden />
        </div>
        <span className="font-mono text-xs text-sand-muted">{pp.mvpBadge}</span>
      </div>

      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-sand">{pp.dashboardTitle}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/10 px-2.5 py-1 text-[11px] font-medium text-emerald">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            {pp.reviewStatus}
          </span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {p.modules.map((mod, i) => {
            const Icon = moduleIcons[i] ?? moduleIcons[0]
            return (
              <li
                key={mod.title}
                className="flex items-center gap-3 rounded-xl border border-hairline bg-surface/60 px-4 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gold/25 bg-gold/5 text-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="flex-1 text-sm text-sand">{mod.title}</span>
                <span className="font-mono text-[11px] text-sand-muted/70">
                  {pp.moduleStatusLabel} 0{i + 1}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
