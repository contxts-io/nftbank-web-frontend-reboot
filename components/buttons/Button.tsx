'use client';
import React, { useEffect } from 'react';
import styles from './Button.module.css';
import { twMerge } from 'tailwind-merge';
// import * as gtag from '@/lib/gtag';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ id, children, ...props }: { id: string } & ButtonProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('button clicked', id);
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
      className={twMerge(`${styles.button} ${props.className}`)}
      id={id}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
