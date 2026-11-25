export const locales = ['zh', 'en', 'fr', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  zh: 'ltr',
  en: 'ltr',
  fr: 'ltr',
  ar: 'rtl',
}

export const localeHtmlLang: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
  fr: 'fr-MR',
  ar: 'ar-MR',
}

export const localeLabels: { code: Locale; label: string }[] = [
  { code: 'zh', label: '中文 ZH' },
  { code: 'en', label: 'ENGLISH EN' },
  { code: 'fr', label: 'FRANÇAIS FR' },
  { code: 'ar', label: 'العربية AR' },
]

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
