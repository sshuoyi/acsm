import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="fr-MR" dir="ltr">
      <body className="antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0b1220] px-6 text-center text-[#e8dcc8]">
          <span className="text-5xl font-medium text-[#c9a227]">404</span>
          <p className="text-base text-[#a89f8e]">Page not found · 页面未找到 · Page introuvable · الصفحة غير موجودة</p>
          <Link
            href="/fr"
            className="rounded-full border border-[#c9a227]/50 px-5 py-2.5 text-sm text-[#c9a227] transition-colors hover:bg-[#c9a227]/10"
          >
            Retour à l&apos;accueil
          </Link>
        </main>
      </body>
    </html>
  )
}
