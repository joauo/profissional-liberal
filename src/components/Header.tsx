import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface HeaderProps {
  activeSection: string;
  onNavigate: (href: string, selectScheduleSubject?: boolean) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string, selectSchedule = false) => {
    setMobileOpen(false);
    onNavigate(href, selectSchedule);
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[var(--border-subtle)] bg-[#0F1115]/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zona 1: Marca pessoal em uma linha */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#inicio');
            }}
            className="font-display text-lg font-medium tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 transition-colors hover:text-[var(--accent-gold)] sm:text-xl"
          >
            {SITE_CONTENT.professional.name}
          </a>

          {/* Zona 2: Links de navegação com destaque do item ativo */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {SITE_CONTENT.nav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--accent-gold)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                      className="absolute right-0 bottom-0 left-0 h-px bg-[var(--accent-gold)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zona 3: Ação principal + botão hambúrguer mobile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('#contato', true)}
              className="hidden items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-4 py-2.5 text-sm font-medium text-[var(--text-on-accent)] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-gold-hover)] sm:inline-flex"
            >
              <span>{SITE_CONTENT.hero.primaryCta}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-surface)]/80 text-[var(--text-primary)] transition-colors hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)] lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Animado */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
            className="fixed inset-0 z-30 flex flex-col justify-between bg-[#0F1115]/98 px-6 pt-24 pb-8 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col divide-y divide-[var(--border-subtle)]">
              {SITE_CONTENT.nav.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReduced ? 0 : 0.05 * idx,
                      ease: EDITORIAL_EASE,
                    }}
                    className={`flex min-h-[52px] items-center justify-between py-3 font-display text-2xl transition-colors ${
                      isActive
                        ? 'text-[var(--accent-gold)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent-gold)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-xs tracking-widest text-[var(--text-muted)]">
                      0{idx + 1}
                    </span>
                  </motion.a>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
              <button
                type="button"
                onClick={() => handleLinkClick('#contato', true)}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-6 py-3.5 text-base font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-gold-hover)]"
              >
                <span>{SITE_CONTENT.hero.primaryCta}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
                {SITE_CONTENT.professional.registry} · {SITE_CONTENT.professional.city}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
