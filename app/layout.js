import './globals.css'
import { Providers } from './providers'

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://awais-legal-premium.preview.emergentagent.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Awais Ajmal | Advocate High Court, Multan — Trusted Legal Counsel',
  description:
    'Muhammad Awais Ajmal — Advocate High Court (BA • LLB • LLM), Member Punjab Bar Council, based in Multan. Expert, honest representation in criminal, civil, family, property, corporate & constitutional law. Book a confidential consultation today.',
  keywords: [
    'Awais Ajmal', 'Advocate High Court', 'Lawyer Multan', 'Punjab Bar Council',
    'Criminal Lawyer Multan', 'Civil Lawyer', 'Family Law', 'Property Law', 'Legal Consultation Pakistan'
  ],
  authors: [{ name: 'Muhammad Awais Ajmal' }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'Awais Ajmal | Advocate High Court — Multan',
    description: 'Justice Through Integrity, Knowledge & Commitment. Trusted legal representation in Multan.',
    url: SITE_URL,
    siteName: 'Awais Ajmal — Advocate High Court',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awais Ajmal | Advocate High Court — Multan',
    description: 'Justice Through Integrity, Knowledge & Commitment.',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Attorney',
  name: 'Muhammad Awais Ajmal',
  description: 'Advocate High Court practicing in Multan, Pakistan.',
  jobTitle: 'Advocate High Court',
  telephone: '+92 303 5686074',
  areaServed: 'Multan, Pakistan',
  memberOf: 'Punjab Bar Council',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
