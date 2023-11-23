'use client';
import { useMe } from '@/utils/hooks/queries/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: me, isLoading, isError } = useMe();
  const router = useRouter();
  const path = usePathname();
  if (isLoading) {
    // 데이터 로딩 중에는 로딩 스피너 또는 다른 로딩 상태를 표시할 수 있습니다.
    return <div>Loading...</div>;
  }
  if (!path.includes('/auth')) {
    if (isError || !me) {
      // 에러 또는 데이터가 없는 경우 로그인 페이지로 리다이렉트
      router.push('/auth/signin');
      return null; // 리다이렉트를 시작하면 렌더링 중단
    }
  }
  return <div>{children}</div>;
};
export default LoginProvider;
