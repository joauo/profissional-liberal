/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { SITE_CONTENT } from './data/siteContent';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CredibilityMarquee } from './components/CredibilityMarquee';
import { About } from './components/About';
import { PracticeAreas } from './components/PracticeAreas';
import { MethodTimeline } from './components/MethodTimeline';
import { ResultsMetrics } from './components/ResultsMetrics';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { InsightsSection } from './components/InsightsSection';
import { FinalCta } from './components/FinalCta';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('sobre');
  const [preselectedSubject, setPreselectedSubject] = useState<string>(
    SITE_CONTENT.contact.subjects[0]
  );
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  // Rastreia a seção visível para destacar o item correspondente no menu
  useEffect(() => {
    const sectionIds = SITE_CONTENT.nav.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const handleScroll = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];

      for (const el of elements) {
        if (el.offsetTop <= scrollMarker) {
          current = el.id;
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((href: string, selectScheduleSubject = false) => {
    if (selectScheduleSubject) {
      setPreselectedSubject('Agendamento de conversa');
    }

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (href === '#inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      const matchingSubject = SITE_CONTENT.contact.subjects.find((s) => s === serviceTitle);
      setPreselectedSubject(matchingSubject || SITE_CONTENT.contact.subjects[0]);
      handleNavigate('#contato');
    },
    [handleNavigate]
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]"
      >
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <ScrollProgressBar />
        <Header activeSection={activeSection} onNavigate={handleNavigate} />

        <main>
          <Hero onNavigate={handleNavigate} />
          <CredibilityMarquee />
          <About onNavigate={handleNavigate} />
          <PracticeAreas onSelectService={handleSelectService} />
          <MethodTimeline />
          <ResultsMetrics />
          <Testimonials />
          <FaqSection />
          <InsightsSection onNavigate={handleNavigate} />
          <FinalCta onNavigate={handleNavigate} />
          <LocationSection />
          <ContactSection preselectedSubject={preselectedSubject} />
        </main>

        <Footer onNavigate={handleNavigate} />
        <FloatingWhatsApp />
      </motion.div>
    </MotionConfig>
  );
}
