# Deploy Web UI - kie.ai on Railway

Deploy and Host KIE AI Image Generator with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/web-ui-kie-ai)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_38Wb7)

A self-hosted AI image generation web app powered by the [KIE.ai](https://kie.ai) API, with Cloudflare R2 storage and a responsive gallery. Generate images from text prompts, track progress in real time, and browse everything you've created in one place.

The app runs as a single Dockerized Next.js service. SQLite (via Drizzle ORM) handles task/image metadata inside the container, while generated images are uploaded to a Cloudflare R2 bucket you provide. Railway builds the Docker image, provisions the public HTTPS domain, and keeps the service running — you just supply your KIE.ai and R2 credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | [zahidakhyar/web-ui-kie-ai](https://github.com/zahidakhyar/web-ui-kie-ai) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_SECRET` | (secret) | Required if ADMIN_PASSWORD is set — secret used to sign the session cookie |
| `KIE_API_KEY` | (secret) | Your KIE.ai API key |
| `DATABASE_PATH` | /data/app.db | SQLite DB path (default: ./data/app.db) |
| `R2_ACCOUNT_ID` | - | Cloudflare account ID |
| `ADMIN_PASSWORD` | (secret) | Password gate for the app (leave unset to disable auth) |
| `R2_BUCKET_NAME` | - | R2 bucket name |
| `R2_ACCESS_KEY_ID` | - | R2 access key |
| `NEXT_PUBLIC_APP_URL` | - | Public URL of this app (for callbacks) |
| `R2_SECRET_ACCESS_KEY` | (secret) | R2 secret key |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/web-ui-kie-ai)
