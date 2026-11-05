# Architecture and Technical Decisions

## High-level flow

```text
Reviewed, licensed source passages
          |
   local typed JSON catalog
          |
  validator + selector (pure TS)
          |
 Today selection + preferences
       /            \
 Main Expo app     platform widget update adapter
       |              /                 \
Reader/detail     iOS WidgetKit        Android widgets
 & bookmarks       timeline           snapshot/OS scheduling
```

## Framework and constraints
Use a supported Expo SDK release with `expo-widgets` and Expo Router. The latest Expo docs describe **iOS and Android home-screen widgets**, and iOS widget families including lock-screen accessories. Verify installed SDK and API compatibility before writing native-specific code. **Expo Go is insufficient; use dev builds.**

**Isolated widgets:** `expo-widgets` widget-marked components are synchronous/pure. No React hooks, async/network calls, React Native primitives, or module/runtime state access inside the widget component. Prepare props and state in the app; render via supported Expo UI components (`@expo/ui/swift-ui` for iOS; `@expo/ui/jetpack-compose` for Android).

**iOS:** Define `accessoryRectangular` and `systemMedium` families. Use `updateTimeline` with precomputed entries when supported by the installed SDK, for a buffer of future local days. The system manages refresh budgets and exact timing. Prefer native WidgetKit fallback only if Expo cannot satisfy a hard requirement.

**Android:** Expo Android widgets currently use `updateSnapshot`; iOS `updateTimeline` behavior must **not** be assumed on Android. Investigate and validate a battery-respectful scheduled update mechanism (e.g. supported native scheduling/WorkManager) for daily unattended refresh. If that mechanism isn't working in a build, identify the limitation instead of claiming feature completion. Lock-screen widgets depend on manufacturer/Android version and are not part of the baseline guarantee.

## Suggested folders

```text
app/
  index.tsx                  # Today's passage
  reading/[id].tsx           # Deep-linked detail
  favorites.tsx
  settings.tsx
  widget-setup.tsx
src/
  content/                   # Approved local JSON, not scraped at runtime
  domain/
    passage.ts               # Types and validation
    selector.ts              # Date-based deterministic selection
    preferences.ts
  storage/                   # Local settings and favorites
  widgets/
    ios/                     # iOS rendering + timeline adapter
    android/                 # Android rendering + update adapter
    shared/                  # serializable presentation snapshots
  components/                # App-only components
assets/                       # Appropriately licensed assets
scripts/                      # Content validation tooling
```

## Suggested TypeScript data shape

```ts
type Passage = {
  id: string; // stable, e.g. 'vachanamrut:...'; not arbitrary array index
  source: 'vachanamrut' | 'swamini_vato';
  reference: {
    displayGujarati: string;
    displayEnglish: string;
    canonicalId: string;
    edition?: string;
  };
  text: {
    gu?: string; // exact approved original-language excerpt
    en?: string; // approved translation excerpt
  };
  longText?: { gu?: string; en?: string };
  contentKind: 'verbatim_excerpt' | 'editorial_summary';
  topicTags?: string[];
  sourceUrl?: string;  // official/authorized link where available
  rights: { status: 'approved' | 'pending' | 'restricted'; attribution: string; licenseNote?: string };
  reviewed: boolean;
};
```

Do not include pending/unreviewed passages in production widget content.

## Date-based deterministic selection
- Derive local date as `YYYY-MM-DD`, not UTC date, then compute a reproducible index based on date and selected corpus.
- Ideally implement a documented seeded permutation/cycle to avoid repeated items until corpus exhausted.
- With both scriptures selected, use deterministic alternation by day and choose within each catalog.
- Persist last shown ID if necessary for continuity; provide sensible behavior for timezone changes and daylight saving time.
- Precompute 14–30 days of entries for iOS timelines; regenerate on settings changes and app resume. Do not assume iOS honors precise midnight changes.
- Keep localization selection separate from passage selection. Missing language should gracefully fall back or use the source reference.

## Deep links and interaction
Route `app-scheme://reading/<encoded-id>` (configure the real scheme) to the exact passage. Confirm widget tap and app navigation work from cold starts and without network connectivity.

## Privacy, security, and performance
- No login, ads, tracking, sensitive permissions, or cloud dependency in MVP.
- Bundle only approved content; do not silently scrape external scripture sources.
- Keep widget snapshots tiny; minimize images and heavy rendering; respect battery budget.
- Test app and widget against the installed Expo version rather than copying outdated API samples.

## Official references
- https://docs.expo.dev/versions/latest/sdk/widgets/
- https://developer.apple.com/documentation/widgetkit/developing-a-widgetkit-strategy/
- https://developer.apple.com/documentation/widgetkit/widgetfamily/accessoryrectangular
- https://android-developers.googleblog.com/2025/03/widgets-on-lock-screen-faq.html
