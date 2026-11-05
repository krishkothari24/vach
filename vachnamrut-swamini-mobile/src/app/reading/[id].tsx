import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { activeCatalog } from '../../content/demo';
import { availableText, sourceLabel } from '../../domain/passage';

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const passage = activeCatalog(__DEV__).find((entry) => entry.id === id);
  if (!passage) return <View style={styles.container}><Text style={styles.heading}>Reading unavailable</Text><Text style={styles.reference}>This ID is not in the offline catalog.</Text></View>;
  const text = availableText(passage, 'both');
  return <View style={styles.container}>
    <Text style={styles.heading}>{sourceLabel(passage.source, 'en')}</Text>
    <Text style={styles.notice}>{passage.isDemo ? '[DEMO — NOT SCRIPTURE]' : passage.contentKind === 'editorial_summary' ? 'Editorial summary' : 'Verbatim excerpt'}</Text>
    <Text style={styles.reference}>{passage.reference.displayEnglish}</Text>
    {text.en ? <Text style={styles.body}>{passage.longText?.en ?? text.en}</Text> : null}
    {text.gu ? <Text style={styles.body}>{passage.longText?.gu ?? text.gu}</Text> : null}
    <Text style={styles.reference}>{passage.rights.attribution}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#F5F0E6', gap: 16 },
  heading: { color: '#30251C', fontSize: 28, fontWeight: '700' },
  notice: { color: '#7B3B2D', fontSize: 16, fontWeight: '700' },
  reference: { color: '#55473C', fontSize: 14 },
  body: { color: '#30251C', fontSize: 18, lineHeight: 28 },
});
