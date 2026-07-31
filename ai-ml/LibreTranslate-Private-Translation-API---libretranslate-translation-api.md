# Deploy LibreTranslate — Private Translation API on Railway

Self-host translation — REST API, 30+ languages, no per-word fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-translation-api)

## About

LibreTranslate is a free, open-source machine translation API — a private, self-hosted alternative to Google Translate and DeepL that runs entirely on your own infrastructure. Translate text and documents across 30+ languages through a clean web UI or a REST API, with no per-word fees and no data sent to a third-party cloud. This template deploys it with sensible memory defaults and model persistence, so it boots reliably on a normal plan instead of crashing on startup.

---

LibreTranslate is simple to run, but one memory detail decides whether it starts at all — and it's the mistake most deployments make.

**Loading every language crashes on a normal plan — start lean with `LT_LOAD_ONLY`.** Loading all 30+ languages needs 8 GB+ RAM and about 10 GB of storage, and each additional language adds roughly 200 MB of memory. If you deploy expecting all languages and don't limit them, the container runs out of memory and crashes on startup. This template sets `LT_LOAD_ONLY` to a sensible default (for example `en,es,fr,de`) so it boots cleanly, and you add languages deliberately by extending that list and raising the memory limit to match. Start with the languages you actually need, not all thirty.

**Models must persist on a volume, or they re-download every redeploy.** The language models live under `/home/libretranslate/.local` and are gigabytes in size. Without a persistent volume they're re-downloaded on every restart — slow and wasteful. This template mounts that volume so models are cached once.

**API keys live in SQLite and need their own persistence.** With `LT_API_KEYS=true`, keys are stored in a SQLite database on the volume. Persist it, or the keys you issue vanish on redeploy. Generate keys by running `ltmanage keys add` inside the container.

**File translation works out of the box.** The UI and API translate uploaded PDF, DOCX, PPTX, and HTML files. It's enabled by default; raise `LT_CHAR_LIMIT` for large documents.

Typical cost: **~$5–15/month** on Railway depending on how many languages you load. LibreTranslate is AGPL-3.0 and free — no translation fees, unlike Google's or DeepL's per-character pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreTranslate | `libretranslate/libretranslate:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `LT_METRICS` | false |
| `LT_THREADS` | 2 |
| `LT_API_KEYS` | (secret) |
| `LT_LOAD_ONLY` | en,es,fr,de,it,pt,zh,ja,ko,ar,ru |
| `LT_REQ_LIMIT` | 60 |
| `LT_CHAR_LIMIT` | 5000 |
| `LT_BATCH_LIMIT` | 10 |
| `LT_SUGGESTIONS` | false |
| `LT_UPDATE_MODELS` | false |
| `LT_API_KEYS_DB_PATH` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/libretranslate/.local`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/libretranslate-translation-api)
