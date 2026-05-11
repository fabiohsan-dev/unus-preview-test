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
import { normalizeFavoriteToken } from '@/lib/favoriteIds';

const STORAGE_KEY = 'unus:favorites';

function readStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();

    const normalized = parsed
      .map((item) => normalizeFavoriteToken(String(item)))
      .filter((item): item is NonNullable<ReturnType<typeof normalizeFavoriteToken>> => Boolean(item))
      .map((item) => item.token);
    const normalizedSet = new Set(normalized);

    if (normalized.length !== parsed.length || normalized.some((item, index) => item !== parsed[index])) {
      writeStorage(normalizedSet);
    }

    return normalizedSet;
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
  const normalized = normalizeFavoriteToken(id);
  const storageId = normalized?.token ?? '__no-id__';
  const [favorited, setFavorited] = useState(false);

  /* Hydrate from localStorage after mount (avoids SSR mismatch) */
  useEffect(() => {
    setFavorited(readStorage().has(storageId));
  }, [storageId]);

  /* Sync across tabs */
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorited(readStorage().has(storageId));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageId]);

  const toggle = useCallback(() => {
    if (storageId === '__no-id__') return;
    setFavorited((prev) => {
      const next = !prev;
      const ids = readStorage();
      if (next) ids.add(storageId);
      else ids.delete(storageId);
      writeStorage(ids);
      return next;
    });
  }, [storageId]);

  return { isFavorited: favorited, toggle };
}

/** Retorna todos os IDs favoritados (para a página /favoritos) */
export function getAllFavorites(): string[] {
  return [...readStorage()];
}
