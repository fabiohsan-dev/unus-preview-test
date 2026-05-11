'use client';

import Image from 'next/image';
import type { MouseEvent } from 'react';

const DEFAULT_IMAGE_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4K';

interface ContentImageProps {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
  fallbackSrc?: string;
  protectedContent?: boolean;
  watermark?: boolean;
}

export function ContentImage({
  src,
  alt,
  className,
  fill = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  width,
  height,
  quality = 75,
  fallbackSrc = DEFAULT_IMAGE_SRC,
  protectedContent = false,
  watermark = true,
}: ContentImageProps) {
  const resolvedSrc = src || fallbackSrc;
  const useFill = fill && !width && !height;
  const protectionProps = protectedContent
    ? {
        draggable: false,
        onContextMenu: (event: MouseEvent) => event.preventDefault(),
      }
    : {};

  if (useFill) {
    const image = (
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={`${className ?? ''} ${protectedContent ? 'select-none' : ''}`.trim()}
        style={{ objectFit: 'cover' }}
        {...protectionProps}
      />
    );

    if (!protectedContent) return image;

    return (
      <div className="absolute inset-0 select-none" onContextMenu={(event) => event.preventDefault()}>
        {image}
        {watermark && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 border border-white/25 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
            UNUS
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 900}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={`${className ?? ''} ${protectedContent ? 'select-none' : ''}`.trim()}
      {...protectionProps}
    />
  );
}
