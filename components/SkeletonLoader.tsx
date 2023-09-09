import React from 'react';

const SkeletonLoader = (props: { className?: string }) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse rounded ${props.className}`}
    ></div>
  );
};

export default SkeletonLoader;
