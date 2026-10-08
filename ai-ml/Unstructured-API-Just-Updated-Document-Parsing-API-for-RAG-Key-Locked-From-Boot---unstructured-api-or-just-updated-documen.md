# Deploy Unstructured API | (Just Updated) Document Parsing API for RAG, Key-Locked From Boot on Railway

Unstructured API. Key-locked from boot, no fields to fill, public URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/unstructured-api-or-just-updated-documen)

## About

Unstructured API is a REST service that turns PDFs, Word and PowerPoint files, HTML, emails and
images into clean, typed elements (titles, narrative text, tables, list items) with metadata. It is
the document-partitioning step in front of RAG, search and LLM pipelines: send a file, get JSON
back.

This template runs the official Unstructured API image as one service, pinned by digest, with a
public Railway domain and an API key generated for every deploy.

- **The API is key-protected from the first request.** Upstream only enables authentication when
  `UNSTRUCTURED_API_KEY` is set; without it the endpoint is open to anyone who finds the URL. Here
  the key is generated for your deploy and the container refuses to start without it. Calls without
  the `unstructured-api-key` header get 401. `/healthcheck` stays open so Railway can check the
  service.
- **Nothing to fill in.** There are no required fields on the deploy form and no volume: the API
  keeps nothing between requests.
- **Thread count matches your plan.** The start command reads the container's CPU limit and caps
  the OpenMP, MKL and OpenBLAS thread pools to it, so layout and OCR work does not oversubscribe the
  shared host.
- **Size and memory.** The image is large (about 10 GB compressed), so the first deploy spends
  several minutes pulling it. The `hi_res` strategy loads layout models and uses much more memory
  than `fast`, so give the service room if you parse scanned or layout-heavy PDFs.
- **Long requests.** Railway's edge closes requests after about five minutes. Keep individual files
  small enough to finish inside that, or split large PDFs before sending.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| unstructured-api | `quay.io/unstructured-io/unstructured-api:0.1.11@sha256:b1f0eb6be87dbb15edff568a99f6dd2e57072240faff04729e8d91d283f5b86b` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `UNSTRUCTURED_API_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null); p=$(cut -d" " -f2 /sys/fs/cgroup/cpu.max 2>/dev/null); if [ -n "$q" ] && [ "$q" != max ]; then n=$(( (q + p - 1) / p )); else n=$(nproc); fi; export OMP_NUM_THREADS=$n MKL_NUM_THREADS=$n OPENBLAS_NUM_THREADS=$n; echo "[railway] unstructured threads=$n uid=$(id -u) port=$PORT key=$([ -n "$UNSTRUCTURED_API_KEY" ] && echo set || echo MISSING)"; [ -n "$UNSTRUCTURED_API_KEY" ] || { echo "[railway] refusing to start without UNSTRUCTURED_API_KEY"; exit 1; }; exec scripts/app-start.sh'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/unstructured-api-or-just-updated-documen)
