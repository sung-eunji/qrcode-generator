'use client';

import { useState, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  className?: string;
}

type QRType = 'text' | 'url' | 'wifi' | 'contact' | 'sms' | 'email' | 'phone';

interface WiFiData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
}

interface ContactData {
  name: string;
  phone: string;
  email: string;
  organization: string;
}

// 기본 URL 설정
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // 개발 환경에서는 localhost, 프로덕션에서는 실제 도메인
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://kawaii-utils.vercel.app';
};

// 랜덤 메시지 배열
const randomMessages = [
  '안녕하세요! 오늘도 좋은 하루 되세요! 💕',
  '당신의 미소가 세상을 밝게 만들어요! ✨',
  '오늘도 화이팅! 할 수 있어요! 🌟',
  '당신은 정말 특별한 사람이에요! 🎀',
  '오늘 하루도 행복하게 보내세요! 💖',
  '당신의 꿈이 이루어지길 바라요! 🌈',
  '항상 건강하고 행복하세요! 🌸',
  '당신의 노력이 빛날 거예요! ⭐',
  '오늘도 멋진 하루 되세요! 🦄',
  '당신을 응원해요! 파이팅! 🎉',
  '사랑과 행복이 가득한 하루 되세요! 💝',
  '당신의 따뜻한 마음이 전해져요! 🌺',
  '오늘도 웃음 가득한 하루 되세요! 😊',
  '당신의 긍정적인 에너지가 좋아요! ⚡',
  '모든 일이 잘 풀릴 거예요! 🍀',
];

