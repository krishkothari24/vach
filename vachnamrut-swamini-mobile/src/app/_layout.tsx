import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../components/AppProvider';
import { colors } from '../theme';

export default function RootLayout() {
  return <AppProvider><Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.ink, contentStyle: { backgroundColor: colors.background } }}><Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="reading/[id]" options={{ title: 'Reading' }} /></Stack><StatusBar style="auto" /></AppProvider>;
}
