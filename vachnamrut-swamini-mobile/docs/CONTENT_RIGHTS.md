# Content rights and edition research

As of 2026-11-05, **no scripture text or translation is cleared for redistribution in this app**. The release catalog is intentionally empty. Development uses unmistakable demo fixtures.

| Source | Candidate edition | Rights finding |
| --- | --- | --- |
| Vachanamrut, Gujarati | [BAPS Gujarati publication](https://www.baps.org/Publications/Books/Vachanamrut-1177.aspx), 32nd edition, ISBN 978-81-7526-756-5 | Written redistribution permission needed. |
| Vachanamrut, English | [BAPS English publication](https://www.baps.org/Publications/Books/Vachanamrut-60.aspx), June 2010, ISBN 978-81-7526-431-1 | Written redistribution permission needed. |
| Swamini Vato, Gujarati | [BAPS Gujarati publication](https://www.baps.org/Publications/Books/Swamini-Vato-1176.aspx), 22nd edition, ISBN 978-81-7526-757-2 | Written redistribution permission needed. |
| Swamini Vato, English | [BAPS English publication](https://www.baps.org/Publications/Books/Swamini-Vato-65.aspx), January 2009, ISBN 81-7526-313-X | Written redistribution permission needed. |

[BAPS terms](https://www.baps.org/Terms-and-Conditions.aspx) restrict copying, reproducing, and distributing site and app content without prior written permission. The [Aksharpith FAQ](https://magazines.baps.org/FAQ.aspx) also disallows giving away or redistributing free downloads. [Anirdesh's Swamini Vato text](https://www.anirdesh.com/vato/) identifies its English translations as BAPS publications and does not provide a redistribution license. Online availability is not permission to bundle text into an app or widget.

The official [Aksharpith contact page](https://magazines.baps.org/Contact-Us.aspx) is the starting point for a written grant. An unsent, specific request is prepared in `docs/PERMISSION_REQUEST_DRAFT.md`. Historical Gujarati editions might permit an independent public-domain transcription, but no verified scan, edition lineage, and jurisdiction review sufficient for release has been established; modern English translations require separate consideration.

## Content approval record needed for each entry

1. Chosen edition, publisher, copyright holder, language, exact location, and authoritative reference.
2. Written permission that explicitly covers offline app binaries, widgets, and the intended stores/regions, or a legal review documenting an alternative.
3. Exact Gujarati excerpt and approved English translation, with punctuation and context checked by a human reviewer.
4. Confirmation that the short widget excerpt preserves meaning. If it cannot fit, use a reference-only widget.
5. `rights.status: "approved"`, `reviewed: true`, and a useful `rights.licenseNote` only after the above checks.

Add the reviewed entries to `src/content/approved.json`, run `npm run validate:release`, and run the full device test plan before a production build. The working app name also needs final selection and store availability checks; [Ishvar Vaani is an existing app](https://apps.apple.com/in/app/ishvar-vaani/id6760190882).

## Draft web importer

The app owner stated on 2026-11-06 that they have permission for all uses and requested an internet importer. `scripts/import-anirdesh.py` imports a small bilingual sample from Anirdesh into `src/content/imported-draft.json`, preserving direct source URLs and references. The grant text and human passage review have not been supplied, so imported entries stay `rights.status: "pending"` and `reviewed: false`; the release guard remains closed. To refresh the draft, install `scripts/requirements-import.txt` and run `python3 scripts/import-anirdesh.py` from the app directory. Check each excerpt against its source page and document the grant before moving entries into `approved.json`.
