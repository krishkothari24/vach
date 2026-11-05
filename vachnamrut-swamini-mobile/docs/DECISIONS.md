# Engineering decisions

## 2026-11-05 — Expo SDK 58

The app uses Expo SDK 58, `expo-widgets` 58, and Expo Router. Expo supports iOS `accessoryRectangular` and `systemMedium` widget families through its config plugin and `createWidget` API. A development build is required; Expo Go cannot run widgets. The SDK requires a supported Node release, so local commands use Node 22.

The local machine has Android Studio and Android SDK but no full Xcode installation. Native iOS build and device verification therefore remain outstanding. TypeScript and config generation can be checked here.

Implementation continued through the remaining code phases so the account- and device-dependent steps can be handled together at the end, as requested by the user. This does not imply the iOS acceptance exit was verified.

Expo Android widgets only support `updateSnapshot`; the generated Android widget disables periodic updates. Exact-passage tap routing is also unsupported by the documented Expo Android widget API. A native Android widget adapter is needed for these MVP requirements.

Sources: [Expo widgets](https://docs.expo.dev/versions/latest/sdk/widgets/), [Android widget updates](https://developer.android.com/develop/ui/views/appwidgets/advanced), [Glance interactions](https://developer.android.com/develop/ui/compose/glance/user-interaction).

## 2026-11-05 — Demo corpus and daily rotation

Eight fixtures are explicitly labeled as demo content. The production catalog is empty until rights and human review are complete. A local civil-day ordinal selects content, avoiding UTC date shifts and daylight-saving elapsed-hour assumptions. With both sources enabled, the source alternates by civil-day parity; each source cycles through its sorted stable IDs without repetition until exhausted. Language choice changes presentation only, not passage selection.

Catalog IDs use lowercase ASCII characters and character-order sorting so JavaScript and Kotlin choose the same entry. Locale-sensitive JavaScript sorting would diverge from Android for some punctuation.

The release content validator fails while the approved catalog is empty. No fixture is eligible for production display.

## 2026-11-05 — Native Android widget

Expo's Android widget implementation does not schedule daily snapshots or expose an exact-passage tap URL, so Android uses a small local Expo module with a native `AppWidgetProvider` and `RemoteViews`. The app passes a serializable offline catalog and source preference to the module. Native code applies the same sorted-ID civil-day cycle as TypeScript, requests OS-managed hourly refresh, and places the exact reading URL in a `PendingIntent` on the widget. The module and an ARM64 debug APK compiled, and the widget was installed on a Pixel 9a API 35 emulator. Display, exact tap, source refresh, and timezone-triggered selection passed there. A simulated natural midnight did not repaint within about one minute; actual OS-managed hourly delivery still needs longer device testing. This is a platform-specific exception to the preferred Expo widget implementation for the two MVP behaviors.
