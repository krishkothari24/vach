import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ReadingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <View style={styles.container}><Text style={styles.heading}>Demo reading</Text><Text style={styles.notice}>[DEMO TEXT — NOT SCRIPTURE]</Text><Text style={styles.reference}>Reference ID: {id}</Text></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 28, backgroundColor: '#F5F0E6', gap: 16 },
  heading: { color: '#30251C', fontSize: 28, fontWeight: '700' },
  notice: { color: '#7B3B2D', fontSize: 16, fontWeight: '700' },
  reference: { color: '#55473C', fontSize: 14 },
});
