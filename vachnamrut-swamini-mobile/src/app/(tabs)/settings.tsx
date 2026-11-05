import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../components/AppProvider';
import { Page } from '../../components/Page';
import type { LanguagePreference, SourcePreference } from '../../domain/passage';
import { colors } from '../../theme';

function Choice<T extends string>({ label, value, selected, onSelect }: { label: string; value: T; selected: boolean; onSelect: (value: T) => void }) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => onSelect(value)} style={[styles.choice, selected && styles.selected]}><Text style={[styles.choiceText, selected && styles.selectedText]}>{label}</Text></Pressable>;
}

export default function SettingsScreen() {
  const { preferences, setPreferences } = useApp();
  const setLanguage = (language: LanguagePreference) => setPreferences({ ...preferences, language });
  const setSource = (source: SourcePreference) => setPreferences({ ...preferences, source });
  return <Page eyebrow="MAKE IT YOURS" title="Reading settings" subtitle="Your choices stay on this device and update your widgets when the app opens.">
    <View style={styles.section}><Text style={styles.heading}>Language</Text><Text style={styles.copy}>Show available Gujarati, English, or both.</Text><View style={styles.choices}>
      <Choice label="Both" value="both" selected={preferences.language === 'both'} onSelect={setLanguage} />
      <Choice label="English" value="en" selected={preferences.language === 'en'} onSelect={setLanguage} />
      <Choice label="ગુજરાતી" value="gu" selected={preferences.language === 'gu'} onSelect={setLanguage} />
    </View></View>
    <View style={styles.section}><Text style={styles.heading}>Source</Text><Text style={styles.copy}>The mixed feed alternates sources by day.</Text><View style={styles.choices}>
      <Choice label="Both" value="both" selected={preferences.source === 'both'} onSelect={setSource} />
      <Choice label="Vachanamrut" value="vachanamrut" selected={preferences.source === 'vachanamrut'} onSelect={setSource} />
      <Choice label="Swamini Vato" value="swamini_vato" selected={preferences.source === 'swamini_vato'} onSelect={setSource} />
    </View></View>
    <Text style={styles.note}>One teaching is selected for each local calendar day. Widget refresh timing is managed by your phone.</Text>
  </Page>;
}

const styles = StyleSheet.create({
  section: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 22, gap: 12 },
  heading: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  copy: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  choices: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  choice: { borderWidth: 1, borderColor: colors.line, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  selected: { backgroundColor: colors.accent, borderColor: colors.accent },
  choiceText: { color: colors.dark, fontSize: 13, fontWeight: '700' },
  selectedText: { color: '#FFFFFF' },
  note: { color: colors.muted, fontSize: 13, lineHeight: 21, paddingHorizontal: 4 },
});
