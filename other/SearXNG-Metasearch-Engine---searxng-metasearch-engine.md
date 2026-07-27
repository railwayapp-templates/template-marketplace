# Deploy SearXNG Metasearch Engine on Railway

Privacy-respecting metasearch engine with no tracking or profiling.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-metasearch-engine)

## About

SearXNG is an open-source metasearch engine. It forwards your query to dozens of upstream search engines, merges and re-ranks the results, and returns them without logging the query, tracking the user, or building a profile.

Hosting SearXNG means running a Python web application that must keep its generated settings and secret key across restarts, reach the public internet to query upstream engines, and serve HTTP behind TLS. This template handles that: the official SearXNG image, a persistent volume for the settings directory, a public domain with managed TLS, and health checks on `/healthz`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| searxng | `searxng/searxng:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SEARXNG_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/searxng`

**Category:** Other

[View on Railway →](https://railway.com/deploy/searxng-metasearch-engine)
