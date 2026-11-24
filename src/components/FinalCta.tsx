import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Calendar } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE, MagneticButton } from './MotionPrimitives';

interface FinalCtaProps {
  onNavigate: (href: string, selectScheduleSubject?: boolean) => void;
}

export function FinalCta({ onNavigate }: FinalCtaProps) {
  const prefersReduced = useReducedMotion();
  const whatsappUrl = `https://wa.me/${SITE_CONTENT.professional.whatsappNumber}?text=${encodeURIComponent(
    `Olá, ${SITE_CONTENT.professional.name}. Gostaria de conversar sobre um atendimento.`
  )}`;

  return (
    <section
      aria-label="Chamada final para agendamento"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-32"
    >
      {/* Detalhe dourado arquitetônico de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(201, 169, 106, 0.11) 0%, rgba(23, 26, 32, 0) 62%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-8 bottom-8 mx-auto max-w-6xl rounded-[var(--radius-card)] border border-[var(--accent-gold-border)]/25"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center sm:px-8">
        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EDITORIAL_EASE }}
          className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent-gold)]"
        >
          {SITE_CONTENT.finalCta.kicker}
        </motion.p>

        <motion.h2
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EDITORIAL_EASE }}
          className="mt-5 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.08] font-normal tracking-tight text-[var(--text-primary)]"
          style={{ textWrap: 'balance' }}
        >
          {SITE_CONTENT.finalCta.headline}
        </motion.h2>

        <div className="mt-7 flex justify-center">
          <motion.span
            aria-hidden="true"
            className="block h-px w-24 origin-center bg-[var(--accent-gold)]"
            initial={prefersReduced ? { opacity: 0 } : { scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EDITORIAL_EASE }}
          />
        </div>

        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.24, ease: EDITORIAL_EASE }}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          {SITE_CONTENT.finalCta.subtitle}
        </motion.p>

        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.32, ease: EDITORIAL_EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[50px] items-center gap-2.5 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-7 py-3.5 text-sm font-medium text-[var(--text-on-accent)] whitespace-nowrap transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--accent-gold-hover)] hover:shadow-[0_14px_30px_-10px_rgba(201,169,106,0.4)] sm:text-base"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>{SITE_CONTENT.finalCta.whatsappCta}</span>
          </MagneticButton>

          <button
            type="button"
            onClick={() => onNavigate('#contato', true)}
            className="inline-flex min-h-[50px] items-center gap-2.5 rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)]/80 px-7 py-3.5 text-sm font-medium text-[var(--text-primary)] whitespace-nowrap transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)] sm:text-base"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{SITE_CONTENT.finalCta.scheduleCta}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
