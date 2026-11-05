import { Platform, StyleSheet, Text, View } from 'react-native';
import { Page } from '../../components/Page';
import { colors } from '../../theme';

function Steps({ title, steps }: { title: string; steps: string[] }) {
  return <View style={styles.card}><Text style={styles.heading}>{title}</Text>{steps.map((step, index) => <View style={styles.row} key={step}><Text style={styles.number}>{index + 1}</Text><Text style={styles.step}>{step}</Text></View>)}</View>;
}

export default function WidgetSetupScreen() {
  return <Page eyebrow="A DAILY REMINDER" title="Put it where you'll see it" subtitle="Widgets are added from your phone's own widget gallery.">
    {Platform.OS !== 'android' ? <Steps title="iPhone Lock Screen" steps={['Touch and hold your Lock Screen, then tap Customize.', 'Choose Lock Screen and tap the widget area below the clock.', 'Find Vach Daily Demo and add the rectangular daily teaching widget.']} /> : null}
    {Platform.OS !== 'android' ? <Steps title="iPhone Home Screen" steps={['Touch and hold an empty area of your Home Screen.', 'Tap Edit, then Add Widget.', 'Find Vach Daily Demo and choose the medium widget.']} /> : null}
    {Platform.OS !== 'ios' ? <Steps title="Android Home Screen" steps={['Touch and hold an empty area of your Home Screen.', 'Choose Widgets from your launcher.', 'Find Vach Daily Demo and drag the daily teaching widget into place.']} /> : null}
    <View style={styles.note}><Text style={styles.noteTitle}>How updates work</Text><Text style={styles.noteCopy}>A new reading is selected for each local day. iPhone schedules future entries with the system. Android refresh depends on device background scheduling and may appear later than midnight.</Text></View>
  </Page>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.paper, borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 22, gap: 18 },
  heading: { color: colors.ink, fontSize: 20, fontWeight: '700' },
  row: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  number: { backgroundColor: colors.accentSoft, color: colors.accent, borderRadius: 14, overflow: 'hidden', textAlign: 'center', width: 28, height: 28, lineHeight: 28, fontSize: 13, fontWeight: '800' },
  step: { color: colors.dark, fontSize: 15, lineHeight: 23, flex: 1 },
  note: { backgroundColor: colors.accentSoft, borderRadius: 20, padding: 22, gap: 8 },
  noteTitle: { color: colors.accent, fontSize: 16, fontWeight: '700' },
  noteCopy: { color: colors.dark, fontSize: 14, lineHeight: 22 },
});
