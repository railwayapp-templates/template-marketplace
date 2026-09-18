# Deploy OxiCloud on Railway

Fast Rust file cloud: WebDAV, CalDAV, CardDAV; admin seeded.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oxicloud)

## About

OxiCloud is a fast, self-hosted file cloud written in Rust: a web file manager with sharing, plus WebDAV, CalDAV
and CardDAV — a lightweight alternative to heavier file-sync suites. This is a community-maintained template; it
is not affiliated with the OxiCloud project.

OxiCloud is a single Rust server backed by PostgreSQL, storing file contents on disk. On a fresh, publicly
reachable instance its one-time setup page makes whoever opens it first the administrator, and self-registration
starts enabled — so a naive deploy can be claimed or joined by strangers.

This template runs OxiCloud on Railway with PostgreSQL, seeds your administrator account at start-up (so the
setup page cannot be claimed by someone else), keeps public self-registration disabled, and wires the database,
the public base URL and the file-storage volume. WebDAV, CalDAV and CardDAV work with your OxiCloud account
credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | `postgres:18.2-alpine3.23` | Database |
| oxicloud | `ghcr.io/youssefsiam38/oxicloud-railway:1.0.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | db | oxicloud | - |
| `POSTGRES_USER` | db | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |
| `PORT` | oxicloud | 8086 | Port Railway routes traffic and health checks to; keep it equal to OXICLOUD_SERVER_PORT. |
| `OWNER_EMAIL` | oxicloud | - | Your e-mail address. It becomes the admin account seeded at the first start. |
| `OWNER_PASSWORD` | oxicloud | (secret) | The admin's password, generated. Copy it from here to sign in. |
| `OWNER_USERNAME` | oxicloud | (secret) | The admin username you sign in with. |
| `OXICLOUD_BASE_URL` | oxicloud | - | Public base URL for share links and authentication. |
| `OXICLOUD_SERVER_HOST` | oxicloud | 0.0.0.0 | - |
| `OXICLOUD_SERVER_PORT` | oxicloud | 8086 | - |
| `OXICLOUD_MAX_UPLOAD_SIZE_MB` | oxicloud | - | Maximum upload size in MB (see OxiCloud's configuration reference). |
| `OXICLOUD_DB_CONNECTION_STRING` | oxicloud | - | PostgreSQL connection string the server reads. |
| `OXICLOUD_DISABLE_REGISTRATION` | oxicloud | true | true keeps public self-registration off; set false to reopen it. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/oxicloud)
