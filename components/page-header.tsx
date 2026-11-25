import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-gold/15"
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1200px] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-40">
        <div className="flex flex-col gap-4">
          <span className="h-px w-12 bg-gold/60" aria-hidden />
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-gold/80">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="font-display text-4xl font-medium leading-tight text-sand text-balance sm:text-5xl">
            {title}
          </h1>
          {intro ? (
            <p className="max-w-2xl text-base leading-relaxed text-sand-muted sm:text-lg">{intro}</p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  )
}
