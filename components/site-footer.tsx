import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n'
import { getNavItems, localizedPath } from '@/lib/nav'
import { ChamberLogo } from '@/components/logo'

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const navItems = getNavItems(locale, dict)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-hairline bg-surface/40">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <ChamberLogo alt={`${dict.brand.frenchLegal} — ACSM`} />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base text-sand">{dict.brand.full}</span>
                <span className="text-xs text-sand-muted">{dict.brand.english}</span>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-sand-muted">
              {dict.brand.frenchLegal}
            </p>
            <p className="flex items-center gap-2 text-sm text-sand-muted">
              <MapPin className="h-4 w-4 text-gold/70" aria-hidden />
              <span>
                {dict.footer.addressLabel}: {dict.footer.address}
              </span>
            </p>
            <a
              href={`mailto:${dict.contactPage.email}`}
              className="flex items-center gap-2 text-sm text-sand-muted transition-colors hover:text-gold"
            >
              <Mail className="h-4 w-4 text-gold/70" aria-hidden />
              <span>{dict.contactPage.emailLabel}: {dict.contactPage.email}</span>
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold/80">
              {dict.footer.linksHeading}
            </h3>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-sand-muted transition-colors hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold/80">
              {dict.governance.seal.title}
            </h3>
            <dl className="flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-sand-muted">{dict.footer.regLabel}</dt>
                <dd className="font-mono text-xs text-sand">{dict.footer.regNo}</dd>
              </div>
              <div>
                <dt className="text-sand-muted">{dict.footer.issued}</dt>
              </div>
              <div>
                <dt className="text-sand-muted">{dict.governance.seal.lawLabel}</dt>
                <dd className="text-sand">{dict.governance.seal.law}</dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href={localizedPath(locale, 'join')}
                className="text-sm text-gold transition-colors hover:text-gold-soft"
              >
                {dict.nav.join}
              </Link>
              <Link
                href={localizedPath(locale, 'platform')}
                className="text-sm text-gold transition-colors hover:text-gold-soft"
              >
                {dict.nav.platform}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline pt-6">
          <div dir="ltr" className="flex flex-col gap-1 text-xs leading-relaxed text-sand-muted rtl:text-right">
            <p className="font-display text-sm text-sand">{dict.footer.legal.name}</p>
            <p>{dict.footer.legal.registration}</p>
            <p>{dict.footer.legal.law}</p>
          </div>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-sand-muted/80">
            {dict.footer.smallPrint}
          </p>
          <p className="mt-4 text-xs text-sand-muted/70">
            © {year} {dict.brand.frenchLegal}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
