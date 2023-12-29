'use client';
import React from 'react';

const SkeletonLoader = (props: { className?: string }) => {
  return (
    <div
      className={`bg-[var(--color-etc-skeleton)] animate-pulse rounded-none ${props.className}`}
    ></div>
  );
};

export default SkeletonLoader;
