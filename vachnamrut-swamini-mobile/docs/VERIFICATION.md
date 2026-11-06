# Verification record

Started 2026-11-05; updated 2026-11-06. This record distinguishes code/build checks from device results.

| Check | Result |
| --- | --- |
| TypeScript, ESLint, unit tests, demo content validation | Passed (`npm run check`, 14 tests). Tests also passed under `TZ=Pacific/Auckland`; the timeline test spans leap day and a full calendar year. |
| SDK dependency alignment | Passed (`npx expo install --check`). |
| iOS native project generation | Passed (`npx expo prebuild --platform ios --no-install`); generated `DailyLock.swift` declares `.accessoryRectangular` and `DailyHome.swift` declares `.systemMedium`. |
| iOS JS bundle | Passed (`npx expo export --platform ios`). |
| Web bundle | Passed (`npx expo export --platform web`). |
| Production content gate | Passed as intended: `VACH_RELEASE=1 npx expo config --type public` exits with a release-blocking error. |
| iPhone widget installation, rendering, tap, timeline behavior | Not run: full Xcode is absent on this machine. The adapter submits 367 daily timeline entries and omits lock-screen excerpts over 36 characters rather than truncating them; WidgetKit scheduling, fit, and rendering are not device verified. A manual macOS GitHub Actions simulator build workflow is prepared but has not been run. |
| Android native widget module | Passed `:daily-widget:compileDebugKotlin`; Expo autolinking and Android JS bundle passed. |
| Android debug APK | Passed `:app:assembleDebug -PreactNativeArchitectures=arm64-v8a` on the Android 35 toolchain. Installed the APK on a Pixel 9a API 35 emulator. This is an ARM64 debug build, not a release or all-ABI build. |
| Android home widget and exact tap | Passed on that emulator: added the widget from the launcher, saw the same daily demo entry as Today, and tapped it to open the exact reading. |
| Android preference refresh | Passed on that emulator: changing source to Swamini Vato repainted the widget immediately with the corresponding demo entry. |
| Android offline display | Passed on that emulator: the widget continued to display its saved entry with Wi-Fi and mobile data disabled. This does not verify a cold app start without Metro. |
| Android date and timezone changes | Passed on the emulator with the app closed: switching New York to Los Angeles moved the local date from Nov 5 to Nov 4 and repainted the widget; setting the clock to Nov 5 repainted it again. In a separate test, a simulated natural midnight from Nov 5 to Nov 6 did **not** repaint within about one minute. Opening the app then repainted it. OS-managed hourly delivery and longer background latency remain unverified. |
| Android Gujarati, theme, font size | Gujarati demo text and reference rendered legibly on the widget. Dark colors appeared after an app-triggered widget refresh; changing the system theme alone did not repaint immediately. At 150% system font size the full demo title, excerpt, and reference remained visible. |
| Android favorites persistence | Passed on the emulator: saved a demo passage, force stopped the app, reconnected the development client, and found the same passage on Saved. |
| Android icon and picker preview | The original ARM64 APK showed the book icon in the development client, launcher, and widget picker, but the picker showed no widget preview. The [Android CI build](https://github.com/krishkothari24/vach/actions/runs/42167354165) succeeded and uploaded an updated APK. `aapt2 dump xmltree` confirmed that this APK packages `android:previewLayout` pointing to the same resource as `initialLayout`, and `adb install -r` succeeded on the Pixel 9a emulator. The final on-screen picker preview was not captured: the emulator exhausted available local disk space during the check, so it was stopped and its new test data cleared. |
| iOS native device behavior, accessibility, DST, battery restrictions and other Android launchers/devices | Not run. Domain tests cover civil-day logic only. |

The catalog in this test is explicitly marked demo text. No authentic scripture is included or claimed.
