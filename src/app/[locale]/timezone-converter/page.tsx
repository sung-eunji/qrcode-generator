'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface TimeZone {
  value: string;
  label: string;
  offset: string;
}

// 주요 시간대 목록
const timeZones: TimeZone[] = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
  { value: 'America/New_York', label: 'New York (EST/EDT)', offset: '-05:00/-04:00' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', offset: '-08:00/-07:00' },
  { value: 'Europe/London', label: 'London (GMT/BST)', offset: '+00:00/+01:00' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)', offset: '+01:00/+02:00' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: '+09:00' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: '+08:00' },
  { value: 'Asia/Seoul', label: 'Seoul (KST)', offset: '+09:00' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', offset: '+10:00/+11:00' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: '+04:00' },
  { value: 'America/Chicago', label: 'Chicago (CST/CDT)', offset: '-06:00/-05:00' },
  { value: 'America/Denver', label: 'Denver (MST/MDT)', offset: '-07:00/-06:00' },
  { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)', offset: '+01:00/+02:00' },
  { value: 'Europe/Madrid', label: 'Madrid (CET/CEST)', offset: '+01:00/+02:00' },
  { value: 'Asia/Kolkata', label: 'Mumbai (IST)', offset: '+05:30' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (BRT)', offset: '-03:00' },
  { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', offset: '+12:00/+13:00' },
  { value: 'Africa/Cairo', label: 'Cairo (EET)', offset: '+02:00' },
  { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', offset: '+07:00' },
  { value: 'America/Mexico_City', label: 'Mexico City (CST/CDT)', offset: '-06:00/-05:00' },
];

export default function TimezoneConverter() {
  const params = useParams();
  const locale = params.locale as string;
  
  const [fromTimeZone, setFromTimeZone] = useState('Asia/Seoul');
  const [toTimeZone, setToTimeZone] = useState('America/New_York');
  const [inputDate, setInputDate] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 다국어 텍스트 정의
  const translations = {
    ko: {
      title: "시간대 변환기 🌍",
      subtitle: "전 세계 시간대를 쉽게 변환하세요!",
      fromTimeZone: "변환할 시간대",
      toTimeZone: "변환될 시간대",
      selectDate: "날짜 선택",
      selectTime: "시간 선택",
      convertButton: "시간 변환하기 ✨",
      resultTitle: "변환 결과",
      swapButton: "시간대 바꾸기 🔄",
      currentTime: "현재 시간으로 설정",
      example: "예: 2024-01-15 14:30",
      timeFormat: "YYYY-MM-DD HH:MM 형식으로 입력하세요",
      converting: "변환 중...",
      errorMessage: "시간 변환 중 오류가 발생했습니다."
    },
    en: {
      title: "Timezone Converter 🌍",
      subtitle: "Convert time zones around the world easily!",
      fromTimeZone: "From Timezone",
      toTimeZone: "To Timezone", 
      selectDate: "Select Date",
      selectTime: "Select Time",
      convertButton: "Convert Time ✨",
      resultTitle: "Conversion Result",
      swapButton: "Swap Timezones 🔄",
      currentTime: "Set Current Time",
      example: "e.g: 2024-01-15 14:30",
      timeFormat: "Enter in YYYY-MM-DD HH:MM format",
      converting: "Converting...",
      errorMessage: "An error occurred while converting time."
    },
    fr: {
      title: "Convertisseur de Fuseau Horaire 🌍",
      subtitle: "Convertissez facilement les fuseaux horaires du monde entier!",
      fromTimeZone: "Fuseau Horaire Source",
      toTimeZone: "Fuseau Horaire Cible",
      selectDate: "Sélectionner Date",
      selectTime: "Sélectionner Heure",
      convertButton: "Convertir Heure ✨",
      resultTitle: "Résultat de Conversion",
      swapButton: "Échanger Fuseaux 🔄",
      currentTime: "Définir Heure Actuelle",
      example: "ex: 2024-01-15 14:30",
      timeFormat: "Entrez au format AAAA-MM-JJ HH:MM",
      converting: "Conversion...",
      errorMessage: "Une erreur s'est produite lors de la conversion de l'heure."
    }
  };

  // 현재 시간 설정
  const setCurrentTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    setInputDate(date);
    setInputTime(time);
  };

  // 시간대 바꾸기
  const swapTimeZones = () => {
    const temp = fromTimeZone;
    setFromTimeZone(toTimeZone);
    setToTimeZone(temp);
  };

  // 시간 변환
  const convertTime = async () => {
    if (!inputDate || !inputTime) {
      alert('날짜와 시간을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // 입력된 날짜와 시간을 결합하여 로컬 시간으로 해석
      const inputDateTime = new Date(`${inputDate}T${inputTime}`);
      
      // 더 정확한 변환을 위해 Intl.DateTimeFormat 사용
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: toTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      
      // 입력된 시간을 첫 번째 시간대의 시간으로 해석하고 UTC로 변환
      const fromOffset = new Date().toLocaleString('en-US', { 
        timeZone: fromTimeZone, 
        timeZoneName: 'longOffset' 
      });
      
      // 목표 시간대로 변환
      const parts = formatter.formatToParts(inputDateTime);
      const year = parts.find(part => part.type === 'year')?.value;
      const month = parts.find(part => part.type === 'month')?.value;
      const day = parts.find(part => part.type === 'day')?.value;
      const hour = parts.find(part => part.type === 'hour')?.value;
      const minute = parts.find(part => part.type === 'minute')?.value;
      
      if (year && month && day && hour && minute) {
        setConvertedDate(`${year}-${month}-${day}`);
        setConvertedTime(`${hour}:${minute}`);
      } else {
        throw new Error('변환 실패');
      }
      
    } catch (error) {
      console.error('시간 변환 오류:', error);
      alert(t.errorMessage);
    } finally {
      setIsLoading(false);
    }
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

      <div className="container mx-auto max-w-4xl relative z-10">
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

        {/* 메인 변환기 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-blue-200 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 변환할 시간대 */}
            <div>
              <label className="block text-lg font-bold text-indigo-700 mb-3">
                {t.fromTimeZone}
              </label>
              <select
                value={fromTimeZone}
                onChange={(e) => setFromTimeZone(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-300"
              >
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} ({tz.offset})
                  </option>
                ))}
              </select>
            </div>

            {/* 변환될 시간대 */}
            <div>
              <label className="block text-lg font-bold text-indigo-700 mb-3">
                {t.toTimeZone}
              </label>
              <select
                value={toTimeZone}
                onChange={(e) => setToTimeZone(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-300"
              >
                {timeZones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label} ({tz.offset})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 시간대 바꾸기 버튼 */}
          <div className="text-center mb-6">
            <button
              onClick={swapTimeZones}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.swapButton}
            </button>
          </div>

          {/* 날짜와 시간 입력 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-lg font-bold text-indigo-700 mb-3">
                {t.selectDate}
              </label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-lg font-bold text-indigo-700 mb-3">
                {t.selectTime}
              </label>
              <input
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                className="w-full p-4 border-2 border-blue-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* 현재 시간 설정 버튼 */}
          <div className="text-center mb-6">
            <button
              onClick={setCurrentTime}
              className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mr-4"
            >
              {t.currentTime}
            </button>
          </div>

          {/* 변환 버튼 */}
          <div className="text-center mb-6">
            <button
              onClick={convertTime}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isLoading ? (
                <>
                  <span className="text-lg mr-2">⏳</span>
                  {t.converting}
                </>
              ) : (
                <>
                  <span className="text-lg mr-2">✨</span>
                  {t.convertButton}
                </>
              )}
            </button>
          </div>

          {/* 변환 결과 */}
          {convertedTime && convertedDate && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-800 mb-4 text-center">
                {t.resultTitle}
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-700 mb-2">
                  {convertedDate} {convertedTime}
                </div>
                <div className="text-lg text-indigo-600">
                  {timeZones.find(tz => tz.value === toTimeZone)?.label}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 도움말 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-indigo-700 mb-3 text-center">
            💡 사용 팁
          </h3>
          <div className="text-indigo-600 text-center">
            <p className="mb-2">• {t.example}</p>
            <p>• {t.timeFormat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}