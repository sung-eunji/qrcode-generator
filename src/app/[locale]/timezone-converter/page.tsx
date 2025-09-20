'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Country {
  code: string;
  name: string;
  timezone: string;
  flag: string;
  offset: string;
}

// 주요 국가 및 시간대 목록
const countries: Country[] = [
  { code: 'US', name: '미국 (뉴욕)', timezone: 'America/New_York', flag: '🇺🇸', offset: '-05:00/-04:00' },
  { code: 'US-LA', name: '미국 (로스앤젤레스)', timezone: 'America/Los_Angeles', flag: '🇺🇸', offset: '-08:00/-07:00' },
  { code: 'GB', name: '영국 (런던)', timezone: 'Europe/London', flag: '🇬🇧', offset: '+00:00/+01:00' },
  { code: 'FR', name: '프랑스 (파리)', timezone: 'Europe/Paris', flag: '🇫🇷', offset: '+01:00/+02:00' },
  { code: 'JP', name: '일본 (도쿄)', timezone: 'Asia/Tokyo', flag: '🇯🇵', offset: '+09:00' },
  { code: 'CN', name: '중국 (상하이)', timezone: 'Asia/Shanghai', flag: '🇨🇳', offset: '+08:00' },
  { code: 'KR', name: '한국 (서울)', timezone: 'Asia/Seoul', flag: '🇰🇷', offset: '+09:00' },
  { code: 'AU', name: '호주 (시드니)', timezone: 'Australia/Sydney', flag: '🇦🇺', offset: '+10:00/+11:00' },
  { code: 'AE', name: 'UAE (두바이)', timezone: 'Asia/Dubai', flag: '🇦🇪', offset: '+04:00' },
  { code: 'US-CHI', name: '미국 (시카고)', timezone: 'America/Chicago', flag: '🇺🇸', offset: '-06:00/-05:00' },
  { code: 'US-DEN', name: '미국 (덴버)', timezone: 'America/Denver', flag: '🇺🇸', offset: '-07:00/-06:00' },
  { code: 'DE', name: '독일 (베를린)', timezone: 'Europe/Berlin', flag: '🇩🇪', offset: '+01:00/+02:00' },
  { code: 'ES', name: '스페인 (마드리드)', timezone: 'Europe/Madrid', flag: '🇪🇸', offset: '+01:00/+02:00' },
  { code: 'IN', name: '인도 (뭄바이)', timezone: 'Asia/Kolkata', flag: '🇮🇳', offset: '+05:30' },
  { code: 'BR', name: '브라질 (상파울루)', timezone: 'America/Sao_Paulo', flag: '🇧🇷', offset: '-03:00' },
  { code: 'NZ', name: '뉴질랜드 (오클랜드)', timezone: 'Pacific/Auckland', flag: '🇳🇿', offset: '+12:00/+13:00' },
  { code: 'EG', name: '이집트 (카이로)', timezone: 'Africa/Cairo', flag: '🇪🇬', offset: '+02:00' },
  { code: 'TH', name: '태국 (방콕)', timezone: 'Asia/Bangkok', flag: '🇹🇭', offset: '+07:00' },
  { code: 'MX', name: '멕시코 (멕시코시티)', timezone: 'America/Mexico_City', flag: '🇲🇽', offset: '-06:00/-05:00' },
  { code: 'UTC', name: 'UTC', timezone: 'UTC', flag: '🌍', offset: '+00:00' },
];

interface SelectedCountry extends Country {
  time: string;
  date: string;
  emoji: string;
}

