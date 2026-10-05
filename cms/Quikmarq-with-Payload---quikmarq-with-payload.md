# Deploy Quikmarq with Payload on Railway

A bookmark app with PayloadCMS and a shared SvelteKit frontend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/quikmarq-with-payload)

## About

Quikmarq is a small bookmark app for notes, links and images. This version uses
PayloadCMS and its Next.js admin/API, with the same SvelteKit frontend as the Ridu version.

This template deploys the frontend and CMS as separate services. A persistent
volume holds SQLite and uploads. Both services run production Node builds.
After deployment, open the frontend and create your own account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| payload-web | [hanielu/quikmarq-comparison](https://github.com/hanielu/quikmarq-comparison) (root: /) | Web service |
| payload-cms | [hanielu/quikmarq-comparison](https://github.com/hanielu/quikmarq-comparison) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | payload-web | 0.0.0.0 | Bind the production SvelteKit server to all interfaces for Railway networking. |
| `PORT` | payload-web | 3000 | HTTP port for the SvelteKit frontend; matches its public domain target port. |
| `ORIGIN` | payload-web | - | Public HTTPS origin of the frontend, generated from its Railway domain. |
| `PUBLIC_CMS_URL` | payload-web | - | Public HTTPS origin of the Payload CMS used by this shared frontend. |
| `PUBLIC_CMS_BACKEND` | payload-web | payload | Selects the native Payload API adapter in the shared Quikmarq frontend. |
| `PORT` | payload-cms | 8080 | HTTP port for the Payload CMS service; matches its public domain target port. |
| `CMS_URL` | payload-cms | - | Public HTTPS origin of this Payload CMS, generated from its Railway domain. |
| `WEB_URL` | payload-cms | - | Public HTTPS origin of the shared Quikmarq frontend; permitted for CMS requests. |
| `NODE_ENV` | payload-cms | production | Runs the standalone Payload and Next.js server in production mode. |
| `UPLOAD_DIR` | payload-cms | /data/uploads | Persistent local upload directory on the CMS volume mounted at /data. |
| `DATABASE_URL` | payload-cms | file:/data/quikmarq.sqlite | SQLite database file on the persistent /data volume; keep one CMS replica. |
| `PAYLOAD_SECRET` | payload-cms | (secret) | Independent 64-character secret generated at deployment for Payload authentication. |
| `QUIKMARQ_SHARE_SECRET` | payload-cms | (secret) | Independent 64-character secret generated at deployment for collection share links. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** TypeScript, Go, Svelte, CSS, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/quikmarq-with-payload)
