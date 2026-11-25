import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { localizedPath } from '@/lib/nav'
import { applicationsEnabled } from '@/lib/features'
import { SectionHeading } from '@/components/section-heading'
import { AudienceCard } from '@/components/audience-card'
import { Reveal } from '@/components/reveal'

const roles = ['chineseEnterprise', 'mauritanianEnterprise', 'financial', 'government']

export function InvitationSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const inv = dict.invitation
  const joinBase = localizedPath(locale, 'join')

  return (
    <section className="border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Invitation" title={inv.heading} subtitle={inv.subheading} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inv.audiences.map((aud, i) => (
            <Reveal key={aud.title} delay={(i % 4) * 0.06}>
              <AudienceCard
                title={aud.title}
                desc={aud.desc}
                href={applicationsEnabled ? `${joinBase}?role=${roles[i] ?? 'other'}` : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
