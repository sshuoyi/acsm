import type { Locale } from './config'
import { zh, type Dictionary } from './dictionaries/zh'
import { en } from './dictionaries/en'
import { fr } from './dictionaries/fr'
import { ar } from './dictionaries/ar'

const dictionaries: Record<Locale, Dictionary> = { zh, en, fr, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
export type { Locale } from './config'
