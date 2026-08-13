# Deploy SearXNG API on Railway

A pre-configured SearXNG optimized for private and LLM tool use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-api)

## About

A private SearXNG instance configured for backends, scripts, and LLM agents that need a plain GET JSON search API.

This template intentionally creates **no public domain**. SearXNG has no authentication and this configuration disables its rate limiter, so other services in the same Railway project should call it over Railway's private network:

```text
http://searxng.railway.internal:8080
```

Traffic stays inside the project and does not require public networking. The image provides an exact curated engine set, bounded upstream request timeouts, and a `/healthz` deployment check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `ghcr.io/joeychilson/railway-searxng:1.1` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SEARXNG_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/searxng-api)
