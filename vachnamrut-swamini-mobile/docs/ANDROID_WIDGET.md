# Android home-screen widget integration

The local Expo module in `modules/daily-widget` is automatically linked by Expo. Its library manifest registers an `AppWidgetProvider`, so no app config plugin or extra permission is needed. Keep Expo's Android widget option disabled to avoid duplicate widgets.

## App-side call

The Android adapter in `src/widgets/sync.android.ts` imports `modules/daily-widget/src/DailyWidgetModule` and calls `setCatalog(json, sourcePreference)` at app start and after language/source changes. The JSON is an array of serializable objects containing `id`, `source`, `title`, `excerpt`, `reference`, and `url`. `url` is `vachdaily://reading/<encoded-id>`. It uses the shared `widgetPropsFor(passage, language)` function to preserve the same language fallback and short-text policy as iOS:

```ts
const entries = catalog.map((passage) => ({
  id: passage.id,
  source: passage.source,
  ...widgetPropsFor(passage, language),
}));
DailyWidgetModule.setCatalog(JSON.stringify(entries), sourcePreference);
```

The module persists entries locally and immediately repaints installed widgets. `DailyWidgetStore` applies the same sorted-ID civil-day cycle and mixed-source alternation as the TypeScript selector. Android invokes the provider periodically using `updatePeriodMillis=3600000` (one hour); this is OS managed and may be delayed by power policy. Date, time, and timezone broadcasts also request repaint when delivered. Tapping the widget opens the stored passage URL directly in the app. The default widget asks the user to open the app if no catalog has been saved yet.

## Verification

- Run `npx expo prebuild --platform android --no-install` to generate the native project.
- Build with `ANDROID_HOME=$HOME/Library/Android/sdk ./gradlew :daily-widget:compileDebugKotlin` from `android/`.
- Install a development build and manually add the widget. Check first paint, tap to exact ID, settings refresh, a date rollover without opening the app, timezone change, airplane mode, Gujarati shaping, light/dark mode, and font scaling. Record actual device results in `docs/VERIFICATION.md`.

On 2026-11-05, the local module Kotlin compilation passed. A broader manifest/resource merge could not finish because the workstation ran out of free disk space while Gradle expanded Android dependencies; this is a build-environment limitation, not a verified widget behavior. The generated Gradle transform cache and NDK downloaded during that attempt were removed afterward to restore disk space. A full APK build and device checks are still needed.

Sources: [Expo local modules](https://docs.expo.dev/modules/get-started/), [Android widget update frequency](https://developer.android.com/develop/ui/views/appwidgets/advanced), [Android widget API](https://developer.android.com/reference/android/appwidget/AppWidgetProvider).
