# Deploy CodexPDF on Railway

PDF extraction engine — normalized facts: fonts, color, images, barcodes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codexpdf-1)

## About

CodexPDF turns every PDF into normalized facts — fonts, color, images, dielines, barcodes — over one API. The dependable extraction source of truth for print & prepress automation, built from the public [printwithsynergy/codex-pdf](https://github.com/printwithsynergy/codex-pdf) repo.

This template deploys a single stateless `codex-pdf` HTTP service. Railway builds
it straight from the public repository and exposes the REST API; no database
or object store is required. Health rides at `GET /healthz`, the published
endpoint surface at `GET /v1/contract`. Scale vertically for large documents
or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [printwithsynergy/codex-pdf](https://github.com/printwithsynergy/codex-pdf) | Web service |

## Configuration

- **Start command:** `/opt/venv/bin/uvicorn codex_pdf.api.main:app --host 0.0.0.0 --port ${PORT:-8080}`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, TypeScript, Dockerfile, Shell, Procfile, JavaScript

[View on Railway →](https://railway.com/deploy/codexpdf-1)
