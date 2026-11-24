import type { ReactNode } from 'react';

interface MediaPlaceholderProps {
  label: string;
  caption?: string;
  aspectClass?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Bloco neutro estruturado para substituir fotos/imagens reais neste modelo.
 * Mantém proporção arquitetônica limpa e texto discreto centralizado.
 */
export function MediaPlaceholder({
  label,
  caption,
  aspectClass = 'aspect-[4/5]',
  className = '',
  children,
}: MediaPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-media-placeholder)] border border-[var(--border-subtle)] ${aspectClass} ${className}`}
    >
      {/* Grade geométrica sutil de estúdio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(201, 169, 106, 0.09) 0%, transparent 62%), linear-gradient(to right, rgba(242, 239, 232, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(242, 239, 232, 0.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Cantoneiras finas em dourado suave */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t border-l border-[var(--accent-gold-border)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 h-3 w-3 border-t border-r border-[var(--accent-gold-border)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-[var(--accent-gold-border)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[var(--accent-gold-border)]"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--text-muted)]">
          {label}
        </span>
        {caption && (
          <span className="mt-2 text-xs text-[var(--text-muted)]/75">
            {caption}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
