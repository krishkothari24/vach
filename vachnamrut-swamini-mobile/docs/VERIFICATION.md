# Verification record

Date: 2026-11-05. This record distinguishes code/build checks from device results.

| Check | Result |
| --- | --- |
| TypeScript, ESLint, unit tests, demo content validation | Passed (`npm run check`, 12 tests). Also passed under `TZ=Pacific/Auckland`. |
| SDK dependency alignment | Passed (`npx expo install --check`). |
| iOS native project generation | Passed (`npx expo prebuild --platform ios --no-install`); generated `DailyLock.swift` declares `.accessoryRectangular` and `DailyHome.swift` declares `.systemMedium`. |
| iOS JS bundle | Passed (`npx expo export --platform ios`). |
| Web bundle | Passed (`npx expo export --platform web`). |
| Production content gate | Passed as intended: `VACH_RELEASE=1 npx expo config --type public` exits with a release-blocking error. |
| iPhone widget installation, rendering, tap, timeline behavior | Not run: full Xcode is absent on this machine. |
| Android native widget module | Passed `:daily-widget:compileDebugKotlin`; Expo autolinking and Android JS bundle passed. |
| Full Android debug APK | Not completed. `:app:assembleDebug` was interrupted when disk free space fell below 500 MB. The build-generated NDK version was removed afterward; about 3.9 GB was free. |
| Android widget installation, exact tap, unattended refresh | Not run on a device or emulator. |
| Offline, accessibility, Gujarati glyphs, DST, timezone and battery conditions on devices | Not run. Domain tests cover civil-day logic only. |

Do not infer native widget behavior from a successful JS bundle or generated project.
