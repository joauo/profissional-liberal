import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE, MagneticButton, SectionHeader } from './MotionPrimitives';

interface ContactSectionProps {
  preselectedSubject: string;
}

interface FormValues {
  name: string;
  whatsapp: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  whatsapp?: string;
  email?: string;
  message?: string;
}

export function ContactSection({ preselectedSubject }: ContactSectionProps) {
  const prefersReduced = useReducedMotion();
  const [values, setValues] = useState<FormValues>({
    name: '',
    whatsapp: '',
    email: '',
    subject: preselectedSubject || SITE_CONTENT.contact.subjects[0],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');

  useEffect(() => {
    if (preselectedSubject) {
      setValues((prev) => ({ ...prev, subject: preselectedSubject }));
    }
  }, [preselectedSubject]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome completo.';
    }
    const digits = values.whatsapp.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.whatsapp = 'Informe um número de WhatsApp com DDD.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Descreva brevemente como posso ajudar (mínimo de 10 caracteres).';
    }
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    window.setTimeout(() => {
      setStatus('sent');
    }, 550);
  };

  const handleReset = () => {
    setValues({
      name: '',
      whatsapp: '',
      email: '',
      subject: SITE_CONTENT.contact.subjects[0],
      message: '',
    });
    setErrors({});
    setStatus('idle');
  };

  const infoIcons = [Phone, Mail, MapPin, Clock];

  return (
    <section
      id="contato"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Informações de contato à esquerda */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
            className="lg:col-span-5"
          >
            <SectionHeader
              kicker={SITE_CONTENT.contact.sectionTitle}
              headline={SITE_CONTENT.contact.headline}
            />

            <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {SITE_CONTENT.contact.description}
            </p>

            <div className="mt-10 space-y-6 border-t border-[var(--border-subtle)] pt-8">
              {SITE_CONTENT.contact.infoItems.map((item, idx) => {
                const Icon = infoIcons[idx] || Phone;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-gold)]">
                      <Icon className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs tracking-wide text-[var(--text-muted)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--text-primary)] sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Formulário à direita */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EDITORIAL_EASE }}
            className="lg:col-span-7"
          >
            <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-10">
              {status === 'sent' ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start py-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] text-[var(--accent-gold)]">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-normal text-[var(--text-primary)]">
                    Mensagem registrada com sucesso
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                    Obrigado pelo contato, {values.name}. Este é um modelo demonstrativo; ao publicar seu site, conecte este formulário ao seu e-mail ou CRM para receber mensagens reais.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex min-h-[44px] items-center rounded-[var(--radius-button)] border border-[var(--border-medium)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)]"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
                      >
                        Nome completo
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Como prefere ser chamado(a)"
                        value={values.name}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        aria-invalid={Boolean(errors.name)}
                        className="mt-2 h-12 w-full rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-whatsapp"
                        className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
                      >
                        WhatsApp
                      </label>
                      <input
                        id="contact-whatsapp"
                        name="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        placeholder="(00) 00000-0000"
                        value={values.whatsapp}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, whatsapp: e.target.value }));
                          if (errors.whatsapp) {
                            setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.whatsapp)}
                        className="mt-2 h-12 w-full rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none"
                      />
                      {errors.whatsapp && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.whatsapp}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
                      >
                        E-mail
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="voce@exemplo.com"
                        value={values.email}
                        onChange={(e) => {
                          setValues((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        aria-invalid={Boolean(errors.email)}
                        className="mt-2 h-12 w-full rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
                      >
                        Assunto
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={values.subject}
                        onChange={(e) =>
                          setValues((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        className="mt-2 h-12 w-full rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)] px-4 text-sm text-[var(--text-primary)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none"
                      >
                        {SITE_CONTENT.contact.subjects.map((subj) => (
                          <option key={subj} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium tracking-wide text-[var(--text-secondary)]"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Conte brevemente sobre o seu momento ou dúvida principal."
                      value={values.message}
                      onChange={(e) => {
                        setValues((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) {
                          setErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.message)}
                      className="mt-2 w-full rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[var(--bg-canvas)] p-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent-gold)] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-7 py-3.5 text-sm font-medium text-[var(--text-on-accent)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-gold-hover)] hover:shadow-[0_14px_28px_-10px_rgba(201,169,106,0.36)] sm:w-auto sm:text-base"
                    >
                      <span>
                        {status === 'submitting' ? 'Enviando mensagem...' : 'Enviar mensagem'}
                      </span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
