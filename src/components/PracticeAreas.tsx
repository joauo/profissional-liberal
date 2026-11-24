import { motion, useReducedMotion } from 'motion/react';
import {
  Compass,
  ShieldCheck,
  Layers,
  FileText,
  TrendingUp,
  Scale,
  ArrowUpRight,
} from 'lucide-react';
import { SITE_CONTENT, type PracticeArea } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

const ICON_MAP = {
  Compass,
  ShieldCheck,
  Layers,
  FileText,
  TrendingUp,
  Scale,
};

interface PracticeAreasProps {
  onSelectService: (serviceTitle: string) => void;
}

export function PracticeAreas({ onSelectService }: PracticeAreasProps) {
  const prefersReduced = useReducedMotion();

  const renderIcon = (name: PracticeArea['iconName']) => {
    const IconComponent = ICON_MAP[name];
    return <IconComponent className="h-5 w-5 stroke-[1.5]" aria-hidden="true" />;
  };

  return (
    <section
      id="atuacao"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeader
          kicker={SITE_CONTENT.practiceAreas.sectionTitle}
          headline={SITE_CONTENT.practiceAreas.headline}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SITE_CONTENT.practiceAreas.items.map((item, idx) => (
            <motion.button
              key={item.number}
              type="button"
              onClick={() => onSelectService(item.title)}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: prefersReduced ? 0 : idx * 0.1,
                ease: EDITORIAL_EASE,
              }}
              className="group flex flex-col justify-between rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold-border)] hover:shadow-[var(--shadow-card-hover)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm tabular-nums text-[var(--accent-gold)]">
                    {item.number}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors duration-300 group-hover:border-[var(--accent-gold-border)] group-hover:text-[var(--accent-gold)]">
                    {renderIcon(item.iconName)}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-xl font-medium text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-gold)]">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>

              <div className="mt-7 flex items-center gap-2 border-t border-[var(--border-subtle)] pt-4 text-xs font-medium tracking-wide text-[var(--text-muted)] transition-colors duration-200 group-hover:text-[var(--accent-gold)]">
                <span>Consultar disponibilidade</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
