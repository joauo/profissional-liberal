import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { MediaPlaceholder } from './MediaPlaceholder';
import { EDITORIAL_EASE, MagneticButton } from './MotionPrimitives';

interface HeroProps {
  onNavigate: (href: string, selectScheduleSubject?: boolean) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: o bloco de foto desloca mais devagar que o texto e sobe suavemente ao sair
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.45, 0.15]);

  const baseDelay = 0.18;
  const lineStagger = 0.12;
  const afterHeadlineDelay = baseDelay + SITE_CONTENT.hero.headlineLines.length * lineStagger + 0.08;

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--bg-canvas)] pt-24 pb-20 lg:pt-28 lg:pb-24"
    >
      {/* Bloco de fundo / lado direito "Sua foto aqui" com zoom lento (6s) e parallax */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : {
                y: photoY,
                opacity: heroOpacity,
              }
        }
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[58%]"
      >
        <motion.div
          initial={prefersReduced ? { scale: 1 } : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: EDITORIAL_EASE }}
          className="h-full w-full"
        >
          <MediaPlaceholder
            label={SITE_CONTENT.hero.photoLabel}
            caption={SITE_CONTENT.hero.photoCaption}
            aspectClass="h-full w-full"
            className="border-0 border-l border-[var(--border-subtle)]"
          />
        </motion.div>

        {/* Sobreposição escura em degradê para leitura impecável do texto */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'var(--scrim-hero)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--bg-canvas)] via-transparent to-[var(--bg-canvas)]/60 lg:via-transparent"
        />
      </motion.div>

      {/* Conteúdo principal do Hero */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : {
                y: contentY,
                opacity: heroOpacity,
              }
        }
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-3xl">
          {/* Kicker discreto sem pílulas */}
          <motion.p
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EDITORIAL_EASE }}
            className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--accent-gold)] sm:text-[13px]"
          >
            {SITE_CONTENT.hero.kicker}
          </motion.p>

          {/* Headline linha por linha subindo de dentro de máscara */}
          <h1
            className="mt-5 font-display text-[clamp(2.25rem,4.4vw,3.9rem)] leading-[1.08] font-semibold tracking-tight text-[var(--text-primary)]"
            style={{ textWrap: 'balance' }}
          >
            {SITE_CONTENT.hero.headlineLines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={prefersReduced ? { opacity: 0 } : { y: '100%' }}
                  animate={prefersReduced ? { opacity: 1 } : { y: '0%' }}
                  transition={{
                    duration: prefersReduced ? 0.4 : 0.8,
                    delay: prefersReduced ? 0.05 : baseDelay + index * lineStagger,
                    ease: EDITORIAL_EASE,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: prefersReduced ? 0.1 : afterHeadlineDelay,
              ease: EDITORIAL_EASE,
            }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          >
            {SITE_CONTENT.hero.subtitle}
          </motion.p>

          {/* Botões de ação em sequência */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: prefersReduced ? 0.15 : afterHeadlineDelay + 0.1,
              ease: EDITORIAL_EASE,
            }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => onNavigate('#contato', true)}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-6 py-3.5 text-sm font-medium text-[var(--text-on-accent)] whitespace-nowrap transition-all duration-200 hover:-translate-y-1 hover:bg-[var(--accent-gold-hover)] hover:shadow-[0_14px_28px_-10px_rgba(201,169,106,0.38)] sm:text-base"
            >
              <span>{SITE_CONTENT.hero.primaryCta}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => onNavigate('#metodo')}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-surface)]/70 px-6 py-3.5 text-sm font-medium text-[var(--text-primary)] whitespace-nowrap backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)] sm:text-base"
            >
              <span>{SITE_CONTENT.hero.secondaryCta}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Três selos de credibilidade abaixo */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: prefersReduced ? 0.2 : afterHeadlineDelay + 0.2,
              ease: EDITORIAL_EASE,
            }}
            className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-7 sm:grid-cols-3 sm:gap-8"
          >
            {SITE_CONTENT.hero.badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: prefersReduced ? 0.2 : afterHeadlineDelay + 0.25 + index * 0.1,
                  ease: EDITORIAL_EASE,
                }}
                className="flex flex-col"
              >
                <span className="font-display text-lg font-medium text-[var(--text-primary)]">
                  {badge.label}
                </span>
                <span className="mt-1 text-xs tracking-wide text-[var(--text-muted)]">
                  {badge.detail}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
