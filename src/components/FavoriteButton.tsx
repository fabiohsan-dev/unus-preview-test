'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  className?: string;
  iconClassName?: string;
}

export function FavoriteButton({
  className = '',
  iconClassName = 'w-[18px] h-[18px]',
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFavorited((current) => !current)}
      className={className}
      aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={favorited}
    >
      <Heart
        className={`${iconClassName} transition-colors ${
          favorited
            ? 'fill-[var(--color-error)] text-[var(--color-error)]'
            : 'text-[var(--color-graphite-400)]'
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
