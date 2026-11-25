import { Handshake, Network } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'

export function DualEngine({ dict }: { dict: Dictionary }) {
  const d = dict.dualEngine
  const cards = [
    { icon: Handshake, title: d.physical.title, desc: d.physical.desc, accent: 'gold' as const },
    { icon: Network, title: d.digital.title, desc: d.digital.desc, accent: 'emerald' as const },
  ]

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading eyebrow={dict.brand.short} title={d.heading} subtitle={d.subheading} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.08}>
            <article className="flex h-full flex-col gap-5 rounded-3xl border border-hairline bg-surface/50 p-8">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                  card.accent === 'gold'
                    ? 'border-gold/30 bg-gold/10 text-gold'
                    : 'border-emerald/30 bg-emerald/10 text-emerald'
                }`}
              >
                <card.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="font-display text-xl font-medium text-sand">{card.title}</h3>
              <p className="text-base leading-relaxed text-sand-muted">{card.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
