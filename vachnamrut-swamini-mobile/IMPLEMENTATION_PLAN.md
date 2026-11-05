# Implementation Plan — Vertical Slices

## Phase 0 — Validate SDK and iPhone lock-screen feasibility
- [ ] Initialize Expo/React Native/TypeScript project using a supported SDK.
- [ ] Confirm current `expo-widgets` config syntax and `accessoryRectangular` support.
- [ ] Set up development builds, iOS simulator or device, and Android emulator/device.
- [ ] Add a sample lock-screen widget with bold `[DEMO]` placeholder and confirm the OS offers it to the user.
- [ ] Record exact dependency versions and any blocker in `docs/DECISIONS.md`.
**Exit:** A developer can install the app and manually add its functioning rectangular iOS lock-screen widget.

## Phase 1 — Typed content & deterministic daily selection
- [ ] Implement schema and runtime validation for curated passages.
- [ ] Create 5–10 clearly marked demo entries (not scripture) covering each source/language.
- [ ] Implement selection by local calendar day, source preference, and language fallback.
- [ ] Add unit tests for repeatability, alternation, timezone boundaries, DST, and missing translations.
**Exit:** Daily selection can be tested independently of UI.

## Phase 2 — Complete iOS widget vertical slice
- [ ] Render compact reference + short text in rectangular lock-screen widget.
- [ ] Add medium home-screen widget.
- [ ] Provide iOS timeline of upcoming daily entries, with settings refresh strategy.
- [ ] Implement deep link into one passage detail screen.
- [ ] Test lock-screen actual size, dynamic typography, Gujarati, dark/light and offline.
**Exit:** Installed app shows a date-consistent daily entry in both widgets and opens corresponding detail.

## Phase 3 — Android home-screen widget
- [ ] Add Android widget config and Jetpack Compose-compatible widget view.
- [ ] Update snapshot after settings changes/app launches.
- [ ] Implement and verify unattended daily widget refresh using Android-supported scheduling; document platform constraints.
- [ ] Test relevant Android versions/launchers and power restrictions.
**Exit:** Android user can add a functional home-screen widget with documented tested refresh behavior.

## Phase 4 — Companion app essentials
- [ ] Today screen and reading/detail route.
- [ ] Settings for source (Vachanamrut/Swamini Vato/both), language, and daily cadence.
- [ ] Local favorites.
- [ ] Widget installation instructions and troubleshooting.
- [ ] Accessibility, empty-state behavior, and performance review.
**Exit:** Core user flow works without sign-in or network.

## Phase 5 — Verified scripture and release quality
- [ ] Select authorized editions and obtain/document redistribution rights.
- [ ] Import, review, and validate an initial usable catalog.
- [ ] Remove all demo entries from production.
- [ ] Verify exact references, translations, and attribution for every shipped item.
- [ ] Run all device tests and native release build checks.
- [ ] Prepare privacy statement, store listings, screenshots, and app name distinct from existing apps.
**Exit:** Content and functionality meet release requirements; no unapproved content shipped.

## Future roadmap (not phase blockers)
- Android lock-screen widget on proven compatible devices.
- Multiple designs and sizes, themes, search/browse, topic filtering, content sync, Chrome extension.

## Instruction to Codex
Complete one phase at a time. After each phase, report:
1. Files created/changed.
2. Commands/tests run and their outcomes.
3. Which acceptance criteria were verified **on a device** versus only in code.
4. Any SDK/platform risks and the smallest next step.
