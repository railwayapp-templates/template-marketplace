# Deploy Browserless Headless Chrome on Railway

Headless Chromium API with token auth on and bounded concurrency

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/browserless-headless-chrome)

## About

Browserless runs headless Chromium as a service: connect Puppeteer or Playwright over WebSocket, or call plain REST endpoints to render a screenshot, produce a PDF, scrape content, or run arbitrary browser automation. This template deploys Browserless v2.55 with token authentication enabled and concurrency limits set.

Running headless Chrome yourself is unpleasant: the system dependency list is long, zombie browser processes accumulate, and one runaway page can consume every core on the box. Browserless wraps Chromium in a supervised HTTP and WebSocket API that kills sessions on timeout and queues work beyond a set concurrency, which is what makes it deployable rather than merely runnable.

Concurrency is the setting that matters most on shared infrastructure, and it is the one most deployments leave at default. This template sets `CONCURRENT` to 3 with a queue depth of 10 and a 60-second session timeout, so a burst of requests queues instead of spawning unbounded Chromium processes until the instance is killed. Raise `CONCURRENT` as you scale the service up; each concurrent session wants roughly 300–500MB.

Authentication is on. Browserless will run without a token, and an unauthenticated instance is a serious liability — anyone who finds the URL gets a general-purpose browser running inside your infrastructure, able to reach your private services and fetch arbitrary URLs from your IP. This template generates a 48-character `TOKEN` at deploy, and `ALLOW_FILE_PROTOCOL` is left off so sessions cannot read local files via `file://`.

No volume is attached, by design: browser sessions are ephemeral and nothing here is worth persisting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| browserless | `ghcr.io/browserless/chromium:v2.55.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TOKEN` | (secret) |
| `TOKEN_ENABLED` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/browserless-headless-chrome)
