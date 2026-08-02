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
| Auth Gate | [Lukem121/openseo](https://github.com/Lukem121/openseo) (root: auth-gateway) | Web service |
| OpenSEO | `ghcr.io/every-app/open-seo:v0.1.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `UPSTREAM_URL` | Auth Gate | - | The OpenSEO upstream URL. |
| `SITE_PASSWORD` | Auth Gate | (secret) | Your unlock password |
| `PORT` | OpenSEO | 8080 | The OpenSEO port number |
| `AUTH_MODE` | OpenSEO | local_noauth | Keep local_noauth for Docker self-host. WARNING: the public URL has no app login — gate it yourself. |
| `ALLOWED_HOST` | OpenSEO | - | The auth gateway host URL |
| `GOOGLE_CLIENT_ID` | OpenSEO | - | Your Google client ID. Read: https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md |
| `BETTER_AUTH_SECRET` | OpenSEO | (secret) | Random string to encrypt stored tokens |
| `DATAFORSEO_API_KEY` | OpenSEO | (secret) | Base64 of your DataForSEO email:password. See https://app.dataforseo.com/?aff=310140 and https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md |
| `OPENROUTER_API_KEY` | OpenSEO | (secret) | OpenSEO's in-app AI agent, needs an OpenRouter API key. https://openrouter.ai/settings/keys |
| `VITE_SHOW_DEVTOOLS` | OpenSEO | false | Keep false in production. |
| `GOOGLE_CLIENT_SECRET` | OpenSEO | (secret) | Your Google client secret. Read: https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | OpenSEO | true | Leave true so process env is exposed as Worker bindings in Docker/Miniflare mode. |

## Configuration

- **Healthcheck:** `/__gate/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.wrangler`

**Category:** Other · **Languages:** JavaScript, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/openseo)
