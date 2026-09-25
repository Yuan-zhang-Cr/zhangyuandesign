'use client';

import { useScrollReveal } from '@/hooks/use-scroll-animation';
import { useLang } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const papers = [
  {
    title: {
      zh: 'AI-Generated Digital Art in Commercial Public Spaces: A Case Study of Wanda Plaza Wukesong, Beijing',
      en: 'AI-Generated Digital Art in Commercial Public Spaces: A Case Study of Wanda Plaza Wukesong, Beijing',
    },
    venue: 'HCI International 2025.7',
    index: 'EI · Springer',
    link: 'https://link.springer.com/book/10.1007/978-3-031-93835-1',
  },
  {
    title: {
      zh: '从展示价值到共识价值：论数字原作的产生及其价值实现',
      en: 'From Display Value to Consensus Value: On the Generation of Digital Originals',
    },
    venue: { zh: '《南京艺术学院学报》 2025.5', en: 'Journal of Nanjing University of the Arts 2025.5' },
    index: 'CSSCI',
    link: 'https://kns.cnki.net/kcms2/article/abstract?v=BsQQ9aL8NZtQx-K3X34scJk0hasSj5OFtwrfrmbnZeee3uv1ms776baip5FjikHEbzYDwYte4x3QrQ2qp-PXZUQYYnfDBfILtyCq0Trwh2dXFgemtZpPOuInCeeeH6UHctacPsNHIRqKjypuBIlDHGUK5sL_lV8Eb23AVZHlumHwDT2PeqpDrg==&uniplatform=NZKPT&language=CHS',
  },
  {
    title: {
      zh: '首都博物馆北京中轴线"辉煌中轴"展文化遗产信息的数字艺术化的转译与实施',
      en: 'Digital Art Translation of Cultural Heritage in the "Brilliant Central Axis" Exhibition',
    },
    venue: {
      zh: '《北京中轴线保护与可持续发展报告（2022-2023）》北京出版社 2023.4',
      en: 'Beijing Central Axis Report (2022-2023), Beijing Publishing House 2023.4',
    },
    index: { zh: '著作章节', en: 'Book Chapter' },
  },
  {
    title: {
      zh: 'Human-AI Co-creation of Art Based on the Personalization of Collective Memory',
      en: 'Human-AI Co-creation of Art Based on the Personalization of Collective Memory',
    },
    venue: '2022 6th ACAIT · 2022.12',
    index: 'JCR Q1 · CAAI',
    link: 'https://ieeexplore.ieee.org/document/10137839',
  },
];

export default function Research() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>(0.1);
  const { t, lang } = useLang();
  const l = lang;

  return (
    <section id="research" ref={ref} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            'mb-16 transition-all duration-800',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[#667EEA] uppercase">
            {t.research.label}
          </p>
          <h2 className="text-3xl font-light tracking-tight text-[#1D1D1F] md:text-4xl">
            {t.research.title}
          </h2>
        </div>

        <div className="space-y-4">
          {papers.map((paper, i) => {
            const venueStr = typeof paper.venue === 'string' ? paper.venue : paper.venue[l];
            const indexStr = typeof paper.index === 'string' ? paper.index : paper.index[l];
            return (
              <a
                key={i}
                href={paper.link ?? '#'}
                target={paper.link ? '_blank' : undefined}
                rel={paper.link ? 'noopener noreferrer' : undefined}
                className={cn(
                  'group block rounded-2xl border border-black/5 bg-white/60 p-6 transition-all duration-500 hover:border-[#667EEA]/20 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]',
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                )}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                onClick={paper.link ? undefined : (e: React.MouseEvent) => e.preventDefault()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium leading-relaxed text-[#1D1D1F] transition-colors duration-300 group-hover:text-[#667EEA] md:text-base">
                      {paper.title[l]}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-gradient-to-r from-[#667EEA]/10 to-[#A78BFA]/10 px-3 py-0.5 text-xs font-medium text-[#5B21B6]">
                        {indexStr}
                      </span>
                      <span className="text-xs text-[#86868B]">{venueStr}</span>
                    </div>
                  </div>
                  {paper.link && (
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-[#86868B] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#667EEA]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
