import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-[2px] origin-left bg-[var(--accent-gold)]"
      style={{
        scaleX: prefersReduced ? scrollYProgress : scaleX,
      }}
    />
  );
}
