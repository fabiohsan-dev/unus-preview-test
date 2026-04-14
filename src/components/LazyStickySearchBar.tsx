'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DeferredStickySearchBar = dynamic(
  () => import('./StickySearchBar').then((module) => module.StickySearchBar),
  { ssr: false }
);

type IdleCallbackHandle = number;
type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleCallback, options?: { timeout: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

export function LazyStickySearchBar() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    const windowWithIdle = window as IdleWindow;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.2) {
        setReady(true);
      }
    };

    let idleHandle: IdleCallbackHandle | undefined;
    const timeoutHandle = window.setTimeout(() => setReady(true), 1600);

    if (windowWithIdle.requestIdleCallback) {
      idleHandle = windowWithIdle.requestIdleCallback(() => setReady(true), { timeout: 1400 });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(timeoutHandle);
      window.removeEventListener('scroll', onScroll);
      if (idleHandle !== undefined && windowWithIdle.cancelIdleCallback) {
        windowWithIdle.cancelIdleCallback(idleHandle);
      }
    };
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <DeferredStickySearchBar />;
}
