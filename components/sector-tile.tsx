import type { LucideIcon } from 'lucide-react'

export function SectorTile({
  icon: Icon,
  name,
  value,
}: {
  icon: LucideIcon
  name: string
  value: string
}) {
  return (
    <article className="group flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 text-gold transition-colors group-hover:bg-gold/15">
        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
      </span>
      <h3 className="text-base font-medium text-sand">{name}</h3>
      <p className="text-sm leading-relaxed text-sand-muted">{value}</p>
    </article>
  )
}
