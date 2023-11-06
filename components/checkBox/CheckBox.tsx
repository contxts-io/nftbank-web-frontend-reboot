'use client';
import Check from '@/public/icon/Check';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  checked: boolean;
  onClick: () => void;
  className?: string;
};
const CheckBox = (props: Props) => {
  const { checked, onClick, className } = props;
  const handleClickButton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <button
      className={twMerge(
        `border-1 border-[var(--color-border-bold)] bg-[var(--color-elevation-surface)] w-16 h-16 flex items-center justify-center cursor-pointer ${
          className ? className : ''
        }`
      )}
      onClick={handleClickButton}
    >
      {checked && <Check className='fill-[var(--color-icon-inverse)]' />}
    </button>
  );
};
export default CheckBox;
