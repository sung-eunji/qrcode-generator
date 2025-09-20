'use client';

import dynamic from 'next/dynamic';

const QRCodeGenerator = dynamic(() => import('./QRCodeGenerator'), {
  ssr: false,
  loading: () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-pink-200 shadow-2xl mb-8 text-center">
      <div className="animate-spin text-4xl mb-4">⏳</div>
      <p className="text-purple-600">QR 코드 생성기를 불러오는 중...</p>
    </div>
  ),
});

export default QRCodeGenerator;
