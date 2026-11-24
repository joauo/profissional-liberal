import { motion, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE } from './MotionPrimitives';

export function FloatingWhatsApp() {
  const prefersReduced = useReducedMotion();
  const whatsappUrl = `https://wa.me/${SITE_CONTENT.professional.whatsappNumber}?text=${encodeURIComponent(
    `Olá, ${SITE_CONTENT.professional.name}. Vim pelo seu site e gostaria de agendar uma conversa.`
  )}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      title="Falar pelo WhatsApp"
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.85, ease: EDITORIAL_EASE }}
      className="group fixed right-5 bottom-5 z-40 inline-flex h-12 items-center gap-2.5 rounded-full border border-[var(--accent-gold-border)] bg-[var(--bg-surface)]/95 px-4 text-sm font-medium text-[var(--text-primary)] shadow-[0_14px_34px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent-gold)] hover:bg-[var(--accent-gold)] hover:text-[var(--text-on-accent)] sm:right-7 sm:bottom-7"
    >
      <MessageCircle
        className="h-5 w-5 text-[var(--accent-gold)] transition-colors group-hover:text-[var(--text-on-accent)]"
        aria-hidden="true"
      />
      <span className="hidden whitespace-nowrap sm:inline">WhatsApp</span>
    </motion.a>
  );
}
