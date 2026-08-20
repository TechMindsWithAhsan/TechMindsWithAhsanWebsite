'use client';

import { useState, useEffect } from 'react';

export function useCountUp(targetValue: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0); // Reset if trigger is false
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate current value based on progress and duration
      // Use easeOutQuart easing function for smoother ending
      const percentage = Math.min(progress / duration, 1);
      const easeOutPercentage = 1 - Math.pow(1 - percentage, 4);
      
      const currentCount = Math.floor(easeOutPercentage * targetValue);
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(targetValue); // Ensure we end exactly on target
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetValue, duration, trigger]);

  return count;
}
