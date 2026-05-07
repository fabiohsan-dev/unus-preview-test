'use client';

/**
 * HeroSlider — full-bleed background image carousel
 *
 * Renders as an absolutely-positioned layer behind hero content.
 * Parent must be `relative overflow-hidden`.
 *
 * Features:
 *   - CSS opacity crossfade (500ms) between slides
 *   - Subtle Ken Burns scale on the active slide (CSS animation, no JS)
 *   - Auto-advances every `interval` ms (default 5000)
 *   - Dark overlay to preserve text readability
 *   - Pauses on user hover (optional)
 */

import { useEffect, useRef, useState } from 'react';
import { ContentImage } from './ContentImage';

interface HeroSliderProps {
  images: string[];
  /** Milliseconds between advances (default: 5000) */
  interval?: number;
  /** Overlay opacity 0–1 (default: 0.68) */
  overlayOpacity?: number;
  /** Whether to pause auto-advance on hover (default: false — hero is large, accidental hovers common) */
  pauseOnHover?: boolean;
}

export function HeroSlider({
  images,
  interval = 5000,
  overlayOpacity = 0.68,
  pauseOnHover = false,
}: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [prev,   setPrev]   = useState<number | null>(null);
  const paused = useRef(false);

  const total = images.length;

  useEffect(() => {
    if (total <= 1) return;
    const tick = setInterval(() => {
      if (paused.current) return;
      setActive((cur) => {
        setPrev(cur);
        return (cur + 1) % total;
      });
    }, interval);
    return () => clearInterval(tick);
  }, [total, interval]);

  if (!images || total === 0) return null;

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => { if (pauseOnHover) paused.current = true; }}
      onMouseLeave={() => { if (pauseOnHover) paused.current = false; }}
      aria-hidden="true"
    >
      {/* ── Slides ── */}
      {images.map((src, i) => {
        const isActive = i === active;
        const isPrev   = i === prev;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity:   isActive ? 1 : isPrev ? 0 : 0,
              zIndex:    isActive ? 2 : isPrev ? 1 : 0,
            }}
          >
            {/* Ken Burns only on the active slide via CSS animation */}
            <div
              className="absolute inset-0"
              style={
                isActive
                  ? {
                      animation: `heroKenBurns ${interval + 700}ms ease-out forwards`,
                      willChange: 'transform',
                    }
                  : {}
              }
            >
              <ContentImage
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                quality={72}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        );
      })}

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: `rgba(21,20,16,${overlayOpacity})` }}
      />

      {/* ── Gold gradient — bottom vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(21,20,16,0.50) 0%, transparent 100%)',
        }}
      />

      {/* ── Ken Burns keyframe (injected once) ── */}
      <style>{`
        @keyframes heroKenBurns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
