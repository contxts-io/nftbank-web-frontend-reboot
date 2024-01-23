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
