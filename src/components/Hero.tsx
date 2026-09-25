"use client";

import { useLang } from "@/components/LanguageProvider";
import { useScrollReveal } from "@/hooks/use-scroll-animation";

export default function Hero() {
  const { t } = useLang();
  const [ref, isVisible] = useScrollReveal<HTMLElement>();

  return (
    <section className="hero-gradient relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Decorative floating orbs - purple theme with distinct colors */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="orb-float-1 absolute h-[900px] w-[900px] rounded-full bg-[#a78bfa]/50 blur-[120px]" style={{ transform: 'translate(-15%, -10%)' }} />
        <div className="orb-float-2 absolute h-[800px] w-[800px] rounded-full bg-[#8b5cf6]/40 blur-[100px]" style={{ transform: 'translate(15%, -5%)' }} />
        <div className="orb-float-3 absolute h-[700px] w-[700px] rounded-full bg-[#c084fc]/35 blur-[90px]" style={{ transform: 'translate(0%, 15%)' }} />
      </div>

      {/* Content */}
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={`relative z-10 mx-auto max-w-4xl px-6 text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Tags */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs tracking-widest text-gray-500 sm:text-sm">
          {t.hero.tags.split(" · ").map((tag, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-gray-400" />}
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-7xl lg:text-8xl">
          {t.hero.greeting}{" "}
          <span className="gradient-text font-normal">{t.hero.name}</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600 md:text-xl">
          {t.hero.description}
        </p>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-xl text-sm text-gray-500 md:mb-12 md:text-lg">
          {t.hero.subtitle1} · {t.hero.subtitle2}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#projects"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg sm:w-auto"
          >
            {t.hero.viewWork}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="w-full rounded-full border border-gray-300 bg-white/50 px-8 py-3.5 text-center text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:border-gray-400 hover:bg-white/80 sm:w-auto"
          >
            {t.hero.aboutMe}
          </a>
        </div>
      </div>
    </section>
  );
}
