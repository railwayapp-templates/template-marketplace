# Deploy S3-ObjectDeck on Railway

This is a client compatible with different S3-compatible providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/s3-objectdeck)

## About

S3-ObjectDeck is a Go application that serves both the API and the compiled React frontend from a single binary. It requires no database, no cache, and no additional services — just a container with port `8080` exposed.

The final Docker image weighs approximately **25 MB** (Alpine + Go binary + compiled Vite assets). Cold start time is under 100 ms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ObjectDeck-web | [fluxem-sas/ObjectDeck-web](https://github.com/fluxem-sas/ObjectDeck-web) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** TypeScript, Go, Makefile, CSS, Dockerfile, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/s3-objectdeck)
