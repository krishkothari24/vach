import type { Passage, LanguagePreference, SourcePreference } from '../domain/passage';
import { upcomingSelections } from '../domain/selector';
import DailyLock from './ios/DailyLock';
import DailyHome from './ios/DailyHome';
import { widgetPropsFor } from './shared/presentation';

export function syncWidgets(catalog: readonly Passage[], source: SourcePreference, language: LanguagePreference): void {
  const timeline = upcomingSelections(catalog, new Date(), source, 30)
    .filter((entry): entry is { date: Date; passage: Passage } => entry.passage !== null)
    .map(({ date, passage }) => ({ date, props: widgetPropsFor(passage, language) }));
  if (!timeline.length) return;
  DailyLock.updateTimeline(timeline);
  DailyHome.updateTimeline(timeline);
}
