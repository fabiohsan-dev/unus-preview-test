export const CONSENT_STORAGE_KEY = 'unus_consent';
export const CONSENT_POLICY_VERSION = '2025-01';

export type ConsentPrefs = {
  analytics: boolean;
  marketing: boolean;
  version: string;
  timestamp: number;
};

export function loadConsent(): ConsentPrefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentPrefs;
    if (parsed.version !== CONSENT_POLICY_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: Pick<ConsentPrefs, 'analytics' | 'marketing'>): ConsentPrefs {
  const full: ConsentPrefs = {
    ...prefs,
    version: CONSENT_POLICY_VERSION,
    timestamp: Date.now(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(full));
  return full;
}

export function clearConsent(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  }
}
