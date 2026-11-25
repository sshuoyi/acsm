import type { LucideIcon } from 'lucide-react'

export function PlatformModuleCard({
  icon: Icon,
  title,
  desc,
  step,
}: {
  icon: LucideIcon
  title: string
  desc: string
  step: string
}) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-hairline bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold transition-colors group-hover:bg-gold/15">
          <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </span>
        <span className="font-mono text-xs text-sand-muted/70">{step}</span>
      </div>
      <h3 className="font-display text-lg font-medium text-sand">{title}</h3>
      <p className="text-sm leading-relaxed text-sand-muted">{desc}</p>
    </article>
  )
}
