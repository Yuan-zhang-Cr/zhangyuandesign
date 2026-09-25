'use client';

import { cn } from '@/lib/utils';

interface MediaPlaceholderProps {
  type?: 'image' | 'video';
  label: string;
  aspectRatio?: string;
  className?: string;
}

export default function MediaPlaceholder({
  type = 'image',
  label,
  aspectRatio = 'aspect-video',
  className,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        'media-placeholder relative flex flex-col items-center justify-center gap-3',
        aspectRatio,
        className
      )}
    >
      {type === 'video' ? (
        <svg
          className="h-10 w-10 text-[#667EEA]/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
          />
        </svg>
      ) : (
        <svg
          className="h-10 w-10 text-[#667EEA]/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
      )}

      <span className="max-w-[80%] text-center text-xs text-[#86868B]/60">
        {label}
      </span>
    </div>
  );
}
