'use client';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    setTheme('dark');
    window.localStorage.setItem('theme', 'dark');
    const element = document.body;
    element.style.setProperty('--initial-color-mode', 'dark');
    // 시작시 다크모드를 바로 적용 시켜줌
    document.body.setAttribute('data-theme', 'dark');
    setMounted(true);
  }, []);
  const TITLE = 'NFTBank.ai v2 - Make NFT portfolio management smart';
  const DESCRIPTION =
    'You can gather and manage NFTs scattered across multiple wallets in one place!';
  const SAMPLE_IMAGE = '/image/sample_portfolio.png';
  const KEY = 'portfolio';

  return (
    <main className='w-full h-full'>
      <Head>
        <title key={KEY}>{TITLE}</title>
        <meta key={KEY} property='og:title' content={TITLE} />
        <meta key={KEY} property='og:description' content={DESCRIPTION} />
        <meta key={KEY} property='og:image' content={SAMPLE_IMAGE} />
        <meta
          key={KEY}
          property='og:url'
          content={`https://v2.nftabank.ai/portfolio/overview/sample`}
        />
        <meta key={KEY} name='twitter:title' content={TITLE} />
        <meta key={KEY} name='twitter:description' content={DESCRIPTION} />
        <meta key={KEY} name='twitter:image' content={SAMPLE_IMAGE} />
      </Head>
      <div className='flex w-full justify-center h-full'>
        {/* {mounted && <Entrance />} */}
      </div>
    </main>
  );
}
