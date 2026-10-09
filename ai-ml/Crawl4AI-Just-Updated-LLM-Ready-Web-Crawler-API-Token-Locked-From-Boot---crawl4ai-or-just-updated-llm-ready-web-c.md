# Deploy Crawl4AI | (Just Updated) LLM-Ready Web Crawler API, Token-Locked From Boot on Railway

Crawl4AI. Token-locked from boot, pinned image, health-checked, no fields

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawl4ai-or-just-updated-llm-ready-web-c)

## About

Crawl4AI is an open-source web crawler built for LLM pipelines. It drives a headless Chromium browser,
renders JavaScript-heavy pages, and returns clean Markdown, structured extraction results and
metadata that RAG systems and AI agents can use directly. Send a URL to the REST API, get
LLM-ready content back.

This template runs the official Crawl4AI image as one service, pinned by digest, with a public Railway
domain, a generated API token and a working healthcheck.

- **The API is token-protected from the first request.** A 64-character `CRAWL4AI_API_TOKEN` is
  generated for your deploy and the container refuses to start without it. Calls without
  `Authorization: Bearer ` get 401, including the interactive `/docs`. `/health` stays open so
  Railway can check the service.
- **Nothing to fill in.** There are no required fields on the deploy form. The token and the
  `SECRET_KEY` used for JWT signing are both generated per deploy. LLM provider keys are optional and
  only needed if you use LLM-based extraction strategies; add them as variables after deploy.
- **Pinned and health-checked.** The image is pinned to a digest instead of a floating `latest`, so a
  redeploy cannot change the crawler under you, and the deploy is only marked healthy once `/health`
  answers.
- **Listens on Railway's port.** The start command binds Crawl4AI to the injected `PORT`, so the
  public domain and the healthcheck reach the same listener.
- **Memory.** Chromium is memory-hungry. Several concurrent crawls of heavy pages need room, so size
  the service accordingly. Railway's shared memory for the container is small; the image's default
  browser settings handled the pages we tested, but very large pages and screenshots use more.
- **Long requests.** Railway's edge closes requests after about five minutes. Crawl large sites in
  batches or use the async job endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crawl4ai | `unclecode/crawl4ai:0.9.4@sha256:9021b3cb5c6f12570bbcd5395638495e0a06969b3148e377b953d174af2ebc9b` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |
| `CRAWL4AI_API_TOKEN` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export CRAWL4AI_PORT="${PORT:-8080}"; echo "[railway] crawl4ai port=$CRAWL4AI_PORT uid=$(id -u) token=$([ -n "$CRAWL4AI_API_TOKEN" ] && echo set || echo MISSING) shm=$(df -m /dev/shm | tail -1 | tr -s " " | cut -d" " -f2)MB"; [ -n "$CRAWL4AI_API_TOKEN" ] || { echo "[railway] refusing to start without CRAWL4AI_API_TOKEN"; exit 1; }; exec bash entrypoint.sh'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/crawl4ai-or-just-updated-llm-ready-web-c)
