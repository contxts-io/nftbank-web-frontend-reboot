'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/public/icon/Moon';
import Sun from '@/public/icon/Sun';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-42 h-32 border-1 border-border-main dark:border-border-main-dark' />
    );
  }

  return (
    <button
      className='border-1 text-icon-subtle dark:text-icon-subtle-dark hover:text-icon-main hover:dark:text-icon-main-dark border-border-main dark:border-border-main-dark hover:border-border-selected hover:dark:border-border-selected-dark'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  );
}
