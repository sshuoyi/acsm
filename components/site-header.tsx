'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { getNavItems, localizedPath } from '@/lib/nav'
import { ChamberLogo } from '@/components/logo'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { cn } from '@/lib/utils'
import { applicationsEnabled } from '@/lib/features'

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navItems = getNavItems(locale, dict)
  const joinHref = localizedPath(locale, 'join')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          'mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6',
          scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'glass',
        )}
      >
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3"
          aria-label={dict.brand.full}
        >
          <ChamberLogo alt="" priority className="h-10 w-10" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-sm font-medium tracking-wide text-sand">
              {dict.brand.short}
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="max-w-[230px] text-right text-[10px] leading-relaxed text-sand-muted"
              style={{ fontFamily: 'var(--font-naskh)' }}
            >
              جمعية رجال الأعمال الصينيين من جنوب الصين في موريتانيا
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex lg:gap-3 xl:gap-5" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'text-xs transition-colors duration-300 lg:text-sm',
                isActive(item.href) ? 'text-gold' : 'text-sand-muted hover:text-sand',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher current={locale} className="hidden md:block" />
          {applicationsEnabled ? (
            <Link
              href={joinHref}
              className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold/20 md:inline-flex"
            >
              {dict.cta.apply}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? dict.cta.closeMenu : dict.cta.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-sand transition-colors hover:bg-gold/10 md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 -z-10 h-screen w-screen cursor-default bg-ink/60 md:hidden"
          />
          <div className="mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[1200px] overflow-y-auto md:hidden">
          <div className="menu-panel flex flex-col gap-1 rounded-2xl p-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-3 text-base transition-colors',
                  isActive(item.href) ? 'bg-gold/10 text-gold' : 'text-sand hover:bg-white/5',
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-hairline pt-4">
              <LocaleSwitcher
                current={locale}
                variant="list"
                onNavigate={() => setOpen(false)}
              />
            </div>
            {applicationsEnabled ? (
              <Link
                href={joinHref}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-medium text-gold"
              >
                {dict.cta.apply}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </Link>
            ) : null}
          </div>
          </div>
        </>
      ) : null}
    </header>
  )
}
