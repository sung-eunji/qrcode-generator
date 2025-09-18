import QRCodeGenerator from '@/components/QRCodeGenerator';
import AdBanner from '@/components/AdBanner';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 py-8 px-4 relative overflow-hidden">
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

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* 네비게이션 */}
        <nav className="mb-8 text-center">
          <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl p-2 border-4 border-pink-200 shadow-lg">
            <a
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              🏠 홈
            </a>
            <a
              href="/blog"
              className="px-6 py-3 text-purple-700 hover:bg-pink-100 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 mx-1"
            >
              📚 블로그
            </a>
            <a
              href="/faq"
              className="px-6 py-3 text-purple-700 hover:bg-pink-100 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              ❓ FAQ
            </a>
          </div>
        </nav>

        {/* 상단 광고 */}
        <div className="mb-8">
          <AdBanner
            slot="top-banner"
            style={{ width: '100%', height: '90px' }}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <QRCodeGenerator />
          </div>

          {/* 사이드바 광고 */}
          <div className="lg:col-span-1 space-y-6">
            <AdBanner
              slot="sidebar-1"
              style={{ width: '300px', height: '250px' }}
              className="w-full"
            />
            <AdBanner
              slot="sidebar-2"
              style={{ width: '300px', height: '600px' }}
              className="w-full"
            />
          </div>
        </div>

        {/* 하단 광고 */}
        <div className="mt-8">
          <AdBanner
            slot="bottom-banner"
            style={{ width: '100%', height: '90px' }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
