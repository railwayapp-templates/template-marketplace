# Deploy LensPDF on Railway

Prepress-grade PDF review server — separations, TAC heatmaps, densitometer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lenspdf)

## About

LensPDF is prepress-grade PDF review in the browser: per-channel separations, TAC heatmaps, layer toggles, a densitometer, and annotation overlays — no plugin install. Built from the public [printwithsynergy/lens-pdf](https://github.com/printwithsynergy/lens-pdf) repo.

This template deploys a single stateless `lens-pdf` HTTP service. Railway builds
it straight from the public repository and exposes the REST API; no database
or object store is required. Health rides at `GET /healthz`, the published
endpoint surface at `GET /v1/contract`. Scale vertically for large documents
or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lens-pdf | [printwithsynergy/lens-pdf](https://github.com/printwithsynergy/lens-pdf) | Worker |

**Category:** Other · **Languages:** TypeScript, Nunjucks, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/lenspdf)
