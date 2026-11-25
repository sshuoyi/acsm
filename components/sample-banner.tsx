export function SampleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-seal/50 bg-seal/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d98a8a]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#d98a8a]" aria-hidden />
      {label}
    </span>
  )
}
