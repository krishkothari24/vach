import { expect, it } from 'vitest';
import { parsePreferences } from './preferences';

it('recovers independently from malformed stored choices', () => {
  expect(parsePreferences({ language: 'gu', source: 'unknown' })).toEqual({ language: 'gu', source: 'both' });
  expect(parsePreferences(null)).toEqual({ language: 'both', source: 'both' });
});
