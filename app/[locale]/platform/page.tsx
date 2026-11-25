import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { PlatformDashboard } from '@/components/platform-dashboard'
import { KpiMeter } from '@/components/kpi-meter'
import { JoinForm } from '@/components/join-form'
import { Reveal } from '@/components/reveal'
import { applicationsEnabled } from '@/lib/features'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return { title: dict.platformPage.title }
}

export default async function PlatformPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const p = dict.platformPreview
  const pp = dict.platformPage

  return (
    <>
      {/* Top: intro + dashboard */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="pointer-events-none absolute inset-0 circuit-grid opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-40 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-gold">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              {pp.mvpBadge} · {pp.targetLine}
            </span>
            <h1 className="font-display text-4xl font-medium leading-tight text-sand text-balance sm:text-5xl">
              {pp.title}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-sand-muted sm:text-lg">{pp.intro}</p>
            <ul className="mt-2 flex flex-wrap gap-2.5">
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
          <Reveal delay={0.1}>
            <PlatformDashboard dict={dict} />
          </Reveal>
        </div>
      </section>

      {/* Pain points */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="font-display text-2xl font-medium text-sand sm:text-3xl">{pp.painHeading}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {pp.pains.map((pain, i) => (
            <Reveal key={pain} delay={(i % 2) * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-hairline bg-surface/40 p-5">
                <span className="font-display text-xl text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-sm leading-relaxed text-sand-muted">{pain}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* KPI targets */}
      <section className="border-y border-hairline bg-surface/30">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-medium text-sand sm:text-3xl">{p.kpiHeading}</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
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
      </section>

      {applicationsEnabled ? (
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="font-display text-2xl font-medium text-sand sm:text-3xl">{pp.formHeading}</h2>
          <div className="mt-8">
            <JoinForm dict={dict} locale={locale} variant="platform" />
          </div>
        </section>
      ) : null}
    </>
  )
}
