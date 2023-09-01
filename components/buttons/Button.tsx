'use client';
import React, { useEffect } from 'react';
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
    <button {...props} id={id}>
      {children}
    </button>
  );
};

export default Button;
