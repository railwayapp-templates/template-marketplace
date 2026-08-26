# Deploy crw on Railway

Fast Rust web scraping, crawling, and Firecrawl-compatible API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crw)

## About

CRW is a fast, lightweight web scraping and crawling API written in Rust. It extracts clean Markdown and structured content, maps sites, runs asynchronous crawls, and exposes native and Firecrawl-compatible endpoints. This Railway template provides a secured, single-service deployment with low memory use, automatic HTTPS, and a capable built-in rendering fallback.

Railway runs the official pinned CRW container behind an automatically managed HTTPS domain. The stateless API starts from the upstream image command, while Railway supplies routing, restart handling, and a generated bearer API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/us/crw:0.30.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `CRW_SERVER__PORT` | 3000 |
| `CRW_AUTH__API_KEYS` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/crw)
