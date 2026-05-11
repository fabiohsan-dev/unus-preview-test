'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import type { VistaFoto } from '@/lib/vistaApi';

export function ImovelGallery({
  fotos,
  propertyRef,
}: {
  fotos: VistaFoto[];
  propertyRef: string;
}) {
  const [active, setActive] = useState(0);
  const { isFavorited: favorited, toggle: toggleFavorite } = useFavorites(`imovel:${propertyRef}`);
  const images = fotos.filter((foto) => Boolean(foto.URLArquivo || foto.URL || foto.Foto));
  const prev = () => setActive((index) => (index - 1 + images.length) % images.length);
  const next = () => setActive((index) => (index + 1) % images.length);

  const favoriteButton = (
    <button
      type="button"
      onClick={toggleFavorite}
      className="w-11 h-11 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-[var(--shadow-soft)] transition-all hover:bg-white active:scale-95"
      aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      aria-pressed={favorited}
    >
      <Heart
        className={`w-5 h-5 transition-all ${favorited ? 'fill-[var(--color-error)] text-[var(--color-error)] scale-110' : 'text-[var(--color-body)]'}`}
        strokeWidth={1.5}
      />
    </button>
  );

  if (images.length === 0) {
    return (
      <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-[var(--secondary-900)] flex items-center justify-center">
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
          <span className="bg-white/90 backdrop-blur-md text-[var(--color-heading)] text-[10px] uppercase tracking-[0.2em] px-4 py-2 shadow-[var(--shadow-soft)]" style={{ fontWeight: 700 }}>
            Ref. {propertyRef}
          </span>
          {favoriteButton}
        </div>
        <p className="text-white/65 text-[13px] uppercase tracking-[0.2em]" style={{ fontWeight: 500 }}>
          Fotos indisponiveis
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden bg-[var(--secondary-900)] group">
      <Image
        src={images[active].URLArquivo || images[active].URL || images[active].Foto || ''}
        alt={`Imovel ${propertyRef}`}
        fill
        priority
        className="object-cover select-none transition-opacity duration-500 motion-reduce:transition-none"
        sizes="(max-width: 1200px) 100vw, 70vw"
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
      />
      <span className="pointer-events-none absolute bottom-5 right-5 z-10 border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
        UNUS
      </span>
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="bg-white/90 backdrop-blur-md text-[var(--color-heading)] text-[10px] uppercase tracking-[0.2em] px-4 py-2 shadow-[var(--shadow-soft)]" style={{ fontWeight: 700 }}>
          Ref. {propertyRef}
        </span>
        {favoriteButton}
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={prev} className="absolute top-1/2 left-5 -translate-y-1/2 w-11 h-11 bg-white/80 backdrop-blur-md flex items-center justify-center text-[var(--color-heading)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-[var(--shadow-soft)]" aria-label="Foto anterior">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button" onClick={next} className="absolute top-1/2 right-5 -translate-y-1/2 w-11 h-11 bg-white/80 backdrop-blur-md flex items-center justify-center text-[var(--color-heading)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-[var(--shadow-soft)]" aria-label="Proxima foto">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      <div className="absolute bottom-5 left-5 flex gap-2.5 overflow-x-auto no-scrollbar">
        {images.map((foto, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            className={`w-[110px] h-[72px] relative flex-shrink-0 overflow-hidden transition-all duration-300 motion-reduce:transition-none ${active === index ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent opacity-100' : 'opacity-60 hover:opacity-90'}`}
            aria-label={`Abrir foto ${index + 1}`}
          >
            <Image
              src={foto.FotoPequena || foto.URLArquivo || foto.URL || foto.Foto || ''}
              alt={`Miniatura do imovel ${index + 1}`}
              fill
              className="object-cover select-none"
              sizes="110px"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
