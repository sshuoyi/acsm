export function GoalCard({
  index,
  title,
  desc,
}: {
  index: number
  title: string
  desc: string
}) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-3xl border border-hairline bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 sm:p-7">
      <span className="font-display text-2xl font-medium text-gold/70 transition-colors group-hover:text-gold">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display text-lg font-medium leading-snug text-sand">{title}</h3>
      <p className="text-sm leading-relaxed text-sand-muted">{desc}</p>
    </article>
  )
}
