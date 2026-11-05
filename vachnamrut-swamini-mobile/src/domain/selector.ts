import type { Passage, Source, SourcePreference } from './passage';

const MS_PER_DAY = 86_400_000;

export function localDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function civilDayOrdinal(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);
}

function mod(number: number, divisor: number): number {
  return ((number % divisor) + divisor) % divisor;
}

function sourceEntries(catalog: readonly Passage[], source: Source): Passage[] {
  return catalog.filter((passage) => passage.source === source).sort((a, b) => a.id.localeCompare(b.id));
}

export function selectDailyPassage(catalog: readonly Passage[], date: Date, preference: SourcePreference): Passage | null {
  if (Number.isNaN(date.getTime())) throw new Error('Invalid date');
  const ordinal = civilDayOrdinal(date);
  if (preference !== 'both') {
    const entries = sourceEntries(catalog, preference);
    return entries.length ? entries[mod(ordinal, entries.length)] : null;
  }
  const first = sourceEntries(catalog, 'vachanamrut');
  const second = sourceEntries(catalog, 'swamini_vato');
  if (!first.length && !second.length) return null;
  if (!first.length || !second.length) {
    const entries = first.length ? first : second;
    return entries[mod(ordinal, entries.length)];
  }
  const entries = mod(ordinal, 2) === 0 ? first : second;
  return entries[mod(Math.floor(ordinal / 2), entries.length)];
}

export function nextLocalMidnight(date: Date, daysAhead: number): Date {
  if (!Number.isInteger(daysAhead) || daysAhead < 1) throw new Error('daysAhead must be a positive integer');
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysAhead);
}

export function upcomingSelections(catalog: readonly Passage[], start: Date, preference: SourcePreference, days = 30) {
  if (!Number.isInteger(days) || days < 1) throw new Error('days must be a positive integer');
  return Array.from({ length: days }, (_, index) => {
    const date = index === 0 ? start : nextLocalMidnight(start, index);
    return { date, passage: selectDailyPassage(catalog, date, preference) };
  });
}
