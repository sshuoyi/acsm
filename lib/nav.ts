import type { Locale } from './i18n/config'
import type { Dictionary } from './i18n'

export type NavKey = 'home' | 'about' | 'sectors' | 'platform' | 'join' | 'news' | 'contact'

const slugs: Record<NavKey, string> = {
  home: '',
  about: 'about',
  sectors: 'sectors',
  platform: 'platform',
  join: 'join',
  news: 'news',
  contact: 'contact',
}

export function localizedPath(locale: Locale, key: NavKey): string {
  const slug = slugs[key]
  return slug ? `/${locale}/${slug}` : `/${locale}`
}

export function href(locale: Locale, path: string): string {
  return path ? `/${locale}/${path.replace(/^\//, '')}` : `/${locale}`
}

export function getNavItems(locale: Locale, dict: Dictionary) {
  const keys: NavKey[] = ['home', 'about', 'sectors', 'platform', 'join', 'contact']
  return keys.map((key) => ({
    key,
    label: dict.nav[key],
    href: localizedPath(locale, key),
  }))
}
