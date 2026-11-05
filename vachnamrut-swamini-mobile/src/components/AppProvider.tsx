import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AppState } from 'react-native';
import { activeCatalog } from '../content/demo';
import { defaultPreferences, type Preferences } from '../domain/preferences';
import { nextLocalMidnight } from '../domain/selector';
import { readFavorites, readPreferences, writeFavorites, writePreferences } from '../storage/local';
import { syncWidgets } from '../widgets/sync';

type AppContextValue = {
  ready: boolean;
  preferences: Preferences;
  favorites: string[];
  today: Date;
  setPreferences: (next: Preferences) => void;
  toggleFavorite: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [preferences, setPreferencesState] = useState(defaultPreferences);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [today, setToday] = useState(() => new Date());

  useEffect(() => {
    let active = true;
    Promise.all([readPreferences(), readFavorites()]).then(([storedPreferences, storedFavorites]) => {
      if (active) {
        setPreferencesState(storedPreferences);
        setFavorites(storedFavorites);
        setReady(true);
      }
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    syncWidgets(activeCatalog(__DEV__), preferences.source, preferences.language);
  }, [ready, preferences, today]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setToday(new Date());
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const delay = Math.max(1_000, nextLocalMidnight(today, 1).getTime() - Date.now() + 1_000);
    const timer = setTimeout(() => setToday(new Date()), delay);
    return () => clearTimeout(timer);
  }, [today]);

  const setPreferences = useCallback((next: Preferences) => {
    setPreferencesState(next);
    void writePreferences(next);
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      void writeFavorites(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ ready, preferences, favorites, today, setPreferences, toggleFavorite }), [ready, preferences, favorites, today, setPreferences, toggleFavorite]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be called inside AppProvider');
  return context;
}
