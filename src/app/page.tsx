import { redirect } from 'next/navigation';

export default function RootPage() {
  // 기본 locale로 리다이렉트 (한국어)
  redirect('/ko');
}
