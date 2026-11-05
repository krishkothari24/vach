import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return <><Stack screenOptions={{ headerStyle: { backgroundColor: '#F5F0E6' }, headerTintColor: '#30251C' }} /><StatusBar style="auto" /></>;
}
