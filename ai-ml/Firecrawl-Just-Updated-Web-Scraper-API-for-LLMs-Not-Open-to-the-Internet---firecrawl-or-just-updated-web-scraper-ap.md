# Deploy Firecrawl | (Just Updated) Web Scraper API for LLMs, Not Open to the Internet on Railway

API-key-gated web scraper API for LLMs. Queue, cache and renderer wired.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firecrawl-or-just-updated-web-scraper-ap)

## About

Firecrawl turns any website into clean, LLM-ready Markdown or structured JSON. It scrapes single
pages, crawls whole sites, maps URLs, and renders JavaScript through a headless browser, all behind
one HTTP API with official Python and Node SDKs.

This template runs the self-hosted edition with an API key required on every route, its job queue
and cache on persistent volumes, and every image pinned.

Self-hosted Firecrawl is not a single container. The API process supervises a worker pool, an
extract worker and several queue workers, and it needs three backing services: a Postgres built
with the `nuq` job schema, RabbitMQ for the job exchange, and Redis for caching and rate limits.
When those are not supplied, Firecrawl's harness tries to start them itself with Docker and exits
with `Neither Docker nor Podman found` — which is what happens inside any container platform.

This template wires all five services together over Railway's private network, keeps the queue
database, the RabbitMQ store and the Redis append-only file on volumes, and puts an nginx gateway
in front of the API so the public URL requires this deployment's own `FIRECRAWL_API_KEY`. The
renderer, the queue and the databases have no public address at all.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| firecrawl | `ghcr.io/bon5co/firecrawl-railway:2.11.209` | Web service |
| playwright | `ghcr.io/bon5co/firecrawl-railway-playwright:2026.08.22` | Worker |
| nuq-postgres | `ghcr.io/firecrawl/nuq-postgres@sha256:aed86f62858f29bd971abddcdeb301c12888098d2cf5d33c1ba42b053bc460f6` | Database |
| rabbitmq | `ghcr.io/bon5co/firecrawl-railway-rabbitmq:4.1.4` | Database |
| redis | `redis:8.2.1-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `FIRECRAWL_API_KEY` | firecrawl | (secret) |
| `POSTGRES_PASSWORD` | nuq-postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/var/lib/rabbitmq`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/firecrawl-or-just-updated-web-scraper-ap)
