import type { Passage, Source } from '../domain/passage';

const demoText = '[DEMO TEXT — NOT SCRIPTURE]';
const demoGujarati = '[ડેમો — શાસ્ત્ર નથી]';

function demoEntry(source: Source, number: number, languages: 'both' | 'en' | 'gu'): Passage {
  const name = source === 'vachanamrut' ? 'Vachanamrut' : 'Swamini Vato';
  const guName = source === 'vachanamrut' ? 'વચનામૃત' : 'સ્વામીની વાતો';
  return {
    id: `demo-${source.replace('_', '-')}-${number}`,
    source,
    reference: {
      canonicalId: `demo-${source}-${number}`,
      displayEnglish: `Demo ${name} Reference ${number}`,
      displayGujarati: `ડેમો ${guName} સંદર્ભ ${number}`,
    },
    text: { en: languages === 'gu' ? undefined : `${demoText} ${number}`, gu: languages === 'en' ? undefined : `${demoGujarati} ${number}` },
    longText: { en: `${demoText} This entry exists to test reading layouts, offline selection, and widgets.` },
    contentKind: 'editorial_summary',
    rights: { status: 'pending', attribution: 'Engineering fixture, not a scripture excerpt' },
    reviewed: false,
    isDemo: true,
  };
}

export const demoCatalog: Passage[] = [
  demoEntry('vachanamrut', 1, 'both'),
  demoEntry('vachanamrut', 2, 'en'),
  demoEntry('vachanamrut', 3, 'gu'),
  demoEntry('vachanamrut', 4, 'both'),
  demoEntry('swamini_vato', 1, 'both'),
  demoEntry('swamini_vato', 2, 'gu'),
  demoEntry('swamini_vato', 3, 'en'),
  demoEntry('swamini_vato', 4, 'both'),
];

export const approvedCatalog: Passage[] = [];

export function activeCatalog(development: boolean): Passage[] {
  return development ? demoCatalog : approvedCatalog;
}
