import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, ShieldCheck } from 'lucide-react'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { PageHeader } from '@/components/page-header'
import { JoinForm } from '@/components/join-form'
import { applicationsEnabled } from '@/lib/features'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = getDictionary(locale)
  return { title: dict.joinPage.title }
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)
  const j = dict.joinPage

  return (
    <>
      <PageHeader eyebrow={dict.nav.join} title={j.title} intro={j.intro} />

      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className={applicationsEnabled ? 'grid gap-12 lg:grid-cols-[1fr_1.3fr]' : 'mx-auto max-w-3xl'}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-muted">
                {j.benefitsHeading}
              </h2>
              <ul className="flex flex-col gap-3">
                {j.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                    <span className="text-sm leading-relaxed text-sand-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="flex items-start gap-3 rounded-2xl border border-hairline bg-surface/40 p-4 text-sm text-sand-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden />
              {j.verifyNote}
            </p>
          </div>

          {applicationsEnabled ? (
            <div className="rounded-3xl border border-hairline bg-surface/50 p-6 sm:p-8">
              <JoinForm dict={dict} locale={locale} variant="join" />
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
