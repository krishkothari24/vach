import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function TodayScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>VACH DAILY · DEMO</Text>
      <Text style={styles.title}>A daily moment of reflection</Text>
      <Text style={styles.notice}>[DEMO TEXT — NOT SCRIPTURE]</Text>
      <Text style={styles.body}>The iPhone lock-screen widget is the first build milestone.</Text>
      <Link href="/reading/demo-vachanamrut-1" style={styles.link}>Open demo reading</Link>
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
