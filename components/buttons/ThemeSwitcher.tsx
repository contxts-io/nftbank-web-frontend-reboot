'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/public/icon/Moon';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className='dark:border-border-main-dark dark:hover:border-border-main-dark'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Moon />
    </button>
  );
}
