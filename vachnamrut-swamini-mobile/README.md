# Vachanamrut & Swamini Vato — Mobile Widget App

**Working title:** TBD. The name *Ishvar Vaani* refers to an **existing reference app** and is **not our product name**.

## Vision
Help users encounter a short, authentic Swaminarayan teaching naturally throughout the day by showing it on their phone's lock screen or home screen, without needing to remember to launch a reading app.

## Primary experience
1. User installs the app and chooses Gujarati, English, or both.
2. User chooses Vachanamrut, Swamini Vato, or a mix.
3. User adds the **iPhone lock-screen widget** and/or home-screen widget.
4. A **daily teaching** appears. The app presents a short excerpt and an unambiguous reference.
5. Tapping the widget opens the full source context; users can save it.

## Platforms
- iOS: **lock-screen and home-screen widgets are MVP requirements**.
- Android: home-screen widget is MVP; lock-screen support requires platform/device validation.
- Chrome/new-tab: later phase, not MVP.

## Product principles
- **Authenticity above engagement:** accurate scripture and transparent attributions.
- **Glanceability:** widget content should fit comfortably; full passages live in the app.
- **Offline by default:** prepackaged curated content, no sign-in.
- **Calm design:** typography-first, not distracting or gamified.
- **Simplicity:** build the widget first, then only the app screens necessary to support it.

## Repo documents
- `AGENTS.md`: instructions for Codex or other coding agents.
- `PRODUCT_REQUIREMENTS.md`: screens, widget behavior, MVP acceptance criteria.
- `ARCHITECTURE.md`: architecture, data models, refresh design.
- `CONTENT_GUIDELINES.md`: text sourcing, editorial review, licensing.
- `IMPLEMENTATION_PLAN.md`: staged implementation tasks.
- `TEST_PLAN.md`: manual and automated verification.

## Current build

The companion app, deterministic daily selector, demo catalog, iOS lock and home widget code, and Android home widget code are implemented. An ARM64 Android debug APK builds, and the widget's display, exact tap, preference refresh, and saved offline display were checked on a Pixel 9a emulator. Full iPhone widget testing needs Xcode and an iPhone or iOS simulator. The demo catalog contains no scripture and cannot be released as authentic content. See [verification results](docs/VERIFICATION.md) and [release preparation](docs/RELEASE.md).

## Development build

The Expo SDK 58 app is in this folder. Use Node 22 or another SDK-supported Node release.

```sh
npm ci
npm run check
npx expo prebuild --platform ios --no-install
npx expo run:ios
npx expo run:android
```

The local ARM64 Android debug APK can also be built from `android/` with:

```sh
ANDROID_HOME="$HOME/Library/Android/sdk" ./gradlew :app:assembleDebug -PreactNativeArchitectures=arm64-v8a
```

Widgets need native development builds; Expo Go cannot show them. This repository uses visibly labeled demo entries during development. A production build is blocked until reviewed, licensed content is added to `src/content/approved.json`. See [release preparation](docs/RELEASE.md), [rights research](docs/CONTENT_RIGHTS.md), and [verification results](docs/VERIFICATION.md).
