import Link from 'next/link'
import { ArrowRight, ShieldCheck, Target } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { localizedPath } from '@/lib/nav'
import { SectionHeading } from '@/components/section-heading'
import { PlatformModuleCard } from '@/components/platform-module-card'
import { KpiMeter } from '@/components/kpi-meter'
import { moduleIcons } from '@/components/icons'
import { Reveal } from '@/components/reveal'
import { applicationsEnabled } from '@/lib/features'

export function PlatformPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.platformPreview

  return (
    <section className="relative overflow-hidden border-y border-hairline bg-surface/30">
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium tracking-wide text-gold">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            {p.badge}
          </span>
          <SectionHeading eyebrow="Digital Platform" title={p.title} />
        </div>

        {/* Modules */}
        <div className="mt-10">
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-muted">
            {p.modulesHeading}
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((mod, i) => (
              <Reveal key={mod.title} delay={(i % 3) * 0.06}>
                <PlatformModuleCard
                  icon={moduleIcons[i] ?? moduleIcons[0]}
                  title={mod.title}
                  desc={mod.desc}
                  step={`0${i + 1}`}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div className="mt-10">
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-muted">
            {p.differentiatorsHeading}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {p.differentiators.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-teal/40 bg-teal/10 px-3.5 py-1.5 text-sm text-sand"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* KPI targets */}
        <div className="mt-12 rounded-3xl border border-hairline bg-ink/40 p-6 sm:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-gold">
            <Target className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            {p.kpiHeading}
          </span>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-medium text-gold/80">{p.kpi6moTitle}</p>
              <div className="grid grid-cols-2 gap-6">
                {p.kpi6mo.map((kpi) => (
                  <KpiMeter key={kpi.label} kpi={kpi} targetLabel={p.kpiTargetLabel} />
                ))}
              </div>
            </div>
            <div className="lg:border-s lg:border-hairline lg:ps-8">
              <p className="mb-4 text-sm font-medium text-gold/80">{p.kpi12moTitle}</p>
              <div className="grid grid-cols-2 gap-6">
                {p.kpi12mo.map((kpi) => (
                  <KpiMeter key={kpi.label} kpi={kpi} targetLabel={p.kpiTargetLabel} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {applicationsEnabled ? (
          <div className="mt-8">
            <Link
              href={localizedPath(locale, 'platform')}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
            >
              {p.cta}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
