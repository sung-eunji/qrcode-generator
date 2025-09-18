import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QR코드 자주 묻는 질문 (FAQ) - QRCode Generator',
  description:
    'QR코드에 대한 자주 묻는 질문들과 답변을 확인하세요. QR코드 생성, 사용법, 보안 등에 대한 모든 정보를 제공합니다.',
  keywords: [
    'QR코드 FAQ',
    'QR코드 질문',
    'QR코드 사용법',
    'QR코드 문제해결',
    'QR코드 도움말',
  ],
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'QR코드가 무엇인가요? 🤔',
      answer:
        'QR코드는 Quick Response Code의 줄임말로, 스마트폰으로 스캔하면 텍스트, URL, 연락처 등의 정보를 빠르게 읽을 수 있는 2차원 바코드입니다.',
    },
    {
      question: 'QR코드는 무료로 사용할 수 있나요? 💰',
      answer:
        '네! 저희 서비스는 완전 무료입니다. 회원가입이나 결제 없이 언제든지 QR코드를 생성하고 다운로드할 수 있어요.',
    },
    {
      question: '생성한 QR코드에 만료일이 있나요? ⏰',
      answer:
        'QR코드 자체에는 만료일이 없습니다. 하지만 URL을 담은 QR코드의 경우, 해당 URL이 삭제되거나 변경되면 접근할 수 없게 됩니다.',
    },
    {
      question: 'QR코드의 해상도는 어떻게 되나요? 📱',
      answer:
        '저희에서 생성하는 QR코드는 300x300 픽셀의 고해상도로, 인쇄물이나 디지털 화면에서 모두 선명하게 표시됩니다.',
    },
    {
      question: 'WiFi QR코드는 어떻게 사용하나요? 📶',
      answer:
        'WiFi QR코드를 생성하면, 스마트폰으로 스캔했을 때 자동으로 해당 WiFi 네트워크에 연결할 수 있습니다. 손님들에게 매우 편리해요!',
    },
    {
      question: 'QR코드를 스캔할 수 없는 경우 어떻게 하나요? 🔧',
      answer:
        'QR코드가 흐릿하거나 손상된 경우, 더 큰 크기로 다시 생성하거나 다른 QR코드 스캔 앱을 사용해보세요.',
    },
    {
      question: '개인정보 보안은 안전한가요? 🔒',
      answer:
        '저희는 사용자의 개인정보를 저장하지 않으며, 생성된 QR코드의 내용도 브라우저에서만 처리됩니다. 안전하게 사용하실 수 있어요.',
    },
    {
      question: '상업적 용도로 사용해도 되나요? 🏢',
      answer:
        '네! 상업적 용도로 자유롭게 사용하실 수 있습니다. 비즈니스, 마케팅, 이벤트 등 어떤 목적으로든 활용하세요.',
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
            <span className="text-3xl mr-2">❓</span>
            자주 묻는 질문
            <span className="text-3xl ml-2">💡</span>
          </h1>
          <p className="text-lg text-purple-700">
            QR코드에 대한 모든 궁금증을 해결해드려요! ✨
          </p>
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-6 border-4 border-pink-200 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-purple-800 mb-3">
                {faq.question}
              </h3>
              <p className="text-purple-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* 추가 도움말 섹션 */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-4 border-purple-200">
          <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
            <span className="text-2xl mr-2">🆘</span>더 도움이 필요하신가요?
            <span className="text-2xl ml-2">💕</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 text-center">
              <span className="text-4xl mb-4 block">📧</span>
              <h4 className="text-lg font-bold text-purple-700 mb-2">
                이메일 문의
              </h4>
              <p className="text-purple-600 mb-4">
                궁금한 점이 있으시면 언제든지 문의해주세요!
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105">
                문의하기
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-pink-200 text-center">
              <span className="text-4xl mb-4 block">📚</span>
              <h4 className="text-lg font-bold text-purple-700 mb-2">
                사용 가이드
              </h4>
              <p className="text-purple-600 mb-4">
                QR코드 생성부터 활용까지 단계별 가이드를 확인하세요!
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105">
                가이드 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
