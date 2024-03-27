'use client';
import Entrance from '@/components/Entrance';
import { use } from 'chai';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Home = () => {
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
  return (
    <main className='w-full h-full'>
      <div className='flex w-full justify-center h-full'>
        {mounted && <Entrance />}
      </div>
    </main>
  );
};
export default Home;
export function head() {
  const TITLE = 'NFTBank.ai v2 - Make NFT portfolio management smart';
  const DESCRIPTION =
    'You can gather and manage NFTs scattered across multiple wallets in one place!';
  const SAMPLE_IMAGE = '/image/sample_portfolio.png';
  return (
    <>
      <title>{TITLE}</title>
      <meta property='og:title' content={TITLE} />
      <meta property='og:description' content={DESCRIPTION} />
      <meta property='og:image' content={SAMPLE_IMAGE} />
      <meta
        property='og:url'
        content={`https://v2.nftabank.ai/portfolio/overview/sample`}
      />
      <meta name='twitter:title' content={TITLE} />
      <meta name='twitter:description' content={DESCRIPTION} />
      <meta name='twitter:image' content={SAMPLE_IMAGE} />
    </>
  );
}
