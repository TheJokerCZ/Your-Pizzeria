import { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Pizza,
  Mail,
  Building2,
  CreditCard,
  ExternalLink,
  Truck,
} from 'lucide-react';
import { OPENING_HOURS, BUSINESS_INFO, FOODORA_URL } from '../data/menuData';
import { getPragueOpeningStatus, LiveOpeningStatus } from '../utils/openingHours';

export function ContactFooter() {
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
    <footer id="kontakt" className="pt-16 sm:pt-24 pb-12 bg-canvas scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
          <div className="space-y-2.5 mx-auto md:mx-0">
            <p className="text-xs sm:text-sm font-medium text-accent italic">
              Kontakt, otevírací doba a informace o rozvozu
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-ink tracking-tight font-display"
              style={{ textWrap: 'balance' }}
            >
              Najdete nás v Jihlavě na Křižíkově
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary max-w-xl">
              Zastavte se u nás osobně na adrese {BUSINESS_INFO.branchAddress} nebo si objednejte rozvoz přes aplikaci Foodora.
            </p>
          </div>

          <a
            href={FOODORA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-2xl shadow-xs transition-all duration-150 whitespace-nowrap shrink-0 mx-auto md:mx-0"
          >
            <span>Objednat přes Foodora</span>
            <ExternalLink className="w-4 h-4 shrink-0" />
          </a>
        </div>

        {/* Main Contact Grid: Opening Hours Table + Address/Phone + Map Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-12">
          {/* Left Column (5 cols): Opening Hours Table & Direct Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-surface rounded-2xl p-6 sm:p-8 border border-line text-center sm:text-left">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div className="flex items-center justify-center sm:justify-start gap-2.5">
                  <Clock className="w-5 h-5 text-accent shrink-0" />
                  <h3 className="text-lg font-bold text-ink font-display">Otevírací doba</h3>
                </div>
                <span
                  className={`text-xs font-semibold${
                    openingStatus.isOpen ? ' text-emerald-700' : ' text-accent'
                  }`}
                >
                  {openingStatus.statusTitle} · {openingStatus.statusDetail}
                </span>
              </div>

              {/* Clean Opening Hours Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-line text-xs text-ink-muted">
                      <th className="pb-2.5 font-medium">Den v týdnu</th>
                      <th className="pb-2.5 font-medium text-right">Otevřeno</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-sm">
                    {OPENING_HOURS.map((row) => (
                      <tr key={row.days}>
                        <td className="py-3.5 font-medium text-ink">{row.days}</td>
                        <td className="py-3.5 text-ink-secondary tabular-nums font-semibold text-right">
                          {row.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Address, Clickable Phone Number, Email & Legal Info */}
            <div className="pt-6 border-t border-line space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">Adresa pizzerie (provozovna)</p>
                  <p className="text-sm sm:text-base font-medium text-ink">
                    {BUSINESS_INFO.branchAddress}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">Telefonní číslo</p>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="text-base sm:text-lg font-semibold text-accent hover:underline tabular-nums inline-block mt-0.5"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">E-mail</p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm font-medium text-ink hover:text-accent transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                <Building2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-ink-muted">Poskytovatel služby</p>
                  <p className="text-sm font-medium text-ink">
                    {BUSINESS_INFO.legalName} · IČ: <span className="tabular-nums">{BUSINESS_INFO.ico}</span>
                  </p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Sídlo: {BUSINESS_INFO.registeredAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Jihlava Map Space & Foodora Delivery Info */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-6 sm:p-8 border border-line flex flex-col justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-ink font-display">Mapa a poloha v Jihlavě</h3>
                <p className="text-xs sm:text-sm text-ink-muted">
                  Křižíkova 552/17, 586 01 Jihlava · Poblíž Parku Na Valech a CineStar Jihlava
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=K%C5%99i%C5%BE%C3%ADkova+552%2F17%2C+586+01+Jihlava"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:underline whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Otevřít v Google Mapách</span>
              </a>
            </div>

            {/* Stylized Map of Jihlava */}
            <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-subtle border border-line">
              <svg
                viewBox="0 0 800 420"
                className="w-full h-full object-cover"
                role="img"
                aria-label="Mapa okolí Your Pizzeria na ulici Křižíkova 552/17 v Jihlavě"
              >
                <rect width="800" height="420" fill="#F3EFEA" />
                <path d="M410,20 L650,20 L610,165 L450,210 Z" fill="#DDE9D9" />
                <path d="M420,235 L540,210 L570,310 L440,340 Z" fill="#DDE9D9" />
                <path d="M590,20 Q550,150 450,240 T220,410" fill="none" stroke="#B8D8E8" strokeWidth="8" strokeLinecap="round" />
                <rect x="40" y="30" width="230" height="160" rx="14" fill="#E9E4DC" />
                <rect x="305" y="30" width="95" height="135" rx="12" fill="#E9E4DC" />
                <rect x="65" y="250" width="290" height="130" rx="14" fill="#E9E4DC" />
                <rect x="610" y="180" width="145" height="200" rx="14" fill="#E9E4DC" />
                <line x1="285" y1="0" x2="365" y2="220" stroke="#FFFFFF" strokeWidth="14" />
                <line x1="590" y1="80" x2="625" y2="300" stroke="#FFFFFF" strokeWidth="12" />
                <line x1="720" y1="0" x2="645" y2="420" stroke="#FFFFFF" strokeWidth="14" />
                <path d="M0,310 Q280,220 640,40" fill="none" stroke="#E2DDD5" strokeWidth="26" />
                <path d="M0,310 Q280,220 640,40" fill="none" stroke="#FFFFFF" strokeWidth="20" />
                <rect x="325" y="185" width="44" height="22" rx="5" fill="#3B6E9C" stroke="#FFFFFF" strokeWidth="2" />
                <text x="347" y="200" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">602</text>
                <text x="312" y="110" fill="#57534E" fontSize="12" fontWeight="600" transform="rotate(68 312,110)">Křižíkova</text>
                <text x="530" y="75" fill="#4D6B49" fontSize="13" fontWeight="700" textAnchor="middle">Park Na Valech</text>
                <text x="215" y="345" fill="#6B5B7B" fontSize="13" fontWeight="600" textAnchor="middle">CineStar Jihlava</text>
                <circle cx="388" cy="195" r="28" fill="var(--accent-primary)" fillOpacity="0.18" />
                <circle cx="388" cy="195" r="12" fill="var(--accent-primary)" stroke="#FFFFFF" strokeWidth="3.5" />
              </svg>

              <div className="absolute top-4 left-4 bg-surface/95 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-line shadow-xs text-left">
                <p className="text-xs font-semibold text-ink">Your Pizzeria</p>
                <p className="text-[11px] text-ink-muted">Křižíkova 552/17, 586 01 Jihlava</p>
              </div>
            </div>

            {/* Foodora Delivery & Payment Details Card inside Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-ink">Doručení a poplatky (Foodora)</p>
                  <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
                    Doručuje <span className="font-medium text-ink">foodora kurýr</span>. {BUSINESS_INFO.deliveryFeeNote} {BUSINESS_INFO.minOrderNote}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <CreditCard className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-ink">Platba na Foodora</p>
                  <p className="text-xs text-ink-muted leading-relaxed mt-0.5">
                    {BUSINESS_INFO.paymentMethods.join(', ')}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Minimal Bottom Footer */}
        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <Pizza className="w-4 h-4 text-accent" />
            <span className="font-semibold text-ink">{BUSINESS_INFO.legalName}</span>
            <span aria-hidden="true">·</span>
            <span>IČ: {BUSINESS_INFO.ico}</span>
            <span aria-hidden="true">·</span>
            <span>{BUSINESS_INFO.branchAddress}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#menu" className="hover:text-ink transition-colors">
              Menu
            </a>
            <a href="#o-nas" className="hover:text-ink transition-colors">
              O nás
            </a>
            <a href="#kontakt" className="hover:text-ink transition-colors">
              Kontakt
            </a>
            <a
              href={FOODORA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              Foodora rozvoz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
