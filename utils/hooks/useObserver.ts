import { RefObject, useEffect } from "react";
type Props = {
  target: RefObject<HTMLElement>,
  onIntersect: any,
  root?: any,
}
export const useObserver = (props: Props) => {
  console.log('useObserver',props)
  const ref = props.target;
  useEffect(() => {
    let observer: IntersectionObserver;
    if (ref && ref.current) {
      observer = new IntersectionObserver(props.onIntersect, {
        root: props.root || null,
        rootMargin: '0px',
        threshold: 1.0,
      });
      observer.observe(ref.current);
    }
    return () => {
      observer && observer.disconnect();
    }
  }, [ref]);
};