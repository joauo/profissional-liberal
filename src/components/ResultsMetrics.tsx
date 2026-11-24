import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { SITE_CONTENT, type ResultMetric } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  padZero?: boolean;
}

function AnimatedCounter({ target, suffix, padZero = false }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const durationMs = 1600;
    let startTime: number | null = null;
    let rafId = 0;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const currentValue = Math.round(easeOutQuart(progress) * target);
      setCount(currentValue);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [inView, target, prefersReduced]);

  const formatted = padZero ? String(count).padStart(2, '0') : String(count);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export function ResultsMetrics() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="resultados"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          kicker={SITE_CONTENT.results.sectionTitle}
          headline={SITE_CONTENT.results.headline}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONTENT.results.items.map((metric: ResultMetric, idx: number) => (
            <motion.div
              key={metric.label}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: prefersReduced ? 0 : idx * 0.1,
                ease: EDITORIAL_EASE,
              }}
              className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold-border)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <p className="font-display text-4xl font-normal tracking-tight text-[var(--accent-gold)] sm:text-5xl">
                <AnimatedCounter
                  target={metric.target}
                  suffix={metric.suffix}
                  padZero={metric.padZero}
                />
              </p>
              <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
                {metric.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
