import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { PageHeader } from '@/components/page-header'
import { LeadershipCard } from '@/components/leadership-card'
import { OfficialSeal } from '@/components/official-seal'
import { Reveal } from '@/components/reveal'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return { title: dict.about.title }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const a = dict.about

  return (
    <>
      <PageHeader eyebrow={dict.nav.about} title={a.title} intro={a.intro} />

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {a.blocks.map((block, i) => (
            <Reveal key={block.heading} delay={(i % 2) * 0.08}>
              <article className="flex flex-col gap-3">
                <span className="font-display text-2xl text-gold/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-xl font-medium text-sand">{block.heading}</h2>
                <p className="text-base leading-relaxed text-sand-muted">{block.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-surface/30">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-muted">
                {dict.governance.leadershipHeading}
              </h2>
              <div className="flex flex-col gap-3">
                {dict.governance.leaders.map((leader) => (
                  <LeadershipCard key={leader.name} name={leader.name} title={leader.title} />
                ))}
              </div>
            </div>
            <OfficialSeal dict={dict} />
          </div>
        </div>
      </section>
    </>
  )
}
