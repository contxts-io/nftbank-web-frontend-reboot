'use client';
import { myDefaultPortfolioAtom } from '@/store/settings';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();
  const myDefaultPortfolio = useAtomValue(myDefaultPortfolioAtom);
  useEffect(() => {
    console.log('router', router);
    console.log('path', path);
    router.push(`${path}/`);
  }, [myDefaultPortfolio]);
  return <div>{children}</div>;
};
export default ProfileProvider;
