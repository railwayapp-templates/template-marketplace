# Deploy Docling Serve on Railway

API-key-protected CPU document conversion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docling-serve)

## About

Docling Serve exposes Docling's document understanding and conversion pipelines through synchronous and asynchronous REST APIs and an optional web UI. This template deploys stable CPU-only version 1.30.0 with generated API-key protection and bounded production defaults.

Authenticate conversion requests with the `X-Api-Key` header set to the generated `DOCLING_SERVE_API_KEY` value.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docling-serve | [monotykamary/railway-template-docling-serve](https://github.com/monotykamary/railway-template-docling-serve) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5001 | Railway service port. |
| `UVICORN_PORT` | 5001 | Internal API port. |
| `OMP_NUM_THREADS` | 2 | Bound CPU library thread fan-out. |
| `UVICORN_WORKERS` | 1 | One API worker to avoid duplicate model memory. |
| `MALLOC_ARENA_MAX` | 2 | Bound glibc allocator arena growth. |
| `DOCLING_SERVE_API_KEY` | (secret) | Generated key required in X-Api-Key for conversion routes. |
| `DOCLING_SERVE_ENABLE_UI` | true | Enable the interactive conversion UI. |
| `DOCLING_SERVE_LOG_LEVEL` | INFO | Operational log level. |
| `DOCLING_SERVE_LOG_FORMAT` | json | Structured production logs. |
| `DOCLING_SERVE_MAX_FILE_SIZE` | 20971520 | Maximum input file size: 20 MiB. |
| `DOCLING_SERVE_MAX_NUM_PAGES` | 50 | Maximum pages per document. |
| `DOCLING_SERVE_MAX_SYNC_WAIT` | 300 | Maximum synchronous conversion wait in seconds. |
| `DOCLING_SERVE_OPTIONS_CACHE_SIZE` | 1 | Keep one converter/model option set in memory. |
| `DOCLING_SERVE_DEBUG_ERROR_DETAILS` | false | Sanitize infrastructure error details. |
| `DOCLING_SERVE_ENG_LOC_NUM_WORKERS` | 1 | One local conversion worker. |
| `DOCLING_SERVE_LOAD_MODELS_AT_BOOT` | true | Load default models before readiness succeeds. |
| `DOCLING_SERVE_ENG_LOC_SHARE_MODELS` | true | Share models with the local worker. |
| `DOCLING_SERVE_ALLOW_EXTERNAL_PLUGINS` | false | Block third-party connectors. |
| `DOCLING_SERVE_ENABLE_REMOTE_SERVICES` | false | Block optional remote model services. |
| `DOCLING_SERVE_ALLOW_CUSTOM_VLM_CONFIG` | false | Block arbitrary custom VLM configurations. |
| `DOCLING_SERVE_ALLOW_CUSTOM_CODE_FORMULA_CONFIG` | false | Block arbitrary code/formula configurations. |
| `DOCLING_SERVE_ALLOW_CUSTOM_PICTURE_DESCRIPTION_CONFIG` | false | Block arbitrary picture-description configurations. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/docling-serve)
