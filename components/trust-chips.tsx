import { cn } from '@/lib/utils'

export function TrustChips({ chips, className }: { chips: string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-x-3 gap-y-2', className)}>
      {chips.map((chip, i) => (
        <li key={chip} className="flex items-center gap-3">
          {i > 0 ? <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden /> : null}
          <span className="text-sm text-sand-muted">{chip}</span>
        </li>
      ))}
    </ul>
  )
}
