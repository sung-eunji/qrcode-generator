import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: '무료 QR코드 생성기 - 온라인 QR코드 만들기 | QRCode Generator',
  description:
    '무료로 QR코드를 생성하세요! URL, 텍스트, 연락처, WiFi 등 다양한 형태의 QR코드를 쉽고 빠르게 만들 수 있습니다. 광고 없이 완전 무료 QR코드 생성기.',
  keywords: [
    'QR코드 생성',
    '무료 QR코드',
    'QR코드 만들기',
    '온라인 QR코드',
    'QR코드 생성기',
    'QR Generator',
    'QR Code Maker',
    '무료 QR코드 생성기',
    'QR코드 온라인',
    'QR코드 다운로드',
  ],
  authors: [{ name: 'QRCode Generator' }],
  creator: 'QRCode Generator',
  publisher: 'QRCode Generator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://your-domain.com',
    title: '무료 QR코드 생성기 - 온라인 QR코드 만들기',
    description:
      '무료로 QR코드를 생성하세요! URL, 텍스트, 연락처, WiFi 등 다양한 형태의 QR코드를 쉽고 빠르게 만들 수 있습니다.',
    siteName: 'QRCode Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '무료 QR코드 생성기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '무료 QR코드 생성기 - 온라인 QR코드 만들기',
    description:
      '무료로 QR코드를 생성하세요! URL, 텍스트, 연락처, WiFi 등 다양한 형태의 QR코드를 쉽고 빠르게 만들 수 있습니다.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'QR Code Generator, Online Tool, Free Service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '무료 QR코드 생성기',
    description:
      '무료로 QR코드를 생성하세요! URL, 텍스트, 연락처, WiFi 등 다양한 형태의 QR코드를 쉽고 빠르게 만들 수 있습니다.',
    url: 'https://your-domain.com',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    featureList: [
      '무료 QR코드 생성',
      '다양한 QR코드 타입 지원',
      '고해상도 다운로드',
      '모바일 최적화',
    ],
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
