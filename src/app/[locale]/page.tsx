import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import QRCodeGeneratorWrapper from '@/components/QRCodeGeneratorWrapper';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  
  // 다국어 텍스트 정의
  const messages = {
    ko: {
      common: { home: "🏠 홈", blog: "📚 블로그", faq: "❓ FAQ", use: "사용하기", comingSoon: "준비중 ✨" },
      home: { title: "Kawaii Utils", subtitle: "귀여운 무료 온라인 도구 모음집! QR코드부터 변환기까지 🎀" },
      categories: { qrTools: "QR코드 도구", converters: "변환기", devTools: "개발자 도구", dailyTools: "일상 도구" }
    },
    en: {
      common: { home: "🏠 Home", blog: "📚 Blog", faq: "❓ FAQ", use: "Use", comingSoon: "Coming Soon ✨" },
      home: { title: "Kawaii Utils", subtitle: "Cute free online tools collection! From QR codes to converters 🎀" },
      categories: { qrTools: "QR Code Tools", converters: "Converters", devTools: "Developer Tools", dailyTools: "Daily Tools" }
    },
    fr: {
      common: { home: "🏠 Accueil", blog: "📚 Blog", faq: "❓ FAQ", use: "Utiliser", comingSoon: "Bientôt ✨" },
      home: { title: "Kawaii Utils", subtitle: "Collection d'outils en ligne gratuits et mignons ! Des QR codes aux convertisseurs 🎀" },
      categories: { qrTools: "Outils QR Code", converters: "Convertisseurs", devTools: "Outils Développeur", dailyTools: "Outils Quotidiens" }
    }
  };
  
  const t = messages[locale as keyof typeof messages] || messages.ko;
  const utilityCategories = [
    {
      title: 'QR코드 도구',
      icon: '📱',
      color: 'from-pink-500 to-purple-500',
      tools: [
        {
          name: 'QR코드 생성기',
          path: '/qr-generator',
          description: '다양한 타입의 QR코드 생성',
        },
        {
          name: 'QR코드 분석기',
          path: '/qr-analyzer',
          description: 'QR코드 내용 분석',
          comingSoon: true,
        },
        {
          name: 'QR코드 커스터마이징',
          path: '/qr-customizer',
          description: '로고 삽입, 색상 변경',
          comingSoon: true,
        },
      ],
    },
    {
      title: '변환기',
      icon: '🔄',
      color: 'from-blue-500 to-cyan-500',
      tools: [
        {
          name: '시간대 변환기',
          path: '/timezone-converter',
          description: '세계 시간 변환',
          comingSoon: true,
        },
        {
          name: '환율 변환기',
          path: '/currency-converter',
          description: '실시간 환율 계산',
          comingSoon: true,
        },
        {
          name: '단위 변환기',
          path: '/unit-converter',
          description: '길이, 무게, 온도 등',
          comingSoon: true,
        },
      ],
    },
    {
      title: '개발자 도구',
      icon: '💻',
      color: 'from-green-500 to-emerald-500',
      tools: [
        {
          name: 'Base64 인코더',
          path: '/base64-encoder',
          description: 'Base64 인코딩/디코딩',
          comingSoon: true,
        },
        {
          name: '해시 생성기',
          path: '/hash-generator',
          description: 'MD5, SHA256 해시',
          comingSoon: true,
        },
        {
          name: 'JSON 포맷터',
          path: '/json-formatter',
          description: 'JSON 정렬 및 검증',
          comingSoon: true,
        },
      ],
    },
    {
      title: '일상 도구',
      icon: '✨',
      color: 'from-yellow-500 to-orange-500',
      tools: [
        {
          name: '색상 선택기',
          path: '/color-picker',
          description: 'HEX, RGB 색상 변환',
          comingSoon: true,
        },
        {
          name: '랜덤 생성기',
          path: '/random-generator',
          description: '숫자, 색상, 비밀번호',
          comingSoon: true,
        },
        {
          name: '날짜 계산기',
          path: '/date-calculator',
          description: '날짜 차이, 요일 계산',
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 py-8 px-4 relative overflow-hidden">
      {/* 카와이한 배경 장식들 */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">🌸</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">💖</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">
        ✨
      </div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">
        🎀
      </div>
      <div className="absolute top-1/2 left-5 text-3xl animate-bounce delay-700">
        🦄
      </div>
      <div className="absolute top-1/3 right-5 text-4xl animate-pulse delay-300">
        💕
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-4">
            <span className="text-4xl mr-3">🎀</span>
            {t.home.title}
            <span className="text-4xl ml-3">✨</span>
          </h1>
          <p className="text-xl text-purple-700 mb-6">
            {t.home.subtitle}
          </p>

          {/* 네비게이션 */}
          <nav className="mb-8">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 border-4 border-pink-200 shadow-lg">
              <Link
                href={`/${locale}`}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                {t.common.home}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="px-6 py-3 text-purple-700 hover:bg-pink-100 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mx-1"
              >
                {t.common.blog}
              </Link>
              <Link
                href={`/${locale}/faq`}
                className="px-6 py-3 text-purple-700 hover:bg-pink-100 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                {t.common.faq}
              </Link>
              <div className="ml-2">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </nav>
        </div>

        {/* 상단 광고 */}
        <div className="mb-8">
          <AdBanner
            slot="top-banner"
            style={{ width: '100%', height: '90px' }}
            className="w-full"
          />
        </div>

        {/* 메인 QR코드 생성기 */}
        <div className="mb-12">
          <QRCodeGeneratorWrapper locale={locale} />
        </div>

        {/* 유틸리티 카테고리 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
            <span className="text-2xl mr-2">🛠️</span>
            모든 도구 모음
            <span className="text-2xl ml-2">💕</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {utilityCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 border-4 border-pink-200 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-bold text-purple-800">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={toolIndex}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-white to-pink-50 rounded-xl border-2 border-pink-100"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-700">
                          {tool.name}
                        </h4>
                        <p className="text-sm text-purple-600">
                          {tool.description}
                        </p>
                      </div>
                      {tool.comingSoon ? (
                        <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs rounded-full font-medium">
                          준비중 ✨
                        </span>
                      ) : (
                        <Link
                          href={tool.path}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          사용하기
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="mb-8">
          <AdBanner
            slot="bottom-banner"
            style={{ width: '100%', height: '90px' }}
            className="w-full"
          />
        </div>

        {/* 특징 섹션 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-4 border-purple-200 mb-8">
          <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            <span className="text-2xl mr-2">🌟</span>왜 Kawaii Utils를 선택해야
            할까요?
            <span className="text-2xl ml-2">💖</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🆓</div>
              <h4 className="font-bold text-purple-700 mb-2">완전 무료</h4>
              <p className="text-purple-600 text-sm">
                모든 도구를 무료로 사용할 수 있어요!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-purple-700 mb-2">모바일 최적화</h4>
              <p className="text-purple-600 text-sm">
                어디서든 편리하게 사용하세요!
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-purple-700 mb-2">빠른 속도</h4>
              <p className="text-purple-600 text-sm">
                즉시 결과를 확인할 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
