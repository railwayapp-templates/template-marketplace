# Deploy web-ui-kie-ai on Railway

Deploy and Host KIE AI Image Generator with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/web-ui-kie-ai)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_38Wb7)

A self-hosted AI image generation web app powered by the [KIE.ai](https://kie.ai) API, with Cloudflare R2 storage and a responsive gallery. Generate images from text prompts, track progress in real time, and browse everything you've created in one place.

The app runs as a single Dockerized Next.js service. SQLite (via Drizzle ORM) handles task/image metadata inside the container, while generated images are uploaded to a Cloudflare R2 bucket you provide. Railway builds the Docker image, provisions the public HTTPS domain, and keeps the service running — you just supply your KIE.ai and R2 credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web-ui-kie-ai | [zahidakhyar/web-ui-kie-ai](https://github.com/zahidakhyar/web-ui-kie-ai) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_SECRET` | (secret) |
| `KIE_API_KEY` | (secret) |
| `ADMIN_PASSWORD` | (secret) |
| `R2_SECRET_ACCESS_KEY` | (secret) |

**Category:** AI/ML · **Languages:** TypeScript, CSS, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/web-ui-kie-ai)
