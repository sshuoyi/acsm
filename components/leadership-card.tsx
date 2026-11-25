function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function LeadershipCard({ name, title }: { name: string; title: string }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-hairline bg-surface/50 p-5">
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-lg font-medium text-gold"
        aria-hidden
      >
        {initials(name)}
      </span>
      <div className="flex flex-col">
        <span className="text-base font-medium text-sand">{name}</span>
        <span className="text-sm text-sand-muted">{title}</span>
      </div>
    </article>
  )
}
