# Deploy CompilePDF on Railway

Deterministic PDF build engine — assembly & rewrite with SHA-256 lineage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/compilepdf)

## About

CompilePDF is a bounded build-step utility that assembles and rewrites PDFs deterministically — same input, same bytes, with SHA-256 lineage on every operation for a fully auditable trail. Built from the public [printwithsynergy/compile-pdf](https://github.com/printwithsynergy/compile-pdf) repo.

This template deploys a single stateless `compile-pdf` HTTP service. Railway builds
it straight from the public repository and exposes the REST API; no database
or object store is required. Health rides at `GET /healthz`, the published
endpoint surface at `GET /v1/contract`. Scale vertically for large documents
or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| compile-pdf | [printwithsynergy/compile-pdf](https://github.com/printwithsynergy/compile-pdf) | Worker |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/compilepdf)
