import { StyleSheet, Text, View, type ColorValue } from 'react-native';

export function TabGlyph({ kind, color }: { kind: 'today' | 'saved' | 'settings' | 'widgets'; color: ColorValue }) {
  if (kind === 'today') return <View style={[styles.circle, { borderColor: color }]}><View style={[styles.circleCenter, { backgroundColor: color }]} /></View>;
  if (kind === 'saved') return <Text style={[styles.heart, { color }]}>♡</Text>;
  if (kind === 'settings') return <View style={styles.bars}>{[0, 1, 2].map((index) => <View key={index} style={[styles.bar, { backgroundColor: color }]} />)}</View>;
  return <View style={styles.grid}>{[0, 1, 2, 3].map((index) => <View key={index} style={[styles.tile, { borderColor: color }]} />)}</View>;
}

const styles = StyleSheet.create({
  circle: { width: 22, height: 22, borderWidth: 2, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  circleCenter: { width: 7, height: 7, borderRadius: 4 },
  heart: { fontSize: 29, lineHeight: 29, marginTop: -2 },
  bars: { width: 21, height: 22, justifyContent: 'space-around', paddingVertical: 3 },
  bar: { height: 2, borderRadius: 1 },
  grid: { width: 22, height: 22, flexDirection: 'row', flexWrap: 'wrap', gap: 3 },
  tile: { width: 9, height: 9, borderWidth: 2, borderRadius: 2 },
});
