export const heroEase = [0.16, 1, 0.3, 1] as const;

export const heroEnter = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, delay, ease: heroEase },
});

export const heroKickerEnter = (delay = 0) => ({
  initial: { opacity: 0, y: 14, scale: 0.88 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring' as const, stiffness: 380, damping: 22, delay },
});

export const heroTitleEnter = (delay = 0) => ({
  initial: { opacity: 0, y: 40, rotateX: 14 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 0.78, delay, ease: heroEase },
});

export const heroAccentEnter = (delay = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring' as const, stiffness: 320, damping: 20, delay },
});

export const heroMockupEnter = {
  initial: { opacity: 0, y: 56, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.85, delay: 0.45, ease: heroEase },
};
