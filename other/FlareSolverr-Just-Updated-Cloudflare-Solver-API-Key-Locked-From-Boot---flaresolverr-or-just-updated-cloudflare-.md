# Deploy FlareSolverr | (Just Updated) Cloudflare Solver API, Key-Locked From Boot on Railway

FlareSolverr Cloudflare solver API. Key required from boot, public URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flaresolverr-or-just-updated-cloudflare-)

## About

FlareSolverr is a proxy server that drives a real Chromium browser to get past Cloudflare and
similar browser challenges, then hands back the page, cookies and user agent over a small JSON
API. Scrapers, Prowlarr, Sonarr, Radarr and AI agents call it when a plain HTTP request is blocked.

This template runs FlareSolverr 3.5.2 as one service from a wrapper image built on the official
one, with a public Railway domain and an API key generated for every deploy.

- **The API is locked from the first request.** A stock FlareSolverr container has no
  authentication: an anonymous `POST /v1` returned 200 and a rendered page, so anyone who finds the
  URL can make your container browse any site they name. Here the upstream server listens on
  loopback only, and a small proxy on Railway's `PORT` answers 401 unless the request carries the
  key.
- **Three ways to send the key.** `Authorization: Bearer `, an `X-API-Key` header, or the
  key as the first path segment (`https:////v1`) for tools such as Prowlarr that
  only accept a base URL.
- **It has a public URL and an open health check.** `GET /health` returns FlareSolverr's own
  readiness reply without a key, so Railway can check the service.
- **Nothing to configure.** No volume is needed: sessions live in memory and a redeploy starts
  clean. Chromium needs memory, so give the service at least 1 GB.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flaresolverr | `ghcr.io/bon5co/flaresolverr-railway:3.5.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/flaresolverr-or-just-updated-cloudflare-)
