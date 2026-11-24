import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { MediaPlaceholder } from './MediaPlaceholder';
import { EDITORIAL_EASE, MagneticButton, SectionHeader } from './MotionPrimitives';

interface AboutProps {
  onNavigate: (href: string, selectScheduleSubject?: boolean) => void;
}

export function About({ onNavigate }: AboutProps) {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="sobre"
      className="relative bg-[var(--bg-canvas)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Bloco de foto entrando pela esquerda */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -44 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EDITORIAL_EASE }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <MediaPlaceholder
                label={SITE_CONTENT.about.photoLabel}
                caption={`${SITE_CONTENT.professional.name} · ${SITE_CONTENT.professional.profession}`}
                aspectClass="aspect-[4/5]"
                className="rounded-[var(--radius-card)]"
              />
              {/* Detalhe geométrico sutil de enquadramento */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-[var(--radius-card)] border border-[var(--accent-gold-border)]/45"
              />
            </div>
          </motion.div>

          {/* Bloco de texto entrando pela direita */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 44 }}
            whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: EDITORIAL_EASE }}
            className="lg:col-span-7"
          >
            <SectionHeader
              kicker={SITE_CONTENT.about.sectionTitle}
              headline={SITE_CONTENT.about.headline}
            />

            <div className="mt-8 space-y-5 text-base leading-[1.75] text-[var(--text-secondary)] sm:text-[17px]">
              {SITE_CONTENT.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Nome do profissional e CTA */}
            <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-[var(--border-subtle)] pt-8 sm:flex-row sm:items-center">
              <div>
                <p className="font-sans text-xl font-semibold tracking-tight text-[var(--accent-gold)] sm:text-2xl">
                  {SITE_CONTENT.professional.name}
                </p>
                <p className="mt-1.5 text-xs tracking-wide text-[var(--text-muted)]">
                  {SITE_CONTENT.professional.profession} · {SITE_CONTENT.professional.registry}
                </p>
              </div>

              <MagneticButton
                onClick={() => onNavigate('#contato', true)}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-[var(--radius-button)] border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] px-6 py-3 text-sm font-medium text-[var(--accent-gold)] whitespace-nowrap transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--accent-gold)] hover:text-[var(--text-on-accent)]"
              >
                <span>{SITE_CONTENT.about.ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
