# Deploy docling_railway on Railway

Docling + authentication + IP filtering + Gzip + Autosleep configured

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/doclingrailway)

## About

[Docling](https://github.com/DS4SD/docling) is an AI framework for document processing (PDFs, images, PowerPoint, Word) with OCR, table extraction, and format conversion.

---

Hosting **docling\_railway** on Railway gives you an instant, production-ready deployment of Docling with built-in optimizations.
This template provides:

* 🔑 **Ultra-simple password**: Just set `PASSWORD` (auto-encrypted, change anytime)
* 🔐 **Built-in security**: Authentication and IP filtering included
* ⚡ **Optimized for Railway**: Model caching, Gzip compression, instant deploy
* 😴 **Sleep mode ready**: Auto-sleeps when idle, wakes in \~10s with cached models
* 💰 **Cost-effective**: Pay only when active

With sleep mode enabled, your Docling instance stays efficient and eco-friendly.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| public_railway_docling | [theseedship/public_railway_docling](https://github.com/theseedship/public_railway_docling) | Web service |
| docling-serve | `quay.io/docling-project/docling-serve-cpu:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | public_railway_docling | 8080 | - |
| `PASSWORD` | public_railway_docling | (secret) | Choose any password, change it anytime you want, it will regenerate automatically the hash associated (no headache) |
| `ALLOWED_IPS` | public_railway_docling | 0.0.0.0 | If ENABLE_IP_FILTER set to TRUE, add your IP's here |
| `CADDY_USERNAME` | public_railway_docling | (secret) | - |
| `ENABLE_IP_FILTER` | public_railway_docling | false | Set to true if you want to activate it |
| `CADDY_AUTHORIZATION` | public_railway_docling | - | Your API key if needed (you can change it anytime) |
| `DOCLING_SERVE_ENABLE_UI` | docling-serve | 1 | - |
| `DOCLING_SERVE_OPTIONS_CACHE_SIZE` | docling-serve | 1 | - |
| `DOCLING_SERVE_LOAD_MODELS_AT_BOOT` | docling-serve | False | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docling-serve run --host "::"`
- **Volume:** `/app`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/doclingrailway)
