# Deploy Quikmarq with Ridu on Railway

A bookmark app with RiduCMS and a shared SvelteKit frontend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quikmarq-with-ridu)

## About

Quikmarq is a small bookmark app for notes, links and images. This version uses
RiduCMS, with one shared SvelteKit frontend and a Go CMS/API with its admin embedded.

This template deploys the frontend and CMS as separate services. A persistent
volume holds SQLite and uploads. The CMS is one Go binary; the frontend runs on
Node. After deployment, open the frontend and create your own account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ridu-web | [hanielu/quikmarq-comparison](https://github.com/hanielu/quikmarq-comparison) (root: /) | Web service |
| ridu-cms | [hanielu/quikmarq-comparison](https://github.com/hanielu/quikmarq-comparison) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | ridu-web | 0.0.0.0 | Listen on all container interfaces. |
| `PORT` | ridu-web | 3000 | Frontend HTTP port; keep 3000 to match the generated domain. |
| `ORIGIN` | ridu-web | - | Generated public frontend origin, required during the build. |
| `PUBLIC_CMS_URL` | ridu-web | - | Generated public CMS origin, required during the build. |
| `PUBLIC_CMS_BACKEND` | ridu-web | ridu | Selects the native Ridu adapter in the shared frontend. |
| `PORT` | ridu-cms | 8080 | CMS HTTP port; keep 8080 to match the generated domain. |
| `NODE_ENV` | ridu-cms | production | Production runtime mode. |
| `RIDU_SQLITE_PATH` | ridu-cms | /data/quikmarq.sqlite | SQLite database on the persistent data volume. |
| `RIDU_UPLOAD_PATH` | ridu-cms | /data/uploads | Private uploads on the persistent data volume. |
| `RIDU_ALLOWED_HOSTS` | ridu-cms | - | Generated CMS host and Railway readiness host. |
| `RIDU_ALLOWED_ORIGINS` | ridu-cms | - | Generated frontend and native admin origins. |
| `QUIKMARQ_SHARE_SECRET` | ridu-cms | (secret) | Independent random share-signing secret generated for this installation. |
| `RIDU_READINESS_DRAIN_DELAY` | ridu-cms | -1s | Readiness drain delay; -1s disables the app delay. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** TypeScript, Go, Svelte, CSS, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/quikmarq-with-ridu)
