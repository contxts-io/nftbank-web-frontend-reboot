'use client';
import { sendGTMEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

export function Analytics({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      sendGTMEvent({ event: 'pageView', value: url });
    };
    handleRouteChange(path);
  }, [path]);
  return <>{children}</>;
}
