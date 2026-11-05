# Engineering decisions

## 2026-11-05 — Expo SDK 58

The app uses Expo SDK 58, `expo-widgets` 58, and Expo Router. Expo supports iOS `accessoryRectangular` and `systemMedium` widget families through its config plugin and `createWidget` API. A development build is required; Expo Go cannot run widgets. The SDK requires a supported Node release, so local commands use Node 22.

The local machine has Android Studio and Android SDK but no full Xcode installation. Native iOS build and device verification therefore remain outstanding. TypeScript and config generation can be checked here.

Expo Android widgets only support `updateSnapshot`; the generated Android widget disables periodic updates. Exact-passage tap routing is also unsupported by the documented Expo Android widget API. A native Android widget adapter is needed for these MVP requirements.

Sources: [Expo widgets](https://docs.expo.dev/versions/latest/sdk/widgets/), [Android widget updates](https://developer.android.com/develop/ui/views/appwidgets/advanced), [Glance interactions](https://developer.android.com/develop/ui/compose/glance/user-interaction).
