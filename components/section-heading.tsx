import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'start',
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'start' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <span className="h-px w-12 bg-gold/60" aria-hidden />
      {eyebrow ? (
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold/80">{eyebrow}</span>
      ) : null}
      <h2 className="font-display text-3xl font-medium leading-tight text-sand text-balance sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('max-w-2xl text-sand-muted leading-relaxed', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
