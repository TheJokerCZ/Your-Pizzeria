import { Leaf, Flame, Truck, ExternalLink } from 'lucide-react';
import { FOODORA_URL } from '../data/menuData';

const QUALITY_PILLARS = [
  {
    id: 'fresh-ingredients',
    title: 'Čerstvé suroviny',
    icon: Leaf,
    metric: 'Poctivý výběr surovin',
    description:
      'Zakládáme si na čerstvě připravovaném těstě, kvalitním rajčatovém základu, jemné mozzarelle a čerstvých surovinách pro dokonalou chuť.',
  },
  {
    id: 'traditional-oven',
    title: 'Tradiční pec',
    icon: Flame,
    metric: 'Ideální propečení',
    description:
      'Pizzu pečeme při vysoké teplotě tak, aby těsto zůstalo uvnitř vláčné a na okrajích zlatavé a křupavé.',
  },
  {
    id: 'fast-delivery',
    title: 'Rychlý rozvoz',
    icon: Truck,
    metric: 'Partner foodora kurýr',
    description:
      'Rozvoz po celé Jihlavě zajišťuje služba Foodora. Svou objednávku můžete sledovat v reálném čase.',
  },
];

export function AboutSection() {
  return (
    <section id="o-nas" className="py-16 sm:py-24 bg-subtle/60 border-y border-line scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div className="max-w-2xl space-y-2.5 mx-auto md:mx-0">
            <p className="text-xs sm:text-sm font-medium text-accent">
              O nás · Pizzeria Jihlava
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight font-display"
              style={{ textWrap: 'balance' }}
            >
              Proč si dát pizzu právě u nás
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Připravujeme pro vás kompletní sortiment od největší Jumbo pizzy (40 cm) po Malou (18 cm) z těch nejlepších surovin.
            </p>
          </div>

          <a
            href={FOODORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-accent hover:underline whitespace-nowrap shrink-0 mx-auto md:mx-0"
          >
            <span>Objednat přes Foodora</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* 3 Columns Emphasizing Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {QUALITY_PILLARS.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-surface rounded-2xl p-6 sm:p-8 border border-line flex flex-col justify-between text-center sm:text-left"
              >
                <div>
                  <div className="flex items-center justify-center sm:justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent-soft flex items-center justify-center text-accent">
                      <IconComponent className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <span className="hidden sm:inline-block text-xs font-medium text-ink-muted tabular-nums">
                      0{index + 1}. {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-ink mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
