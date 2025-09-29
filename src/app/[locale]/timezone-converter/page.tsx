'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

interface Location {
  code: string;
  name: string;
  country: string;
  timezone: string;
  flag: string;
  offset: string;
  timezoneAbbr: string;
}

interface SelectedLocation extends Location {
  time: string;
  date: string;
  dayName: string;
  monthName: string;
  emoji: string;
}

// 확장된 위치 목록
const locations: Location[] = [
  {
    code: 'US-NYC',
    name: 'New York',
    country: 'United States',
    timezone: 'America/New_York',
    flag: '🇺🇸',
    offset: '-05:00/-04:00',
    timezoneAbbr: 'EST/EDT',
  },
  {
    code: 'US-LA',
    name: 'Los Angeles',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    flag: '🇺🇸',
    offset: '-08:00/-07:00',
    timezoneAbbr: 'PST/PDT',
  },
  {
    code: 'GB',
    name: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    flag: '🇬🇧',
    offset: '+00:00/+01:00',
    timezoneAbbr: 'GMT/BST',
  },
  {
    code: 'FR',
    name: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    flag: '🇫🇷',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'JP',
    name: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    flag: '🇯🇵',
    offset: '+09:00',
    timezoneAbbr: 'JST',
  },
  {
    code: 'CN',
    name: 'Shanghai',
    country: 'China',
    timezone: 'Asia/Shanghai',
    flag: '🇨🇳',
    offset: '+08:00',
    timezoneAbbr: 'CST',
  },
  {
    code: 'KR',
    name: 'Seoul',
    country: 'South Korea',
    timezone: 'Asia/Seoul',
    flag: '🇰🇷',
    offset: '+09:00',
    timezoneAbbr: 'KST',
  },
  {
    code: 'AU',
    name: 'Sydney',
    country: 'Australia',
    timezone: 'Australia/Sydney',
    flag: '🇦🇺',
    offset: '+10:00/+11:00',
    timezoneAbbr: 'AEST/AEDT',
  },
  {
    code: 'AE',
    name: 'Dubai',
    country: 'UAE',
    timezone: 'Asia/Dubai',
    flag: '🇦🇪',
    offset: '+04:00',
    timezoneAbbr: 'GST',
  },
  {
    code: 'US-CHI',
    name: 'Chicago',
    country: 'United States',
    timezone: 'America/Chicago',
    flag: '🇺🇸',
    offset: '-06:00/-05:00',
    timezoneAbbr: 'CST/CDT',
  },
  {
    code: 'US-DEN',
    name: 'Denver',
    country: 'United States',
    timezone: 'America/Denver',
    flag: '🇺🇸',
    offset: '-07:00/-06:00',
    timezoneAbbr: 'MST/MDT',
  },
  {
    code: 'DE',
    name: 'Berlin',
    country: 'Germany',
    timezone: 'Europe/Berlin',
    flag: '🇩🇪',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'ES',
    name: 'Madrid',
    country: 'Spain',
    timezone: 'Europe/Madrid',
    flag: '🇪🇸',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'IN',
    name: 'Mumbai',
    country: 'India',
    timezone: 'Asia/Kolkata',
    flag: '🇮🇳',
    offset: '+05:30',
    timezoneAbbr: 'IST',
  },
  {
    code: 'BR',
    name: 'São Paulo',
    country: 'Brazil',
    timezone: 'America/Sao_Paulo',
    flag: '🇧🇷',
    offset: '-03:00',
    timezoneAbbr: 'BRT',
  },
  {
    code: 'NZ',
    name: 'Auckland',
    country: 'New Zealand',
    timezone: 'Pacific/Auckland',
    flag: '🇳🇿',
    offset: '+12:00/+13:00',
    timezoneAbbr: 'NZST/NZDT',
  },
  {
    code: 'EG',
    name: 'Cairo',
    country: 'Egypt',
    timezone: 'Africa/Cairo',
    flag: '🇪🇬',
    offset: '+02:00',
    timezoneAbbr: 'EET',
  },
  {
    code: 'TH',
    name: 'Bangkok',
    country: 'Thailand',
    timezone: 'Asia/Bangkok',
    flag: '🇹🇭',
    offset: '+07:00',
    timezoneAbbr: 'ICT',
  },
  {
    code: 'MX',
    name: 'Mexico City',
    country: 'Mexico',
    timezone: 'America/Mexico_City',
    flag: '🇲🇽',
    offset: '-06:00/-05:00',
    timezoneAbbr: 'CST/CDT',
  },
  {
    code: 'CA',
    name: 'Toronto',
    country: 'Canada',
    timezone: 'America/Toronto',
    flag: '🇨🇦',
    offset: '-05:00/-04:00',
    timezoneAbbr: 'EST/EDT',
  },
  {
    code: 'RU',
    name: 'Moscow',
    country: 'Russia',
    timezone: 'Europe/Moscow',
    flag: '🇷🇺',
    offset: '+03:00',
    timezoneAbbr: 'MSK',
  },
  {
    code: 'SG',
    name: 'Singapore',
    country: 'Singapore',
    timezone: 'Asia/Singapore',
    flag: '🇸🇬',
    offset: '+08:00',
    timezoneAbbr: 'SGT',
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    country: 'Hong Kong',
    timezone: 'Asia/Hong_Kong',
    flag: '🇭🇰',
    offset: '+08:00',
    timezoneAbbr: 'HKT',
  },
  {
    code: 'TW',
    name: 'Taipei',
    country: 'Taiwan',
    timezone: 'Asia/Taipei',
    flag: '🇹🇼',
    offset: '+08:00',
    timezoneAbbr: 'CST',
  },
  {
    code: 'IT',
    name: 'Rome',
    country: 'Italy',
    timezone: 'Europe/Rome',
    flag: '🇮🇹',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'NL',
    name: 'Amsterdam',
    country: 'Netherlands',
    timezone: 'Europe/Amsterdam',
    flag: '🇳🇱',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'CH',
    name: 'Zurich',
    country: 'Switzerland',
    timezone: 'Europe/Zurich',
    flag: '🇨🇭',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'SE',
    name: 'Stockholm',
    country: 'Sweden',
    timezone: 'Europe/Stockholm',
    flag: '🇸🇪',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'NO',
    name: 'Oslo',
    country: 'Norway',
    timezone: 'Europe/Oslo',
    flag: '🇳🇴',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'DK',
    name: 'Copenhagen',
    country: 'Denmark',
    timezone: 'Europe/Copenhagen',
    flag: '🇩🇰',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'FI',
    name: 'Helsinki',
    country: 'Finland',
    timezone: 'Europe/Helsinki',
    flag: '🇫🇮',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'PL',
    name: 'Warsaw',
    country: 'Poland',
    timezone: 'Europe/Warsaw',
    flag: '🇵🇱',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'AT',
    name: 'Vienna',
    country: 'Austria',
    timezone: 'Europe/Vienna',
    flag: '🇦🇹',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'BE',
    name: 'Brussels',
    country: 'Belgium',
    timezone: 'Europe/Brussels',
    flag: '🇧🇪',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'PT',
    name: 'Lisbon',
    country: 'Portugal',
    timezone: 'Europe/Lisbon',
    flag: '🇵🇹',
    offset: '+00:00/+01:00',
    timezoneAbbr: 'WET/WEST',
  },
  {
    code: 'GR',
    name: 'Athens',
    country: 'Greece',
    timezone: 'Europe/Athens',
    flag: '🇬🇷',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'TR',
    name: 'Istanbul',
    country: 'Turkey',
    timezone: 'Europe/Istanbul',
    flag: '🇹🇷',
    offset: '+03:00',
    timezoneAbbr: 'TRT',
  },
  {
    code: 'ZA',
    name: 'Johannesburg',
    country: 'South Africa',
    timezone: 'Africa/Johannesburg',
    flag: '🇿🇦',
    offset: '+02:00',
    timezoneAbbr: 'SAST',
  },
  {
    code: 'NG',
    name: 'Lagos',
    country: 'Nigeria',
    timezone: 'Africa/Lagos',
    flag: '🇳🇬',
    offset: '+01:00',
    timezoneAbbr: 'WAT',
  },
  {
    code: 'KE',
    name: 'Nairobi',
    country: 'Kenya',
    timezone: 'Africa/Nairobi',
    flag: '🇰🇪',
    offset: '+03:00',
    timezoneAbbr: 'EAT',
  },
  {
    code: 'AR',
    name: 'Buenos Aires',
    country: 'Argentina',
    timezone: 'America/Argentina/Buenos_Aires',
    flag: '🇦🇷',
    offset: '-03:00',
    timezoneAbbr: 'ART',
  },
  {
    code: 'CL',
    name: 'Santiago',
    country: 'Chile',
    timezone: 'America/Santiago',
    flag: '🇨🇱',
    offset: '-03:00/-04:00',
    timezoneAbbr: 'CLT/CLST',
  },
  {
    code: 'CO',
    name: 'Bogotá',
    country: 'Colombia',
    timezone: 'America/Bogota',
    flag: '🇨🇴',
    offset: '-05:00',
    timezoneAbbr: 'COT',
  },
  {
    code: 'PE',
    name: 'Lima',
    country: 'Peru',
    timezone: 'America/Lima',
    flag: '🇵🇪',
    offset: '-05:00',
    timezoneAbbr: 'PET',
  },
  {
    code: 'VE',
    name: 'Caracas',
    country: 'Venezuela',
    timezone: 'America/Caracas',
    flag: '🇻🇪',
    offset: '-04:00',
    timezoneAbbr: 'VET',
  },
  {
    code: 'ID',
    name: 'Jakarta',
    country: 'Indonesia',
    timezone: 'Asia/Jakarta',
    flag: '🇮🇩',
    offset: '+07:00',
    timezoneAbbr: 'WIB',
  },
  {
    code: 'MY',
    name: 'Kuala Lumpur',
    country: 'Malaysia',
    timezone: 'Asia/Kuala_Lumpur',
    flag: '🇲🇾',
    offset: '+08:00',
    timezoneAbbr: 'MYT',
  },
  {
    code: 'PH',
    name: 'Manila',
    country: 'Philippines',
    timezone: 'Asia/Manila',
    flag: '🇵🇭',
    offset: '+08:00',
    timezoneAbbr: 'PHT',
  },
  {
    code: 'VN',
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    timezone: 'Asia/Ho_Chi_Minh',
    flag: '🇻🇳',
    offset: '+07:00',
    timezoneAbbr: 'ICT',
  },
  {
    code: 'BD',
    name: 'Dhaka',
    country: 'Bangladesh',
    timezone: 'Asia/Dhaka',
    flag: '🇧🇩',
    offset: '+06:00',
    timezoneAbbr: 'BST',
  },
  {
    code: 'PK',
    name: 'Karachi',
    country: 'Pakistan',
    timezone: 'Asia/Karachi',
    flag: '🇵🇰',
    offset: '+05:00',
    timezoneAbbr: 'PKT',
  },
  {
    code: 'LK',
    name: 'Colombo',
    country: 'Sri Lanka',
    timezone: 'Asia/Colombo',
    flag: '🇱🇰',
    offset: '+05:30',
    timezoneAbbr: 'IST',
  },
  {
    code: 'MM',
    name: 'Yangon',
    country: 'Myanmar',
    timezone: 'Asia/Yangon',
    flag: '🇲🇲',
    offset: '+06:30',
    timezoneAbbr: 'MMT',
  },
  {
    code: 'KH',
    name: 'Phnom Penh',
    country: 'Cambodia',
    timezone: 'Asia/Phnom_Penh',
    flag: '🇰🇭',
    offset: '+07:00',
    timezoneAbbr: 'ICT',
  },
  {
    code: 'LA',
    name: 'Vientiane',
    country: 'Laos',
    timezone: 'Asia/Vientiane',
    flag: '🇱🇦',
    offset: '+07:00',
    timezoneAbbr: 'ICT',
  },
  {
    code: 'MN',
    name: 'Ulaanbaatar',
    country: 'Mongolia',
    timezone: 'Asia/Ulaanbaatar',
    flag: '🇲🇳',
    offset: '+08:00',
    timezoneAbbr: 'ULAT',
  },
  {
    code: 'KZ',
    name: 'Almaty',
    country: 'Kazakhstan',
    timezone: 'Asia/Almaty',
    flag: '🇰🇿',
    offset: '+06:00',
    timezoneAbbr: 'ALMT',
  },
  {
    code: 'UZ',
    name: 'Tashkent',
    country: 'Uzbekistan',
    timezone: 'Asia/Tashkent',
    flag: '🇺🇿',
    offset: '+05:00',
    timezoneAbbr: 'UZT',
  },
  {
    code: 'KG',
    name: 'Bishkek',
    country: 'Kyrgyzstan',
    timezone: 'Asia/Bishkek',
    flag: '🇰🇬',
    offset: '+06:00',
    timezoneAbbr: 'KGT',
  },
  {
    code: 'TJ',
    name: 'Dushanbe',
    country: 'Tajikistan',
    timezone: 'Asia/Dushanbe',
    flag: '🇹🇯',
    offset: '+05:00',
    timezoneAbbr: 'TJT',
  },
  {
    code: 'TM',
    name: 'Ashgabat',
    country: 'Turkmenistan',
    timezone: 'Asia/Ashgabat',
    flag: '🇹🇲',
    offset: '+05:00',
    timezoneAbbr: 'TMT',
  },
  {
    code: 'AF',
    name: 'Kabul',
    country: 'Afghanistan',
    timezone: 'Asia/Kabul',
    flag: '🇦🇫',
    offset: '+04:30',
    timezoneAbbr: 'AFT',
  },
  {
    code: 'IR',
    name: 'Tehran',
    country: 'Iran',
    timezone: 'Asia/Tehran',
    flag: '🇮🇷',
    offset: '+03:30/+04:30',
    timezoneAbbr: 'IRST/IRDT',
  },
  {
    code: 'IQ',
    name: 'Baghdad',
    country: 'Iraq',
    timezone: 'Asia/Baghdad',
    flag: '🇮🇶',
    offset: '+03:00',
    timezoneAbbr: 'AST',
  },
  {
    code: 'SA',
    name: 'Riyadh',
    country: 'Saudi Arabia',
    timezone: 'Asia/Riyadh',
    flag: '🇸🇦',
    offset: '+03:00',
    timezoneAbbr: 'AST',
  },
  {
    code: 'KW',
    name: 'Kuwait City',
    country: 'Kuwait',
    timezone: 'Asia/Kuwait',
    flag: '🇰🇼',
    offset: '+03:00',
    timezoneAbbr: 'AST',
  },
  {
    code: 'QA',
    name: 'Doha',
    country: 'Qatar',
    timezone: 'Asia/Qatar',
    flag: '🇶🇦',
    offset: '+03:00',
    timezoneAbbr: 'AST',
  },
  {
    code: 'BH',
    name: 'Manama',
    country: 'Bahrain',
    timezone: 'Asia/Bahrain',
    flag: '🇧🇭',
    offset: '+03:00',
    timezoneAbbr: 'AST',
  },
  {
    code: 'OM',
    name: 'Muscat',
    country: 'Oman',
    timezone: 'Asia/Muscat',
    flag: '🇴🇲',
    offset: '+04:00',
    timezoneAbbr: 'GST',
  },
  {
    code: 'JO',
    name: 'Amman',
    country: 'Jordan',
    timezone: 'Asia/Amman',
    flag: '🇯🇴',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'LB',
    name: 'Beirut',
    country: 'Lebanon',
    timezone: 'Asia/Beirut',
    flag: '🇱🇧',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'SY',
    name: 'Damascus',
    country: 'Syria',
    timezone: 'Asia/Damascus',
    flag: '🇸🇾',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'IL',
    name: 'Tel Aviv',
    country: 'Israel',
    timezone: 'Asia/Jerusalem',
    flag: '🇮🇱',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'IST/IDT',
  },
  {
    code: 'PS',
    name: 'Gaza',
    country: 'Palestine',
    timezone: 'Asia/Gaza',
    flag: '🇵🇸',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'CY',
    name: 'Nicosia',
    country: 'Cyprus',
    timezone: 'Asia/Nicosia',
    flag: '🇨🇾',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'MT',
    name: 'Valletta',
    country: 'Malta',
    timezone: 'Europe/Malta',
    flag: '🇲🇹',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'IS',
    name: 'Reykjavik',
    country: 'Iceland',
    timezone: 'Atlantic/Reykjavik',
    flag: '🇮🇸',
    offset: '+00:00',
    timezoneAbbr: 'GMT',
  },
  {
    code: 'IE',
    name: 'Dublin',
    country: 'Ireland',
    timezone: 'Europe/Dublin',
    flag: '🇮🇪',
    offset: '+00:00/+01:00',
    timezoneAbbr: 'GMT/IST',
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    country: 'Luxembourg',
    timezone: 'Europe/Luxembourg',
    flag: '🇱🇺',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'MC',
    name: 'Monaco',
    country: 'Monaco',
    timezone: 'Europe/Monaco',
    flag: '🇲🇨',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'SM',
    name: 'San Marino',
    country: 'San Marino',
    timezone: 'Europe/San_Marino',
    flag: '🇸🇲',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'VA',
    name: 'Vatican City',
    country: 'Vatican',
    timezone: 'Europe/Vatican',
    flag: '🇻🇦',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'LI',
    name: 'Vaduz',
    country: 'Liechtenstein',
    timezone: 'Europe/Vaduz',
    flag: '🇱🇮',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'AD',
    name: 'Andorra la Vella',
    country: 'Andorra',
    timezone: 'Europe/Andorra',
    flag: '🇦🇩',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'ME',
    name: 'Podgorica',
    country: 'Montenegro',
    timezone: 'Europe/Podgorica',
    flag: '🇲🇪',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'RS',
    name: 'Belgrade',
    country: 'Serbia',
    timezone: 'Europe/Belgrade',
    flag: '🇷🇸',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'BA',
    name: 'Sarajevo',
    country: 'Bosnia and Herzegovina',
    timezone: 'Europe/Sarajevo',
    flag: '🇧🇦',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'MK',
    name: 'Skopje',
    country: 'North Macedonia',
    timezone: 'Europe/Skopje',
    flag: '🇲🇰',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'AL',
    name: 'Tirana',
    country: 'Albania',
    timezone: 'Europe/Tirana',
    flag: '🇦🇱',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'MD',
    name: 'Chișinău',
    country: 'Moldova',
    timezone: 'Europe/Chisinau',
    flag: '🇲🇩',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'UA',
    name: 'Kyiv',
    country: 'Ukraine',
    timezone: 'Europe/Kiev',
    flag: '🇺🇦',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'BY',
    name: 'Minsk',
    country: 'Belarus',
    timezone: 'Europe/Minsk',
    flag: '🇧🇾',
    offset: '+03:00',
    timezoneAbbr: 'MSK',
  },
  {
    code: 'LT',
    name: 'Vilnius',
    country: 'Lithuania',
    timezone: 'Europe/Vilnius',
    flag: '🇱🇹',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'LV',
    name: 'Riga',
    country: 'Latvia',
    timezone: 'Europe/Riga',
    flag: '🇱🇻',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'EE',
    name: 'Tallinn',
    country: 'Estonia',
    timezone: 'Europe/Tallinn',
    flag: '🇪🇪',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'BG',
    name: 'Sofia',
    country: 'Bulgaria',
    timezone: 'Europe/Sofia',
    flag: '🇧🇬',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'RO',
    name: 'Bucharest',
    country: 'Romania',
    timezone: 'Europe/Bucharest',
    flag: '🇷🇴',
    offset: '+02:00/+03:00',
    timezoneAbbr: 'EET/EEST',
  },
  {
    code: 'HR',
    name: 'Zagreb',
    country: 'Croatia',
    timezone: 'Europe/Zagreb',
    flag: '🇭🇷',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'SI',
    name: 'Ljubljana',
    country: 'Slovenia',
    timezone: 'Europe/Ljubljana',
    flag: '🇸🇮',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'SK',
    name: 'Bratislava',
    country: 'Slovakia',
    timezone: 'Europe/Bratislava',
    flag: '🇸🇰',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'CZ',
    name: 'Prague',
    country: 'Czech Republic',
    timezone: 'Europe/Prague',
    flag: '🇨🇿',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'HU',
    name: 'Budapest',
    country: 'Hungary',
    timezone: 'Europe/Budapest',
    flag: '🇭🇺',
    offset: '+01:00/+02:00',
    timezoneAbbr: 'CET/CEST',
  },
  {
    code: 'UTC',
    name: 'UTC',
    country: 'Coordinated Universal Time',
    timezone: 'UTC',
    flag: '🌍',
    offset: '+00:00',
    timezoneAbbr: 'UTC',
  },
];

