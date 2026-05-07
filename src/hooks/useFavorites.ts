'use client';

/**
 * useFavorites — persistência de favoritos em localStorage
 *
 * Seguro para SSR: não acessa localStorage durante o render server-side.
 * Sincroniza entre abas via o evento 'storage'.
 *
 * Uso:
 *   const { isFavorited, toggle } = useFavorites('imovel-74383');
 */

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'unus:favorites';

function readStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeStorage(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* quota exceeded — ignore */
  }
}

export function useFavorites(id: string) {
  const [favorited, setFavorited] = useState(false);

  /* Hydrate from localStorage after mount (avoids SSR mismatch) */
  useEffect(() => {
    setFavorited(readStorage().has(id));
  }, [id]);

  /* Sync across tabs */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorited(readStorage().has(id));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [id]);

  const toggle = useCallback(() => {
    setFavorited((prev) => {
      const next = !prev;
      const ids = readStorage();
      if (next) ids.add(id);
      else ids.delete(id);
      writeStorage(ids);
      return next;
    });
  }, [id]);

  return { isFavorited: favorited, toggle };
}

/** Retorna todos os IDs favoritados (para a página /favoritos) */
export function getAllFavorites(): string[] {
  return [...readStorage()];
}
