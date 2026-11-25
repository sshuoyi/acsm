import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { localizedPath } from '@/lib/nav'
import { SectionHeading } from '@/components/section-heading'
import { SectorTile } from '@/components/sector-tile'
import { sectorIcons } from '@/components/icons'
import { Reveal } from '@/components/reveal'

export function SectorsStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Sectors"
          title={dict.sectorsStrip.heading}
          subtitle={dict.sectorsStrip.subheading}
        />
        <Link
          href={localizedPath(locale, 'sectors')}
          className="inline-flex shrink-0 items-center gap-2 text-sm text-gold transition-colors hover:text-gold-soft"
        >
          {dict.nav.sectors}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dict.sectors.map((sector, i) => (
          <Reveal key={sector.name} delay={(i % 4) * 0.05}>
            <SectorTile icon={sectorIcons[i] ?? sectorIcons[0]} name={sector.name} value={sector.value} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
