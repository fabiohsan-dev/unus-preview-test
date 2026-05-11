'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  draggable?: boolean;
  onContextMenu?: React.MouseEventHandler;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fill = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  width,
  height,
  draggable,
  onContextMenu,
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  // Fallback se não houver src
  if (!src || didError) {
    return (
      <div className={`relative bg-gray-100 flex items-center justify-center ${className ?? ''}`}>
        <Image
          src={ERROR_IMG_SRC} 
          alt="Error loading image" 
          width={48}
          height={48}
          className="w-12 h-12 opacity-20"
          unoptimized
        />
      </div>
    );
  }

  // Se width/height forem passados, não usa fill
  const useFill = fill && !width && !height;

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={useFill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      onError={() => setDidError(true)}
      style={useFill ? { objectFit: 'cover' } : undefined}
      draggable={draggable}
      onContextMenu={onContextMenu}
    />
  );
}
