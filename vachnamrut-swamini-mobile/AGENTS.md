# AGENTS.md — Vachanamrut & Swamini Vato Mobile Widgets

## Mission
Build a **mobile-first** devotional reading app centered on authentic excerpts from **Vachanamrut** and **Swamini Vato**. Its signature experience is a **daily teaching visible on the lock screen or home screen**, with a tap opening the full source context in the app. Inspired by the *interaction pattern* of Ishvar Vaani; do not copy its branding, artwork, text, or proprietary UI.

## Non-negotiable requirements
1. **iPhone lock-screen rectangular widget is a launch-critical feature.** Implement alongside iPhone home-screen widgets. Never substitute a push notification or Live Activity for a persistent user-added lock-screen widget.
2. **Android home-screen widget is in the initial cross-platform scope.** Android lock-screen support is conditional on operating-system/device support and must be capability-tested; do not promise universal coverage.
3. Default to **one teaching per local calendar day**. Widget refreshes are OS-managed, not guaranteed exactly at midnight and not triggered on every unlock.
4. Support **Gujarati and English** where reviewed, licensed text is available; graceful fallback for missing translation. Source names must remain explicit.
5. Each excerpt has a verifiable citation, a link or navigation path to full context, and a distinction between verbatim text and any editorial summary.
6. The app and preloaded widgets must work **offline** for the initial curated content set. No account or backend needed for MVP.
7. No fabricated scripture text, invented translations, inferred references, or misleading truncation. Never auto-publish AI-generated interpretations as canonical source text.
8. Research and document **permission/license status** for all scripture text, translations, fonts, photographs, and decorative assets before public distribution. Do not assume online access implies permission to redistribute.

## Preferred stack
- **Expo + React Native + TypeScript**, with Expo Router for navigation.
- **expo-widgets** on the currently installed supported Expo SDK, using **iOS WidgetKit families** and supported Android home-screen widget functionality. Check version-specific docs before implementation; APIs evolve.
- Local, typed scripture JSON for a curated MVP; move to SQLite only if indexing/search size warrants it.
- Simple local preferences and bookmarks; no authentication or server in v1.
- Use platform-native widget code (SwiftUI/WidgetKit, Kotlin/Glance/AppWidget) only if a documented Expo limitation blocks an essential requirement. Explain the tradeoff in a decision record first.
- Development builds and actual simulator/device testing; Expo Go does not run these widgets.

## Repo/document order
Before coding, read in order:
1. `README.md` — product orientation
2. `PRODUCT_REQUIREMENTS.md` — detailed experience and acceptance criteria
3. `ARCHITECTURE.md` — technical boundaries and update lifecycle
4. `CONTENT_GUIDELINES.md` — scripture integrity and sourcing
5. `IMPLEMENTATION_PLAN.md` — prioritized tasks
6. `TEST_PLAN.md` — verification criteria

## How to work
- Implement **small, end-to-end vertical slices** that run. Begin with 5–10 clearly marked **placeholder** entries to validate layouts. Do not present placeholder text as scripture or ship it as authentic content.
- Deliver the iPhone lock-screen widget as early as possible, before polishing the companion app.
- Keep domain logic (verse selection, date behavior, content validation) in pure, independently tested TypeScript functions.
- Keep widget render functions **pure and synchronous**. Expo's widget runtime is isolated: no React hooks, network calls, async calls, app runtime imports, or arbitrary React Native components inside widget components. Feed them prepared serializable props/timelines from the app.
- For iOS, produce a future-dated **timeline** of curated daily entries to sustain updates when the app is not opened. Let iOS own scheduling; do not claim precise delivery.
- For Android, use the supported snapshot update mechanism and independently verify updates when the app is not opened. If additional native scheduling is needed, propose it explicitly; do not assume iOS timelines work on Android.
- Widgets must be readable in light/dark modes, with Dynamic Type/large fonts and Gujarati glyph rendering verified on devices.
- Limit lock-screen excerpts to short text that fits; use a title/reference-only fallback rather than microscopic text or misleading clipping.
- Each widget tap deep-links to the exact source passage in the app.
- No overengineering: no agent framework, RAG, LLM, analytics pipeline, accounts, cloud infra, or paid services for v1.

## Engineering quality gates
- Run TypeScript typecheck, lint, unit tests, and supported native build checks after each material feature.
- Test across local midnight, timezone changes, DST, app restarts, airplane mode, deleted/re-added widgets, and content omissions.
- Unit-test deterministic daily selection, source filtering, nonrepetition policy, and fallback language handling.
- Document unverified behavior transparently; never claim a device test without running it.
- Follow minimal permissions/privacy practices; do not add tracking or notifications by default.

## Scope discipline
**MVP:** daily content engine, iOS rectangular lock widget, iOS medium home widget, Android home widget, reader screen, Gujarati/English preference, choose Vachanamrut/Swamini Vato/both, favorites, offline content.

**Later:** Android lock-screen adaptation on verified compatible devices, additional widget sizes, customizable backgrounds, browsing/search, sharing, Chrome new-tab extension, cloud sync, editorial CMS, notifications.

## First coding task
Create the Expo app scaffold, typed content schema, deterministic daily selector and tests, and a minimal functioning **iPhone accessoryRectangular lock-screen widget** populated with explicitly labeled mock data. Then verify it in an iOS development build before proceeding.

## Useful official documentation
- Expo Widgets: https://docs.expo.dev/versions/latest/sdk/widgets/
- Apple WidgetKit strategy: https://developer.apple.com/documentation/widgetkit/developing-a-widgetkit-strategy/
- Apple accessoryRectangular: https://developer.apple.com/documentation/widgetkit/widgetfamily/accessoryrectangular
- Android lock-screen widget FAQ: https://android-developers.googleblog.com/2025/03/widgets-on-lock-screen-faq.html
