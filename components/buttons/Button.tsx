'use client';
import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
// import * as gtag from '@/lib/gtag';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ id, children, ...props }: { id: string } & ButtonProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    console.log('button clicked', id);
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
      className={twMerge(
        `border-1 px-12 py-10 flex items-center border-border-main dark:border-border-main-dark text-text-subtle dark:text-text-subtle-dark rounded-none hover:border-border-selected dark:hover:border-border-selected-dark hover:text-text-main dark:hover:text-text-main-dark ${props.className}`
      )}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
