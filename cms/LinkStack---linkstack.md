# Deploy LinkStack on Railway

Self-hosted link-in-bio pages with generated admin and durable storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkstack)

## About

LinkStack is a self-hosted, privacy-focused link-in-bio platform for publishing customizable profile pages. This template deploys stable LinkStack 4.8.6 with a generated administrator and persistent SQLite-backed storage.

The public domain belongs to the `linkstack` service. Sign in at `/login` with `LINKSTACK_ADMIN_EMAIL` and the generated `LINKSTACK_ADMIN_PASSWORD`. The administrator is created before the service becomes ready, so the public setup wizard is never exposed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| linkstack | [monotykamary/railway-template-linkstack](https://github.com/monotykamary/railway-template-linkstack) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | PHP timezone in IANA format. |
| `PORT` | 80 | Port used by upstream Apache and Railway health checks. |
| `APP_ENV` | production | Laravel runtime environment. Keep this set to production. |
| `APP_KEY` | - | Generated 32-byte Laravel encryption key. Do not change it after first deploy. |
| `APP_DEBUG` | false | Controls Laravel debug output. Keep disabled on public deployments. |
| `LOG_LEVEL` | info | Apache log level. |
| `FORCE_HTTPS` | true | Generates HTTPS links behind Railway's TLS-terminating reverse proxy. |
| `SERVER_ADMIN` | - | Apache server administrator contact; follows the LinkStack admin email. |
| `HTTP_SERVER_NAME` | - | Apache HTTP server name from the generated Railway public domain. |
| `PHP_MEMORY_LIMIT` | 256M | PHP per-request memory limit. |
| `HTTPS_SERVER_NAME` | - | Apache HTTPS virtual-host name from the generated Railway public domain. |
| `UPLOAD_MAX_FILESIZE` | 16M | Maximum PHP upload size for themes and images. |
| `LINKSTACK_ADMIN_NAME` | Administrator | Display name for the generated first administrator. |
| `LINKSTACK_ADMIN_EMAIL` | admin@example.com | Email used for the generated first administrator and initial sign-in. |
| `LINKSTACK_ADMIN_HANDLE` | admin | Public handle for the generated administrator profile. |
| `LINKSTACK_ADMIN_PASSWORD` | (secret) | Generated password used only when creating the first administrator. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/htdocs`

**Category:** CMS · **Languages:** Shell, PHP, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/linkstack)
