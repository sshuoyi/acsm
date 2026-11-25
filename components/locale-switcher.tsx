'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { localeLabels, locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils'

function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/')
  // segments[0] is '' because pathname starts with '/'
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = next
    return segments.join('/') || `/${next}`
  }
  return `/${next}`
}

/** Short code shown on the collapsed dropdown trigger, e.g. "EN". */
function shortCode(code: Locale): string {
  return code === 'zh' ? 'ZH' : code.toUpperCase()
}

export function LocaleSwitcher({
  current,
  className,
  onNavigate,
  variant = 'dropdown',
}: {
  current: Locale
  className?: string
  onNavigate?: () => void
  variant?: 'dropdown' | 'list'
}) {
  const pathname = usePathname() || `/${current}`

  if (variant === 'list') {
    return (
      <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
        {localeLabels.map(({ code, label }) => {
          const active = code === current
          return (
            <Link
              key={code}
              href={swapLocale(pathname, code)}
              hrefLang={code}
              aria-current={active ? 'true' : undefined}
              onClick={onNavigate}
              className={cn(
                'text-sm tracking-wide transition-colors duration-300',
                active
                  ? 'font-medium text-gold underline decoration-gold/70 decoration-1 underline-offset-8'
                  : 'text-sand-muted hover:text-sand',
              )}
            >
              {label}
            </Link>
          )
        })}
      </div>
    )
  }

  return <LocaleDropdown current={current} pathname={pathname} className={className} />
}

function LocaleDropdown({
  current,
  pathname,
  className,
}: {
  current: Locale
  pathname: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language"
        className={cn(
          'inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors duration-300',
          open ? 'bg-gold/20' : 'hover:bg-gold/20',
        )}
      >
        <Globe className="h-4 w-4" aria-hidden />
        <span>{shortCode(current)}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="menu-panel absolute end-0 z-50 mt-2 min-w-[13rem] overflow-hidden rounded-xl p-1.5 shadow-xl shadow-black/30"
        >
          {localeLabels.map(({ code, label }) => {
            const active = code === current
            return (
              <Link
                key={code}
                role="menuitem"
                href={swapLocale(pathname, code)}
                hrefLang={code}
                aria-current={active ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  active ? 'bg-gold/10 text-gold' : 'text-sand hover:bg-white/5 hover:text-sand',
                )}
              >
                <span className="tracking-wide">{label}</span>
                {active ? <Check className="h-4 w-4 shrink-0" aria-hidden /> : null}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
