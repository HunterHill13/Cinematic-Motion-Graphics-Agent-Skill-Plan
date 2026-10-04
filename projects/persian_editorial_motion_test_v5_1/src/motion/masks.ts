/**
 * V5.1 Motion Primitives: Alpha & Coordinate Masks
 */

export const editorialGlowMask = (xPercent = 50, yPercent = 50, radius = 300): string => {
  return `radial-gradient(circle ${radius}px at ${xPercent}% ${yPercent}%, rgba(212,175,55,0.15) 0%, transparent 70%)`;
};

export const vignetteMask = (): string => {
  return `radial-gradient(circle at 50% 50%, transparent 40%, rgba(5,8,20,0.8) 100%)`;
};
