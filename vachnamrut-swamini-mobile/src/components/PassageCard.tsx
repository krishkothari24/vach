import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { availableText, sourceLabel, type LanguagePreference, type Passage } from '../domain/passage';
import { colors } from '../theme';

export function PassageCard({ passage, language, favorite, onToggleFavorite }: { passage: Passage; language: LanguagePreference; favorite: boolean; onToggleFavorite: () => void }) {
  const text = availableText(passage, language);
  const primary = language === 'gu' ? text.gu ?? text.en : text.en ?? text.gu;
  return <View style={styles.card}>
    <View style={styles.top}>
      <Text style={styles.source}>{passage.isDemo ? 'DEMO · ' : ''}{sourceLabel(passage.source, 'en')}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={favorite ? 'Remove favorite' : 'Save favorite'} onPress={onToggleFavorite} style={styles.save}><Text style={styles.saveText}>{favorite ? '♥ Saved' : '♡ Save'}</Text></Pressable>
    </View>
    <Text style={styles.reference}>{language === 'gu' ? passage.reference.displayGujarati : passage.reference.displayEnglish}</Text>
    {primary ? <Text style={styles.excerpt}>{primary}</Text> : <Text style={styles.excerpt}>Text unavailable in this language.</Text>}
    {language === 'both' && text.gu && text.en ? <Text style={styles.gu}>{text.gu}</Text> : null}
    {text.fallback ? <Text style={styles.fallback}>{language === 'both' ? 'Only the available language is shown.' : 'Showing available language.'}</Text> : null}
    <Link href={{ pathname: '/reading/[id]', params: { id: passage.id } }} style={styles.link}>Read context  →</Link>
  </View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, padding: 22, borderRadius: 22, borderWidth: 1, borderColor: colors.line, gap: 14 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  source: { color: colors.accent, letterSpacing: 1.2, fontWeight: '800', fontSize: 11, flex: 1 },
  save: { paddingVertical: 7, paddingHorizontal: 10, backgroundColor: colors.accentSoft, borderRadius: 20 },
  saveText: { color: colors.accent, fontWeight: '700', fontSize: 12 },
  reference: { color: colors.muted, fontSize: 13 },
  excerpt: { color: colors.ink, fontSize: 22, lineHeight: 32, fontWeight: '500' },
  gu: { color: colors.ink, fontSize: 21, lineHeight: 33 },
  fallback: { color: colors.muted, fontSize: 12, fontStyle: 'italic' },
  link: { color: colors.accent, fontSize: 14, fontWeight: '800', marginTop: 4 },
});
