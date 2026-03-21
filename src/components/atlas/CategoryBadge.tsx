'use client';

import { CATEGORY_LABELS, CATEGORY_COLORS, type SystemCategory } from '@/types/system';

interface Props {
  category: SystemCategory;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({ category, size = 'sm' }: Props) {
  const label = CATEGORY_LABELS[category];
  const color = CATEGORY_COLORS[category];
  const px = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium leading-tight ${px}`}
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}
