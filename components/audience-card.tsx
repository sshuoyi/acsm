import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function AudienceCard({
  title,
  desc,
  href,
}: {
  title: string
  desc: string
  href?: string
}) {
  const className = 'group flex h-full flex-col justify-between gap-6 rounded-3xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50'
  const content = (
    <>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-lg font-medium leading-snug text-sand">{title}</h3>
        <p className="text-sm leading-relaxed text-sand-muted">{desc}</p>
      </div>
      {href ? (
        <span className="inline-flex items-center gap-2 text-sm text-gold">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" aria-hidden />
        </span>
      ) : null}
    </>
  )

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className.replace(' hover:-translate-y-1 hover:border-gold/50', '')}>
      {content}
    </div>
  )
}
