import { ShieldCheck } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

export function OfficialSeal({ dict }: { dict: Dictionary }) {
  const seal = dict.governance.seal

  return (
    <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-surface/60 p-7">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/20"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.5} aria-hidden />
          </span>
          <h3 className="font-display text-lg font-medium text-sand">{seal.title}</h3>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.16em] text-sand-muted">{seal.regLabel}</dt>
            <dd className="font-mono text-sm text-sand">{seal.regNo}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.16em] text-sand-muted">{seal.issuedLabel}</dt>
            <dd className="text-sm text-sand">{seal.issuedDate}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-[0.16em] text-sand-muted">{seal.lawLabel}</dt>
            <dd className="text-sm text-sand">{seal.law}</dd>
          </div>
        </dl>

        <p className="border-t border-hairline pt-4 text-sm leading-relaxed text-sand-muted">
          {seal.note}
        </p>
      </div>
    </div>
  )
}
