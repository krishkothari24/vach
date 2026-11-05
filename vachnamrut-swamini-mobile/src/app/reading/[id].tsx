import { useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../components/AppProvider';
import { activeCatalog } from '../../content/demo';
import { availableText, sourceLabel } from '../../domain/passage';
import { colors } from '../../theme';

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { preferences, favorites, toggleFavorite } = useApp();
  const passage = activeCatalog(__DEV__).find((entry) => entry.id === id);
  if (!passage) return <View style={styles.container}><Text style={styles.heading}>Reading unavailable</Text><Text style={styles.copy}>This passage is not in the offline catalog.</Text></View>;

  const text = availableText(passage, preferences.language);
  const english = preferences.language === 'gu' ? undefined : text.en;
  const gujarati = preferences.language === 'en' ? undefined : text.gu;
  const fallbackEnglish = preferences.language === 'gu' && !text.gu ? text.en : undefined;
  const fallbackGujarati = preferences.language === 'en' && !text.en ? text.gu : undefined;
  const saved = favorites.includes(passage.id);

  return <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>{passage.isDemo ? 'DEVELOPMENT PREVIEW' : sourceLabel(passage.source, 'en').toUpperCase()}</Text>
    <Text style={styles.heading}>{sourceLabel(passage.source, preferences.language === 'gu' ? 'gu' : 'en')}</Text>
    <Text style={styles.reference}>{preferences.language === 'gu' ? passage.reference.displayGujarati : passage.reference.displayEnglish}</Text>
    <View style={styles.rule} />
    <Text style={styles.kind}>{passage.isDemo ? 'DEMO TEXT · NOT SCRIPTURE' : passage.contentKind === 'editorial_summary' ? 'EDITORIAL SUMMARY' : 'VERBATIM EXCERPT'}</Text>
    {english ? <Text style={styles.body}>{passage.longText?.en ?? english}</Text> : null}
    {gujarati ? <Text style={styles.gujarati}>{passage.longText?.gu ?? gujarati}</Text> : null}
    {fallbackEnglish ? <Text style={styles.body}>{passage.longText?.en ?? fallbackEnglish}</Text> : null}
    {fallbackGujarati ? <Text style={styles.gujarati}>{passage.longText?.gu ?? fallbackGujarati}</Text> : null}
    {text.fallback ? <Text style={styles.fallback}>{preferences.language === 'both' ? 'Only the available language is shown for this entry.' : 'The selected language is unavailable for this entry. Showing the available language.'}</Text> : null}
    <Pressable accessibilityRole="button" onPress={() => toggleFavorite(passage.id)} style={[styles.button, saved && styles.savedButton]}><Text style={[styles.buttonText, saved && styles.savedText]}>{saved ? '♥  Saved to favorites' : '♡  Save for later'}</Text></Pressable>
    <View style={styles.metadata}><Text style={styles.metadataHeading}>Source details</Text><Text style={styles.copy}>{passage.reference.displayEnglish}</Text><Text style={styles.copy}>{passage.rights.attribution}</Text>{passage.reference.edition ? <Text style={styles.copy}>Edition: {passage.reference.edition}</Text> : null}{passage.sourceUrl ? <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(passage.sourceUrl!)}><Text style={styles.sourceLink}>Open authorized source ↗</Text></Pressable> : null}</View>
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 26, paddingTop: 38, paddingBottom: 56, gap: 16 },
  eyebrow: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  heading: { color: colors.ink, fontSize: 35, lineHeight: 42, fontWeight: '700' },
  reference: { color: colors.muted, fontSize: 16, lineHeight: 23 },
  rule: { height: 1, backgroundColor: colors.line, marginVertical: 12 },
  kind: { color: colors.accent, fontSize: 11, letterSpacing: 1.5, fontWeight: '800' },
  body: { color: colors.ink, fontSize: 21, lineHeight: 32 },
  gujarati: { color: colors.ink, fontSize: 21, lineHeight: 34 },
  fallback: { color: colors.muted, fontSize: 13, fontStyle: 'italic', lineHeight: 20 },
  button: { backgroundColor: colors.accent, padding: 16, borderRadius: 15, marginTop: 20, alignItems: 'center' },
  savedButton: { backgroundColor: colors.accentSoft },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  savedText: { color: colors.accent },
  metadata: { backgroundColor: colors.paper, padding: 22, borderRadius: 18, gap: 8, marginTop: 8 },
  metadataHeading: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  copy: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  sourceLink: { color: colors.accent, fontSize: 14, fontWeight: '800', marginTop: 6 },
});
