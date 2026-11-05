import { Tabs } from 'expo-router';
import { colors } from '../../theme';

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.line, height: 72, paddingTop: 10, paddingBottom: 18 }, tabBarLabelStyle: { fontSize: 12, fontWeight: '700' } }}>
    <Tabs.Screen name="index" options={{ title: 'Today' }} />
    <Tabs.Screen name="favorites" options={{ title: 'Saved' }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    <Tabs.Screen name="widget-setup" options={{ title: 'Widgets' }} />
  </Tabs>;
}
