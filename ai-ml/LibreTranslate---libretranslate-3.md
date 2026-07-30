# Deploy LibreTranslate on Railway

Private machine translation API and web interface with local models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-3)

## About

LibreTranslate is a free and open-source machine translation API and web interface powered by Argos Translate. It runs language models locally instead of sending text to proprietary translation providers, giving applications and people a private REST API for translation, language detection, and multilingual workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-3)

**Published on the Railway marketplace:** https://railway.com/deploy/libretranslate-3 (`libretranslate-3`). See [TEMPLATE.md](./TEMPLATE.md) for the publication record and authoritative variable package.

Hosting LibreTranslate requires one CPU-based application container, a public HTTPS endpoint, persistent model storage, and limits that prevent an exposed translation API from becoming an unbounded compute service. This template pins the Umbrel-tested `libretranslate/libretranslate:v1.6.5` image, targets port `5000`, and stores Argos models, caches, and the API-key database under one Railway volume at `/home/libretranslate/.local`. It loads only English, Spanish, French, and German, uses two threads, disables file translation, caps request size and batch count, and rejects anonymous translations. Railway generates one API key per deployment, while `/languages` remains available for health checks and the web interface remains available for authorized translation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreTranslate | `libretranslate/libretranslate:v1.6.5` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOME` | /home/libretranslate |
| `PORT` | 5000 |
| `LT_PORT` | 5000 |
| `LT_API_KEY` | (secret) |
| `LT_THREADS` | 2 |
| `LT_API_KEYS` | (secret) |
| `LT_LOAD_ONLY` | en,es,fr,de |
| `LT_REQ_LIMIT` | 0 |
| `LT_CHAR_LIMIT` | 5000 |
| `LT_BATCH_LIMIT` | 10 |
| `LT_UPDATE_MODELS` | false |
| `LT_API_KEYS_DB_PATH` | (secret) |
| `LT_DISABLE_FILES_TRANSLATION` | true |

## Configuration

- **Start command:** `/bin/sh -c "chown -R 1032:1032 /home/libretranslate/.local && exec ./venv/bin/python -c 'import os; os.setgroups([]); os.setgid(1032); os.setuid(1032); from libretranslate.api_keys import Database; Database(os.environ[\"LT_API_KEYS_DB_PATH\"]).add(60, os.environ[\"LT_API_KEY\"], int(os.environ[\"LT_CHAR_LIMIT\"])); os.execv(\"./venv/bin/libretranslate\", [\"libretranslate\", \"--host\", \"*\"])'"`
- **Healthcheck:** `/languages`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/libretranslate/.local`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/libretranslate-3)
