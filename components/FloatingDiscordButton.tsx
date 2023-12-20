'use client';
import DiscordLogo from '@/public/logo/DiscordLogo';
import styles from './FloatingDiscordButton.module.css';
import { useState } from 'react';
export const DISCORD_URL = 'https://discord.com/invite/4yrNy4x';
const FloatingDiscordButton = () => {
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const handleClick = () => {
    window.open(DISCORD_URL);
  };
  return (
    <button
      className={styles.floatingButton}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={() => setIsPress(true)}
      onMouseUp={() => setIsPress(false)}
      onClick={() => handleClick()}
    >
      {isHover ? (
        <p>Talk to us</p>
      ) : (
        <DiscordLogo className='fill-[var(--color-icon-main)] w-28 h-28' />
      )}
    </button>
  );
};
export default FloatingDiscordButton;
