import { Link } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { activeCatalog } from '../content/demo';
import { availableText } from '../domain/passage';
import { selectDailyPassage } from '../domain/selector';
import { syncWidgets } from '../widgets/sync';

export default function TodayScreen() {
  const catalog = activeCatalog(__DEV__);
  const passage = selectDailyPassage(catalog, new Date(), 'both');
  useEffect(() => { syncWidgets(catalog, 'both', 'both'); }, [catalog]);
  if (!passage) {
    return <View style={styles.container}><Text style={styles.title}>Content is being prepared</Text><Text style={styles.body}>Reviewed, licensed readings will appear here when available.</Text></View>;
  }
  const text = availableText(passage, 'both');
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>VACH DAILY · DEMO</Text>
      <Text style={styles.title}>A daily moment of reflection</Text>
      <Text style={styles.notice}>{passage.reference.displayEnglish}</Text>
      {text.en ? <Text style={styles.body}>{text.en}</Text> : null}
      {text.gu ? <Text style={styles.body}>{text.gu}</Text> : null}
      <Link href={{ pathname: '/reading/[id]', params: { id: passage.id } }} style={styles.link}>Read context →</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F0E6', padding: 28, justifyContent: 'center', gap: 16 },
  eyebrow: { color: '#815D3D', fontSize: 12, letterSpacing: 2, fontWeight: '700' },
  title: { color: '#30251C', fontSize: 34, fontWeight: '700', lineHeight: 40 },
  notice: { color: '#7B3B2D', fontSize: 16, fontWeight: '700' },
  body: { color: '#55473C', fontSize: 16, lineHeight: 24 },
  link: { color: '#7B3B2D', fontSize: 16, fontWeight: '700' },
});
