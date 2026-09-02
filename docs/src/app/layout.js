import Footer from '@/components/Footer';

export const metadata = {
  title: 'Ralma Documentation',
  description: 'Documentation for Ralma, stateless Ractive components for Bulma.',
  keywords: 'ralma, ractive, bulma, components, javascript, docs',
  authors: [{ name: 'aldi' }],
  metadataBase: new URL('https://aldi.github.io'),
  alternates: {
    canonical: '/ralma',
  },
  openGraph: {
    title: 'Ralma Documentation',
    description: 'Documentation for Ralma, stateless Ractive components for Bulma.',
    url: 'https://aldi.github.io/ralma',
    siteName: 'Ralma',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ralma Documentation',
    description: 'Documentation for Ralma, stateless Ractive components for Bulma.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const basePath = process.env.BASE_PATH || '';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1/css/bulma.min.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/css/all.min.css"
        />
        <link rel="stylesheet" href={`${basePath}/globals.css`} />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
