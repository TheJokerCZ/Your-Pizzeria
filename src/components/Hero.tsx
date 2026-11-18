import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Flame, UtensilsCrossed } from 'lucide-react';
import { HERO_IMAGE_PATH, FOODORA_URL, BUSINESS_INFO } from '../data/menuData';
import { getPragueOpeningStatus, LiveOpeningStatus } from '../utils/openingHours';

export function Hero() {
  const [imageError, setImageError] = useState(false);
  const [heroSrc, setHeroSrc] = useState(HERO_IMAGE_PATH);
  const [openingStatus, setOpeningStatus] = useState<LiveOpeningStatus>(() =>
    getPragueOpeningStatus()
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setOpeningStatus(getPragueOpeningStatus());
    }, 30000);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Full-Width Centered Editorial Hero Header */}
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium text-accent italic">
            <span>Tradiční pizzerie v Jihlavě</span>
            <span aria-hidden="true">·</span>
            <span>Křižíkova 552/17</span>
            <span aria-hidden="true">·</span>
            <span>Rozvoz po celé Jihlavě</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-[4.25rem] font-bold text-ink tracking-tight leading-[1.08] font-display"
            style={{ textWrap: 'balance' }}
          >
            Poctivá čerstvě upečená pizza s pravou chutí Itálie
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            V Pizzerii připravujeme každou pizzu z čerstvého těsta a poctivých surovin ve třech velikostech — od rodinné Jumbo (40 cm) přes Velkou (28 cm) až po Malou (18 cm).
          </p>

          {/* Two Call-to-Action Buttons Centered */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-accent hover:bg-accent-hover rounded-2xl shadow-sm transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Objednat přes Foodora</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-ink bg-surface hover:bg-subtle border border-line rounded-2xl transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Prohlédnout jídelní lístek</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* Highlighted 3-Column Strip (With Live Europe/Prague Opening Status & Foodora Text) */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-12 bg-surface rounded-2xl p-5 sm:p-6 border border-line shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-line text-center">
            {/* Column 1: Sizes */}
            <div className="flex flex-col items-center justify-center px-2">
              <p className="text-2xl sm:text-3xl font-display font-bold text-ink tabular-nums">
                40 cm
              </p>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Jumbo velikost (i 28 cm a 18 cm)
              </p>
            </div>

            {/* Column 2: Foodora Real-time Tracking */}
            <div className="flex flex-col items-center justify-center pt-4 sm:pt-0 px-2">
              <p className="text-2xl sm:text-3xl font-display font-bold text-accent">
                foodora
              </p>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                sleduj svoji objednávku v reálném čase
              </p>
            </div>

            {/* Column 3: Dynamic Live Opening Hours Status (Europe/Prague timezone) */}
            <div className="flex flex-col items-center justify-center pt-4 sm:pt-0 px-2">
              <p
                className={`text-xl sm:text-2xl font-display font-bold ${
                  openingStatus.isOpen ? 'text-emerald-700' : 'text-accent'
                }`}
              >
                {openingStatus.statusTitle}
              </p>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 tabular-nums">
                {openingStatus.statusDetail}
              </p>
            </div>
          </div>
        </div>

        {/* Large Showcase Pizza Image */}
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-16/10 sm:aspect-16/9 w-full rounded-2xl overflow-hidden bg-subtle border border-line shadow-sm">
            {!imageError ? (
              <img
                src={heroSrc}
                alt="Čerstvě upečená pizza v Pizzerii Jihlava"
                referrerPolicy="no-referrer"
                onError={() => {
                  if (heroSrc !== '/assets/images/hero_pizza_1792529733411.jpg') {
                    setHeroSrc('/assets/images/hero_pizza_1792529733411.jpg');
                  } else {
                    setImageError(true);
                  }
                }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-accent-soft">
                <UtensilsCrossed className="w-12 h-12 text-accent mb-3" strokeWidth={1.5} />
                <p className="font-display text-xl font-semibold text-ink">
                  Pizzeria Jihlava
                </p>
                <p className="text-sm text-ink-muted mt-1 max-w-xs">
                  {BUSINESS_INFO.branchAddress}
                </p>
              </div>
            )}

            {/* Subtle Editorial Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-7 flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left text-white gap-2">
              <div>
                <p className="text-xs sm:text-sm text-white/85 italic">
                  Křižíkova 552/17, Jihlava
                </p>
                <p className="text-base sm:text-lg font-display font-semibold mt-0.5">
                  Jumbo (40 cm), Velká (28 cm) i Malá (18 cm) pizza
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm text-white/90">
                <Flame className="w-4 h-4 text-accent" />
                <span>Tradiční pec · Čerstvé suroviny</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
