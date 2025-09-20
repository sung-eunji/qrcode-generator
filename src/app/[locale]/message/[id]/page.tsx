import Link from 'next/link';

interface MessagePageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function MessagePage({ params }: MessagePageProps) {
  const { locale, id } = await params;

  // URL 파라미터를 안전하게 디코딩
  let message: string;
  try {
    // 이미 디코딩된 경우와 인코딩된 경우 모두 처리
    message = decodeURIComponent(id);
  } catch {
    // 디코딩 실패 시 원본 사용
    message = id;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
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

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 메시지 카드 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-pink-200 shadow-2xl mb-8">
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce">🎀</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-4">
              {locale === 'ko' && '특별한 메시지가 도착했어요!'}
              {locale === 'en' && 'Special message arrived!'}
              {locale === 'fr' && 'Message spécial arrivé !'}
            </h1>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mb-6">
            <p className="text-xl text-purple-800 leading-relaxed">{message}</p>
          </div>

          <div className="text-sm text-purple-600 mb-6">
            <span className="text-lg mr-2">💫</span>
            {locale === 'ko' && '이 메시지는 QR코드로 전달되었어요!'}
            {locale === 'en' && 'This message was delivered via QR code!'}
            {locale === 'fr' && 'Ce message a été livré via QR code !'}
            <span className="text-lg ml-2">✨</span>
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Link
            href={`/${locale}`}
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="text-lg mr-2">🏠</span>
            {locale === 'ko' && '홈으로 돌아가기'}
            {locale === 'en' && 'Back to Home'}
            {locale === 'fr' && "Retour à l'Accueil"}
          </Link>

          <div className="text-center">
            <Link
              href={`/${locale}`}
              className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
            >
              <span className="text-lg mr-2">🎀</span>
              {locale === 'ko' && '나도 QR코드 만들어보기'}
              {locale === 'en' && 'Create QR Code'}
              {locale === 'fr' && 'Créer QR Code'}
              <span className="text-lg ml-2">✨</span>
            </Link>
          </div>
        </div>

        {/* 추가 장식 */}
        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4 text-2xl">
            <span className="animate-bounce delay-100">💖</span>
            <span className="animate-bounce delay-200">🌸</span>
            <span className="animate-bounce delay-300">✨</span>
            <span className="animate-bounce delay-400">🎀</span>
            <span className="animate-bounce delay-500">💕</span>
          </div>
        </div>
      </div>
    </div>
  );
}
