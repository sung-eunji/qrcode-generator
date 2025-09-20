'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    // Navigate to new locale
    router.push(`/${locale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border-2 border-pink-200 hover:border-pink-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="font-medium text-purple-700">{currentLanguage?.name}</span>
        <span className="text-purple-600">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-sm rounded-xl border-2 border-pink-200 shadow-xl z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-pink-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                currentLocale === language.code ? 'bg-pink-100 text-purple-800' : 'text-purple-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLocale === language.code && <span className="ml-auto text-pink-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
