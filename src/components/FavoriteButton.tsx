'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  /** ID único do imóvel — usado para persistência em localStorage */
  propertyId?: string;
  className?: string;
  iconClassName?: string;
}

export function FavoriteButton({
  propertyId,
  className = '',
  iconClassName = 'w-[18px] h-[18px]',
}: FavoriteButtonProps) {
  const { isFavorited, toggle } = useFavorites(propertyId ?? '__no-id__');

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={isFavorited}
    >
      <Heart
        className={`${iconClassName} transition-colors ${
          isFavorited
            ? 'fill-[var(--color-error)] text-[var(--color-error)]'
            : 'text-[var(--color-graphite-400)]'
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
