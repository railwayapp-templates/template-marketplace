# Deploy LibreTranslate | Open Source Google Translate Alternative on Railway

Self-host LibreTranslate. 30+ languages, free private with REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-translation)

## About

LibreTranslate is an open-source, self-hosted machine translation API powered by the Argos Translate engine — supporting 30+ languages with no third-party API keys required. Deploy LibreTranslate on Railway to run a fully private translation service with a built-in web UI and REST API.

This Railway template pre-configures LibreTranslate with 11 popular languages (English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Korean, Arabic, Russian), API key authentication, rate limiting, and persistent model storage via a Railway volume.

LibreTranslate solves the problem of machine translation without depending on proprietary cloud APIs like Google Translate or DeepL. All translation happens locally — no data leaves your infrastructure.

- **Privacy-first:** Text never leaves your server — ideal for GDPR, HIPAA, and data sovereignty compliance
- **REST API:** Simple JSON-based API compatible with any language or framework
- **Web UI included:** Built-in translation interface for non-technical users
- **File translation:** Upload documents (PDF, DOCX, PPTX) for batch translation
- **Language detection:** Automatic source language identification
- **No API costs:** Unlimited translations with zero per-character billing
- **Offline capable:** Works without internet after models are downloaded

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreTranslate | `libretranslate/libretranslate:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | HTTP server listening port |
| `LT_METRICS` | false | Disable Prometheus metrics |
| `LT_THREADS` | 2 | Gunicorn worker count |
| `LT_API_KEYS` | (secret) | Enable API key auth |
| `LT_LOAD_ONLY` | en,es,fr,de,it,pt,zh,ja,ko,ar,ru | Languages to load |
| `LT_REQ_LIMIT` | 60 | Max requests/min per client |
| `LT_CHAR_LIMIT` | 5000 | Max chars per request |
| `LT_BATCH_LIMIT` | 10 | Max texts per batch |
| `LT_SUGGESTIONS` | false | Disable user suggestions |
| `LT_UPDATE_MODELS` | false | Skip model update check |
| `LT_API_KEYS_DB_PATH` | (secret) | API keys SQLite path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/libretranslate/.local`

**Category:** Other

[View on Railway →](https://railway.com/deploy/libretranslate-translation)
