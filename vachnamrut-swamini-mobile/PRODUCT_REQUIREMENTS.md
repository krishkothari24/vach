# Product Requirements — Mobile First

## Audience and job to be done
People interested in daily Swaminarayan wisdom want an unobtrusive way to reflect on Vachanamrut and Swamini Vato teachings while using their phones.

## Priority 0: iPhone lock-screen widget
- A native **accessoryRectangular** lock-screen widget (not a wallpaper, notification, or Live Activity).
- Show a compact, human-reviewed excerpt or short teaching title and the reference. Respect Apple's tight layout bounds.
- Single tap opens the associated source detail through a deep link.
- Adapt to OS-defined lock-screen styling, legibility and contrast.
- Daily selection is stable for the **local date**; displayed widget updates are system-scheduled and not exact.
- Useful fallback if translation unavailable: a short verified source title/reference rather than incorrect text.

## Priority 0: home-screen widgets
- iOS medium widget: readable excerpt, source reference, optional English/Gujarati rendering.
- Android home-screen widget: equivalent core behavior within Android API and launcher constraints.
- User has a clear in-app onboarding flow for adding widgets; app cannot silently place a widget on all devices.
- Both lock-screen and home-screen use the same daily content engine/preferences where the platform allows.

## Priority 0: main app
- **Today:** featured excerpt and source, button to read context.
- **Read:** full available paragraph/vat or curated selection, with a citation and clear source metadata. Link to authorized source if full text redistribution is not permitted.
- **Settings:** Gujarati / English / both; Vachanamrut / Swamini Vato / both. Default: both scriptures and bilingual if available.
- **Favorites:** save/remove locally, revisit saved content.
- **Widget setup:** concise setup instructions for iOS/Android.

## Content model behavior
- A curated catalog with stable IDs and separate fields for excerpts and optional longer context.
- Exact sources distinguish Vachanamrut section/location and Swamini Vato prakaran/vat number or approved edition's reference.
- Editorial excerpt is either literal and clearly marked as such, or designated as a summary and never presented as a direct quote.
- No AI-created scripture translations presented as official.
- If a mixed feed is chosen, alternate sources deterministically when both collections are nonempty, or explicitly document selection strategy.
- Avoid repeated content when reasonably possible; preserve deterministic output offline.

## Later, not MVP
- Custom backgrounds and themes; multiple widget sizes.
- Search, browse by chapter or topic, and share cards.
- Android lock-screen integration on supported Android versions/devices after explicit compatibility testing.
- Notifications, sync/account, content publishing console, Chrome extension.

## Success measures (initial qualitative)
- On a supported iPhone, user can add the lock-screen widget and see a verified short teaching.
- A new date normally selects new content without opening app; no promise of exact OS refresh time.
- Tapping a widget opens the intended source and nothing unrelated.
- Gujarati characters render correctly and quotes never truncate with a changed meaning.
- App works in airplane mode after installation.

## Open product decisions
- Final app name and identity.
- Text corpus permissions and edition selection.
- Whether to allow both languages simultaneously on a compact widget; default to one per widget if space requires.
- The specific definition of a "teaching": verbatim short excerpt versus editorial summary; label accurately.
