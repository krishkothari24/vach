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
| Android debug APK | Passed `:app:assembleDebug -PreactNativeArchitectures=arm64-v8a` on the Android 35 toolchain. Installed the APK on a Pixel 9a API 35 emulator. This is an ARM64 debug build, not a release or all-ABI build. |
| Android home widget and exact tap | Passed on that emulator: added the widget from the launcher, saw the same daily demo entry as Today, and tapped it to open the exact reading. |
| Android preference refresh | Passed on that emulator: changing source to Swamini Vato repainted the widget immediately with the corresponding demo entry. |
| Android offline display | Passed on that emulator: the widget continued to display its saved entry with Wi-Fi and mobile data disabled. This does not verify a cold app start without Metro. |
| Android unattended date rollover | Not verified. The installed provider declares hourly OS-managed updates and date/timezone broadcast handling, but actual background delivery was not observed. |
| Android generated icon and picker preview | After the emulator test, `expo prebuild` regenerated the native project from the current book icon and the ARM64 debug APK rebuilt successfully with the picker preview text. This refreshed APK has not been installed or visually inspected on the emulator. |
| iOS native device behavior, accessibility, Gujarati glyphs, DST, timezone and battery conditions on devices | Not run. Domain tests cover civil-day logic only. |

The catalog in this test is explicitly marked demo text. No authentic scripture is included or claimed.
