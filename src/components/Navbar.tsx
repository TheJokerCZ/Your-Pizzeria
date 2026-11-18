import { Pizza, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/menuData';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-line transition-colors">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-8">
        {/* Zone 1: Centered on Mobile, Left on Desktop Brand Title with Italian Flair */}
        <a
          href="#"
          className="inline-flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-lg"
        >
          <Pizza className="w-7 h-7 text-accent shrink-0" strokeWidth={2.2} />
          <span className="font-display italic font-semibold tracking-normal">Your Pizzeria</span>
        </a>

        {/* Zone 2: Navigation Links — Visible & Centered on Both Mobile and Desktop */}
        <nav
          aria-label="Hlavní navigace"
          className="flex items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-medium text-ink-secondary"
        >
          <a
            href="#menu"
            className="hover:text-accent transition-colors duration-150 py-0.5 border-b-2 border-transparent hover:border-accent whitespace-nowrap shrink-0"
          >
            Jídelní lístek
          </a>
          <a
            href="#o-nas"
            className="hover:text-accent transition-colors duration-150 py-0.5 border-b-2 border-transparent hover:border-accent whitespace-nowrap shrink-0"
          >
            O nás
          </a>
          <a
            href="#kontakt"
            className="hover:text-accent transition-colors duration-150 py-0.5 border-b-2 border-transparent hover:border-accent whitespace-nowrap shrink-0"
          >
            Kontakt
          </a>
        </nav>

        {/* Zone 3: Quiet Phone Contact on Desktop so full navbar width is balanced */}
        <div className="hidden md:flex items-center shrink-0">
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors tabular-nums whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-accent shrink-0" />
            <span>{BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
