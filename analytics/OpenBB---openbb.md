# Deploy OpenBB on Railway

OpenBB — investment research platform API with market data providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbb)

## About

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/openbb)

![OpenBB Platform API](https://raw.githubusercontent.com/INAPP-Mobile/openbb/main/template-icon.svg)

**OpenBB** is an open-source, data-agnostic investment research platform. This template deploys **OpenBB Platform API** — the HTTP server that exposes the entire OpenBB data platform as a REST API — so you get a self-hosted endpoint for market data (equities, crypto, FX, commodities, fixed income, economy, news) from 70+ data providers, queryable over HTTP and streamable to LLM agents via MCP.

> **License note:** OpenBB is **AGPL-3.0**. This template runs the *installed packages* from [PyPI](https://pypi.org/project/openbb/) and their own `openbb-api` launcher — not a copy of the OpenBB source repo. If you modify and distribute, AGPLv3 obligations apply. For private, internal, or self-hosted use on your own Railway project, the AGPL network clause is typically fine, but consult your own counsel for commercial redistribution. [More: OpenBB license](https://github.com/OpenBB-finance/OpenBB/blob/main/LICENSE).

The template deploys a **single service** — the OpenBB Platform REST API — built from one Dockerfile:

- **openbb** — `python:3.10-slim-bookworm` + `openbb[all]` (core + ~70 data providers + charting + MCP server) + `openbb-platform-api`, run by the `openbb-api` launcher (non-root, `HEALTHCHECK` on `/openapi.json`, `EXPOSE 6900`), `PORT=6900`.

No database, no volume. The API is stateless; provider credentials are sourced from environment variables at boot. Everything is provisioned by Railway — compute, TLS at the edge, and a public URL. You get one public base URL that serves the full REST API, Swagger UI, and OpenAPI spec.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openbb | [INAPP-Mobile/openbb](https://github.com/INAPP-Mobile/openbb) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone (IANA name). |
| `PORT` | 6900 | Port the container listens on (mapped to OPENBB_API_PORT by the entrypoint). |
| `FMP_API_KEY` | (secret) | Financial Modeling Prep (FMP) key — premium equity/ETF/FX. Paste your key to enable FMP calls; leave empty to use keyless providers (yfinance) and add it later from the Variables tab. Get one: https://site.financialmodelingprep.com/developer/docs. |
| `FRED_API_KEY` | (secret) | FRED (St. Louis Fed, free) key — macro/economic series (CPI, GDP series, rate curves). Paste your key to enable FRED calls; leave empty and add it later. Free tier: https://fred.stlouisfed.org/docs/api/api_key.html. |
| `OPENBB_API_AUTH` | false | Enable HTTP Basic auth on the endpoints (true/false). false = open access on a private project. |
| `INTRINIO_API_KEY` | (secret) | Intrinio key — fundamentals & market data. Paste your key to enable Intrinio calls; leave empty and add it later from the Variables tab. |
| `OPENBB_API_PASSWORD` | (secret) | Basic-auth password (only used when OPENBB_API_AUTH=true). Auto-generated on deploy; change it from the Variables tab. |
| `OPENBB_API_USERNAME` | (secret) | Basic-auth username (only used when OPENBB_API_AUTH=true). Auto-filled so you can deploy one-click and change it later. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openbb)
