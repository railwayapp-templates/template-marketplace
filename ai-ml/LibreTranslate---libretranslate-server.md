# Deploy LibreTranslate on Railway

Translates text and documents between about 50 languages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-server)

## About

LibreTranslate is a free and open source machine translation API that runs neural models on your own server instead of calling a commercial cloud service. It is built on Argos Translate and CTranslate2, so every request is processed locally on CPU: no text leaves your infrastructure, there is no per-character bill, and the only rate limit is the one you set. Teams self-host LibreTranslate to translate user-generated content, localise documentation, or keep translation inside a network where sending customer text to an external API is not acceptable. It ships with a browser UI, a documented REST API, a Swagger page, and document translation for `.txt`, `.docx`, `.pptx`, `.odt`, `.epub`, `.html` and `.pdf`.

This template deploys LibreTranslate with a Railway-managed Redis instance and a persistent volume. The service runs four Gunicorn workers behind a public HTTPS domain and keeps its translation models and API-key database on the volume, so a redeploy reuses the models instead of re-downloading gigabytes. Redis is private and holds what a multi-worker deployment must share: rate-limit counters, the flood-ban list and a seven-day translation cache. Twelve languages install on first boot and an API key is generated for you.

![Diagram of the LibreTranslate and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787332795/libretranslate-architecture.png)

Commercial translation APIs charge per character and require sending text off your infrastructure. That is fine for marketing copy and awkward for support tickets, medical notes or anything under a data-residency clause. LibreTranslate solves both by running the models where you run everything else.

Key features:

- REST API — `/translate`, `/detect`, `/languages`, `/translate_file` — documented in Swagger
- Automatic language detection with a confidence score, plus alternative translations
- Batch translation: pass an array of strings, get an array back
- Document translation that preserves the original file format
- Per-key and per-IP rate limits, character limits and flood banning

**LibreTranslate** serves the UI and API and owns the volume holding Argos translation models, MiniSBD sentence-boundary models and the SQLite key database. **Redis** is the shared state layer: with several worker processes, in-memory counters give each worker its own copy of every limit, so a 60-per-minute limit quietly becomes 240. Redis also backs the translation cache.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| libretranslate | [gridalpha/libretranslate-railway](https://github.com/gridalpha/libretranslate-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | libretranslate | 5000 | Port Railway health-checks |
| `LT_PORT` | libretranslate | 5000 | Port Gunicorn binds |
| `LT_METRICS` | libretranslate | true | Expose Prometheus metrics |
| `LT_THREADS` | libretranslate | 4 | Gunicorn worker processes |
| `LT_API_KEYS` | libretranslate | (secret) | Enable the API key database |
| `LT_LOAD_ONLY` | libretranslate | en,es,fr,de,it,pt,ru,zh,ar,ja,ko,hi | Languages installed on boot |
| `LT_REQ_LIMIT` | libretranslate | 60 | Requests per minute per client |
| `LT_CHAR_LIMIT` | libretranslate | 5000 | Maximum characters per request |
| `LT_BATCH_LIMIT` | libretranslate | 32 | Maximum texts per batch request |
| `LT_UPDATE_MODELS` | libretranslate | true | Download missing models at startup |
| `LT_SHARED_STORAGE` | libretranslate | - | Shared cache and ban list |
| `LT_DAILY_REQ_LIMIT` | libretranslate | 10000 | Requests per day per client |
| `FORWARDED_ALLOW_IPS` | libretranslate | * | Gunicorn honours X-Forwarded-Proto |
| `LT_API_KEYS_DB_PATH` | libretranslate | (secret) | Key database on the volume |
| `LT_HOURLY_REQ_LIMIT` | libretranslate | 1200 | Requests per hour per client |
| `LT_BOOTSTRAP_API_KEY` | libretranslate | (secret) | API key seeded on first boot |
| `LT_REQ_LIMIT_STORAGE` | libretranslate | - | Rate limit counter storage |
| `LT_TRANSLATION_CACHE` | libretranslate | all | Cache every translation for 7 days |
| `LT_METRICS_AUTH_TOKEN` | libretranslate | (secret) | Bearer token for /metrics |
| `LT_REQ_FLOOD_THRESHOLD` | libretranslate | 20 | Limit violations before a ban |
| `LT_TRUST_FORWARDED_FOR` | libretranslate | true | Read client IP from X-Forwarded-For |
| `LT_REQUIRE_API_KEY_ORIGIN` | libretranslate | (secret) | Origin allowed without a key |
| `LT_BOOTSTRAP_API_KEY_REQ_LIMIT` | libretranslate | (secret) | Requests per minute for that key |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/libretranslate`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/libretranslate-server)
