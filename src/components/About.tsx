'use client';

import { useScrollReveal } from '@/hooks/use-scroll-animation';
import { useLang } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

export default function About() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>(0.1);
  const { t } = useLang();

  return (
    <section id="about" ref={ref} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            'mb-20 transition-all duration-800',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[#667EEA] uppercase">
            {t.about.label}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-[#1D1D1F] md:text-4xl">
            {t.about.title}
          </h2>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Education */}
          <div
            className={cn(
              'transition-all duration-800',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="mb-8 text-lg font-medium text-[#1D1D1F]">
              {t.about.education}
            </h3>
            <div className="space-y-6">
              {t.about.edu.map((edu, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-black/5 bg-white/60 p-6 transition-all duration-300 hover:border-[#667EEA]/20 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-base font-medium text-[#1D1D1F]">
                      {edu.school}
                    </h4>
                    <span className="shrink-0 rounded-full bg-[#F5F5F7] px-3 py-1 text-xs text-[#86868B]">
                      {edu.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#1D1D1F]/80">{edu.degree}</p>
                  <p className="mt-1 text-xs text-[#86868B]">{edu.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interests & Focus */}
          <div
            className={cn(
              'transition-all duration-800',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: '0.4s' }}
          >
            <h3 className="mb-8 text-lg font-medium text-[#1D1D1F]">
              {t.about.interests}
            </h3>

            <div className="mb-10 grid grid-cols-2 gap-3">
              {t.about.interestItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/60 p-5 transition-all duration-300 hover:border-[#667EEA]/20 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-[#1D1D1F]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#667EEA]/5 to-[#A78BFA]/5 p-6">
              <h4 className="mb-3 text-sm font-medium text-[#667EEA]">
                {t.about.researchFocus}
              </h4>
              <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                {t.about.researchDesc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.about.researchTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/80 px-3 py-1 text-xs text-[#86868B]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
