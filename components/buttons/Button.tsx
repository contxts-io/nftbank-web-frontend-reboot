'use client';
import React, { useEffect } from 'react';
import styles from './Button.module.css';
import { twMerge } from 'tailwind-merge';
import Spinner from '@/public/icon/Spinner';
import { sendGTMEvent } from '@next/third-parties/google';
// import * as gtag from '@/lib/gtag';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({
  id,
  children,
  className,
  isLoading,
  ...props
}: { id: string; isLoading?: boolean } & ButtonProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('button clicked', id);
    sendGTMEvent({ event: 'buttonClicked', value: id });
    props.onClick?.(e);
  };
  // useEffect(() => {
  //   const buttonElement = document.getElementById(id);
  //   buttonElement?.addEventListener('click', handleClick);

  //   return () => {
  //     buttonElement?.removeEventListener('click', handleClick);
  //   };
  // }, [router, id]);

  return (
    <button
      {...props}
      className={twMerge(`${styles.button} ${className}`)}
      id={id}
      onClick={handleClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
