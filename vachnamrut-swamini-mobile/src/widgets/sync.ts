import type { Passage, LanguagePreference, SourcePreference } from '../domain/passage';

export function syncWidgets(_catalog: readonly Passage[], _source: SourcePreference, _language: LanguagePreference): void {
  // Native platform files override this module. Web has no widgets.
}
