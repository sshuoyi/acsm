import { defaultLocale } from '@/lib/i18n/config'
export default function RootPage() {
  return (
    <html lang="fr-MR">
      <head>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}`} />
        <link rel="canonical" href={`/${defaultLocale}`} />
      </head>
      <body>
        <p>Redirecting to <a href={`/${defaultLocale}`}>/{defaultLocale}</a></p>
        <script dangerouslySetInnerHTML={{ __html: `location.replace("/${defaultLocale}")` }} />
      </body>
    </html>
  )
}
