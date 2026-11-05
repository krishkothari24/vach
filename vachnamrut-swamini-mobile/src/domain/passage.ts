export type Source = 'vachanamrut' | 'swamini_vato';
export type Language = 'en' | 'gu';
export type LanguagePreference = Language | 'both';
export type SourcePreference = Source | 'both';

export type Passage = {
  id: string;
  source: Source;
  reference: {
    canonicalId: string;
    displayEnglish: string;
    displayGujarati: string;
    edition?: string;
  };
  text: { en?: string; gu?: string };
  longText?: { en?: string; gu?: string };
  contentKind: 'verbatim_excerpt' | 'editorial_summary';
  topicTags?: string[];
  sourceUrl?: string;
  rights: {
    status: 'approved' | 'pending' | 'restricted';
    attribution: string;
    licenseNote?: string;
  };
  reviewed: boolean;
  isDemo?: boolean;
};

const sources: Source[] = ['vachanamrut', 'swamini_vato'];
const kinds: Passage['contentKind'][] = ['verbatim_excerpt', 'editorial_summary'];
const rightsStatuses: Passage['rights']['status'][] = ['approved', 'pending', 'restricted'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonempty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validatePassage(value: unknown): string[] {
  const errors: string[] = [];
  if (!isRecord(value)) return ['Passage must be an object'];
  if (!nonempty(value.id)) errors.push('id is required');
  if (!sources.includes(value.source as Source)) errors.push('source is invalid');
  if (!isRecord(value.reference)) errors.push('reference is required');
  else {
    for (const key of ['canonicalId', 'displayEnglish', 'displayGujarati']) {
      if (!nonempty(value.reference[key])) errors.push(`reference.${key} is required`);
    }
  }
  if (!isRecord(value.text)) errors.push('text is required');
  else if (!nonempty(value.text.en) && !nonempty(value.text.gu)) errors.push('text needs English or Gujarati');
  if (!kinds.includes(value.contentKind as Passage['contentKind'])) errors.push('contentKind is invalid');
  if (!isRecord(value.rights)) errors.push('rights is required');
  else {
    if (!rightsStatuses.includes(value.rights.status as Passage['rights']['status'])) errors.push('rights.status is invalid');
    if (!nonempty(value.rights.attribution)) errors.push('rights.attribution is required');
  }
  if (typeof value.reviewed !== 'boolean') errors.push('reviewed must be boolean');
  if (value.isDemo === true && value.rights && isRecord(value.rights) && value.rights.status === 'approved') {
    errors.push('demo content cannot be approved');
  }
  if (value.reviewed === true && value.rights && isRecord(value.rights) && value.rights.status !== 'approved') {
    errors.push('reviewed content requires approved rights');
  }
  if (value.isDemo === true && value.text && isRecord(value.text)) {
    for (const language of ['en', 'gu']) {
      const text = value.text[language];
      if (nonempty(text) && !text.includes('DEMO') && !text.includes('ડેમો')) errors.push(`demo text.${language} needs an explicit demo label`);
    }
  }
  return errors;
}

export function validateCatalog(values: unknown): string[] {
  if (!Array.isArray(values)) return ['Catalog must be an array'];
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const [index, value] of values.entries()) {
    errors.push(...validatePassage(value).map((error) => `[${index}] ${error}`));
    if (isRecord(value) && nonempty(value.id)) {
      if (ids.has(value.id)) errors.push(`[${index}] duplicate id ${value.id}`);
      ids.add(value.id);
    }
  }
  return errors;
}

export function isPublishable(passage: Passage): boolean {
  return passage.reviewed && passage.rights.status === 'approved' && passage.isDemo !== true
    && nonempty(passage.reference.edition) && nonempty(passage.rights.licenseNote)
    && (nonempty(passage.longText?.en) || nonempty(passage.longText?.gu) || nonempty(passage.sourceUrl));
}

export function sourceLabel(source: Source, language: Language): string {
  if (source === 'vachanamrut') return language === 'gu' ? 'વચનામૃત' : 'Vachanamrut';
  return language === 'gu' ? 'સ્વામીની વાતો' : 'Swamini Vato';
}

export function availableText(passage: Passage, language: LanguagePreference): { en?: string; gu?: string; fallback: boolean } {
  const en = passage.text.en?.trim();
  const gu = passage.text.gu?.trim();
  if (language === 'both') return { en, gu, fallback: !en || !gu };
  if (language === 'en') return en ? { en, fallback: false } : { gu, fallback: true };
  return gu ? { gu, fallback: false } : { en, fallback: true };
}
