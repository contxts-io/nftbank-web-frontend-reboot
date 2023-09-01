'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='border rounded-md w-6 h-6 flex items-center justify-center'
    >
      <span className='sr-only'>Toggle mode</span>
      {theme === 'dark' ? <p>Light</p> : <p>Dark</p>}
    </button>
  );
}
