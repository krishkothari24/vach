import type { Passage, LanguagePreference, SourcePreference } from '../domain/passage';
import { upcomingSelections } from '../domain/selector';
import DailyLock from './ios/DailyLock';
import DailyHome from './ios/DailyHome';
import { LOCK_WIDGET_MAX_EXCERPT_LENGTH, widgetPropsFor } from './shared/presentation';

// WidgetKit's provider rereads this stored timeline at its end; prepare a full year
// because the app may remain unopened for months.
const IOS_TIMELINE_DAYS = 367;

export function syncWidgets(catalog: readonly Passage[], source: SourcePreference, language: LanguagePreference): void {
  const selections = upcomingSelections(catalog, new Date(), source, IOS_TIMELINE_DAYS)
    .filter((entry): entry is { date: Date; passage: Passage } => entry.passage !== null);
  if (!selections.length) return;
  DailyLock.updateTimeline(selections.map(({ date, passage }) => ({ date, props: widgetPropsFor(passage, language, LOCK_WIDGET_MAX_EXCERPT_LENGTH) })));
  DailyHome.updateTimeline(selections.map(({ date, passage }) => ({ date, props: widgetPropsFor(passage, language) })));
}
