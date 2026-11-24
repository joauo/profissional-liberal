import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Plus } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              kicker={SITE_CONTENT.faq.sectionTitle}
              headline={SITE_CONTENT.faq.headline}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {SITE_CONTENT.faq.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const panelId = `faq-panel-${idx}`;
                const buttonId = `faq-button-${idx}`;

                return (
                  <motion.div
                    key={item.question}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      delay: prefersReduced ? 0 : idx * 0.08,
                      ease: EDITORIAL_EASE,
                    }}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleIndex(idx)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[var(--accent-gold)]"
                    >
                      <span
                        className={`font-display text-lg leading-snug transition-colors sm:text-xl ${
                          isOpen ? 'text-[var(--accent-gold)]' : 'text-[var(--text-primary)]'
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-45 border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]'
                            : 'border-[var(--border-medium)] text-[var(--text-secondary)]'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={
                            prefersReduced
                              ? { opacity: 0 }
                              : { opacity: 0, height: 0 }
                          }
                          animate={
                            prefersReduced
                              ? { opacity: 1 }
                              : { opacity: 1, height: 'auto' }
                          }
                          exit={
                            prefersReduced
                              ? { opacity: 0 }
                              : { opacity: 0, height: 0 }
                          }
                          transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-8 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
