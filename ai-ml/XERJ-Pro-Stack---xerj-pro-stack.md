# Deploy XERJ Pro Stack on Railway

XERJ Pro Stack: private search UI, MCP, API key and persistent indexes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xerj-pro-stack)

## About

XERJ is an open-source search engine written in Rust for full-text retrieval, document search and agent memory. This Railway Pro Stack adds a private web console, generated API credentials and persistent storage to the official XERJ engine. Start importing and searching JSON documents without an LLM API key or GPU.

One Railway service runs the pinned official **XERJ 1.0.0-rc.96** binary and a small authenticated ingress. The browser interface helps you import JSON documents, test a search and copy connection settings. Native REST routes under `/v1` and the Elasticsearch-compatible HTTP API share the same HTTPS domain. The engine listeners stay on loopback; only the protected ingress is exposed.

This is an independent deployment template, not an official XERJ service. The pinned version is a release candidate. Test your application's API usage before relying on Elasticsearch compatibility; this template does not claim complete Elasticsearch feature parity.

### What this Pro Stack adds

| Feature | Included behavior |
| --- | --- |
| Private browser console | Password login, secure HTTP-only sessions, import and search tools |
| Ready-to-use API access | A different generated `XERJ_API_KEY` for every installation |
| Persistent search data | Indexes, write-ahead log and configuration on a Railway volume |
| Agent connection examples | Copyable curl and MCP client configuration |
| Durable writes | Synchronous write-ahead logging and graceful process shutdown |
| Real health checks | `/healthz` checks the actual XERJ engine |
| Reproducible release | Fixed official binary version with SHA-256 verification |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| XERJ | [XavTo/XERJ-Railway](https://github.com/XavTo/XERJ-Railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `APP_PASSWORD` | (secret) |
| `XERJ_API_KEY` | (secret) |
| `SESSION_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/xerj-pro-stack)
