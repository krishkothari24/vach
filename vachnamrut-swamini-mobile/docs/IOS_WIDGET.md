# iPhone widget verification

The generated iOS project contains a WidgetKit extension with `DailyLock` (`accessoryRectangular`) and `DailyHome` (`systemMedium`). It has not been compiled or installed because this Mac has only Xcode Command Line Tools, no full Xcode or iOS simulator runtime. The current Expo SDK 58 requires Xcode 26.4 or newer ([Expo SDK reference](https://docs.expo.dev/versions/latest/)).

Before the app opens, each widget's initial layout asks the user to open the app to prepare readings. Opening the app saves the offline daily timeline, after which the widget shows the selected passage. These initial layouts are deliberately static so Expo's build-time layout registry can evaluate them without importing app data or runtime modules.

## Native build without signing

The manually triggered GitHub Actions workflow at `.github/workflows/ios-widget-build.yml` runs on a macOS 26 runner with Xcode and CocoaPods, generates the iOS project, and builds the app plus widget extension for a generic simulator with `CODE_SIGNING_ALLOWED=NO`. It has not been run. A successful run would prove native compilation only, not on-screen widget behavior. GitHub's [macOS runner image](https://github.com/actions/runner-images) documents the installed Xcode and CocoaPods versions.

## Simulator acceptance check

On a Mac with full Xcode and an installed iOS simulator runtime:

1. Run `npm ci` and `npx expo run:ios` from the app directory. No Apple Developer membership is needed for a simulator development build ([Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)).
2. Open the app once so it saves the daily timeline. Add the rectangular widget to the Lock Screen and the medium widget to the Home Screen.
3. Compare each widget's source and reference with Today. Tap each from a cold app state and verify that it opens the exact reading ID.
4. Change source and language in Settings and verify both widget timelines refresh. Check a short Gujarati entry, missing-translation fallback, long-excerpt reference fallback, large text, VoiceOver, light and dark appearances, and airplane mode.
5. Advance the simulator date through midnight, a timezone change, daylight saving time, and the end of the precomputed year. Record actual scheduling delay and any stale display in `docs/VERIFICATION.md`; WidgetKit may deliver entries after their requested date.

The [test plan](../TEST_PLAN.md) is the acceptance checklist. A physical iPhone and Apple signing are separate release checks.
