import type { LanguagePreference, SourcePreference } from './passage';

export type Preferences = { language: LanguagePreference; source: SourcePreference };

export const defaultPreferences: Preferences = { language: 'both', source: 'both' };

export function parsePreferences(value: unknown): Preferences {
  if (typeof value !== 'object' || value === null) return defaultPreferences;
  const candidate = value as Record<string, unknown>;
  return {
    language: candidate.language === 'en' || candidate.language === 'gu' || candidate.language === 'both' ? candidate.language : 'both',
    source: candidate.source === 'vachanamrut' || candidate.source === 'swamini_vato' || candidate.source === 'both' ? candidate.source : 'both',
  };
}
