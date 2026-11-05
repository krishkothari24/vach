import { Tabs } from 'expo-router';
import { TabGlyph } from '../../components/TabGlyph';
import { colors } from '../../theme';

export default function TabLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.paper, borderTopColor: colors.line, height: 72, paddingTop: 10, paddingBottom: 18 }, tabBarLabelStyle: { fontSize: 12, fontWeight: '700' } }}>
    <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: ({ color }) => <TabGlyph kind="today" color={color} /> }} />
    <Tabs.Screen name="favorites" options={{ title: 'Saved', tabBarIcon: ({ color }) => <TabGlyph kind="saved" color={color} /> }} />
    <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <TabGlyph kind="settings" color={color} /> }} />
    <Tabs.Screen name="widget-setup" options={{ title: 'Widgets', tabBarIcon: ({ color }) => <TabGlyph kind="widgets" color={color} /> }} />
  </Tabs>;
}
