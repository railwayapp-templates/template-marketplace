# Deploy MinerU v3.4.4 | PDF-to-Markdown API for RAG, CPU-Ready and Preloaded on Railway

[v3.4.4] PDF/Office to Markdown for RAG. CPU default, models preloaded.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mineru-v344-or-pdf-to-markdown-api-for-r)

## About

MinerU is OpenDataLab's document parsing engine: PDFs, images and Office files in,
LLM-ready Markdown and JSON out, with layout detection, OCR in 80+ languages,
table-structure recognition and formula recognition. This template runs its
`mineru-api` HTTP server on CPU — no GPU, no per-page cloud OCR fees, and no
third-party service holding your documents.

It deploys as **one service on a volume**, from a prebuilt image, with the parsing
models already inside it.

MinerU is normally packaged for a GPU box on a trusted network, and two of its
defaults do not survive the move to a one-click public deploy. This template
changes both, in the image, so the deployer never has to know about them.

**The default request parses.** MinerU 3.4's default backend is `hybrid-engine`,
which expects a local VLM and a GPU. On a CPU container a request that simply
omits `backend=` does not fail cleanly — it downloads roughly 2 GB of additional
VLM weights and then runs vision-language inference on the CPU, taking tens of
minutes for a paper-length PDF. Railway's edge gives up at about five minutes, so
the caller sees `Application failed to respond` while the container keeps working,
and keeps billing. Here `pipeline` is the server's default, so a plain
`POST /file_parse` with a file and nothing else returns Markdown.

**Threads match the container.** MinerU's pipeline is torch end to end, and torch
sizes its thread pool from the cores it can see — which inside a container is the
host's core count, not your plan's quota. The entrypoint reads
`/sys/fs/cgroup/cpu.max` and sets `OMP_NUM_THREADS` from it before Python imports
torch, which is the only moment torch reads it.

**Models are already in the image.** The layout, OCR, table and formula models are
baked in at build time and `MINERU_MODEL_SOURCE=local` is pinned, so the container
needs no network to parse, the first request is as fast as the thousandth, and a
redeploy never re-downloads 1.5 GB.

**The API is not open to the internet.** `mineru-api` ships no authentication of
any kind. This template generates a `MINERU_API_KEY` and requires it on every
parsing route, leaving `/health` and `/docs` public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mineru | `ghcr.io/bon5co/mineru-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MINERU_API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mineru-v344-or-pdf-to-markdown-api-for-r)
