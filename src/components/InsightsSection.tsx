import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { SITE_CONTENT, type ContentArticle } from '../data/siteContent';
import { MediaPlaceholder } from './MediaPlaceholder';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

interface InsightsSectionProps {
  onNavigate: (href: string, selectScheduleSubject?: boolean) => void;
}

export function InsightsSection({ onNavigate }: InsightsSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<ContentArticle | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section
      id="conteudo"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          kicker={SITE_CONTENT.insights.sectionTitle}
          headline={SITE_CONTENT.insights.headline}
        />

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3">
          {SITE_CONTENT.insights.items.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: prefersReduced ? 0 : idx * 0.1,
                ease: EDITORIAL_EASE,
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold-border)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <div>
                <MediaPlaceholder
                  label={SITE_CONTENT.insights.imageLabel}
                  aspectClass="aspect-[16/10]"
                  className="border-0 border-b border-[var(--border-subtle)]"
                />

                <div className="p-6 sm:p-7">
                  {/* Metadados limpos sem pílulas */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--accent-gold)]">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl leading-snug font-normal text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-gold)]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent-gold)]"
                >
                  <span>Ler resumo</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--accent-gold)]" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Modal de leitura do artigo */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-card)] border border-[var(--border-medium)] bg-[var(--bg-surface)] p-6 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Fechar artigo"
                className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 pr-12 text-xs text-[var(--text-muted)]">
                <span className="text-[var(--accent-gold)]">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <h3
                id="article-modal-title"
                className="mt-4 font-display text-2xl leading-snug font-normal text-[var(--text-primary)] sm:text-3xl"
              >
                {selectedArticle.title}
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {selectedArticle.fullText.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6">
                <span className="text-xs text-[var(--text-muted)]">
                  Por {SITE_CONTENT.professional.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(null);
                    onNavigate('#contato', true);
                  }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-5 py-2.5 text-sm font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-gold-hover)]"
                >
                  <span>{SITE_CONTENT.hero.primaryCta}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
