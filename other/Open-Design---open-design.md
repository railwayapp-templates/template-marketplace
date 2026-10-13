# Deploy Open Design on Railway

Self-hosted Open Design: AI prototypes, decks, and images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-design)

## About

Open Design is a self-hosted studio for creating prototypes, landing pages, dashboards, slides, images and video. You can export the results as files. This template runs the official production image, with the Web UI and daemon in one service.

The official image serves both the UI and the API on port 7456. Project files and SQLite live on a volume at /app/.od. After deployment, sign in through the browser's HTTP Basic authentication prompt. Use open-design as the username and the OD_API_TOKEN you set on the deployment form as the password. Keep a copy of this password; it is not sent by email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Open Design | `ghcr.io/nexu-io/od:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7456 | Must stay 7456 so Railway healthchecks hit the daemon. |
| `OD_PORT` | 7456 | Open Design listen port. Keep 7456 to match PORT. |
| `NODE_ENV` | production | Node environment. Leave as production. |
| `NODE_OPTIONS` | --max-old-space-size=192 | Node heap cap recommended by the Open Design image. |
| `OD_API_TOKEN` | (secret) | Login password. Username is always open-design. Choose a password now; you will type it in the browser after deploy. |
| `OD_BIND_HOST` | 0.0.0.0 | Bind address. Leave 0.0.0.0 so the public URL works. |
| `OD_ALLOWED_ORIGINS` | - | CORS allowlist. Leave as the Railway public URL. |
| `OD_PUBLIC_BASE_URL` | - | Public site URL. Leave as the Railway public URL. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.od`

**Category:** Other

[View on Railway →](https://railway.com/deploy/open-design)
