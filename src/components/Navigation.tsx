'use client';

import { useNavScroll } from '@/hooks/use-scroll-animation';
import { useLang } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const scrolled = useNavScroll();
  const { t, lang, toggleLang } = useLang();

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.research, href: '#research' },
    { label: t.nav.awards, href: '#awards' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass border-b border-black/5 shadow-[0_1px_12px_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-medium tracking-wide text-[#1D1D1F] transition-colors hover:text-[#667EEA]"
          >
            {lang === 'zh' ? '章媛' : 'Zhang Yuan'}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm text-[#86868B] transition-colors duration-300 hover:text-[#1D1D1F]"
              >
                {link.label}
              </a>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-[#86868B] transition-all duration-300 hover:border-[#667EEA]/30 hover:text-[#667EEA]"
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleLang}
              className="rounded-full border border-black/10 px-2.5 py-0.5 text-xs font-medium text-[#86868B] transition-all hover:border-[#667EEA]/30 hover:text-[#667EEA]"
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <div className="flex items-center gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="h-2 w-2 rounded-full bg-[#86868B]/40 transition-colors hover:bg-[#667EEA]"
                  aria-label={link.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
