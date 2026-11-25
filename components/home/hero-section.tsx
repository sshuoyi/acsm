import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Boxes, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { localizedPath } from '@/lib/nav'
import { applicationsEnabled } from '@/lib/features'
import { HeroMapArc } from '@/components/hero-map-arc'
import { TrustChips } from '@/components/trust-chips'

const statIcons: LucideIcon[] = [Building2, Boxes, Handshake]

export function HeroSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const hero = dict.hero

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-desert-coast.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <HeroMapArc pointA={hero.pointA} pointB={hero.pointB} />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col justify-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="flex max-w-3xl flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-gold text-balance sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="text-lg text-sand/90 sm:text-xl">{hero.subtitle}</p>
          </div>

          <span className="h-px w-16 bg-gold/50" aria-hidden />

          <p className="max-w-2xl text-base leading-relaxed text-sand-muted sm:text-lg">{hero.h1}</p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            {applicationsEnabled ? (
              <Link
                href={localizedPath(locale, 'join')}
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3.5 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold/20"
              >
                {dict.cta.apply}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            ) : null}
            <Link
              href={localizedPath(locale, 'platform')}
              className="inline-flex items-center gap-2 rounded-full border border-emerald/50 bg-emerald/10 px-6 py-3.5 text-sm font-medium text-sand transition-colors duration-300 hover:bg-emerald/20"
            >
              {dict.cta.learnPlatform}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </div>

          <TrustChips chips={hero.trustChips} className="mt-4" />
        </div>

        <p className="mt-14 text-xs font-medium uppercase tracking-[0.18em] text-gold/70">
          {hero.statsCaption}
        </p>
        <div className="mt-3 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {hero.stats.map((stat, i) => {
            const Icon = statIcons[i] ?? Building2
            return (
              <div
                key={stat.label}
                className="glass-strong flex items-center gap-4 rounded-2xl px-5 py-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 text-gold">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-medium text-sand">{stat.value}</span>
                  <span className="text-xs text-sand-muted">{stat.label}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