export default function QRCodeGenerator({
  className = '',
}: QRCodeGeneratorProps) {
  const [qrType, setQrType] = useState<QRType>('text');
  const [text, setText] = useState('');
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    security: 'WPA',
  });
  const [contactData, setContactData] = useState<ContactData>({
    name: '',
    phone: '',
    email: '',
    organization: '',
  });
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    setIsGenerating(true);
    setError('');

    try {
      let qrContent = '';

      switch (qrType) {
        case 'text':
          if (!text.trim()) {
            setError('텍스트나 URL을 입력해주세요.');
            return;
          }
          // 텍스트 메시지인 경우 메시지 표시 페이지로 연결
          // 이중 인코딩을 방지하기 위해 안전하게 처리
          const encodedMessage = encodeURIComponent(text);
          qrContent = `${getBaseUrl()}/message/${encodedMessage}`;

          // URL 검증
          try {
            new URL(qrContent);
          } catch (error) {
            console.error('❌ Invalid URL generated:', error);
            setError('유효하지 않은 URL이 생성되었습니다.');
            return;
          }
          break;
        case 'url':
          if (!text.trim()) {
            setError('텍스트나 URL을 입력해주세요.');
            return;
          }
          qrContent = text;
          break;

        case 'wifi':
          if (!wifiData.ssid.trim()) {
            setError('WiFi 네트워크 이름을 입력해주세요.');
            return;
          }
          qrContent = `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:false;;`;
          break;

        case 'contact':
          if (!contactData.name.trim()) {
            setError('이름을 입력해주세요.');
            return;
          }
          qrContent = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}`;
          if (contactData.phone) qrContent += `\nTEL:${contactData.phone}`;
          if (contactData.email) qrContent += `\nEMAIL:${contactData.email}`;
          if (contactData.organization)
            qrContent += `\nORG:${contactData.organization}`;
          qrContent += '\nEND:VCARD';
          break;

        case 'sms':
          if (!text.trim()) {
            setError('전화번호를 입력해주세요.');
            return;
          }
          qrContent = `sms:${text}`;
          break;

        case 'email':
          if (!text.trim()) {
            setError('이메일 주소를 입력해주세요.');
            return;
          }
          qrContent = `mailto:${text}`;
          break;

        case 'phone':
          if (!text.trim()) {
            setError('전화번호를 입력해주세요.');
            return;
          }
          qrContent = `tel:${text}`;
          break;

        default:
          setError('지원하지 않는 QR 코드 타입입니다.');
          return;
      }

      const dataUrl = await QRCode.toDataURL(qrContent, {
        width: 400,
        margin: 4,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });

      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      setError('QR 코드 생성 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearQRCode = () => {
    setQrCodeDataUrl('');
    setText('');
    setWifiData({ ssid: '', password: '', security: 'WPA' });
    setContactData({ name: '', phone: '', email: '', organization: '' });
    setError('');
  };

  const copyUrlToClipboard = () => {
    if (qrType === 'text' && text.trim()) {
      const url = `${getBaseUrl()}/message/${encodeURIComponent(text)}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('URL이 클립보드에 복사되었습니다! 📋');
        })
        .catch(() => {
          alert('URL 복사에 실패했습니다. 수동으로 복사해주세요.');
        });
    }
  };

  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    const randomMessage = randomMessages[randomIndex];
    setText(randomMessage);
  };

  const getInputLabel = () => {
    switch (qrType) {
      case 'text':
        return '💕 특별한 메시지를 입력하세요';
      case 'url':
        return 'URL을 입력하세요';
      case 'wifi':
        return 'WiFi 정보를 입력하세요';
      case 'contact':
        return '연락처 정보를 입력하세요';
      case 'sms':
        return '전화번호를 입력하세요';
      case 'email':
        return '이메일 주소를 입력하세요';
      case 'phone':
        return '전화번호를 입력하세요';
      default:
        return '텍스트나 URL을 입력하세요';
    }
  };

  const getPlaceholder = () => {
    switch (qrType) {
      case 'text':
        return '예: 안녕하세요! 오늘도 좋은 하루 되세요! 💕';
      case 'url':
        return 'https://example.com 🌸';
      case 'sms':
        return '010-1234-5678 💕';
      case 'email':
        return 'example@email.com ✨';
      case 'phone':
        return '010-1234-5678 📞';
      default:
        return '예: https://example.com 또는 안녕하세요! 🎀';
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl border-4 border-pink-200 relative overflow-hidden ${className}`}
    >
      {/* 카와이한 장식들 */}
      <div className="absolute top-4 right-4 text-2xl animate-spin">💫</div>
      <div className="absolute bottom-4 left-4 text-xl animate-bounce">🌸</div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-8 text-center relative">
        <span className="text-3xl mr-2">🎀</span>
        카와이 QR 코드 생성기
        <span className="text-3xl ml-2">✨</span>
      </h1>

      <div className="space-y-6">
        {/* QR Type Selection */}
        <div>
          <label className="block text-lg font-bold text-purple-700 mb-4 text-center">
            <span className="text-xl mr-2">🎯</span>
            QR 코드 타입을 선택해주세요!
            <span className="text-xl ml-2">💕</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { type: 'text', label: '텍스트', icon: '📝' },
              { type: 'url', label: 'URL', icon: '🌐' },
              { type: 'wifi', label: 'WiFi', icon: '📶' },
              { type: 'contact', label: '연락처', icon: '👤' },
              { type: 'sms', label: 'SMS', icon: '💬' },
              { type: 'email', label: '이메일', icon: '📧' },
              { type: 'phone', label: '전화', icon: '📞' },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => setQrType(option.type as QRType)}
                className={`px-4 py-3 text-sm font-medium rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  qrType === option.type
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400 shadow-lg'
                    : 'bg-gradient-to-r from-white to-pink-50 text-purple-700 border-pink-200 hover:from-pink-50 hover:to-purple-50 hover:border-pink-300'
                }`}
              >
                <span className="text-lg mr-1">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          {qrType === 'wifi' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">📶</span>
                  네트워크 이름 (SSID)
                </label>
                <input
                  type="text"
                  value={wifiData.ssid}
                  onChange={(e) =>
                    setWifiData({ ...wifiData, ssid: e.target.value })
                  }
                  placeholder="WiFi 네트워크 이름을 입력해주세요! ✨"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">🔐</span>
                  비밀번호
                </label>
                <input
                  type="password"
                  value={wifiData.password}
                  onChange={(e) =>
                    setWifiData({ ...wifiData, password: e.target.value })
                  }
                  placeholder="WiFi 비밀번호를 입력해주세요! 💖"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">🛡️</span>
                  보안 타입
                </label>
                <select
                  value={wifiData.security}
                  onChange={(e) =>
                    setWifiData({
                      ...wifiData,
                      security: e.target.value as 'WPA' | 'WEP' | 'nopass',
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800"
                >
                  <option value="WPA">WPA/WPA2 🔒</option>
                  <option value="WEP">WEP 🔓</option>
                  <option value="nopass">비밀번호 없음 🆓</option>
                </select>
              </div>
            </div>
          )}

          {qrType === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">👤</span>
                  이름 *
                </label>
                <input
                  type="text"
                  value={contactData.name}
                  onChange={(e) =>
                    setContactData({ ...contactData, name: e.target.value })
                  }
                  placeholder="이름을 입력해주세요! ✨"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">📞</span>
                  전화번호
                </label>
                <input
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) =>
                    setContactData({ ...contactData, phone: e.target.value })
                  }
                  placeholder="010-1234-5678 💕"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">📧</span>
                  이메일
                </label>
                <input
                  type="email"
                  value={contactData.email}
                  onChange={(e) =>
                    setContactData({ ...contactData, email: e.target.value })
                  }
                  placeholder="example@email.com 🌸"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-purple-700 mb-2">
                  <span className="text-lg mr-1">🏢</span>
                  회사/조직
                </label>
                <input
                  type="text"
                  value={contactData.organization}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      organization: e.target.value,
                    })
                  }
                  placeholder="회사명 또는 조직명을 입력해주세요! 🎀"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                />
              </div>
            </div>
          )}

          {(qrType === 'text' ||
            qrType === 'url' ||
            qrType === 'sms' ||
            qrType === 'email' ||
            qrType === 'phone') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="qr-text"
                  className="block text-sm font-bold text-purple-700"
                >
                  <span className="text-lg mr-1">✨</span>
                  {getInputLabel()}
                </label>
                {qrType === 'text' && (
                  <button
                    type="button"
                    onClick={generateRandomMessage}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    <span className="text-sm mr-1">🎲</span>
                    랜덤 메시지
                  </button>
                )}
              </div>
              <textarea
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none bg-gradient-to-r from-white to-pink-50 text-purple-800 placeholder-pink-300"
                rows={3}
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={generateQRCode}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <span className="text-lg mr-2">⏳</span>
                  생성 중...
                </>
              ) : (
                <>
                  <span className="text-lg mr-2">✨</span>
                  QR 코드 생성하기!
                </>
              )}
            </button>

            {qrCodeDataUrl && (
              <button
                onClick={downloadQRCode}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg mr-2">💾</span>
                다운로드
              </button>
            )}

            {qrCodeDataUrl && qrType === 'text' && (
              <button
                onClick={copyUrlToClipboard}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg mr-2">📋</span>
                URL 복사
              </button>
            )}

            {qrCodeDataUrl && (
              <button
                onClick={clearQRCode}
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg mr-2">🔄</span>
                초기화
              </button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center">
            <span className="text-xl mr-2">😢</span>
            <strong>{error}</strong>
          </div>
        )}

        {/* QR Code Display */}
        {qrCodeDataUrl && (
          <div className="text-center space-y-6">
            <div className="inline-block p-6 bg-gradient-to-br from-white to-pink-50 border-4 border-pink-200 rounded-3xl shadow-2xl relative">
              {/* 카와이한 장식들 */}
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                🎉
              </div>
              <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">
                💖
              </div>

              <img
                src={qrCodeDataUrl}
                alt="Generated QR Code"
                width={400}
                height={400}
                className="max-w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200">
              <p className="text-sm text-purple-700">
                <span className="text-lg mr-2">🎯</span>
                생성된 QR 코드 타입:{' '}
                <span className="font-bold text-pink-600">
                  {qrType.toUpperCase()}
                </span>
                {(qrType === 'text' ||
                  qrType === 'url' ||
                  qrType === 'sms' ||
                  qrType === 'email' ||
                  qrType === 'phone') && (
                  <>
                    <br />
                    <span className="text-lg mr-2">📝</span>
                    {qrType === 'text' ? '메시지' : '내용'}:{' '}
                    <span className="font-mono bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-lg text-purple-800">
                      {text}
                    </span>
                    {qrType === 'text' && (
                      <>
                        <br />
                        <span className="text-lg mr-2">🔗</span>
                        연결 URL:{' '}
                        <span className="font-mono bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-lg text-purple-800 text-xs break-all">
                          {`${getBaseUrl()}/message/${encodeURIComponent(
                            text
                          )}`}
                        </span>
                        <br />
                        <span className="text-lg mr-2">🎀</span>
                        QR코드를 스캔하면 카와이한 메시지 페이지가 열려요!
                        <span className="text-lg ml-2">✨</span>
                        <br />
                        <span className="text-sm text-purple-600 mt-2 block">
                          💡 QR 스캔이 안 되면 위 URL을 직접 복사해서 브라우저에
                          붙여넣어보세요!
                        </span>
                      </>
                    )}
                  </>
                )}
                {qrType === 'wifi' && (
                  <>
                    <br />
                    <span className="text-lg mr-2">📶</span>
                    네트워크:{' '}
                    <span className="font-mono bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-lg text-purple-800">
                      {wifiData.ssid}
                    </span>
                  </>
                )}
                {qrType === 'contact' && (
                  <>
                    <br />
                    <span className="text-lg mr-2">👤</span>
                    이름:{' '}
                    <span className="font-mono bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-lg text-purple-800">
                      {contactData.name}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Canvas for additional functionality (hidden) */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
