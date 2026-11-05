import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultPreferences, parsePreferences, type Preferences } from '../domain/preferences';

const SETTINGS_KEY = 'vach.preferences.v1';
const FAVORITES_KEY = 'vach.favorites.v1';

export async function readPreferences(): Promise<Preferences> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? parsePreferences(JSON.parse(raw)) : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
}

export async function writePreferences(preferences: Preferences): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences));
}

export async function readFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    const value: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export async function writeFavorites(ids: readonly string[]): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}
