import { expect, it } from 'vitest';
import { demoCatalog } from '../../content/demo';
import { LOCK_WIDGET_MAX_EXCERPT_LENGTH, widgetPropsFor } from './presentation';

it('links to the exact ID and uses title/reference fallback for long text', () => {
  const passage = { ...demoCatalog[0], text: { en: `${demoCatalog[0].text.en} ${'x'.repeat(100)}` } };
  expect(widgetPropsFor(passage, 'en')).toEqual({
    title: '[DEMO] Vachanamrut',
    excerpt: '',
    reference: 'Demo Vachanamrut Reference 1',
    url: 'vachdaily://reading/demo-vachanamrut-1',
  });
});

it('falls back to Gujarati without claiming an English translation', () => {
  const props = widgetPropsFor(demoCatalog[2], 'en');
  expect(props.excerpt).toContain('ડેમો');
  expect(props.reference).toContain('ડેમો');
});

it('omits a complete excerpt that is too long for the lock screen without truncating it', () => {
  const passage = { ...demoCatalog[0], text: { en: '[DEMO TEXT — NOT SCRIPTURE] full thought' } };
  expect(widgetPropsFor(passage, 'en', LOCK_WIDGET_MAX_EXCERPT_LENGTH).excerpt).toBe('');
  expect(widgetPropsFor(passage, 'en').excerpt).toBe(passage.text.en);
});
