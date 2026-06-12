# Deploy lintPDF on Railway

PDF preflight engine — 500+ checks, PDF/X-4 conformance, GWG profiles.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lintpdf)

## About

lintPDF is a deterministic PDF preflight engine for print & prepress — 500+
checks, a PDF/X-4 conformance suite (ISO 15930-7), GWG profiles, and
bring-your-own PitStop / callas profile imports, with located findings you can
gate jobs on. AGPL-3.0, built from the public
[printwithsynergy/lint-pdf](https://github.com/printwithsynergy/lint-pdf) repo.

This template deploys a single stateless `lint-pdf` HTTP service. Railway
builds it straight from the public repository and exposes the REST API; no
database or object store is required. Health rides at `GET /healthz`, the
published endpoint surface at `GET /v1/contract`. Scale vertically for large
documents or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lint-pdf | [printwithsynergy/lint-pdf](https://github.com/printwithsynergy/lint-pdf) | Worker |

**Category:** Other · **Languages:** Python, Shell, Dockerfile, Mako, Makefile

[View on Railway →](https://railway.com/deploy/lintpdf)
