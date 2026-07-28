# Deploy Artalk on Railway

Self-hosted comment system for blogs, with persistent SQLite storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/artalk)

## About

Artalk is an open-source, self-hosted comment system for blogs and websites. It includes an embeddable client, moderation dashboard, multi-site support, spam protection, notifications, and APIs while keeping your data under your control.

This template runs the official Artalk image on port 23366 and stores its SQLite database, configuration, and uploads in a Railway volume at `/data`. During deployment, you provide administrator credentials; the template creates the admin account automatically and configures the public domain and health check.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| artalk | `artalk/artalk-go:2.10.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 23366 | - |
| `ATK_HOST` | 0.0.0.0 | - |
| `ATK_PORT` | 23366 | - |
| `ATK_LOCALE` | en | - |
| `ATK_DB_FILE` | /data/artalk.db | - |
| `ATK_DB_TYPE` | sqlite | - |
| `ATK_TIMEZONE` | UTC | - |
| `ATK_SITE_DEFAULT` | Artalk | - |
| `ARTALK_ADMIN_NAME` | - | Administrator username used to sign in to Artalk. |
| `ARTALK_ADMIN_EMAIL` | - | Administrator email used to sign in to Artalk. |
| `ARTALK_ADMIN_PASSWORD` | (secret) | Administrator password. Use at least 12 unique characters. |
| `ATK_HTTP_PROXY_HEADER` | X-Forwarded-For | - |

## Configuration

- **Start command:** `/bin/bash -c '/entrypoint.sh admin --name "$ARTALK_ADMIN_NAME" --email "$ARTALK_ADMIN_EMAIL" --password "$ARTALK_ADMIN_PASSWORD" && exec /entrypoint.sh server --host 0.0.0.0 --port "$PORT"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/artalk)
