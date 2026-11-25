import Link from 'next/link'
import { ChamberLogo } from '@/components/logo'

const messages = [
  { locale: 'zh', title: '页面未找到', body: '抱歉，您访问的页面不存在。', cta: '返回首页' },
  { locale: 'en', title: 'Page not found', body: 'Sorry, the page you are looking for does not exist.', cta: 'Back to home' },
  { locale: 'fr', title: 'Page introuvable', body: "Désolé, la page que vous recherchez n'existe pas.", cta: "Retour à l'accueil" },
  { locale: 'ar', title: 'الصفحة غير موجودة', body: 'عذرًا، الصفحة التي تبحث عنها غير موجودة.', cta: 'العودة إلى الرئيسية' },
]

export default function LocaleNotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center gap-8 px-5 py-32 text-center">
      <ChamberLogo alt="ACSM — Association des Hommes d'Affaires de Chine du Sud en Mauritanie" className="h-14 w-14" />
      <span className="font-display text-6xl font-medium text-gold">404</span>
      <ul className="flex flex-col gap-4">
        {messages.map((m) => (
          <li key={m.locale} className="flex flex-col gap-1" dir={m.locale === 'ar' ? 'rtl' : 'ltr'}>
            <p className="text-base font-medium text-sand">{m.title}</p>
            <p className="text-sm text-sand-muted">{m.body}</p>
            <Link
              href={`/${m.locale}`}
              className="mx-auto mt-1 w-fit text-sm text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold-soft"
            >
              {m.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
