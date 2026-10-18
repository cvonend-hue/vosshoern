"""Import the four original Vosshörn apartment galleries as optimized WebP files."""

from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO
from pathlib import Path
import json
import sys
import time
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCES = json.loads((ROOT / "docs" / "gallery-sources.json").read_text(encoding="utf-8"))
TARGET = ROOT / "site" / "assets" / "gallery"
TARGET.mkdir(parents=True, exist_ok=True)


def convert(item):
    slug, index, url = item
    target = TARGET / f"{slug}-{index:02d}.webp"
    if target.exists() and target.stat().st_size > 0:
        return f"cached {target.name}"

    last_error = None
    for attempt in range(3):
        try:
            request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urlopen(request, timeout=40) as response:
                raw = response.read()
            image = Image.open(BytesIO(raw)).convert("RGB")
            image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            image.save(target, "WEBP", quality=80, method=5)
            return f"saved  {target.name} {image.width}x{image.height}"
        except Exception as error:  # Retry transient errors from the old image host.
            last_error = error
            time.sleep(attempt + 1)
    raise RuntimeError(f"Could not import {slug} #{index}: {last_error}")


items = [
    (slug, index, url)
    for slug, urls in SOURCES.items()
    for index, url in enumerate(urls, 1)
]

errors = []
with ThreadPoolExecutor(max_workers=8) as executor:
    futures = [executor.submit(convert, item) for item in items]
    for future in as_completed(futures):
        try:
            print(future.result(), flush=True)
        except Exception as error:
            errors.append(str(error))

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)

print(f"Imported {len(items)} gallery images.")
