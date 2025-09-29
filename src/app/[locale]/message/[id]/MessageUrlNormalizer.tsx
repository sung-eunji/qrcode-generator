'use client';

import { useEffect } from 'react';

interface MessageUrlNormalizerProps {
  locale: string;
  id: string;
}

export default function MessageUrlNormalizer({
  locale,
  id,
}: MessageUrlNormalizerProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // If the visible path contains unencoded characters, normalize to an encoded path without reload
      const encodedId = encodeURIComponent(id);
      const expectedPath = `/${locale}/message/${encodedId}`;
      const currentPath =
        window.location.pathname +
        window.location.search +
        window.location.hash;

      if (!window.location.pathname.endsWith(`/${encodedId}`)) {
        const newUrl = `${window.location.origin}${expectedPath}${window.location.search}${window.location.hash}`;
        window.history.replaceState(null, '', newUrl);
      }
    } catch {
      // no-op: do not break rendering
    }
  }, [locale, id]);

  return null;
}
