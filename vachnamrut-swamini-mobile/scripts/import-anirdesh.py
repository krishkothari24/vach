#!/usr/bin/env python3
"""Import a small, cited draft catalog from Anirdesh's public reading pages.

This intentionally writes imported-draft.json, never approved.json. Each
passage needs a human check of the excerpt, translation, edition and grant.
"""

import argparse
import json
import re
import ssl
import time
from pathlib import Path
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup
import certifi


ROOT = Path(__file__).resolve().parents[1]
BASE = "https://www.anirdesh.com"


def download(path: str) -> BeautifulSoup:
    request = Request(BASE + path, headers={"User-Agent": "VachDailyContentImporter/0.1"})
    with urlopen(request, timeout=30, context=ssl.create_default_context(cafile=certifi.where())) as response:
        if response.status != 200:
            raise RuntimeError(f"{path}: HTTP {response.status}")
        return BeautifulSoup(response.read(), "html.parser")


def clean(element) -> str:
    if element is None:
        return ""
    for marker in element.select("sup, script, style"):
        marker.decompose()
    return re.sub(r"\s+", " ", element.get_text("", strip=False)).strip()


def vachanamrut(number: int) -> dict:
    pages = {
        lang: download(f"/vachanamrut/index.php?format={lang}&vachno={number}")
        for lang in ("en", "gu")
    }
    bodies = {}
    references = {}
    for lang, page in pages.items():
        body = page.select_one("#vach_text")
        heading = body.select_one("h3.pra_secno") if body else None
        paragraphs = body.select("p.text_" + lang) if body else []
        if not heading or not paragraphs:
            raise ValueError(f"Vachanamrut {number} {lang}: expected heading and paragraphs")
        references[lang] = clean(heading)
        bodies[lang] = [clean(paragraph) for paragraph in paragraphs]
        bodies[lang] = [paragraph for paragraph in bodies[lang] if paragraph]
    return {
        "id": f"vachanamrut-{number:03d}",
        "source": "vachanamrut",
        "reference": {
            "canonicalId": f"vachanamrut:{number}",
            "displayEnglish": references["en"],
            "displayGujarati": references["gu"],
            "edition": "Anirdesh online Vachanamrut",
        },
        # The first paragraph describes the setting. Start with the following
        # paragraph as a draft excerpt; an editor must choose the final text.
        "text": {lang: bodies[lang][min(1, len(bodies[lang]) - 1)] for lang in ("en", "gu")},
        "longText": {lang: "\n\n".join(bodies[lang]) for lang in ("en", "gu")},
        "contentKind": "verbatim_excerpt",
        "sourceUrl": f"{BASE}/vachanamrut/index.php?format=en&vachno={number}",
        "rights": {
            "status": "pending",
            "attribution": "Anirdesh Vachanamrut; source and translation credits require final review",
        },
        "reviewed": False,
    }


def swamini_vato(limit: int) -> list[dict]:
    page = download("/vato/index.php?prakaran=1&lang=gu")
    result = []
    for number in range(1, limit + 1):
        texts = {}
        for lang in ("en", "gu"):
            wrap = page.select_one(f"#vat_{lang}_{number}")
            paragraph = wrap.select_one(".vat p") if wrap else None
            if not paragraph:
                raise ValueError(f"Swamini Vato 1/{number} {lang}: passage missing")
            texts[lang] = clean(paragraph)
        result.append({
            "id": f"swamini-vato-1-{number:03d}",
            "source": "swamini_vato",
            "reference": {
                "canonicalId": f"swamini_vato:1:{number}",
                "displayEnglish": f"Swamini Vato 1/{number}",
                "displayGujarati": f"સ્વામીની વાતો ૧/{str(number).translate(str.maketrans('0123456789', '૦૧૨૩૪૫૬૭૮૯'))}",
                "edition": "Anirdesh online Swamini Vato (BAPS published translation)",
            },
            "text": texts,
            "longText": texts,
            "contentKind": "verbatim_excerpt",
            "sourceUrl": f"{BASE}/vato/index.php?prakaran=1&lang=gu#vat_gu_{number}",
            "rights": {
                "status": "pending",
                "attribution": "Anirdesh Swamini Vato; English translation published by BAPS",
            },
            "reviewed": False,
        })
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=10, help="Passages per source, 1–10")
    parser.add_argument("--output", type=Path, default=ROOT / "src/content/imported-draft.json")
    args = parser.parse_args()
    if not 1 <= args.limit <= 10:
        parser.error("--limit must be between 1 and 10")
    output = args.output.resolve()
    if output == (ROOT / "src/content/approved.json").resolve():
        parser.error("this importer cannot overwrite approved.json")
    passages = []
    for number in range(1, args.limit + 1):
        passages.append(vachanamrut(number))
        time.sleep(0.2)
    passages.extend(swamini_vato(args.limit))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(passages, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(passages)} draft passages to {output}")


if __name__ == "__main__":
    main()
