/**
 * V5.1 Motion Primitives: Geometric & Masked Reveals
 */
import { seg, E } from './easing';

export const linearClipReveal = (progress: number, direction: 'ltr' | 'rtl' | 'ttb' | 'btt' = 'ltr'): string => {
  const p = Math.max(0, Math.min(1, progress)) * 100;
  switch (direction) {
    case 'ltr':
      return `polygon(0% 0%, ${p}% 0%, ${p}% 100%, 0% 100%)`;
    case 'rtl':
      return `polygon(${100 - p}% 0%, 100% 0%, 100% 100%, ${100 - p}% 100%)`;
    case 'ttb':
      return `polygon(0% 0%, 100% 0%, 100% ${p}%, 0% ${p}%)`;
    case 'btt':
      return `polygon(0% ${100 - p}%, 100% ${100 - p}%, 100% 100%, 0% 100%)`;
  }
};

export const radialIrisReveal = (progress: number): string => {
  const r = Math.max(0, Math.min(1, progress)) * 150;
  return `circle(${r}% at 50% 50%)`;
};
