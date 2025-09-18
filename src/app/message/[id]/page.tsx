'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface MessageData {
  id: string;
  message: string;
  createdAt: string;
  author?: string;
}

export default function MessageDisplayPage() {
  const params = useParams();
  const [messageData, setMessageData] = useState<MessageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const messageId = params.id as string;
    
    if (messageId) {
      // URL에서 메시지 ID를 디코딩
      try {
        const decodedMessage = decodeURIComponent(messageId);
        setMessageData({
          id: messageId,
          message: decodedMessage,
          createdAt: new Date().toISOString(),
        });
        setIsLoading(false);
      } catch (err) {
        setError('메시지를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
        {/* 카와이한 배경 장식들 */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🌸</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">💖</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">✨</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">🎀</div>
        
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-2xl text-purple-700 font-bold">메시지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center relative overflow-hidden">
        {/* 카와이한 배경 장식들 */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🌸</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">💖</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">✨</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">🎀</div>
        
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-2xl text-red-600 font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 카와이한 배경 장식들 */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">🌸</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">💖</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">✨</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">🎀</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-bounce delay-700">🦄</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-pulse delay-300">💕</div>
      <div className="absolute top-1/4 left-1/4 text-2xl animate-bounce delay-500">🌟</div>
      <div className="absolute bottom-1/4 right-1/4 text-3xl animate-pulse delay-700">🎈</div>

      <div className="max-w-2xl w-full relative z-10">
        {/* 메인 메시지 카드 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-pink-200 shadow-2xl relative overflow-hidden">
          {/* 카와이한 장식들 */}
          <div className="absolute top-4 right-4 text-2xl animate-spin">💫</div>
          <div className="absolute bottom-4 left-4 text-xl animate-bounce">🌸</div>
          <div className="absolute top-1/2 left-4 text-2xl animate-pulse">💖</div>
          <div className="absolute top-1/2 right-4 text-2xl animate-bounce delay-500">✨</div>

          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-2">
              <span className="text-3xl mr-2">🎀</span>
              특별한 메시지
              <span className="text-3xl ml-2">✨</span>
            </h1>
            <p className="text-purple-600 text-lg">
              누군가 당신에게 보낸 귀여운 메시지예요! 💕
            </p>
          </div>

          {/* 메시지 내용 */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200 mb-6 relative">
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">💖</div>
            
            <div className="text-center">
              <p className="text-2xl text-purple-800 font-medium leading-relaxed whitespace-pre-wrap">
                {messageData?.message}
              </p>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200">
              <p className="text-sm text-purple-600">
                <span className="text-lg mr-2">📅</span>
                받은 시간: {new Date().toLocaleString('ko-KR')}
              </p>
            </div>

            {/* 홈으로 돌아가기 버튼 */}
            <div className="pt-4">
              <a
                href="/"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg mr-2">🏠</span>
                홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>

        {/* 하단 장식 */}
        <div className="text-center mt-8">
          <p className="text-purple-600 text-sm">
            <span className="text-lg mr-1">💕</span>
            Kawaii Utils로 만든 특별한 메시지
            <span className="text-lg ml-1">✨</span>
          </p>
        </div>
      </div>
    </div>
  );
}
