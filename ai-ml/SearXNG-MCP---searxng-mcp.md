# Deploy SearXNG MCP on Railway

Web search for AI agents over MCP, with a private SearXNG and no API key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/searxng-mcp)

## About

[mcp-searxng](https://github.com/ihor-sokoliuk/mcp-searxng) is an MCP server that gives AI assistants and agents web search and page reading through [SearXNG](https://github.com/searxng/searxng), a self-hosted metasearch engine. There is no search API key and no per-query bill.

This template runs both: mcp-searxng 2.4.0 on a public HTTPS address behind a bearer token, and SearXNG on Railway's private network only.

SearXNG has no public domain here. Only the MCP service can reach it, so your instance can't be found and used as a free search proxy by strangers. A small settings file turns on SearXNG's JSON API, which MCP servers need, and turns off the public-instance features.

The MCP server runs upstream's hardened HTTP mode. Every request needs the token in `MCP_HTTP_AUTH_TOKEN` (generated at deploy), and the host and origin allowlists are set to your Railway domain. The page reader (`web_url_read`) refuses private addresses. Without that, anyone with the token could use it to look at other services in your Railway project.

Search engines treat Railway's datacenter IPs differently, so I tested them from a deployment. Google, Bing and Yahoo returned results. DuckDuckGo answered with a CAPTCHA, and Brave, Startpage, Qwant, Mojeek, Presearch and Ecosia returned nothing. SearXNG here keeps only the engines that answered, plus Wikipedia, their news engines and a few developer sources (GitHub, Stack Overflow, PyPI, npm, MDN, arXiv). Otherwise every search would wait for engines that time out.

Before publishing I tested the final version on a fresh deploy as an MCP client. A request without the token got 401. With the token, the server listed its four tools, searches returned results, `web_url_read` read a public page, and reading the SearXNG service's private address was refused by the security policy. After restarting both services everything still worked.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SearXNG MCP | `isokoliuk/mcp-searxng:2.4.0` | Web service |
| SearXNG | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /searxng) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SearXNG MCP | 3000 | Port Railway routes to |
| `MCP_URL` | SearXNG MCP | - | Add this URL to your MCP client |
| `SEARXNG_URL` | SearXNG MCP | - | SearXNG over the private network |
| `MCP_HTTP_HOST` | SearXNG MCP | :: | Listen on all interfaces |
| `MCP_HTTP_PORT` | SearXNG MCP | 3000 | HTTP transport port |
| `MCP_HTTP_HARDEN` | SearXNG MCP | true | Hardened mode: token required, host allowlist, private URLs blocked for web_url_read |
| `MCP_HTTP_AUTH_TOKEN` | SearXNG MCP | (secret) | Send it as `Authorization: Bearer <token>` (generated) |
| `SEARXNG_MAX_RESULTS` | SearXNG MCP | 10 | Results per search (1-20) |
| `MCP_HTTP_TRUST_PROXY` | SearXNG MCP | 1 | Trust Railway's proxy hop for client IPs (rate limits are per client) |
| `MCP_HTTP_ALLOWED_HOSTS` | SearXNG MCP | - | Host allowlist. Add your custom domain here, comma-separated |
| `MCP_HTTP_ALLOWED_ORIGINS` | SearXNG MCP | - | Browser origins allowed to call the server (hardened mode requires one). Clients like Claude Code send no Origin |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | SearXNG MCP | true | Lets the Alpine-based image resolve Railway private domains |
| `SEARXNG_SECRET` | SearXNG | (secret) | SearXNG's secret key (generated) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`

**Category:** AI/ML · **Tags:** searxng, mcp, web-search, ai-agents, search, privacy · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/searxng-mcp)
