import type { Metadata, Viewport } from 'next';
import { FontPreload } from '@/components/FontPreload';
import { LanguageProvider } from '@/components/LanguageProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zhang Yuan | Digital Art & Design Research',
  description:
    'Personal portfolio of Zhang Yuan - Digital art creator and design researcher focused on HCI and Well-Being Design.',
  keywords: [
    'digital art',
    'design research',
    'HCI',
    'well-being design',
    'AIGC',
    'portfolio',
    'interactive design',
  ],
  authors: [{ name: 'Zhang Yuan' }],
  metadataBase: new URL('https://zhangyuandesign.cn'),
  openGraph: {
    title: 'Zhang Yuan | Digital Art & Design Research',
    description:
      'Digital art creator and design researcher. Exploring the intersection of AI, interaction design, and human well-being.',
    locale: 'zh_CN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <FontPreload />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
