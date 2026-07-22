# Deploy OpenSEO on Railway

Deploy OpenSEO with a persistent volume on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openseo)

## About

OpenSEO is an open-source SEO toolkit you self-host with your own DataForSEO API key. This community template deploys the official Docker image on Railway.

Runs `ghcr.io/every-app/open-seo` with a volume at `/app/.wrangler` (D1/KV/R2 state — no Postgres/Redis). First boot can take several minutes and needs ~4GB+ RAM. Set `DATAFORSEO_API_KEY` to Base64 of `email:password`. Domain target port must match Railway `PORT` (often `8080`).

**Security:** Docker mode uses `AUTH_MODE=local_noauth`. Anyone with the public URL has admin access — keep it private or put your own auth in front.

**Updates:** After deploy, enable Image Auto Updates (minor + patch) under Settings → Source. Prefer release tags over `:latest`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenSEO | `ghcr.io/every-app/open-seo:v0.1.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_MODE` | local_noauth | Keep local_noauth for Docker self-host. WARNING: the public URL has no app login — gate it yourself. |
| `DATAFORSEO_API_KEY` | (secret) | Base64 of your DataForSEO email:password. See https://app.dataforseo.com/?aff=310140 and https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md |
| `OPENROUTER_API_KEY` | (secret) | OpenSEO's in-app AI agent, needs an OpenRouter API key. https://openrouter.ai/settings/keys |
| `VITE_SHOW_DEVTOOLS` | false | Keep false in production. |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | true | Leave true so process env is exposed as Worker bindings in Docker/Miniflare mode. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.wrangler`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openseo)
