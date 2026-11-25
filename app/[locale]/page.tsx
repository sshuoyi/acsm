import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n'
import { HeroSection } from '@/components/home/hero-section'
import { DualEngine } from '@/components/home/dual-engine'
import { GoalsSection } from '@/components/home/goals-section'
import { SectorsStrip } from '@/components/home/sectors-strip'
import { PlatformPreview } from '@/components/home/platform-preview'
import { GovernanceSection } from '@/components/home/governance-section'
import { InvitationSection } from '@/components/home/invitation-section'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = getDictionary(locale)

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <DualEngine dict={dict} />
      <GoalsSection dict={dict} />
      <SectorsStrip locale={locale} dict={dict} />
      <PlatformPreview locale={locale} dict={dict} />
      <GovernanceSection dict={dict} />
      <InvitationSection locale={locale} dict={dict} />
    </>
  )
}
