# Deploy ntfy on Railway

An open-source, self-hostable push notification service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfysh)

## About

ntfy is an open-source, self-hostable push notification service that lets you send notifications to your phone or desktop via simple HTTP requests — no app registration, no vendor lock-in, no API keys required. Publish from any script, app, or CI pipeline in seconds.

Hosting your own ntfy server gives you full control over who can publish and subscribe to topics, how long messages are cached, and where attachments are stored. This Railway template deploys ntfy using the official Docker image with a persistent volume mounted at /var/lib/ntfy for cache, auth, and attachment storage — so your data survives restarts and redeploys. The server runs behind Railway's built-in proxy with behind-proxy enabled and is reachable immediately on your Railway-provided domain. From there you can lock down access with user authentication, set message retention policies, and add a custom domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NTFY_BASE_URL` | - | Public facing base URL of the service |
| `NTFY_AUTH_FILE` | /var/lib/ntfy/auth.db | Database file for authentication and access control |
| `NTFY_CACHE_FILE` | /var/lib/ntfy/cache.db | Database file for the message cache |
| `NTFY_BEHIND_PROXY` | true | If set, use forwarded header (e.g. X-Forwarded-For, X-Client-IP) to determine visitor IP address (for rate limiting) |
| `NTFY_ATTACHMENT_CACHE_DIR` | /var/lib/ntfy/attachments | Cache directory for attached files, or S3 URL for object storage (format: s3://KEY:SECRET@BUCKET[/PREFIX]?region=REGION[&endpoint=ENDPOINT]). |

## Configuration

- **Start command:** `ntfy serve`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/ntfysh)
