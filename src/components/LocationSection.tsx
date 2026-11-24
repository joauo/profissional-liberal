import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useApiLoadingStatus,
  useMap,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, LocateFixed, Clock } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { EDITORIAL_EASE, SectionHeader } from './MotionPrimitives';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

function MapInner() {
  const map = useMap();
  const isLoaded = useApiIsLoaded();
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const { coordinates, addressLine, neighborhood } = SITE_CONTENT.location;

  const handleRecenter = useCallback(() => {
    if (map) {
      map.panTo(coordinates);
      map.setZoom(15);
      setInfoOpen(true);
    }
  }, [map, coordinates]);

  if (
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--bg-media-placeholder)] p-8 text-center">
        <MapPin className="h-7 w-7 text-[var(--accent-gold)]" aria-hidden="true" />
        <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
          Não foi possível carregar o mapa interativo no momento.
        </p>
        <p className="mt-1.5 max-w-md text-xs text-[var(--text-secondary)]">
          {addressLine} · {neighborhood}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-[var(--radius-button)] border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] px-4 py-2 text-xs font-medium text-[var(--accent-gold)] transition-colors hover:bg-[var(--accent-gold)] hover:text-[var(--text-on-accent)]"
        >
          <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Abrir no Google Maps</span>
        </a>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-media-placeholder)]">
          <span className="text-xs tracking-wide text-[var(--text-muted)]">
            Carregando Google Maps...
          </span>
        </div>
      )}

      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={coordinates}
        defaultZoom={15}
        gestureHandling="cooperative"
        colorScheme="DARK"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={coordinates}
          onClick={() => setInfoOpen(true)}
          title={`${SITE_CONTENT.professional.name} — ${addressLine}`}
        >
          <Pin
            background="#C9A96A"
            borderColor="#0F1115"
            glyphColor="#0F1115"
            scale={1.15}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={260}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-[#0F1115]">
              <p className="text-sm font-semibold">{SITE_CONTENT.professional.name}</p>
              <p className="mt-0.5 text-xs text-neutral-700">{addressLine}</p>
              <p className="text-xs text-neutral-600">{neighborhood}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Controle rápido para centralizar o marcador */}
      <button
        type="button"
        onClick={handleRecenter}
        className="absolute bottom-4 left-4 z-10 inline-flex min-h-[40px] items-center gap-2 rounded-[var(--radius-button)] border border-[var(--border-medium)] bg-[#0F1115]/90 px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] backdrop-blur-md transition-colors hover:border-[var(--accent-gold-border)] hover:text-[var(--accent-gold)]"
      >
        <LocateFixed className="h-3.5 w-3.5 text-[var(--accent-gold)]" aria-hidden="true" />
        <span>Centralizar endereço</span>
      </button>
    </div>
  );
}

export function LocationSection() {
  const prefersReduced = useReducedMotion();
  const { coordinates, addressLine, neighborhood, reference } = SITE_CONTENT.location;
  const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  return (
    <section
      id="localizacao"
      className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Informações do endereço fictício à esquerda */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EDITORIAL_EASE }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <SectionHeader
                kicker={SITE_CONTENT.location.sectionTitle}
                headline={SITE_CONTENT.location.headline}
              />

              <p className="mt-6 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                {SITE_CONTENT.location.description}
              </p>

              <div className="mt-8 space-y-5 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-gold)]">
                    <MapPin className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-[var(--text-muted)]">
                      Endereço de atendimento (exemplo)
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)] sm:text-base">
                      {addressLine}
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                      {neighborhood}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      {reference}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-[var(--border-subtle)] pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--accent-gold)]">
                    <Clock className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-[var(--text-muted)]">
                      Horário presencial
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                      {SITE_CONTENT.professional.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2.5 rounded-[var(--radius-button)] border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] px-6 py-3 text-sm font-medium text-[var(--accent-gold)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent-gold)] hover:text-[var(--text-on-accent)]"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>Ver rotas no Google Maps</span>
              </a>
            </div>
          </motion.div>

          {/* Mapa interativo do Google Maps à direita com altura explícita */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EDITORIAL_EASE }}
            className="lg:col-span-7"
          >
            <div className="h-[380px] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-medium)] bg-[var(--bg-media-placeholder)] sm:h-[440px] lg:h-full lg:min-h-[480px]">
              {GOOGLE_MAPS_API_KEY ? (
                <APIProvider
                  apiKey={GOOGLE_MAPS_API_KEY}
                  language="pt-BR"
                  region="BR"
                  libraries={['marker']}
                >
                  <MapInner />
                </APIProvider>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <MapPin className="h-7 w-7 text-[var(--accent-gold)]" aria-hidden="true" />
                  <p className="mt-4 text-sm font-medium text-[var(--text-primary)]">
                    Mapa do Google Maps
                  </p>
                  <p className="mt-1.5 max-w-md text-xs text-[var(--text-secondary)]">
                    {addressLine} · {neighborhood}
                  </p>
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent-gold)] px-5 py-2.5 text-xs font-medium text-[var(--text-on-accent)] transition-colors hover:bg-[var(--accent-gold-hover)]"
                  >
                    <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Abrir localização no Google Maps</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
