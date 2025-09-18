export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'qr-marketing-tips',
    title: 'QR코드로 비즈니스 마케팅 효과 높이기 💼',
    excerpt: 'QR코드를 활용한 마케팅 전략과 실제 성공 사례를 소개합니다.',
    content: `
# QR코드로 비즈니스 마케팅 효과 높이기

QR코드는 현대 마케팅의 핵심 도구가 되었습니다. 이 글에서는 QR코드를 활용한 효과적인 마케팅 전략을 알아보겠습니다.

## 1. 메뉴판에 QR코드 활용

많은 카페와 레스토랑에서 메뉴판에 QR코드를 활용하고 있습니다. 손님들은 QR코드를 스캔하여:
- 디지털 메뉴 확인
- 온라인 주문
- 리뷰 작성

## 2. 이벤트 마케팅

결혼식, 회사 행사, 전시회에서 QR코드를 활용하면:
- 참석자 정보 수집
- 소셜 미디어 공유 촉진
- 후속 마케팅 기회 창출

## 3. 성공 사례

### 스타벅스
스타벅스는 QR코드를 통해 고객이 앱을 다운로드하고 리워드를 받을 수 있게 했습니다.

### 맥도날드
맥도날드는 테이블에 QR코드를 배치하여 고객이 직접 주문할 수 있게 했습니다.

## 결론

QR코드는 단순한 도구가 아닌, 고객과의 연결고리입니다. 올바르게 활용하면 마케팅 효과를 크게 향상시킬 수 있습니다.
    `,
    date: '2024-01-15',
    category: '마케팅',
    readTime: '5분',
    tags: ['QR코드', '마케팅', '비즈니스', '디지털전환'],
    featured: true,
    published: true
  },
  {
    id: 'wifi-qr-setup',
    title: 'WiFi QR코드로 손님 접속 편리하게 만들기 📶',
    excerpt: '카페나 상점에서 손님들이 쉽게 WiFi에 연결할 수 있는 방법을 알아보세요.',
    content: `
# WiFi QR코드로 손님 접속 편리하게 만들기

WiFi QR코드는 손님들에게 편리함을 제공하고, 비즈니스 소유자에게는 마케팅 기회를 제공합니다.

## WiFi QR코드의 장점

1. **편리성**: 복잡한 비밀번호 입력 불필요
2. **안전성**: 비밀번호 노출 위험 감소
3. **마케팅**: 브랜드 인지도 향상
4. **효율성**: 직원 업무 부담 감소

## 설정 방법

### 1. WiFi 정보 준비
- 네트워크 이름 (SSID)
- 비밀번호
- 보안 타입 (WPA/WPA2 권장)

### 2. QR코드 생성
우리의 무료 QR코드 생성기를 사용하여:
1. WiFi 타입 선택
2. 네트워크 정보 입력
3. QR코드 다운로드

### 3. 인쇄 및 배치
- 고품질 인쇄 (최소 3x3cm)
- 테이블이나 벽에 잘 보이는 곳에 배치
- "WiFi 무료 이용" 안내문과 함께 표시

## 활용 팁

- 매장 브랜딩과 일치하는 디자인
- 정기적인 비밀번호 변경 시 QR코드 업데이트
- 고객 피드백 수집을 위한 추가 QR코드 활용

## 주의사항

- 보안이 중요한 네트워크는 공개 WiFi로 설정하지 마세요
- 정기적으로 비밀번호를 변경하세요
- 불필요한 네트워크 접근은 제한하세요
    `,
    date: '2024-01-10',
    category: '실용',
    readTime: '3분',
    tags: ['WiFi', 'QR코드', '카페', '비즈니스'],
    featured: false,
    published: true
  },
  {
    id: 'qr-security-guide',
    title: 'QR코드 보안 및 프라이버시 고려사항 🔒',
    excerpt: 'QR코드 사용 시 주의해야 할 보안 문제와 해결 방법을 설명합니다.',
    content: `
# QR코드 보안 및 프라이버시 고려사항

QR코드는 편리하지만, 보안 측면에서 주의해야 할 점들이 있습니다.

## 주요 보안 위험

### 1. 악성 QR코드
- 가짜 QR코드로 피싱 사이트 유도
- 악성 앱 다운로드 유도
- 개인정보 탈취

### 2. 데이터 유출
- QR코드에 민감한 정보 포함
- 스캔 기록 추적 가능성
- 위치 정보 노출

## 보안 가이드라인

### QR코드 생성자
1. **신뢰할 수 있는 도구 사용**
   - 공식 QR코드 생성기 사용
   - 개인정보 수집하지 않는 서비스 선택

2. **민감한 정보 제외**
   - 비밀번호, 개인정보 포함 금지
   - 임시 URL 사용 권장

3. **정기적 점검**
   - QR코드 유효성 확인
   - 링크된 콘텐츠 안전성 검증

### QR코드 사용자
1. **스캔 전 확인**
   - QR코드 출처 신뢰성 확인
   - URL 미리보기 기능 활용

2. **안전한 스캔**
   - 신뢰할 수 있는 QR 스캔 앱 사용
   - 의심스러운 링크 클릭 금지

3. **개인정보 보호**
   - 불필요한 정보 입력 금지
   - 위치 서비스 설정 확인

## 권장 사항

- 공식 앱스토어의 QR 스캔 앱 사용
- HTTPS 사이트로만 연결되는 QR코드 생성
- 정기적인 보안 업데이트
- 사용자 교육 및 안내

## 결론

QR코드는 편리한 도구이지만, 보안을 고려한 사용이 중요합니다. 생성자와 사용자 모두 적절한 주의를 기울여야 안전하게 활용할 수 있습니다.
    `,
    date: '2024-01-05',
    category: '보안',
    readTime: '7분',
    tags: ['보안', '프라이버시', 'QR코드', '안전'],
    featured: true,
    published: true
  },
  {
    id: 'event-qr-ideas',
    title: '이벤트에서 QR코드 활용하기 🎉',
    excerpt: '결혼식, 회사 행사, 전시회에서 QR코드를 효과적으로 사용하는 아이디어를 제시합니다.',
    content: `
# 이벤트에서 QR코드 활용하기

QR코드는 현대 이벤트에서 필수적인 도구가 되었습니다. 다양한 이벤트에서 QR코드를 활용하는 방법을 알아보겠습니다.

## 결혼식에서의 활용

### 1. 디지털 청첩장
- 온라인 청첩장 링크
- 참석 여부 확인
- 선물 리스트 공유

### 2. 웨딩 앨범 공유
- 실시간 사진 업로드
- 게스트 사진 공유
- 소셜 미디어 연동

### 3. 메시지 수집
- 축하 메시지 수집
- 영상 메시지 녹화
- 추억 사진 업로드

## 회사 행사에서의 활용

### 1. 참석자 등록
- 빠른 체크인
- 명단 자동 관리
- 출석 통계 수집

### 2. 네트워킹
- 명함 대신 QR코드
- 연락처 자동 교환
- LinkedIn 프로필 공유

### 3. 설문조사
- 실시간 피드백 수집
- 만족도 조사
- 개선 의견 수집

## 전시회/박람회 활용

### 1. 부스 정보
- 제품 카탈로그
- 회사 소개 영상
- 특별 할인 쿠폰

### 2. 리드 수집
- 방문자 정보 수집
- 관심사 파악
- 후속 연락 정보

### 3. 게임/이벤트
- 스탬프 투어
- 경품 응모
- 소셜 미디어 공유

## 성공적인 QR코드 활용 팁

### 1. 명확한 안내
- QR코드 목적 명시
- 사용법 간단 안내
- 혜택 명확히 제시

### 2. 시각적 어필
- 브랜드와 일치하는 디자인
- 적절한 크기 (최소 3x3cm)
- 잘 보이는 위치 배치

### 3. 기술적 준비
- 안정적인 인터넷 연결
- 모바일 최적화된 페이지
- 빠른 로딩 속도

## 측정 및 개선

- 스캔 수 추적
- 참여도 분석
- 피드백 수집
- 지속적 개선

## 결론

QR코드는 이벤트의 참여도를 높이고, 참석자에게 편의를 제공하며, 주최자에게는 소중한 데이터를 제공하는 강력한 도구입니다. 올바르게 활용하면 이벤트의 성공을 크게 향상시킬 수 있습니다.
    `,
    date: '2024-01-01',
    category: '이벤트',
    readTime: '4분',
    tags: ['이벤트', '결혼식', '회사행사', '전시회'],
    featured: false,
    published: true
  }
];

// 자동화를 위한 헬퍼 함수들
export const getPublishedPosts = () => blogPosts.filter(post => post.published);

export const getFeaturedPosts = () => blogPosts.filter(post => post.featured && post.published);

export const getPostsByCategory = (category: string) => 
  blogPosts.filter(post => post.category === category && post.published);

export const getPostsByTag = (tag: string) => 
  blogPosts.filter(post => post.tags.includes(tag) && post.published);

export const getRecentPosts = (limit: number = 5) => 
  blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
