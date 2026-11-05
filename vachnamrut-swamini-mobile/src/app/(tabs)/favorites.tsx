import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../components/AppProvider';
import { Page } from '../../components/Page';
import { PassageCard } from '../../components/PassageCard';
import { activeCatalog } from '../../content/demo';
import { colors } from '../../theme';

export default function FavoritesScreen() {
  const { ready, favorites, preferences, toggleFavorite } = useApp();
  const passages = activeCatalog(__DEV__).filter((passage) => favorites.includes(passage.id));
  return <Page eyebrow="YOUR COLLECTION" title="Saved readings" subtitle="Keep passages you want to revisit close at hand.">
    {!ready ? <Text style={styles.copy}>Loading saved readings…</Text> : passages.length ? passages.map((passage) => <PassageCard key={passage.id} passage={passage} language={preferences.language} favorite onToggleFavorite={() => toggleFavorite(passage.id)} />) : <View style={styles.empty}><Text style={styles.title}>Nothing saved yet</Text><Text style={styles.copy}>Tap Save on a daily reading to find it here.</Text><Link href="/" style={styles.link}>Go to today →</Link></View>}
  </Page>;
}

const styles = StyleSheet.create({
  empty: { backgroundColor: colors.paper, padding: 24, borderRadius: 20, gap: 12 },
  title: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  copy: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  link: { color: colors.accent, fontSize: 14, fontWeight: '800' },
});
