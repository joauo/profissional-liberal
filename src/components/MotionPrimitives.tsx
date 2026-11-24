import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion, useSpring, useMotionValue } from 'motion/react';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

interface SectionHeaderProps {
  kicker: string;
  headline: string;
  align?: 'left' | 'center';
}

/**
 * Cabeçalho padrão de seção:
 * 1) Título sobe com fade (translateY 40 -> 0, opacity 0 -> 1, 0.7s)
 * 2) Traço dourado se desenha da esquerda para a direita logo abaixo
 * Ativa uma única vez quando 20% da seção/bloco entra na viewport.
 */
export function SectionHeader({ kicker, headline, align = 'left' }: SectionHeaderProps) {
  const prefersReduced = useReducedMotion();
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
      >
        <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--accent-gold)]">
          {kicker}
        </p>
        <h2
          className="mt-3 font-display text-3xl leading-[1.15] font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[2.75rem]"
          style={{ textWrap: 'balance' }}
        >
          {headline}
        </h2>
      </motion.div>

      <div className={`mt-6 flex ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <motion.span
          aria-hidden="true"
          className="block h-px w-20 origin-left bg-[var(--accent-gold)]"
          initial={prefersReduced ? { opacity: 0 } : { scaleX: 0, opacity: 0.4 }}
          whileInView={prefersReduced ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.22, ease: EDITORIAL_EASE }}
        />
      </div>
    </div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
  ariaLabel?: string;
  strength?: number;
}

/**
 * Botão com efeito magnético sutil ao aproximar o cursor (apenas em dispositivos com mouse/hover fino).
 * Respeita prefers-reduced-motion e mantém feedback de hover/toque imediato.
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  type = 'button',
  target,
  rel,
  ariaLabel,
  strength = 0.22,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced || !canHover ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
