'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/public/icon/Moon';
import Sun from '@/public/icon/Sun';
import Button from './Button';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkModeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // setIsDarkMode(!isDarkMode);
    // if (isDarkMode) {
    //   document.body.setAttribute('data-theme', 'light');
    // } else {
    //   document.body.setAttribute('data-theme', 'dark');
    // }
  };

  useEffect(() => {
    setMounted(true);
    theme === 'light';
  }, []);
  useEffect(() => {
    theme && document.body.setAttribute('data-theme', theme);
  }, [theme]);

  if (!mounted) {
    return (
      <div className='w-42 h-32 border-1 border-border-main dark:border-border-main-dark' />
    );
  }

  return (
    <>
      <Button id={'/global/theme'} onClick={() => darkModeHandler()}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button>
      {/* <Button
        id={'/global/theme'}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button> */}
    </>
  );
}
