import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import site from '@/data/site.json';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://oasiscleaningofaustin.com'),
  title: {
    default: `${site.company.name} | ${site.company.slogan}`,
    template: `%s | ${site.company.shortName}`,
  },
  description:
    'Professional cleaning services for homes and businesses across Austin. Standard, deep, move-in/out, Airbnb, and commercial cleaning. Licensed & insured.',
  keywords: [
    'cleaning service Austin',
    'house cleaning Austin',
    'commercial cleaning Austin',
    'Airbnb cleaning Austin',
    'deep cleaning',
    'move-in move-out cleaning',
  ],
  openGraph: {
    type: 'website',
    title: `${site.company.name} | ${site.company.slogan}`,
    description:
      'Professional cleaning services for homes and businesses across Austin.',
    siteName: site.company.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
