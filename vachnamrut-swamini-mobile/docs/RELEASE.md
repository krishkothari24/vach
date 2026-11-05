# Release preparation

## Code and content gates

- [ ] Replace `src/content/approved.json` with a useful human-reviewed, licensed catalog and keep written permission records outside the public repo.
- [ ] Run `npm run validate:release`, `npm run check`, native builds, and the full `TEST_PLAN.md` matrix.
- [ ] Test real iPhone lock-screen and home-screen widgets, including cold-start deep links and 30-day timeline rollover.
- [ ] Test Android widget initial placement, exact tap, unattended daily update, battery restrictions, and launcher variation.
- [ ] Confirm Gujarati shaping, large fonts, light/dark modes, and airplane mode on real devices.
- [ ] Finalize app name, bundle IDs, store descriptions, screenshots, and privacy disclosures. Current name and IDs identify a demo build; the production config guard rejects them.

Drafts for review: `docs/PRIVACY_DRAFT.md` and `docs/STORE_COPY_DRAFT.md`. They describe intended release behavior and must be checked against final signed binaries and licensed content before publication.

## Account-dependent final steps

- [ ] Obtain rights from the chosen publisher or copyright holder and arrange human review of passages.
- [ ] Install full Xcode and connect an Apple Developer account for iOS signing, device testing, TestFlight, and App Store submission.
- [ ] Connect a Google Play developer account for signed Android release and store submission.
- [ ] Connect an Expo account only if using EAS cloud builds. Local Android development builds need no Expo account.

The production build profile sets `VACH_RELEASE=1`. `app.config.js` refuses to generate a production app while the approved catalog is empty or contains unreviewed entries.
