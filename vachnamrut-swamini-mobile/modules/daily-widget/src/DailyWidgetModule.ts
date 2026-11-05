import { NativeModule, requireNativeModule } from 'expo';

declare class DailyWidgetModule extends NativeModule {
  setCatalog(json: string, sourcePreference: 'both' | 'vachanamrut' | 'swamini_vato'): void;
}

export default requireNativeModule<DailyWidgetModule>('DailyWidget');