export default function TimezoneConverter() {
  const params = useParams();
  const locale = params.locale as string;
  
  const [selectedCountries, setSelectedCountries] = useState<SelectedCountry[]>([]);
  const [referenceCountry, setReferenceCountry] = useState<Country | null>(null);
  const [referenceTime, setReferenceTime] = useState('');
  const [referenceDate, setReferenceDate] = useState('');

  // 다국어 텍스트 정의
  const translations = {
    ko: {
      title: "시간대 변환기 🌍",
      subtitle: "국가를 선택하고 시간을 설정하면 전 세계 시간을 확인할 수 있어요!",
      addCountry: "국가 추가하기",
      selectCountry: "국가를 선택하세요...",
      referenceTime: "기준 시간 설정",
      selectDate: "날짜 선택",
      selectTime: "시간 선택",
      currentTime: "현재 시간으로 설정",
      updateTime: "시간 업데이트 ✨",
      selectedCountries: "선택된 국가들",
      removeCountry: "제거",
      example: "예: 2024-01-15 14:30",
      timeFormat: "YYYY-MM-DD HH:MM 형식으로 입력하세요",
      updating: "업데이트 중...",
      errorMessage: "시간 업데이트 중 오류가 발생했습니다.",
      addMoreCountries: "더 많은 국가를 추가해보세요!",
      noCountriesSelected: "아직 선택된 국가가 없습니다."
    },
    en: {
      title: "Timezone Converter 🌍",
      subtitle: "Select countries and set time to check worldwide time!",
      addCountry: "Add Country",
      selectCountry: "Select a country...",
      referenceTime: "Set Reference Time",
      selectDate: "Select Date",
      selectTime: "Select Time",
      currentTime: "Set Current Time",
      updateTime: "Update Time ✨",
      selectedCountries: "Selected Countries",
      removeCountry: "Remove",
      example: "e.g: 2024-01-15 14:30",
      timeFormat: "Enter in YYYY-MM-DD HH:MM format",
      updating: "Updating...",
      errorMessage: "An error occurred while updating time.",
      addMoreCountries: "Add more countries to compare!",
      noCountriesSelected: "No countries selected yet."
    },
    fr: {
      title: "Convertisseur de Fuseau Horaire 🌍",
      subtitle: "Sélectionnez des pays et définissez l'heure pour vérifier l'heure mondiale!",
      addCountry: "Ajouter un Pays",
      selectCountry: "Sélectionnez un pays...",
      referenceTime: "Définir l'Heure de Référence",
      selectDate: "Sélectionner Date",
      selectTime: "Sélectionner Heure",
      currentTime: "Définir Heure Actuelle",
      updateTime: "Mettre à Jour l'Heure ✨",
      selectedCountries: "Pays Sélectionnés",
      removeCountry: "Supprimer",
      example: "ex: 2024-01-15 14:30",
      timeFormat: "Entrez au format AAAA-MM-JJ HH:MM",
      updating: "Mise à jour...",
      errorMessage: "Une erreur s'est produite lors de la mise à jour de l'heure.",
      addMoreCountries: "Ajoutez plus de pays pour comparer!",
      noCountriesSelected: "Aucun pays sélectionné pour le moment."
    }
  };

  // 시간대에 따른 표정 반환
  const getTimeEmoji = (hour: number): string => {
    if (hour >= 6 && hour < 12) return '😊'; // 아침
    if (hour >= 12 && hour < 18) return '😄'; // 오후
    if (hour >= 18 && hour < 22) return '😊'; // 저녁
    if (hour >= 22 || hour < 6) return '😴'; // 밤/새벽
    return '😐';
  };

  // 국가 추가
  const addCountry = (country: Country) => {
    if (selectedCountries.some(c => c.code === country.code)) return;
    
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: country.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const year = parts.find(part => part.type === 'year')?.value;
    const month = parts.find(part => part.type === 'month')?.value;
    const day = parts.find(part => part.type === 'day')?.value;
    const hour = parts.find(part => part.type === 'hour')?.value;
    const minute = parts.find(part => part.type === 'minute')?.value;
    
    const newCountry: SelectedCountry = {
      ...country,
      date: `${year}-${month}-${day}`,
      time: `${hour}:${minute}`,
      emoji: getTimeEmoji(parseInt(hour || '12'))
    };
    
    setSelectedCountries(prev => [...prev, newCountry]);
    
    if (!referenceCountry) {
      setReferenceCountry(country);
      setReferenceDate(newCountry.date);
      setReferenceTime(newCountry.time);
    }
  };

  // 국가 제거
  const removeCountry = (countryCode: string) => {
    setSelectedCountries(prev => prev.filter(c => c.code !== countryCode));
    
    if (referenceCountry?.code === countryCode) {
      const remaining = selectedCountries.filter(c => c.code !== countryCode);
      if (remaining.length > 0) {
        setReferenceCountry(remaining[0]);
        setReferenceDate(remaining[0].date);
        setReferenceTime(remaining[0].time);
      } else {
        setReferenceCountry(null);
        setReferenceDate('');
        setReferenceTime('');
      }
    }
  };

  // 현재 시간으로 설정
  const setCurrentTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    setReferenceDate(date);
    setReferenceTime(time);
    updateAllTimes(date, time);
  };

  // 모든 국가의 시간 업데이트
  const updateAllTimes = (date: string, time: string) => {
    if (!referenceCountry || !date || !time) return;
    
    try {
      const referenceDateTime = new Date(`${date}T${time}`);
      const updatedCountries = selectedCountries.map(country => {
        const formatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: country.timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        
        // 기준 국가의 시간대를 기준으로 UTC 시간 계산
        const referenceFormatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: referenceCountry.timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        
        // 기준 시간을 UTC로 변환한 후 각 국가의 시간대로 변환
        const parts = formatter.formatToParts(referenceDateTime);
        const year = parts.find(part => part.type === 'year')?.value;
        const month = parts.find(part => part.type === 'month')?.value;
        const day = parts.find(part => part.type === 'day')?.value;
        const hour = parts.find(part => part.type === 'hour')?.value;
        const minute = parts.find(part => part.type === 'minute')?.value;
        
        return {
          ...country,
          date: `${year}-${month}-${day}`,
          time: `${hour}:${minute}`,
          emoji: getTimeEmoji(parseInt(hour || '12'))
        };
      });
      
      setSelectedCountries(updatedCountries);
    } catch (error) {
      console.error('시간 업데이트 오류:', error);
      alert(t.errorMessage);
    }
  };

  // 기준 시간 변경 핸들러
  const handleReferenceTimeChange = (date: string, time: string) => {
    setReferenceDate(date);
    setReferenceTime(time);
    updateAllTimes(date, time);
  };

  // 컴포넌트 마운트 시 현재 시간 설정
  useEffect(() => {
    setCurrentTime();
  }, []);

  const t = translations[locale as keyof typeof translations] || translations.ko;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-8 px-4 relative overflow-hidden">
      {/* 배경 장식들 */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">🌍</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">⏰</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">🌐</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">🕐</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-bounce delay-700">🌏</div>
      <div className="absolute top-1/3 right-5 text-4xl animate-pulse delay-300">⏱️</div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
            <span className="text-3xl mr-2">🌍</span>
            {t.title}
            <span className="text-3xl ml-2">⏰</span>
          </h1>
          <p className="text-xl text-indigo-700 mb-6">
            {t.subtitle}
          </p>
        </div>

        {/* 국가 추가 섹션 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-blue-200 shadow-2xl mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
            {t.addCountry}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => addCountry(country)}
                disabled={selectedCountries.some(c => c.code === country.code)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedCountries.some(c => c.code === country.code)
                    ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-50'
                    : 'bg-white border-blue-200 hover:border-indigo-400 hover:shadow-lg'
                }`}
              >
                <div className="text-2xl mb-2">{country.flag}</div>
                <div className="text-sm font-medium text-gray-700">{country.name}</div>
                <div className="text-xs text-gray-500 mt-1">{country.offset}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 기준 시간 설정 */}
        {referenceCountry && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-green-200 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
              {t.referenceTime}
            </h2>
            <div className="text-center mb-6">
              <div className="text-lg font-medium text-gray-700 mb-4">
                기준 국가: {referenceCountry.flag} {referenceCountry.name}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                <div>
                  <label className="block text-lg font-bold text-green-700 mb-3">
                    {t.selectDate}
                  </label>
                  <input
                    type="date"
                    value={referenceDate}
                    onChange={(e) => handleReferenceTimeChange(e.target.value, referenceTime)}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold text-green-700 mb-3">
                    {t.selectTime}
                  </label>
                  <input
                    type="time"
                    value={referenceTime}
                    onChange={(e) => handleReferenceTimeChange(referenceDate, e.target.value)}
                    className="w-full p-4 border-2 border-green-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>
              <button
                onClick={setCurrentTime}
                className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t.currentTime}
              </button>
            </div>
          </div>
        )}

        {/* 선택된 국가들 표시 */}
        {selectedCountries.length > 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-indigo-200 shadow-2xl mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
              {t.selectedCountries}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCountries.map((country) => (
                <div
                  key={country.code}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200 relative"
                >
                  <button
                    onClick={() => removeCountry(country.code)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                  >
                    ×
                  </button>
                  
                  <div className="text-center">
                    <div className="text-3xl mb-3">{country.flag}</div>
                    <div className="text-lg font-bold text-indigo-800 mb-2">
                      {country.name}
                    </div>
                    <div className="text-2xl font-bold text-indigo-700 mb-2">
                      {country.time}
                      <span className="text-3xl ml-2">{country.emoji}</span>
                    </div>
                    <div className="text-sm text-indigo-600">
                      {country.date}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {country.offset}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200 text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">
              {t.noCountriesSelected}
            </h3>
            <p className="text-indigo-600">
              {t.addMoreCountries}
            </p>
          </div>
        )}

        {/* 도움말 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-indigo-700 mb-3 text-center">
            💡 사용 팁
          </h3>
          <div className="text-indigo-600 text-center">
            <p className="mb-2">• {t.example}</p>
            <p>• {t.timeFormat}</p>
            <p className="mt-2">• 국가를 선택한 후 기준 시간을 변경하면 모든 국가의 시간이 자동으로 업데이트됩니다!</p>
          </div>
        </div>
      </div>
    </div>
  );
}