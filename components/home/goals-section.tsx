import type { Dictionary } from '@/lib/i18n'
import { SectionHeading } from '@/components/section-heading'
import { GoalCard } from '@/components/goal-card'
import { Reveal } from '@/components/reveal'

export function GoalsSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Mission"
          title={dict.goalsSection.heading}
          subtitle={dict.goalsSection.subheading}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.goals.map((goal, i) => (
            <Reveal key={goal.title} delay={(i % 3) * 0.06}>
              <GoalCard index={i} title={goal.title} desc={goal.desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
