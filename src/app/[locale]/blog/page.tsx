import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QR코드 활용법 및 팁 - QR코드 블로그 | QRCode Generator',
  description:
    'QR코드의 다양한 활용법, 마케팅 전략, 기술적 정보를 제공하는 블로그입니다. QR코드를 더 효과적으로 사용하는 방법을 알아보세요.',
  keywords: [
    'QR코드 활용법',
    'QR코드 마케팅',
    'QR코드 팁',
    'QR코드 블로그',
    'QR코드 사용법',
    'QR코드 아이디어',
  ],
};

export default function BlogPage() {
  const blogPosts = [
    {
      title: 'QR코드로 비즈니스 마케팅 효과 높이기 💼',
      excerpt: 'QR코드를 활용한 마케팅 전략과 실제 성공 사례를 소개합니다.',
      date: '2024-01-15',
      category: '마케팅',
      readTime: '5분',
    },
    {
      title: 'WiFi QR코드로 손님 접속 편리하게 만들기 📶',
      excerpt:
        '카페나 상점에서 손님들이 쉽게 WiFi에 연결할 수 있는 방법을 알아보세요.',
      date: '2024-01-10',
      category: '실용',
      readTime: '3분',
    },
    {
      title: 'QR코드 보안 및 프라이버시 고려사항 🔒',
      excerpt: 'QR코드 사용 시 주의해야 할 보안 문제와 해결 방법을 설명합니다.',
      date: '2024-01-05',
      category: '보안',
      readTime: '7분',
    },
    {
      title: '이벤트에서 QR코드 활용하기 🎉',
      excerpt:
        '결혼식, 회사 행사, 전시회에서 QR코드를 효과적으로 사용하는 아이디어를 제시합니다.',
      date: '2024-01-01',
      category: '이벤트',
      readTime: '4분',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="text-lg mr-2">⬅️</span>
            홈으로 돌아가기
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-4">
            <span className="text-3xl mr-2">📚</span>
            QR코드 블로그
            <span className="text-3xl ml-2">✨</span>
          </h1>
          <p className="text-lg text-purple-700">
            QR코드의 다양한 활용법과 팁을 공유합니다! 💕
          </p>
        </div>

        {/* 블로그 포스트 목록 */}
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-6 border-4 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-purple-600">
                  ⏱️ {post.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-purple-800 mb-3 leading-tight">
                {post.title}
              </h2>

              <p className="text-purple-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-500">📅 {post.date}</span>
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105">
                  자세히 보기 →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* 추가 콘텐츠 섹션 */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-4 border-purple-200">
          <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">
            <span className="text-2xl mr-2">🎯</span>더 많은 QR코드 활용
            아이디어
            <span className="text-2xl ml-2">💡</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-2xl p-4 border-2 border-pink-200">
              <span className="text-3xl mb-2 block">🏪</span>
              <h4 className="font-bold text-purple-700 mb-2">상점 운영</h4>
              <p className="text-sm text-purple-600">
                메뉴판, 할인 쿠폰, 리뷰 요청
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border-2 border-pink-200">
              <span className="text-3xl mb-2 block">📱</span>
              <h4 className="font-bold text-purple-700 mb-2">모바일 앱</h4>
              <p className="text-sm text-purple-600">
                앱 다운로드, 소셜 미디어 팔로우
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 border-2 border-pink-200">
              <span className="text-3xl mb-2 block">🎓</span>
              <h4 className="font-bold text-purple-700 mb-2">교육</h4>
              <p className="text-sm text-purple-600">
                강의 자료, 숙제, 온라인 수업
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
