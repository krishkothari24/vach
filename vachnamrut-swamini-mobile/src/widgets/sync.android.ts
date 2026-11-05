import DailyWidgetModule from '../../modules/daily-widget/src/DailyWidgetModule';
import type { LanguagePreference, Passage, SourcePreference } from '../domain/passage';
import { widgetPropsFor } from './shared/presentation';

export function syncWidgets(catalog: readonly Passage[], source: SourcePreference, language: LanguagePreference): void {
  const entries = catalog.map((passage) => ({
    id: passage.id,
    source: passage.source,
    ...widgetPropsFor(passage, language),
  }));
  DailyWidgetModule.setCatalog(JSON.stringify(entries), source);
}
