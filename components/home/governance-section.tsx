import type { Dictionary } from '@/lib/i18n'
import { SectionHeading } from '@/components/section-heading'
import { LeadershipCard } from '@/components/leadership-card'
import { OfficialSeal } from '@/components/official-seal'
import { Reveal } from '@/components/reveal'

export function GovernanceSection({ dict }: { dict: Dictionary }) {
  const g = dict.governance

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeading eyebrow="Trust" title={g.heading} subtitle={g.subheading} />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-muted">
            {g.leadershipHeading}
          </h3>
          <div className="flex flex-col gap-3">
            {g.leaders.map((leader, i) => (
              <Reveal key={leader.name} delay={i * 0.06}>
                <LeadershipCard name={leader.name} title={leader.title} />
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.1}>
          <OfficialSeal dict={dict} />
        </Reveal>
      </div>
    </section>
  )
}
