import { describe, expect, it } from 'vitest';
import { demoCatalog } from '../content/demo';
import { availableText, isPublishable, validateCatalog, validatePassage } from './passage';
import { civilDayOrdinal, localDateKey, nextLocalMidnight, selectDailyPassage, upcomingSelections } from './selector';

describe('content validation', () => {
  it('accepts labeled demo entries and rejects duplicate IDs', () => {
    expect(validateCatalog(demoCatalog)).toEqual([]);
    expect(validateCatalog([demoCatalog[0], demoCatalog[0]])).toContain(`[1] duplicate id ${demoCatalog[0].id}`);
  });

  it('rejects IDs that would sort differently or complicate widget links', () => {
    expect(validatePassage({ ...demoCatalog[0], id: 'Vachanamrut 1' })).toContain('id must use lowercase ASCII letters, digits, colon, underscore, or hyphen');
  });

  it('falls back only when the selected language is absent', () => {
    const englishOnly = demoCatalog[1];
    expect(availableText(englishOnly, 'gu')).toEqual({ en: englishOnly.text.en, fallback: true });
    expect(availableText(englishOnly, 'en')).toEqual({ en: englishOnly.text.en, fallback: false });
  });

  it('requires edition, rights record, and full-context path for publication', () => {
    const candidate = { ...demoCatalog[0], isDemo: false, reviewed: true, longText: undefined, rights: { status: 'approved' as const, attribution: 'Publisher', licenseNote: 'Written permission record' }, reference: { ...demoCatalog[0].reference, edition: 'Approved edition' } };
    expect(isPublishable(candidate)).toBe(false);
    expect(isPublishable({ ...candidate, sourceUrl: 'https://example.org/authorized-reading' })).toBe(true);
  });
});

describe('daily selection', () => {
  it('is repeatable regardless of input ordering', () => {
    const day = new Date(2026, 10, 5, 22);
    expect(selectDailyPassage(demoCatalog, day, 'both')?.id).toBe(selectDailyPassage([...demoCatalog].reverse(), day, 'both')?.id);
    expect(selectDailyPassage(demoCatalog, day, 'both')?.id).toBe(selectDailyPassage(demoCatalog, new Date(2026, 10, 5, 1), 'both')?.id);
  });

  it('uses character order for stable IDs, matching Android selection', () => {
    const catalog = ['a-2', 'a_1', 'a:1'].map((id) => ({ ...demoCatalog[0], id }));
    const date = new Date(2026, 10, 5);
    const ordered = ['a-2', 'a:1', 'a_1'];
    expect(selectDailyPassage(catalog, date, 'vachanamrut')?.id).toBe(ordered[((civilDayOrdinal(date) % ordered.length) + ordered.length) % ordered.length]);
  });

  it('alternates sources and cycles within each source without repeats', () => {
    const days = upcomingSelections(demoCatalog, new Date(2026, 10, 5), 'both', 8);
    expect(days.map(({ passage }) => passage?.source)).toEqual(Array.from({ length: 8 }, (_, index) => index % 2 ? 'swamini_vato' : 'vachanamrut'));
    expect(new Set(days.map(({ passage }) => passage?.id)).size).toBe(8);
  });

  it('honors source filtering and empty states', () => {
    const date = new Date(2026, 10, 5);
    expect(selectDailyPassage(demoCatalog, date, 'vachanamrut')?.source).toBe('vachanamrut');
    expect(selectDailyPassage([], date, 'both')).toBeNull();
    expect(selectDailyPassage(demoCatalog.filter((p) => p.source === 'swamini_vato'), date, 'vachanamrut')).toBeNull();
  });

  it('uses civil dates across daylight saving transitions', () => {
    const before = new Date(2026, 2, 7, 23, 30);
    const after = nextLocalMidnight(before, 1);
    expect(localDateKey(after)).toBe('2026-03-08');
    expect(civilDayOrdinal(after) - civilDayOrdinal(before)).toBe(1);
    expect(after.getHours()).toBe(0);
  });
});
