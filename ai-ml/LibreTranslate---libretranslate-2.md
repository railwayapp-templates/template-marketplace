# Deploy LibreTranslate on Railway

Self-hosted machine translation API with persistent API-key storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-2)

## About

LibreTranslate is a free, open-source machine translation API that runs entirely on your own infrastructure. Powered by Argos Translate instead of proprietary services, it provides a browser interface and REST API for private, offline-capable translation workflows while giving you control over language availability, access, limits, and operational data.

This template runs the official LibreTranslate image on port 5000 and exposes it through a generated Railway domain. On first startup, LibreTranslate downloads its language models, so the service may take 10 minutes or longer to become available depending on bandwidth and selected languages. A Railway volume mounted at `/app/db` persists the SQLite API-key database across redeploys. Railway allows one volume per service, so downloaded models under `/home/libretranslate/.local` remain ephemeral and may be downloaded again after a redeploy. Configure API-key authentication, model updates, and optional language restrictions manually in the template composer using LibreTranslate's `LT_*` variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| main | `libretranslate/libretranslate:v1.6.5@sha256:a3518195e4e810ba0d9dd251a851f24918059d757ef3c5cf8e0f881daf4242fc` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/libretranslate-2)