// 사용자 위치 기반 추천 위치 (한국 기준)
const getRecommendedLocations = (): Location[] => {
  const recommended = [
    locations.find((l) => l.timezone === 'Asia/Seoul') || locations[6], // Seoul
    locations.find((l) => l.timezone === 'Asia/Tokyo') || locations[4], // Tokyo
    locations.find((l) => l.timezone === 'Asia/Shanghai') || locations[5], // Shanghai
    locations.find((l) => l.timezone === 'America/New_York') || locations[0], // New York
    locations.find((l) => l.timezone === 'Europe/London') || locations[2], // London
  ];
  return recommended.filter(Boolean) as Location[];
};

export default function TimezoneConverter() {
  const params = useParams();
  const locale = params.locale as string;

  const [selectedLocations, setSelectedLocations] = useState<
    SelectedLocation[]
  >([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [editingLocation, setEditingLocation] =
    useState<SelectedLocation | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [referenceLocation, setReferenceLocation] =
    useState<SelectedLocation | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 다국어 텍스트 정의
  const translations = {
    ko: {
      title: '시간대 변환기 🌍',
      subtitle:
        '위치를 추가하고 시간을 설정하면 전 세계 시간을 확인할 수 있어요!',
      addLocation: 'Add locations',
      placeholder: '위치를 검색하세요...',
      recommended: '추천 위치',
      selectedLocations: '선택된 위치들',
      editDateTime: 'Edit Date and Time',
      setDate: 'Set date',
      setTime: 'Set time',
      close: 'Close',
      maxLocations: '최대 10개 위치까지 추가할 수 있습니다.',
      removeLocation: '제거',
      noLocationsSelected: '아직 선택된 위치가 없습니다.',
      addMoreLocations: '더 많은 위치를 추가해보세요!',
    },
    en: {
      title: 'Timezone Converter 🌍',
      subtitle: 'Add locations and set time to check worldwide time!',
      addLocation: 'Add locations',
      placeholder: 'Search for a location...',
      recommended: 'Recommended locations',
      selectedLocations: 'Selected locations',
      editDateTime: 'Edit Date and Time',
      setDate: 'Set date',
      setTime: 'Set time',
      close: 'Close',
      maxLocations: 'You can add up to 10 locations.',
      removeLocation: 'Remove',
      noLocationsSelected: 'No locations selected yet.',
      addMoreLocations: 'Add more locations to compare!',
    },
    fr: {
      title: 'Convertisseur de Fuseau Horaire 🌍',
      subtitle:
        "Ajoutez des emplacements et définissez l'heure pour vérifier l'heure mondiale!",
      addLocation: 'Add locations',
      placeholder: 'Rechercher un emplacement...',
      recommended: 'Emplacements recommandés',
      selectedLocations: 'Emplacements sélectionnés',
      editDateTime: 'Edit Date and Time',
      setDate: 'Définir date',
      setTime: 'Définir heure',
      close: 'Fermer',
      maxLocations: "Vous pouvez ajouter jusqu'à 10 emplacements.",
      removeLocation: 'Supprimer',
      noLocationsSelected: 'Aucun emplacement sélectionné pour le moment.',
      addMoreLocations: "Ajoutez plus d'emplacements pour comparer!",
    },
  };

  // 시간대에 따른 표정 반환
  const getTimeEmoji = (hour: number): string => {
    if (hour >= 6 && hour < 12) return '😊'; // 아침
    if (hour >= 12 && hour < 18) return '😄'; // 오후
    if (hour >= 18 && hour < 22) return '😊'; // 저녁
    if (hour >= 22 || hour < 6) return '😴'; // 밤/새벽
    return '😐';
  };

  // 검색 결과 필터링
  const getSearchResults = (): Location[] => {
    const results = !searchQuery.trim()
      ? getRecommendedLocations()
      : locations
          .filter(
            (location) =>
              location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              location.country
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              location.code.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 10);

    return results;
  };

  // 위치 추가
  const addLocation = (location: Location) => {
    if (
      selectedLocations.some((l) => l.code === location.code) ||
      selectedLocations.length >= 10
    ) {
      return;
    }

    if (!isClient) return;

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: location.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: location.timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const parts = formatter.formatToParts(now);
    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;
    const hour = parts.find((part) => part.type === 'hour')?.value;
    const minute = parts.find((part) => part.type === 'minute')?.value;

    const dateParts = dateFormatter.formatToParts(now);
    const dayName = dateParts.find((part) => part.type === 'weekday')?.value;
    const monthName = dateParts.find((part) => part.type === 'month')?.value;

    const newLocation: SelectedLocation = {
      ...location,
      date: `${year}-${month}-${day}`,
      time: `${hour}:${minute}`,
      dayName: dayName || '',
      monthName: monthName || '',
      emoji: getTimeEmoji(parseInt(hour || '12')),
    };

    setSelectedLocations((prev) => [...prev, newLocation]);

    // 첫 번째 위치를 기준 위치로 설정
    if (selectedLocations.length === 0) {
      setReferenceLocation(newLocation);
    }

    setSearchQuery('');
    setShowSearchResults(false);
  };

  // 위치 제거
  const removeLocation = (locationCode: string) => {
    setSelectedLocations((prev) => {
      const updated = prev.filter((l) => l.code !== locationCode);

      // 기준 위치가 제거된 경우 첫 번째 위치를 새로운 기준으로 설정
      if (referenceLocation?.code === locationCode && updated.length > 0) {
        setReferenceLocation(updated[0]);
      } else if (updated.length === 0) {
        setReferenceLocation(null);
      }

      return updated;
    });
  };

  // 모든 위치의 시간을 업데이트하는 함수
  const updateAllLocationsTime = (
    referenceDateTime: Date,
    referenceTimezone: string
  ) => {
    setSelectedLocations((prev) =>
      prev.map((location) => {
        if (location.timezone === referenceTimezone) {
          return location; // 기준 위치는 그대로
        }

        // 다른 시간대로 변환
        const formatter = new Intl.DateTimeFormat('en-CA', {
          timeZone: location.timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: location.timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        const parts = formatter.formatToParts(referenceDateTime);
        const year = parts.find((part) => part.type === 'year')?.value;
        const month = parts.find((part) => part.type === 'month')?.value;
        const day = parts.find((part) => part.type === 'day')?.value;
        const hour = parts.find((part) => part.type === 'hour')?.value;
        const minute = parts.find((part) => part.type === 'minute')?.value;

        const dateParts = dateFormatter.formatToParts(referenceDateTime);
        const dayName = dateParts.find(
          (part) => part.type === 'weekday'
        )?.value;
        const monthName = dateParts.find(
          (part) => part.type === 'month'
        )?.value;

        return {
          ...location,
          date: `${year}-${month}-${day}`,
          time: `${hour}:${minute}`,
          dayName: dayName || '',
          monthName: monthName || '',
          emoji: getTimeEmoji(parseInt(hour || '12')),
        };
      })
    );
  };

  // 편집 모달 열기
  const openEditModal = (location: SelectedLocation) => {
    setEditingLocation(location);
    setEditDate(location.date);
    setEditTime(location.time);
  };

  // 편집 모달 닫기
  const closeEditModal = () => {
    setEditingLocation(null);
    setEditDate('');
    setEditTime('');
  };

  // 편집된 시간 저장
  const saveEdit = () => {
    if (!editingLocation || !editDate || !editTime) return;

    const referenceDateTime = new Date(`${editDate}T${editTime}`);

    // 편집된 위치를 기준으로 모든 위치의 시간 업데이트
    updateAllLocationsTime(referenceDateTime, editingLocation.timezone);

    // 기준 위치 업데이트
    setReferenceLocation({
      ...editingLocation,
      date: editDate,
      time: editTime,
      emoji: getTimeEmoji(parseInt(editTime.split(':')[0])),
    });

    closeEditModal();
  };

  // 검색 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  // 검색 포커스 핸들러
  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  // 검색 블러 핸들러
  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  // 클라이언트 사이드 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 외부 클릭으로 검색 결과 닫기 (임시 비활성화)
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       searchInputRef.current &&
  //       !searchInputRef.current.contains(event.target as Node)
  //     ) {
  //       setShowSearchResults(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const t =
    translations[locale as keyof typeof translations] || translations.ko;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-8 px-4 relative overflow-hidden">
      {/* 배경 장식들 */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce">🌍</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse">⏰</div>
      <div className="absolute bottom-20 left-20 text-5xl animate-bounce delay-1000">
        🌐
      </div>
      <div className="absolute bottom-10 right-10 text-4xl animate-pulse delay-500">
        🕐
      </div>
      <div className="absolute top-1/2 left-5 text-3xl animate-bounce delay-700">
        🌏
      </div>
      <div className="absolute top-1/3 right-5 text-4xl animate-pulse delay-300">
        ⏱️
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent mb-4">
            <span className="text-3xl mr-2">🌍</span>
            {t.title}
            <span className="text-3xl ml-2">⏰</span>
          </h1>
          <p className="text-xl text-indigo-700 mb-6">{t.subtitle}</p>
        </div>

        {/* 위치 추가 섹션 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-blue-200 shadow-2xl mb-8 relative">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder={t.placeholder}
              className="w-full p-4 pr-12 border-2 border-blue-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-300 text-lg text-black placeholder:text-black"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
              🔍
            </div>
          </div>

          {/* 검색 결과 드롭다운 */}
          {showSearchResults && (
            <div
              className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-200 rounded-xl shadow-lg z-[200] max-h-80 overflow-y-auto"
              style={{ pointerEvents: 'auto' }}
            >
              {searchQuery.trim() && (
                <div className="p-3 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    {t.recommended}
                  </p>
                </div>
              )}
              {getSearchResults().map((location) => (
                <button
                  key={location.code}
                  onClick={() => addLocation(location)}
                  disabled={selectedLocations.some(
                    (l) => l.code === location.code
                  )}
                  className={`w-full p-4 text-left border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${
                    selectedLocations.some((l) => l.code === location.code)
                      ? 'opacity-50 cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{location.flag}</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {location.name}, {location.country}
                      </div>
                      <div className="text-sm text-gray-800">
                        {location.timezoneAbbr} ({location.offset})
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedLocations.length >= 10 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">{t.maxLocations}</p>
            </div>
          )}
        </div>

        {/* 선택된 위치들 표시 */}
        {isClient && selectedLocations.length > 0 ? (
          <div className="space-y-4 mb-8">
            {selectedLocations.map((location) => (
              <div
                key={location.code}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-indigo-200 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
                onClick={() => openEditModal(location)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{location.flag}</div>
                    <div>
                      <div className="text-lg font-bold text-indigo-800">
                        {location.name}, {location.country}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        {location.timezoneAbbr} ({location.offset})
                      </div>
                      <div className="text-sm text-gray-600">
                        {location.dayName}, {location.monthName}{' '}
                        {location.date.split('-')[2]},{' '}
                        {location.date.split('-')[0]}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-700 mb-1">
                      {location.time}
                      <span className="text-2xl ml-2">{location.emoji}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLocation(location.code);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      {t.removeLocation}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* 편집 모달 */}
        {editingLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {t.editDateTime}
                </h2>
                <button
                  onClick={closeEditModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* 위치 정보 */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{editingLocation.flag}</span>
                  <div>
                    <div className="font-medium text-gray-800">
                      {editingLocation.name}, {editingLocation.country}
                    </div>
                    <div className="text-sm text-blue-600">
                      {editingLocation.timezoneAbbr} ({editingLocation.offset})
                    </div>
                  </div>
                </div>
              </div>

              {/* 날짜 설정 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t.setDate}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none text-black placeholder:text-black"
                  />
                  <div className="text-2xl">📅</div>
                </div>
              </div>

              {/* 시간 설정 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.setTime}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none text-black placeholder:text-black"
                  />
                  <div className="text-2xl">😊</div>
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeEditModal}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.close}
                </button>
                <button
                  onClick={saveEdit}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
