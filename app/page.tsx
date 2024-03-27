'use client';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';

const TITLE = 'NFTBank.ai v2 - Make NFT portfolio management smart';
const DESCRIPTION =
  'You can gather and manage NFTs scattered across multiple wallets in one place!';
const SAMPLE_IMAGE = '/image/sample_portfolio.png';
const KEY = 'portfolio';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://v2.nftabank.ai',
    images: SAMPLE_IMAGE,
  },
  twitter: {
    title: TITLE,
    description: DESCRIPTION,
    images: SAMPLE_IMAGE,
  },
};
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

  return (
    <main className='w-full h-full'>
      <div className='flex w-full justify-center h-full'>
        {/* {mounted && <Entrance />} */}
      </div>
    </main>
  );
}
