# Deploy SiftPDF on Railway

Imposition planning solver — step-and-repeat, gang and true-shape nesting.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siftpdf)

## About

SiftPDF solves the most efficient step-and-repeat, gang, or true-shape nest layout for a job — deterministically, ready to hand to your output step. Built from the public [printwithsynergy/sift-pdf](https://github.com/printwithsynergy/sift-pdf) repo.

This template deploys a single stateless `sift-pdf` HTTP service. Railway builds
it straight from the public repository and exposes the REST API; no database
or object store is required. Health rides at `GET /healthz`, the published
endpoint surface at `GET /v1/contract`. Scale vertically for large documents
or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sift-pdf | [printwithsynergy/sift-pdf](https://github.com/printwithsynergy/sift-pdf) | Worker |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/siftpdf)
