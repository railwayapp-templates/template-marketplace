# Deploy blocky on Railway

Fast and lightweight DNS proxy as ad-blocker for your local network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/blocky)

## About

Deploy Blocky on Railway in one click. This template provisions a single container running Blocky v0.32.1 with a pre-configured ad-blocking setup — no database, no external services, zero additional dependencies.

This template runs Blocky inside a single Railway container with:

- **DNS Proxy** — Listens on port 53 (UDP/TCP) for DNS queries from your network
- **Ad-Blocking** — Uses Steven Black's unified hosts file to block ads, trackers, and malware domains
- **REST API** — Management API on port 4000 for querying stats and configuration
- **Prometheus Metrics** — `/metrics` endpoint on port 4000 for monitoring with Grafana
- **DNS-over-HTTPS (DoH)** — Encrypted DNS queries on the HTTP listener
- **Caching** — Built-in DNS response cache with prefetching for fast resolution
- **Rate Limiting** — Per-client rate limiting to prevent abuse (configurable)

No database, no external dependencies — Blocky is a single ~20 MB Go binary.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blocky | [INAPP-Mobile/railway-blocky](https://github.com/INAPP-Mobile/railway-blocky) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/blocky)
