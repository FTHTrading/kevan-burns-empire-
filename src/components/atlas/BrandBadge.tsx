'use client';

import { BRAND_LABELS, type Brand } from '@/types/system';

interface Props {
  brand: Brand;
}

export default function BrandBadge({ brand }: Props) {
  const label = BRAND_LABELS[brand];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium leading-tight bg-white/5 text-[#8888a0] border border-[#1e1e2e]">
      {label}
    </span>
  );
}
