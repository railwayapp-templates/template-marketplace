# Deploy SearXNG on Railway

Private SearXNG behind a password, with engines that answer from Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-4)

## About

[SearXNG](https://github.com/searxng/searxng) is a metasearch engine: it sends your query to Google, Bing, Yahoo and others and shows the results without ads, tracking or a profile of you. It also has a JSON API, which many AI tools use for web search.

This template runs SearXNG on Railway's private network with a password prompt in front of it.

An open SearXNG on a public URL gets found and used as a free search proxy by bots, which costs you bandwidth and gets your instance blocked by the search engines. Here a small Caddy service asks for `SEARXNG_USERNAME` and `SEARXNG_PASSWORD` (generated) before anything reaches SearXNG. Only `/healthz` is open, for Railway's healthcheck.

Search engines treat Railway's datacenter IPs differently, and SearXNG's defaults don't hold up there. I tested each engine from a deployment: DuckDuckGo answered with a CAPTCHA, and Brave, Startpage, Qwant and Mojeek returned nothing. Google and Bing work, but they're not in SearXNG's default selection, so my first build only searched Yahoo and returned 7 results a query. With Google, Bing and Yahoo turned on it returned 16 to 25 results for the same queries. The settings keep those three, their news engines, Wikipedia and a few developer sources (GitHub, Stack Overflow, PyPI, npm, MDN, arXiv).

The JSON API is on (`format=json`), so you can point Open WebUI, Perplexica/Vane, n8n or your own scripts at it with the same username and password.

Before publishing I tested it on Railway. `/healthz` answered without a password, the search page without a password or with a wrong one got 401, and with the password the page loaded and JSON searches returned results from Google, Bing and Yahoo with no failing engines. After restarting both services the same checks passed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /searxng-web) | Web service |
| Engine | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /searxng) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SearXNG | 8080 | Port Railway routes to |
| `SEARXNG_URL` | SearXNG | - | Open this and sign in with SEARXNG_USERNAME and SEARXNG_PASSWORD |
| `SEARXNG_PASSWORD` | SearXNG | (secret) | Password for the password prompt (generated) |
| `SEARXNG_UPSTREAM` | SearXNG | - | SearXNG over the private network |
| `SEARXNG_USERNAME` | SearXNG | (secret) | Username for the password prompt |
| `SEARXNG_SECRET` | Engine | (secret) | SearXNG's secret key (generated) |
| `SEARXNG_BASE_URL` | Engine | - | Public address, used in result links and the OpenSearch entry |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** searxng, search, metasearch, privacy, self-hosted, ai-tools · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-4)
