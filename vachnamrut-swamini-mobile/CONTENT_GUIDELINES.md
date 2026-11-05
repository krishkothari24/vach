# Scripture Content: Sources, Integrity, Permissions

## Why this matters
Vachanamrut and Swamini Vato passages must be trustworthy. The user should always know whether they are reading the original text, an approved translation, a direct excerpt, or an editorial summary.

## Source candidates to review
- **BAPS Vachanamrut resources and app:** https://www.baps.org/Downloads/Smartphone-Apps.aspx
- **Swamini Vato digital text (Anirdesh):** https://www.anirdesh.com/vato/

These are **research leads, not blanket licenses**. Confirm canonical editions and written reuse permissions for verbatim text/translation before distributing bundled material. Scripture origin and modern translation/editorial compilation may have different rights.

## Required approval workflow
1. Identify edition, language, copyright holder/publisher, and authoritative citation format.
2. Request/verify redistribution permission (including shipping text in app binaries and widgets), or document a legally reviewed alternative.
3. Gather structured passages from permitted sources; avoid runtime scraping.
4. Human-review Gujarati text, English translation, punctuation, and citation; preserve meaning when excerpting.
5. Mark `reviewed=true`, `rights.status='approved'` only after verification.
6. Write a validation script that refuses release builds if unreviewed/restricted items are packaged for distribution.

## Practical excerpt rules
- Use exact, bounded, context-preserving snippets appropriate to widget sizes.
- Prefer genuinely short passages. Do not crop mid-thought just to fit layout.
- If no suitable short literal excerpt exists, show a **clearly labeled editorial summary** or merely a title/reference and encourage reading the full section.
- Attribute the source **on the widget**, not just after opening the app.
- Verify Gujarati fonts, combining marks, numerals, and mixed English/Gujarati line wrapping.
- Record the location in the source text from which the excerpt was taken so human reviewers can verify it.

## Content review checklist
- [ ] Correct scripture name and precise reference.
- [ ] Verbatim text matches approved edition.
- [ ] Translation is approved and attributed.
- [ ] No accidental implication that a summary is a quote.
- [ ] Excerpt retains surrounding meaning.
- [ ] Licensed for the distribution channel.
- [ ] Fits widget or falls back without distortion.
- [ ] Works offline.

## During development
Use obvious engineering fixtures such as `[DEMO TEXT — NOT SCRIPTURE]` and `Demo Vachanamrut Reference`. Never generate a plausible-sounding verse and pass it off as scripture. Replace fixtures only after the above workflow.
