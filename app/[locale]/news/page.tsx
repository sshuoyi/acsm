import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FileText } from 'lucide-react'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { PageHeader } from '@/components/page-header'
import { SampleBadge } from '@/components/sample-banner'
import { Reveal } from '@/components/reveal'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return { title: dict.newsPage.title }
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const n = dict.newsPage

  return (
    <>
      <PageHeader eyebrow={dict.nav.news} title={n.title} intro={n.intro} />

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {n.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06}>
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-hairline bg-surface/50 p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline text-sand-muted">
                    <FileText className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  </span>
                  <SampleBadge label={n.sampleTag} />
                </div>
                <h2 className="font-display text-lg font-medium leading-snug text-sand">{item.title}</h2>
                <p className="text-sm leading-relaxed text-sand-muted">{item.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
