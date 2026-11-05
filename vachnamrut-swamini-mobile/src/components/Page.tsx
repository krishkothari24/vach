import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export function Page({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle?: string; children: ReactNode }) {
  return <SafeAreaView style={styles.safe} edges={['top']}><ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text style={styles.title}>{title}</Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    <View style={styles.body}>{children}</View>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingTop: 36, paddingBottom: 48 },
  eyebrow: { color: colors.accent, letterSpacing: 2.2, fontWeight: '800', fontSize: 11, marginBottom: 12 },
  title: { color: colors.ink, fontSize: 35, lineHeight: 41, fontWeight: '700', letterSpacing: -1 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 23, marginTop: 10 },
  body: { marginTop: 28, gap: 18 },
});
