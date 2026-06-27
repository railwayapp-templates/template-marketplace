# Deploy HTML to markdown converter on Railway

Converts HTML to Markdown via REST API. Deploy on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/html-to-markdown-converter)

## About

Click the Deploy button or clone the repo and deploy manually:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new?template=https://github.com/INAPP-Mobile/html-markdown-converter)

This service runs on Railway using a multi-stage Docker build (Node 22-alpine, non-root user). It starts an Express HTTP server on the port defined by the `PORT` environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| html-markdown-converter | [INAPP-Mobile/html-markdown-converter](https://github.com/INAPP-Mobile/html-markdown-converter) | Worker |

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/html-to-markdown-converter)
