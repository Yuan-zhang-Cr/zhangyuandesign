'use client';

import { useLang } from '@/components/LanguageProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative border-t border-black/5 py-16">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#667EEA]/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h3 className="text-lg font-light text-[#1D1D1F]">
            {t.hero.name}
          </h3>

          <p className="max-w-md text-sm text-[#86868B]">
            {t.footer.tagline}
            <br />
            {t.footer.subtitle}
          </p>

          <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#86868B]/20 to-transparent" />

          <p className="text-xs text-[#86868B]/60">
            &copy; {new Date().getFullYear()} Zhang Yuan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
