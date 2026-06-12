# Deploy AssayPDF on Railway

GWG 2022 structural conformance & metadata reporting for PDFs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/assaypdf)

## About

AssayPDF is open-source GWG 2022 structural conformance and metadata reporting — page boxes, fonts, color and image inventory, security posture — surfaced as a clean report. Built from the public [printwithsynergy/assay-pdf](https://github.com/printwithsynergy/assay-pdf) repo.

This template deploys a single stateless `assay-pdf` HTTP service. Railway builds
it straight from the public repository and exposes the REST API; no database
or object store is required. Health rides at `GET /healthz`, the published
endpoint surface at `GET /v1/contract`. Scale vertically for large documents
or horizontally behind your own gateway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| assay-pdf | [printwithsynergy/assay-pdf](https://github.com/printwithsynergy/assay-pdf) | Worker |

**Category:** Other · **Languages:** Python, HTML, Just, Shell

[View on Railway →](https://railway.com/deploy/assaypdf)
