import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SITE_CONTENT } from '../data/siteContent';

export function CredibilityMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 0.35'],
  });

  // Efeito de cortina: borda superior arredondada (48px) se endireita até 0 ao entrar
  const topRadius = useTransform(scrollYProgress, [0, 1], [48, 0]);

  const items = SITE_CONTENT.marqueeItems;

  return (
    <motion.section
      ref={containerRef}
      aria-label="Especialidades e diferenciais"
      style={
        prefersReduced
          ? undefined
          : {
              borderTopLeftRadius: topRadius,
              borderTopRightRadius: topRadius,
            }
      }
      className="relative z-20 -mt-8 overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] py-5 shadow-[0_-24px_60px_rgba(0,0,0,0.65)] sm:py-6"
    >
      <div className="marquee-container relative flex w-full overflow-hidden">
        <div className="marquee-track items-center">
          {[0, 1].map((duplicateIdx) => (
            <div
              key={duplicateIdx}
              aria-hidden={duplicateIdx === 1}
              className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
            >
              {items.map((item, idx) => (
                <div key={`${duplicateIdx}-${idx}`} className="flex items-center gap-8 sm:gap-12">
                  <span className="font-display text-base tracking-wide text-[var(--text-primary)]/90 whitespace-nowrap sm:text-lg">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rotate-45 bg-[var(--accent-gold)]"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
