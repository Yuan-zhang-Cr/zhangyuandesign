'use client';

import { useScrollReveal } from '@/hooks/use-scroll-animation';
import { useLang } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const awards = [
  {
    title: {
      zh: 'AIGC创新创业项目《AIGC赋能的青花纹样生成平台》',
      en: 'AIGC Innovation: Blue & White Pattern Generation Platform',
    },
    award: { zh: '亚军（大学生场）', en: '2nd Prize (University Division)' },
    event: {
      zh: '2024年第12届"东升杯"国际创业大赛',
      en: '12th "Dongsheng Cup" International Entrepreneurship Competition 2024',
    },
    year: '2024',
  },
  {
    title: {
      zh: 'AIGC短片《纹艺古今》',
      en: 'AIGC Short Film "Art of Patterns"',
    },
    award: { zh: '一等奖（AI赛道）', en: '1st Prize, AI Track' },
    event: {
      zh: '2024年北京市大学生动漫设计比赛',
      en: '2024 Beijing College Student Animation Design Competition',
    },
    year: '2024',
  },
  {
    title: {
      zh: 'AIGC短片《纹艺古今》',
      en: 'AIGC Short Film "Art of Patterns"',
    },
    award: { zh: '入围并提名', en: 'Selected & Nominated' },
    event: { zh: '2024年大学生AI艺术季', en: '2024 College Student AI Art Season' },
    year: '2024',
  },
  {
    title: {
      zh: 'AIGC短片《仿生庄子会梦到电子蝴蝶吗？》',
      en: 'AIGC Short Film "Would Zhongzi Dream of Electronic Butterflies?"',
    },
    award: { zh: '入围', en: 'Selected' },
    event: { zh: '2024年大学生AI艺术季', en: '2024 College Student AI Art Season' },
    year: '2024',
  },
];

export default function Awards() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>(0.1);
  const { t, lang } = useLang();
  const l = lang;

  return (
    <section id="awards" ref={ref} className="relative py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F5F7]/30 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div
          className={cn(
            'mb-16 transition-all duration-800',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[#667EEA] uppercase">
            {t.awards.label}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-[#1D1D1F] md:text-4xl">
            {t.awards.title}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {awards.map((item, i) => (
            <div
              key={i}
              className={cn(
                'group rounded-2xl border border-black/5 bg-white/60 p-6 transition-all duration-500 hover:border-[#667EEA]/20 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              )}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#667EEA]/10 to-[#A78BFA]/10">
                  <svg className="h-4 w-4 text-[#667EEA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#667EEA]">{item.year}</span>
              </div>
              <h3 className="mb-2 text-sm font-medium leading-relaxed text-[#1D1D1F]">
                {item.title[l]}
              </h3>
              <p className="text-sm text-[#86868B]">
                <span className="font-medium text-[#1D1D1F]/60">{item.award[l]}</span>
                <br />
                {item.event[l]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
