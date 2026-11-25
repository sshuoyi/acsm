import Image from 'next/image'
import { cn } from '@/lib/utils'

export function ChamberLogo({
  alt,
  className,
  priority = false,
}: {
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/images/acsm-logo-transparent.png"
      alt={alt}
      width={3000}
      height={3000}
      sizes="56px"
      priority={priority}
      className={cn('block h-10 w-10 shrink-0 object-contain', className)}
    />
  )
}

/**
 * Abstract gold crescent-arc mark — a recurring brand motif.
 * Not a national flag; a stylized crescent over a horizon arc.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn('h-10 w-10', className)}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="var(--color-gold)" strokeOpacity="0.35" strokeWidth="1" />
      {/* horizon arc */}
      <path
        d="M8 30c4.4-5.2 9.9-7.8 16-7.8S35.6 24.8 40 30"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* crescent */}
      <path
        d="M30 14a11 11 0 1 0 3.6 11.4A8.6 8.6 0 0 1 30 14Z"
        fill="var(--color-gold)"
        fillOpacity="0.9"
      />
      {/* rising node */}
      <circle cx="24" cy="30" r="1.8" fill="var(--color-gold)" />
    </svg>
  )
}
