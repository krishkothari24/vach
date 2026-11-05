import { describe, expect, it } from 'vitest';
import { demoCatalog } from '../content/demo';
import { availableText, validateCatalog } from './passage';
import { civilDayOrdinal, localDateKey, nextLocalMidnight, selectDailyPassage, upcomingSelections } from './selector';

describe('content validation', () => {
  it('accepts labeled demo entries and rejects duplicate IDs', () => {
    expect(validateCatalog(demoCatalog)).toEqual([]);
    expect(validateCatalog([demoCatalog[0], demoCatalog[0]])).toContain(`[1] duplicate id ${demoCatalog[0].id}`);
  });

  it('falls back only when the selected language is absent', () => {
    const englishOnly = demoCatalog[1];
    expect(availableText(englishOnly, 'gu')).toEqual({ en: englishOnly.text.en, fallback: true });
    expect(availableText(englishOnly, 'en')).toEqual({ en: englishOnly.text.en, fallback: false });
  });
});

describe('daily selection', () => {
  it('is repeatable regardless of input ordering', () => {
    const day = new Date(2026, 10, 5, 22);
    expect(selectDailyPassage(demoCatalog, day, 'both')?.id).toBe(selectDailyPassage([...demoCatalog].reverse(), day, 'both')?.id);
    expect(selectDailyPassage(demoCatalog, day, 'both')?.id).toBe(selectDailyPassage(demoCatalog, new Date(2026, 10, 5, 1), 'both')?.id);
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
