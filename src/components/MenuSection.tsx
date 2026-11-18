import { useState } from 'react';
import { ExternalLink, Truck, ArrowDown } from 'lucide-react';
import { PIZZA_MENU, PizzaItem, FOODORA_URL } from '../data/menuData';

interface PizzaCardProps {
  pizza: PizzaItem;
  sizeLabel: string;
  priceLabel: string;
  priceValue: number;
  highlightSize?: boolean;
}

function PizzaCard({
  pizza,
  sizeLabel,
  priceLabel,
  priceValue,
  highlightSize = false,
}: PizzaCardProps) {
  const [imgSrc, setImgSrc] = useState(pizza.image);

  return (
    <article className="group bg-surface rounded-2xl overflow-hidden border border-line hover:border-accent-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between text-center sm:text-left">
      <div>
        {/* Illustrative Pizza Photo with resilient fallback */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-subtle border-b border-line">
          <img
            src={imgSrc}
            alt={`Ilustrační foto: ${pizza.name} – ${pizza.ingredients}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => {
              if (imgSrc !== pizza.fallbackImage) {
                setImgSrc(pizza.fallbackImage);
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-3.5 py-2 flex items-center justify-between text-[11px] text-white/90">
            <span>Ilustrační foto</span>
            {pizza.signatureNote && (
              <span className="font-semibold text-white">{pizza.signatureNote}</span>
            )}
          </div>
        </div>

        {/* Card Text Content */}
        <div className="p-5 sm:p-6 pb-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 text-xs text-ink-muted mb-1.5">
            <span className={highlightSize ? 'font-semibold text-accent' : 'font-semibold text-ink-secondary'}>
              {sizeLabel}
            </span>
          </div>

          <h4 className="text-xl font-bold text-ink group-hover:text-accent transition-colors duration-150 font-display">
            {pizza.name}
          </h4>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mt-2">
            {pizza.ingredients}
          </p>
        </div>
      </div>

      {/* Price Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-3 mt-2 border-t border-line flex items-baseline justify-center sm:justify-between gap-4">
        <span className="text-xs text-ink-muted">{priceLabel}</span>
        <span className="text-lg sm:text-xl font-bold text-ink tabular-nums font-display">
          od {priceValue},00 Kč
        </span>
      </div>
    </article>
  );
}

export function MenuSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="menu" className="py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header & Size Navigation */}
        <div className="flex flex-col items-center text-center justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-medium text-accent italic">
              Jídelní lístek · Kompletní nabídka pizz
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-display"
              style={{ textWrap: 'balance' }}
            >
              Vyberte si svou oblíbenou velikost pizzy
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Nabízíme naše vyhlášené pizzy ve třech velikostech od největší Jumbo (40 cm) přes Velkou (28 cm) až po Malou (18 cm). Kliknutím na velikost níže se okamžitě přesunete na požadovanou nabídku.
            </p>
          </div>

          {/* Size Quick Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
            <button
              type="button"
              onClick={() => scrollToSection('size-jumbo')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-2xl shadow-xs transition-all duration-150 cursor-pointer"
            >
              <span>JUMBO (40 cm)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('size-large')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-ink bg-surface hover:bg-subtle border border-line rounded-2xl transition-all duration-150 cursor-pointer"
            >
              <span>Velká (28 cm)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('size-small')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-ink bg-surface hover:bg-subtle border border-line rounded-2xl transition-all duration-150 cursor-pointer"
            >
              <span>Malá (18 cm)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. JUMBO SECTION (40 cm) */}
        <div id="size-jumbo" className="mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-line text-center md:text-left">
            <div>
              <span className="text-xs font-semibold text-accent italic">Největší rozměr</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink font-display mt-1">
                Pizza JUMBO (průměr 40 cm)
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Kompletní nabídka s cenami dle Foodora. Ideální pro větší společnost nebo pořádný hlad.
              </p>
            </div>
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:underline shrink-0"
            >
              <span>Objednat přes Foodora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIZZA_MENU.map((pizza) => (
              <PizzaCard
                key={`jumbo-${pizza.id}`}
                pizza={pizza}
                sizeLabel="Jumbo · 40 cm"
                priceLabel="Cena Jumbo"
                priceValue={pizza.priceJumbo}
                highlightSize
              />
            ))}
          </div>
        </div>

        {/* 2. VELKÁ SECTION (28 cm) */}
        <div id="size-large" className="mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-line text-center md:text-left">
            <div>
              <span className="text-xs font-semibold text-accent italic">Oblíbený standard</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink font-display mt-1">
                Pizza Velká (průměr 28 cm)
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Klasická velikost na oběd či večeři pro jednu osobu.
              </p>
            </div>
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:underline shrink-0"
            >
              <span>Objednat přes Foodora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIZZA_MENU.map((pizza) => (
              <PizzaCard
                key={`large-${pizza.id}`}
                pizza={pizza}
                sizeLabel="Velká · 28 cm"
                priceLabel="Cena Velká"
                priceValue={pizza.priceLarge}
              />
            ))}
          </div>
        </div>

        {/* 3. MALÁ SECTION (18 cm) */}
        <div id="size-small" className="mb-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-line text-center md:text-left">
            <div>
              <span className="text-xs font-semibold text-accent italic">Menší hlad / Svačina</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink font-display mt-1">
                Pizza Malá (průměr 18 cm)
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted mt-1">
                Menší porce nebo ideální volba pro děti.
              </p>
            </div>
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-accent hover:underline shrink-0"
            >
              <span>Objednat přes Foodora</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIZZA_MENU.map((pizza) => (
              <PizzaCard
                key={`small-${pizza.id}`}
                pizza={pizza}
                sizeLabel="Malá · 18 cm"
                priceLabel="Cena Malá"
                priceValue={pizza.priceSmall}
              />
            ))}
          </div>
        </div>

        {/* Foodora Delivery Callout Banner */}
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-line flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl mx-auto lg:mx-0">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold text-accent">
              <Truck className="w-4 h-4 shrink-0" />
              <span>Rozvoz zajišťuje služba Foodora (foodora kurýr)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink font-display">
              Máte vybráno? Nechte si doručit horkou pizzu až domů
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Objednávejte pohodlně v aplikaci Foodora a sledujte svoji objednávku v reálném čase.
            </p>
          </div>

          <div className="shrink-0 flex justify-center">
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-accent hover:bg-accent-hover rounded-2xl shadow-xs transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Objednat přes Foodora</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
