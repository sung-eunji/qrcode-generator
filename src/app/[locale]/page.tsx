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
      home: { 
        title: "Kawaii Utils", 
        subtitle: "귀여운 무료 온라인 도구 모음집! QR코드부터 변환기까지 🎀",
        allTools: "모든 도구 모음 💕",
        whyChoose: "왜 Kawaii Utils를 선택해야 할까요? 💖",
        completelyFree: "완전 무료",
        completelyFreeDesc: "모든 도구를 무료로 사용할 수 있어요!",
        mobileOptimized: "모바일 최적화", 
        mobileOptimizedDesc: "어디서든 편리하게 사용하세요!",
        fastSpeed: "빠른 속도",
        fastSpeedDesc: "즉시 결과를 확인할 수 있어요!"
      },
      categories: { qrTools: "QR코드 도구", converters: "변환기", devTools: "개발자 도구", dailyTools: "일상 도구" },
      tools: {
        qrGenerator: "QR코드 생성기",
        qrGeneratorDesc: "다양한 타입의 QR코드 생성",
        qrAnalyzer: "QR코드 분석기", 
        qrAnalyzerDesc: "QR코드 내용 분석",
        qrCustomizer: "QR코드 커스터마이징",
        qrCustomizerDesc: "로고 삽입, 색상 변경",
        timezoneConverter: "시간대 변환기",
        timezoneConverterDesc: "세계 시간 변환",
        currencyConverter: "환율 변환기",
        currencyConverterDesc: "실시간 환율 계산",
        unitConverter: "단위 변환기",
        unitConverterDesc: "길이, 무게, 온도 등",
        base64Encoder: "Base64 인코더",
        base64EncoderDesc: "Base64 인코딩/디코딩",
        hashGenerator: "해시 생성기",
        hashGeneratorDesc: "MD5, SHA256 해시",
        jsonFormatter: "JSON 포맷터",
        jsonFormatterDesc: "JSON 정렬 및 검증",
        colorPicker: "색상 선택기",
        colorPickerDesc: "HEX, RGB 색상 변환",
        randomGenerator: "랜덤 생성기",
        randomGeneratorDesc: "숫자, 색상, 비밀번호",
        dateCalculator: "날짜 계산기",
        dateCalculatorDesc: "날짜 차이, 요일 계산"
      }
    },
    en: {
      common: { home: "🏠 Home", blog: "📚 Blog", faq: "❓ FAQ", use: "Use", comingSoon: "Coming Soon ✨" },
      home: { 
        title: "Kawaii Utils", 
        subtitle: "Cute free online tools collection! From QR codes to converters 🎀",
        allTools: "All Tools Collection 💕",
        whyChoose: "Why choose Kawaii Utils? 💖",
        completelyFree: "Completely Free",
        completelyFreeDesc: "Use all tools for free!",
        mobileOptimized: "Mobile Optimized",
        mobileOptimizedDesc: "Use conveniently anywhere!",
        fastSpeed: "Fast Speed",
        fastSpeedDesc: "Check results instantly!"
      },
      categories: { qrTools: "QR Code Tools", converters: "Converters", devTools: "Developer Tools", dailyTools: "Daily Tools" },
      tools: {
        qrGenerator: "QR Code Generator",
        qrGeneratorDesc: "Generate various types of QR codes",
        qrAnalyzer: "QR Code Analyzer",
        qrAnalyzerDesc: "Analyze QR code content",
        qrCustomizer: "QR Code Customizer",
        qrCustomizerDesc: "Insert logos, change colors",
        timezoneConverter: "Timezone Converter",
        timezoneConverterDesc: "World time conversion",
        currencyConverter: "Currency Converter",
        currencyConverterDesc: "Real-time exchange rate calculation",
        unitConverter: "Unit Converter",
        unitConverterDesc: "Length, weight, temperature, etc.",
        base64Encoder: "Base64 Encoder",
        base64EncoderDesc: "Base64 encoding/decoding",
        hashGenerator: "Hash Generator",
        hashGeneratorDesc: "MD5, SHA256 hash",
        jsonFormatter: "JSON Formatter",
        jsonFormatterDesc: "JSON sorting and validation",
        colorPicker: "Color Picker",
        colorPickerDesc: "HEX, RGB color conversion",
        randomGenerator: "Random Generator",
        randomGeneratorDesc: "Numbers, colors, passwords",
        dateCalculator: "Date Calculator",
        dateCalculatorDesc: "Date difference, day calculation"
      }
    },
    fr: {
      common: { home: "🏠 Accueil", blog: "📚 Blog", faq: "❓ FAQ", use: "Utiliser", comingSoon: "Bientôt ✨" },
      home: { 
        title: "Kawaii Utils", 
        subtitle: "Collection d'outils en ligne gratuits et mignons ! Des QR codes aux convertisseurs 🎀",
        allTools: "Collection de Tous les Outils 💕",
        whyChoose: "Pourquoi choisir Kawaii Utils ? 💖",
        completelyFree: "Complètement Gratuit",
        completelyFreeDesc: "Utilisez tous les outils gratuitement !",
        mobileOptimized: "Optimisé Mobile",
        mobileOptimizedDesc: "Utilisez commodément n'importe où !",
        fastSpeed: "Vitesse Rapide",
        fastSpeedDesc: "Vérifiez les résultats instantanément !"
      },
      categories: { qrTools: "Outils QR Code", converters: "Convertisseurs", devTools: "Outils Développeur", dailyTools: "Outils Quotidiens" },
      tools: {
        qrGenerator: "Générateur QR Code",
        qrGeneratorDesc: "Générer différents types de QR codes",
        qrAnalyzer: "Analyseur QR Code",
        qrAnalyzerDesc: "Analyser le contenu du QR code",
        qrCustomizer: "Personnalisateur QR Code",
        qrCustomizerDesc: "Insérer logos, changer couleurs",
        timezoneConverter: "Convertisseur Fuseau Horaire",
        timezoneConverterDesc: "Conversion d'heure mondiale",
        currencyConverter: "Convertisseur de Devise",
        currencyConverterDesc: "Calcul de taux de change en temps réel",
        unitConverter: "Convertisseur d'Unités",
        unitConverterDesc: "Longueur, poids, température, etc.",
        base64Encoder: "Encodeur Base64",
        base64EncoderDesc: "Encodage/décodage Base64",
        hashGenerator: "Générateur de Hachage",
        hashGeneratorDesc: "Hachage MD5, SHA256",
        jsonFormatter: "Formateur JSON",
        jsonFormatterDesc: "Tri et validation JSON",
        colorPicker: "Sélecteur de Couleur",
        colorPickerDesc: "Conversion couleur HEX, RGB",
        randomGenerator: "Générateur Aléatoire",
        randomGeneratorDesc: "Nombres, couleurs, mots de passe",
        dateCalculator: "Calculateur de Date",
        dateCalculatorDesc: "Différence de date, calcul de jour"
      }
    }
  };
  
  const t = messages[locale as keyof typeof messages] || messages.ko;
  const utilityCategories = [
    {
      title: t.categories.qrTools,
      icon: '📱',
      color: 'from-pink-500 to-purple-500',
      tools: [
        {
          name: t.tools.qrGenerator,
          path: '/qr-generator',
          description: t.tools.qrGeneratorDesc,
        },
        {
          name: t.tools.qrAnalyzer,
          path: '/qr-analyzer',
          description: t.tools.qrAnalyzerDesc,
          comingSoon: true,
        },
        {
          name: t.tools.qrCustomizer,
          path: '/qr-customizer',
          description: t.tools.qrCustomizerDesc,
          comingSoon: true,
        },
      ],
    },
    {
      title: t.categories.converters,
      icon: '🔄',
      color: 'from-blue-500 to-cyan-500',
      tools: [
        {
          name: t.tools.timezoneConverter,
          path: `/${locale}/timezone-converter`,
          description: t.tools.timezoneConverterDesc,
          comingSoon: false,
        },
        {
          name: t.tools.currencyConverter,
          path: '/currency-converter',
          description: t.tools.currencyConverterDesc,
          comingSoon: true,
        },
        {
          name: t.tools.unitConverter,
          path: '/unit-converter',
          description: t.tools.unitConverterDesc,
          comingSoon: true,
        },
      ],
    },
    {
      title: t.categories.devTools,
      icon: '💻',
      color: 'from-green-500 to-emerald-500',
      tools: [
        {
          name: t.tools.base64Encoder,
          path: '/base64-encoder',
          description: t.tools.base64EncoderDesc,
          comingSoon: true,
        },
        {
          name: t.tools.hashGenerator,
          path: '/hash-generator',
          description: t.tools.hashGeneratorDesc,
          comingSoon: true,
        },
        {
          name: t.tools.jsonFormatter,
          path: '/json-formatter',
          description: t.tools.jsonFormatterDesc,
          comingSoon: true,
        },
      ],
    },
    {
      title: t.categories.dailyTools,
      icon: '✨',
      color: 'from-yellow-500 to-orange-500',
      tools: [
        {
          name: t.tools.colorPicker,
          path: '/color-picker',
          description: t.tools.colorPickerDesc,
          comingSoon: true,
        },
        {
          name: t.tools.randomGenerator,
          path: '/random-generator',
          description: t.tools.randomGeneratorDesc,
          comingSoon: true,
        },
        {
          name: t.tools.dateCalculator,
          path: '/date-calculator',
          description: t.tools.dateCalculatorDesc,
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
            {t.home.allTools}
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
                          {t.common.comingSoon}
                        </span>
                      ) : (
                        <Link
                          href={tool.path}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                        >
                          {t.common.use}
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
            <span className="text-2xl mr-2">🌟</span>{t.home.whyChoose}
            <span className="text-2xl ml-2">💖</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🆓</div>
              <h4 className="font-bold text-purple-700 mb-2">{t.home.completelyFree}</h4>
              <p className="text-purple-600 text-sm">
                {t.home.completelyFreeDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h4 className="font-bold text-purple-700 mb-2">{t.home.mobileOptimized}</h4>
              <p className="text-purple-600 text-sm">
                {t.home.mobileOptimizedDesc}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-bold text-purple-700 mb-2">{t.home.fastSpeed}</h4>
              <p className="text-purple-600 text-sm">
                {t.home.fastSpeedDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
