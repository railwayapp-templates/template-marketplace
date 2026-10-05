# Deploy Mealie recipe archive on Railway

Archive imported recipes, retained images, and portable backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mealie-recipe-archive)

## About

Archive imported recipes, retained images, and portable backups

A single-node recipe archive with SQLite, controlled schema.org recipe import, retained original/derived images and native portable ZIP backups. No AI provider, PostgreSQL, SMTP, LDAP, OIDC, FlareSolverr or Chromium sidecar. Import only sources you are entitled to archive.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mealie | [tech-progress/mealie-recipe-archive](https://github.com/tech-progress/mealie-recipe-archive) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | TZ: pinned deployment setting; see README for scope and recovery requirements. |
| `PGID` | 911 | PGID: pinned deployment setting; see README for scope and recovery requirements. |
| `PORT` | 9000 | PORT: pinned deployment setting; see README for scope and recovery requirements. |
| `PUID` | 911 | PUID: pinned deployment setting; see README for scope and recovery requirements. |
| `API_PORT` | 9000 | API_PORT: pinned deployment setting; see README for scope and recovery requirements. |
| `BASE_URL` | - | Canonical HTTPS public URL; update when adding a custom domain. |
| `DATA_DIR` | /app/data | DATA_DIR: pinned deployment setting; see README for scope and recovery requirements. |
| `DB_ENGINE` | sqlite | DB_ENGINE: pinned deployment setting; see README for scope and recovery requirements. |
| `ALLOW_SIGNUP` | false | ALLOW_SIGNUP: pinned deployment setting; see README for scope and recovery requirements. |
| `MEALIE_ADMIN_EMAIL` | admin@example.invalid | Initial administrator email. Change to your actual address before first deployment; no mail service is included. |
| `MEALIE_ADMIN_PASSWORD` | (secret) | Generated password replacing the upstream default before listening; only seeds untouched default accounts. |

## Configuration

- **Healthcheck:** `/api/app/about`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/mealie-recipe-archive)
