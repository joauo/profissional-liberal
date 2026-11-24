import { ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start">
          {/* Marca pessoal e registro */}
          <div className="md:col-span-5">
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#inicio');
              }}
              className="font-display text-xl font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent-gold)]"
            >
              {SITE_CONTENT.professional.name}
            </a>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {SITE_CONTENT.professional.profession} · {SITE_CONTENT.professional.registry}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {SITE_CONTENT.professional.city} · {SITE_CONTENT.professional.email}
            </p>
          </div>

          {/* Links rápidos */}
          <div className="md:col-span-4">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--text-muted)]">
              Navegação
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {SITE_CONTENT.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    className="text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-gold)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociais de exemplo */}
          <div className="md:col-span-3">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[var(--text-muted)]">
              Redes sociais
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SITE_CONTENT.footer.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(social.href);
                    }}
                    className="inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-gold)]"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{SITE_CONTENT.footer.copyright}</p>
          <p>{SITE_CONTENT.footer.note}</p>
        </div>
      </div>
    </footer>
  );
}
