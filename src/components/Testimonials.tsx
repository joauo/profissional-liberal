import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReduced = useReducedMotion();

  const items = SITE_CONTENT.testimonials.items;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [isPaused, items.length]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleSelect = (idx: number) => {
    setDirection(idx >= activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const current = items[activeIndex];

  return (
    <section
      id="depoimentos"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            kicker={SITE_CONTENT.testimonials.sectionTitle}
            headline={SITE_CONTENT.testimonials.headline}
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Depoimento anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próximo depoimento"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-medium)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="mt-14 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-12 lg:p-14"
        >
          <Quote
            className="h-8 w-8 text-[var(--accent-gold)] opacity-75"
            strokeWidth={1.25}
            aria-hidden="true"
          />

          <div className="relative mt-6 min-h-[190px] sm:min-h-[160px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? 28 : -28 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction > 0 ? -28 : 28 }
                }
                transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
              >
                <blockquote className="font-display text-xl leading-relaxed font-normal text-[var(--text-primary)] sm:text-2xl lg:text-[1.75rem]">
                  “{current.quote}”
                </blockquote>

                <div className="mt-8 flex flex-col gap-1 border-t border-[var(--border-subtle)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-medium text-[var(--text-primary)]">
                      {current.clientName}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {current.clientRole}
                    </p>
                  </div>
                  <p className="text-xs tracking-wide text-[var(--text-muted)]">
                    {current.context}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores de slide */}
          <div className="mt-8 flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
            <div className="flex items-center gap-2" role="tablist" aria-label="Selecionar depoimento">
              {items.map((item, idx) => {
                const selected = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Depoimento ${idx + 1}: ${item.clientName}`}
                    onClick={() => handleSelect(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      selected
                        ? 'w-8 bg-[var(--accent-gold)]'
                        : 'w-2 bg-[var(--border-medium)] hover:bg-[var(--text-muted)]'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-xs tabular-nums text-[var(--text-muted)]">
              0{activeIndex + 1} / 0{items.length}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
