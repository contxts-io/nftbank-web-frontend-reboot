import { useRef, useEffect } from 'react';

const useIntersection = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (target.current) {
      observer.observe(target.current);
    }
    return () => observer.disconnect();
  }, [callback, options]);

  return target;
};

export default useIntersection;