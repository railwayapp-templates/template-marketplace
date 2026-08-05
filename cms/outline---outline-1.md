# Deploy outline on Railway

An open source workspace for docs, wikis, whiteboards, and knowledge

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-1)

## About

Outline is a fast, collaborative knowledge base for teams. Built with React and Node.js, it offers real-time editing, Markdown support, full-text search, and a clean interface for building and sharing team documentation.

Hosting Outline on Railway provisions the full stack with minimal configuration. This template includes a managed PostgreSQL database for documents, collections, and user data; a managed Redis instance for caching, sessions, and real-time collaboration; and a persistent volume for local file storage. Outline runs as a single container from the official `outlinewiki/outline` image, with `DATABASE_URL`, `REDIS_URL`, `SECRET_KEY`, `UTILS_SECRET`, and `URL` wired automatically. Database migrations run on startup, and a `/_health` healthcheck (with a 600-second timeout) waits for Postgres and Redis before marking the deployment live. Generate a Railway domain, set Google OAuth credentials for sign-in, and optionally configure SMTP for invitations and notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:8.2.1` | Database |
| outline | `outlinewiki/outline:latest` | Web service |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `URL` | - | Public URL of your Outline instance. Uses the Railway-generated domain. |
| `PORT` | - | HTTP port for the Outline web server. Set automatically by Railway. |
| `NODE_ENV` | production | Node.js runtime environment. Use production for deployed instances. |
| `REDIS_URL` | - | Redis connection URL. References the managed redis service. |
| `SECRET_KEY` | (secret) | Secret key for encrypting sessions and cookies. Auto-generated; do not change after first deploy. |
| `FORCE_HTTPS` | true | Redirect HTTP requests to HTTPS. Should remain enabled in production. |
| `DATABASE_URL` | - | PostgreSQL connection URL. References the managed postgres service. |
| `FILE_STORAGE` | local | File storage backend. Use local storage with the attached volume. |
| `NODE_OPTIONS` | --no-experimental-webstorage | Node.js runtime flags. Suppresses localStorage warnings on newer Node versions. |
| `SMTP_SERVICE` | - | SMTP service for transactional emails (optional). See https://docs.getoutline.com/s/hosting/doc/smtp-cqCJyZGMIB |
| `UTILS_SECRET` | (secret) | Secret used for utility operations and background tasks. Auto-generated; do not change after first deploy. |
| `OIDC_AUTH_URI` | - | OpenID Connect authorization endpoint (optional). |
| `SMTP_PASSWORD` | (secret) | SMTP password (optional). |
| `SMTP_USERNAME` | (secret) | SMTP username (optional). |
| `OIDC_CLIENT_ID` | - | OpenID Connect client ID (optional alternative auth). See https://docs.getoutline.com/s/hosting/doc/oidc-8CPBm6uC0I |
| `OIDC_TOKEN_URI` | (secret) | OpenID Connect token endpoint (optional). |
| `SLACK_CLIENT_ID` | - | Slack OAuth client ID (optional alternative auth). See https://docs.getoutline.com/s/hosting/doc/slack-sgMujR8J9J |
| `SMTP_FROM_EMAIL` | - | From address for outgoing emails (optional). |
| `DEFAULT_LANGUAGE` | en_US | Default language for the Outline user interface. |
| `GOOGLE_CLIENT_ID` | - | Google OAuth client ID. Required for sign-in. See https://docs.getoutline.com/s/hosting/doc/google-hOuvtCmTqQ |
| `OIDC_USERINFO_URI` | - | OpenID Connect userinfo endpoint (optional). |
| `OIDC_CLIENT_SECRET` | (secret) | OpenID Connect client secret (optional). |
| `SLACK_CLIENT_SECRET` | (secret) | Slack OAuth client secret (optional). |
| `GOOGLE_CLIENT_SECRET` | (secret) | Google OAuth client secret. Required for sign-in. |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | /var/lib/outline/data | Directory path for locally stored uploads and attachments. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/outline-1)
