'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  slot: string;
  style?: React.CSSProperties;
  className?: string;
  format?: string;
  responsive?: boolean;
}

export default function AdBanner({
  slot,
  style = { display: 'block' },
  className = '',
  format = 'auto',
  responsive = true,
}: AdBannerProps) {
  useEffect(() => {
    // 개발 환경에서는 AdSense 스크립트를 로드하지 않음
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    try {
      // Google AdSense 스크립트 로드 (실제 광고를 위해서는 AdSense 승인 후 발급받은 클라이언트 ID 필요)
      if (
        typeof window !== 'undefined' &&
        !(window as unknown as { adsbygoogle?: unknown }).adsbygoogle
      ) {
        const script = document.createElement('script');
        script.async = true;
        script.src =
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);

        script.onload = () => {
          try {
            const windowWithAdsense = window as unknown as {
              adsbygoogle: unknown[];
            };
            (windowWithAdsense.adsbygoogle =
              windowWithAdsense.adsbygoogle || []).push({});
          } catch (error) {
            // 개발 환경에서는 AdSense 오류를 무시
            if (process.env.NODE_ENV === 'development') {
              console.log('AdSense not loaded yet (development mode)');
            } else {
              console.error('AdSense loading error:', error);
            }
          }
        };

        script.onerror = () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('AdSense script failed to load (development mode)');
          }
        };
      }
    } catch (error) {
      console.log('AdSense initialization error:', error);
    }
  }, []);

  // 개발 환경에서는 플레이스홀더 표시
  if (process.env.NODE_ENV === 'development') {
    return (
      <div
        className={`bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 ${className}`}
        style={style}
      >
        <div className="text-center p-4">
          <p className="text-sm font-medium">광고 영역</p>
          <p className="text-xs">AdSense Slot: {slot}</p>
        </div>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
