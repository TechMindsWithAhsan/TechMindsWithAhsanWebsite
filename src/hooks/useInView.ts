'use client';

import { useState, useEffect, useRef } from 'react';

export function useInView(options: IntersectionObserverInit = { threshold: 0.1 }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { threshold, root, rootMargin } = options;

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, { threshold, root, rootMargin });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin]);

  return [ref, isInView] as const;
}
