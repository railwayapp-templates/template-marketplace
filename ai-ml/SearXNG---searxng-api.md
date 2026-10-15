# Deploy SearXNG on Railway

Private SearXNG metasearch with a JSON API for agents and backends.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-api)

## About

SearXNG is an open-source metasearch engine. It sends each query to many search
engines and returns the combined results. This template runs a private SearXNG
instance with a JSON search API, tuned for LLM agents and backend services that
need web, developer, package, and academic search.

The template runs one SearXNG service from a tested image for amd64 and arm64.
It has no public domain: SearXNG has no authentication, and this configuration
turns off its rate limiter, so other services in the project call it over
Railway's private network at `http://searxng.railway.internal:8080`. Engine
requests time out after 8 seconds with one retry, so a slow engine can't stall
a search. Railway checks `/healthz` before switching traffic to a new
deployment, and patch releases of the image install automatically during the
nightly update window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `ghcr.io/joeychilson/railway-searxng:1.1` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SEARXNG_SECRET` | (secret) | Server secret SearXNG signs sessions and image proxy URLs with. Generated for you. |

## Configuration

- **Healthcheck:** `/healthz`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/searxng-api)
