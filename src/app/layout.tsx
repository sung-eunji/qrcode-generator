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
  metadataBase: new URL('https://kawaii-utils.com'),
  title: 'Kawaii Utils - 무료 온라인 도구 모음집 | QR코드, 변환기, 개발자 도구',
  icons: {
    icon: '🎀',
  },
  description:
    '귀여운 무료 온라인 도구 모음집! QR코드 생성기, 시간대 변환기, 환율 변환기, 단위 변환기, Base64 인코더, 해시 생성기 등 다양한 유틸리티를 무료로 사용하세요.',
  keywords: [
    '무료 온라인 도구',
    'QR코드 생성기',
    '시간대 변환기',
    '환율 변환기',
    '단위 변환기',
    'Base64 인코더',
    '해시 생성기',
    'JSON 포맷터',
    '색상 선택기',
    '랜덤 생성기',
    '날짜 계산기',
    '온라인 유틸리티',
    '개발자 도구',
    '무료 도구',
    'Kawaii Utils',
  ],
  authors: [{ name: 'Kawaii Utils' }],
  creator: 'Kawaii Utils',
  publisher: 'Kawaii Utils',
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
    url: 'https://kawaii-utils.com',
    title: 'Kawaii Utils - 무료 온라인 도구 모음집',
    description:
      '귀여운 무료 온라인 도구 모음집! QR코드 생성기, 시간대 변환기, 환율 변환기, 단위 변환기, Base64 인코더, 해시 생성기 등 다양한 유틸리티를 무료로 사용하세요.',
    siteName: 'Kawaii Utils',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kawaii Utils - 무료 온라인 도구 모음집',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kawaii Utils - 무료 온라인 도구 모음집',
    description:
      '귀여운 무료 온라인 도구 모음집! QR코드 생성기, 시간대 변환기, 환율 변환기, 단위 변환기, Base64 인코더, 해시 생성기 등 다양한 유틸리티를 무료로 사용하세요.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://kawaii-utils.com',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification:
    'Online Utilities, QR Code Generator, Converter Tools, Developer Tools, Free Service',
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
    url: 'https://kawaii-utils.com',
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
