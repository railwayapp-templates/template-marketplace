# Deploy AIHOT engine (AI news hot-topics site) on Railway

AI news hot-topics site: LLM-scored sources and a daily digest

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aihot-engine-ai-news-hot-topics-site)

## About

AIHOT engine is an open-source website that collects items from news sources every day, lets a language model screen and score them, clusters reports into events, ranks them by "heat" and writes a daily digest. This template runs it on Railway with the upstream code pinned to a commit we tested, an admin password generated for you and the app's files on a volume.

The template builds one container that runs the web site, the API and the worker together (they share the /data volume, and Railway volumes attach to one service), plus a Railway PostgreSQL database. If any of the three processes stops, the container stops and Railway restarts it. Please read before deploying: the interface and everything the site writes are in Chinese (upstream design), and you need an API key for any OpenAI-compatible model provider - model calls are billed by your provider, and the admin has budget limits. It ships with 18 public AI news sources as a demo; replace them with your own field's sources in the admin. Per the author's request, give your site your own name and logo (the default name is MyHOT). Tested on a fresh throw-away VM and with a real Railway deploy: build, start, site online, admin login required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aihot | [localhavenstore/railway-aihot](https://github.com/localhavenstore/railway-aihot) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | aihot | 3000 | Port the web site listens on (3000); Railway routes your domain to it. Keep it. |
| `LLM_MODEL` | aihot | deepseek-flash | Model name at your provider, e.g. deepseek-flash (default). |
| `LLM_API_KEY` | aihot | (secret) | REQUIRED: your API key for an OpenAI-compatible model provider. Model calls are billed by that provider. |
| `DATABASE_URL` | aihot | - | Generated (32 characters): your login for /admin. Copy it from this page. |
| `LLM_BASE_URL` | aihot | https://api.deepseek.com/v1 | API address of your model provider, e.g. https://api.deepseek.com/v1 (default). |
| `ADMIN_PASSWORD` | aihot | (secret) | Generated secret that signs admin sessions. Keep it; changing it logs you out. |
| `SESSION_SECRET` | aihot | (secret) | Generated secret that signs image-proxy links. Keep it. |
| `IMG_PROXY_SIGN_SECRET` | aihot | (secret) | 210: on a redeploy the worker may finish a paid model call before it stops. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/aihot-engine-ai-news-hot-topics-site)
