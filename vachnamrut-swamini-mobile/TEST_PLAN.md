# Test plan

## Automated checks

- `npm run check`: TypeScript, lint, domain tests, content validation.
- `npx expo install --check`: dependency alignment with the installed SDK.
- `npx expo export --platform ios` and `--platform android`: bundle checks.
- `npx expo prebuild --platform ios --no-install` and Android equivalent: config plugin generation.

## Manual iPhone checks (requires Xcode and iOS 16.4+ simulator or device)

- Install a development build, add the rectangular lock-screen and medium home-screen widgets, and confirm `[DEMO]` appears before the app is opened.
- Confirm one local date selects one stable item; check a date rollover, timezone change, DST transition, app restart, and widget removal/readdition.
- Tap each widget from a cold start and confirm the exact reading ID.
- Check light/dark appearance, large type, VoiceOver, Gujarati shaping, airplane mode, and long-reference fallback.

## Manual Android checks (requires Android Studio emulator or device)

- Install a development build, add the home-screen widget, and check initial content, exact-passage tap, and refresh after settings changes.
- Advance local date without opening the app and check unattended refresh with battery restrictions.
- Check light/dark appearance, font scaling, Gujarati shaping, airplane mode, and launcher resizing.

No device result should be marked passed until it is actually run and recorded in `docs/VERIFICATION.md`.
