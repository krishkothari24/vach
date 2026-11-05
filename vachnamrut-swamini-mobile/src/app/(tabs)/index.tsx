import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { PassageCard } from '../../components/PassageCard';
import { Page } from '../../components/Page';
import { useApp } from '../../components/AppProvider';
import { activeCatalog } from '../../content/demo';
import { localDateKey, selectDailyPassage } from '../../domain/selector';
import { colors } from '../../theme';

export default function TodayScreen() {
  const { ready, preferences, favorites, today, toggleFavorite } = useApp();
  const passage = ready ? selectDailyPassage(activeCatalog(__DEV__), today, preferences.source) : null;
  return <Page eyebrow="A QUIET MOMENT, EVERY DAY" title="Today's teaching" subtitle={`${today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · ${localDateKey(today)}`}>
    {!ready ? <Text style={styles.message}>Preparing your readings…</Text> : passage ? <PassageCard passage={passage} language={preferences.language} favorite={favorites.includes(passage.id)} onToggleFavorite={() => toggleFavorite(passage.id)} /> : <View style={styles.empty}><Text style={styles.emptyTitle}>Readings are being prepared</Text><Text style={styles.message}>Reviewed, licensed passages will appear here when available.</Text></View>}
    <View style={styles.tip}><Text style={styles.tipLabel}>ON YOUR SCREEN</Text><Text style={styles.tipText}>Add the daily widget to see this teaching at a glance.</Text><Link href="/widget-setup" style={styles.tipLink}>Set up a widget →</Link></View>
    {__DEV__ ? <Text style={styles.demo}>Development preview uses labeled demo entries. No scripture text is included.</Text> : null}
  </Page>;
}

const styles = StyleSheet.create({
  message: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  empty: { padding: 24, backgroundColor: colors.paper, borderRadius: 20, gap: 8 },
  emptyTitle: { color: colors.ink, fontWeight: '700', fontSize: 19 },
  tip: { padding: 22, backgroundColor: colors.accentSoft, borderRadius: 20, gap: 8 },
  tipLabel: { color: colors.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  tipText: { color: colors.dark, fontSize: 17, lineHeight: 24 },
  tipLink: { color: colors.accent, fontSize: 14, fontWeight: '800', marginTop: 4 },
  demo: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
