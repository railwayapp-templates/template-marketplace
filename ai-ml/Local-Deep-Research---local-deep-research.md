# Deploy Local Deep Research on Railway

AI deep-research assistant with citations and private SearXNG, behind auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/local-deep-research)

## About

Local Deep Research (LDR) is an open-source AI research assistant: give it a question and it runs multi-step web
research across many sources and writes a report with citations, using the LLM of your choice and a private
search engine. This is a community-maintained template; it is not affiliated with the Local Deep Research or
SearXNG projects.

LDR is a multi-user application that encrypts each user's data with their own password, and it needs a search
engine (SearXNG) alongside it, with SearXNG's JSON API enabled. Out of the box LDR's user registration is open
and, behind a TLS-terminating proxy, it needs the right forwarded headers or its real-time features break.

This template runs the whole thing on Railway as three services behind one password: LDR itself, a private
SearXNG with the JSON API turned on, and a Caddy front-door that adds HTTP basic authentication so the instance
is private by default and forwards the browser's HTTPS scheme so LDR's WebSocket progress streaming works. Bring
your own LLM key (OpenAI, Anthropic, OpenRouter, or any OpenAI-compatible endpoint), configured inside LDR after
you sign in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ldr | `localdeepresearch/local-deep-research:1.10.7` | Database |
| searxng | `ghcr.io/youssefsiam38/ldr-railway-searxng:1.0.0` | Worker |
| caddy | `ghcr.io/youssefsiam38/ldr-railway-caddy:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LDR_DATA_DIR` | ldr | /data | - |
| `LDR_WEB_HOST` | ldr | 0.0.0.0 | - |
| `LDR_WEB_PORT` | ldr | 5000 | - |
| `LDR_LLM_MODEL` | ldr | - | Optionally lock the model name. |
| `LDR_LLM_PROVIDER` | ldr | - | Optionally lock the LLM provider from the environment instead of the UI (e.g. openai_endpoint). |
| `TRUST_PROXY_HEADERS` | ldr | true | LDR is reached only through the front door, so it trusts the forwarded HTTPS scheme. |
| `LDR_LLM_OPENAI_API_KEY` | ldr | (secret) | Optionally lock an OpenAI API key from the environment. |
| `LDR_LLM_ANTHROPIC_API_KEY` | ldr | (secret) | Optionally lock an Anthropic API key from the environment. |
| `LDR_APP_ALLOW_REGISTRATIONS` | ldr | - | Set false after creating your account(s) to close LDR sign-up even behind the front door. |
| `LDR_LLM_OPENAI_ENDPOINT_URL` | ldr | - | OpenAI-compatible endpoint URL, if locking an openai_endpoint provider. |
| `LDR_LLM_OPENAI_ENDPOINT_API_KEY` | ldr | (secret) | API key for the OpenAI-compatible endpoint. |
| `LDR_SEARCH_ENGINE_WEB_SEARXNG_DEFAULT_PARAMS_INSTANCE_URL` | ldr | - | The private SearXNG instance LDR searches with. |
| `SEARXNG_PORT` | searxng | 8080 | - |
| `SEARXNG_SECRET` | searxng | (secret) | SearXNG instance secret, generated. |
| `SEARXNG_BIND_ADDRESS` | searxng | 0.0.0.0 | Bind address inside the container. |
| `PORT` | caddy | 8080 | - |
| `LDR_UPSTREAM` | caddy | - | Internal host:port of the LDR service; the front door proxies to it. |
| `OWNER_PASSWORD` | caddy | (secret) | The front-door password (HTTP basic auth), generated. Copy it from here; username is 'owner'. |
| `OWNER_USERNAME` | caddy | (secret) | The front-door username you sign in with. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/local-deep-research)
