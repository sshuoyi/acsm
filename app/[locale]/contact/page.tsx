import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail, MapPin, Radio } from 'lucide-react'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { PageHeader } from '@/components/page-header'
import { OfficialSeal } from '@/components/official-seal'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return { title: dict.contactPage.title }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const c = dict.contactPage

  return (
    <>
      <PageHeader eyebrow={dict.nav.contact} title={c.title} />

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 rounded-3xl border border-hairline bg-surface/50 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold">
                <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-sand-muted">
                {c.hqLabel}
              </h2>
              <p className="text-lg text-sand">{c.hq}</p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-hairline bg-surface/50 p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald/30 bg-emerald/10 text-emerald">
                <Radio className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-sand-muted">
                {c.channelsLabel}
              </h2>
              <p className="text-base leading-relaxed text-sand-muted">{c.channels}</p>
              <a
                href={`mailto:${c.email}`}
                className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-gold-soft"
              >
                <Mail className="h-4 w-4" aria-hidden />
                <span>{c.emailLabel}: {c.email}</span>
              </a>
            </div>
          </div>

          <OfficialSeal dict={dict} />
        </div>
      </section>
    </>
  )
}
