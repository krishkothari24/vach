import { availableText, sourceLabel, type LanguagePreference, type Passage } from '../../domain/passage';
import type { DailyWidgetProps } from '../ios/DailyLock';

export function widgetPropsFor(passage: Passage, language: LanguagePreference): DailyWidgetProps {
  const selection = availableText(passage, language);
  const primaryLanguage = language === 'gu' && selection.gu ? 'gu' : selection.en ? 'en' : 'gu';
  const excerpt = primaryLanguage === 'gu' ? selection.gu : selection.en;
  const reference = primaryLanguage === 'gu' ? passage.reference.displayGujarati : passage.reference.displayEnglish;
  const title = `${passage.isDemo ? '[DEMO] ' : ''}${sourceLabel(passage.source, primaryLanguage)}`;
  return {
    title,
    excerpt: excerpt && excerpt.length <= 72 ? excerpt : '',
    reference,
    url: `vachdaily://reading/${encodeURIComponent(passage.id)}`,
  };
}
