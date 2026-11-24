import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { SITE_CONTENT, type MethodStep } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

export function MethodTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(prefersReduced ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.72', 'end 0.58'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest);
  });

  const stepThresholds = [0.05, 0.34, 0.62, 0.88];

  return (
    <section
      id="metodo"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Coluna esquerda fixa em telas maiores */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                kicker={SITE_CONTENT.method.sectionTitle}
                headline={SITE_CONTENT.method.headline}
              />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                Cada etapa foi desenhada para eliminar ruídos, alinhar expectativas desde o início e manter total clareza sobre prazos e entregas.
              </p>
            </div>
          </div>

          {/* Linha do tempo vertical à direita */}
          <div ref={timelineRef} className="relative lg:col-span-7">
            {/* Trilha base cinza */}
            <div
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-5 w-px bg-[var(--border-subtle)] sm:left-6"
            />

            {/* Linha dourada scroll-linked */}
            <motion.div
              aria-hidden="true"
              style={
                prefersReduced
                  ? { scaleY: 1 }
                  : {
                      scaleY: lineScaleY,
                    }
              }
              className="absolute top-3 bottom-3 left-5 w-[2px] -translate-x-[0.5px] origin-top bg-[var(--accent-gold)] sm:left-6"
            />

            <div className="space-y-10 sm:space-y-12">
              {SITE_CONTENT.method.steps.map((step: MethodStep, index: number) => {
                const isLit = prefersReduced || progress >= stepThresholds[index];
                return (
                  <motion.div
                    key={step.number}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                    whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.65,
                      delay: prefersReduced ? 0 : index * 0.08,
                      ease: EDITORIAL_EASE,
                    }}
                    className="relative pl-14 sm:pl-18"
                  >
                    {/* Nó da linha do tempo que acende ao ser alcançado */}
                    <div
                      aria-hidden="true"
                      className={`absolute top-1 left-0 flex h-10 w-10 items-center justify-center rounded-full border text-xs font-medium tabular-nums transition-all duration-500 sm:h-12 sm:w-12 sm:text-sm ${
                        isLit
                          ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)] text-[var(--text-on-accent)] shadow-[0_0_24px_rgba(201,169,106,0.35)]'
                          : 'border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-muted)]'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div
                      className={`rounded-[var(--radius-card)] border p-6 transition-all duration-500 sm:p-7 ${
                        isLit
                          ? 'border-[var(--accent-gold-border)] bg-[var(--bg-surface)] opacity-100'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/55 opacity-60'
                      }`}
                    >
                      <h3
                        className={`font-display text-xl font-medium transition-colors duration-500 sm:text-2xl ${
                          isLit ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-[var(--text-primary)]/90 sm:text-base">
                        {step.summary}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
