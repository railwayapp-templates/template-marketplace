# Deploy xbackbone on Railway

ShareX uploads with generated admin and backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xbackbone)

## About

XBackBone is a lightweight file manager and ShareX-compatible upload backend for images, videos, text, and general files. This template deploys stable version 3.8.2 with a generated administrator and durable local storage.

Sign in with `XBACKBONE_ADMIN_USER` and the generated `XBACKBONE_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xbackbone | [monotykamary/railway-template-xbackbone](https://github.com/monotykamary/railway-template-xbackbone) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Runtime timezone. |
| `PGID` | 1000 | LinuxServer runtime group ID. |
| `PORT` | 80 | Internal Nginx HTTP port. |
| `PUID` | 1000 | LinuxServer runtime user ID. |
| `XBACKBONE_URL` | - | Canonical public HTTPS URL. |
| `XBACKBONE_ADMIN_USER` | (secret) | Initial administrator username. |
| `XBACKBONE_ADMIN_EMAIL` | admin@example.com | Initial administrator email. |
| `XBACKBONE_ADMIN_PASSWORD` | (secret) | Generated administrator password. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Storage · **Languages:** PHP, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/xbackbone)
