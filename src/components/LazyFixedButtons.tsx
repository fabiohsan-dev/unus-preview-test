'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DeferredFixedButtons = dynamic(
  () => import('./FixedButtons').then((module) => module.FixedButtons),
  { ssr: false }
);

type IdleCallbackHandle = number;
type IdleCallback = (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void;

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleCallback, options?: { timeout: number }) => IdleCallbackHandle;
  cancelIdleCallback?: (handle: IdleCallbackHandle) => void;
};

export function LazyFixedButtons() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return undefined;

    const windowWithIdle = window as IdleWindow;
    let idleHandle: IdleCallbackHandle | undefined;
    const timeoutHandle = window.setTimeout(() => setReady(true), 2200);

    if (windowWithIdle.requestIdleCallback) {
      idleHandle = windowWithIdle.requestIdleCallback(() => setReady(true), { timeout: 1800 });
    }

    return () => {
      window.clearTimeout(timeoutHandle);
      if (idleHandle !== undefined && windowWithIdle.cancelIdleCallback) {
        windowWithIdle.cancelIdleCallback(idleHandle);
      }
    };
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <DeferredFixedButtons />;
}
