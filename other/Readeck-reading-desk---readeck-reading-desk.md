# Deploy Readeck reading desk on Railway

Private reading archive with annotations, EPUB and backup export

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/readeck-reading-desk)

## About

Private reading archive with annotations, EPUB and backup export

Run [Readeck](https://readeck.org/) 0.23.4 as one pinned service with one exclusive 5,000 MB `/readeck` volume for SQLite, saved resources and configuration. Private owner creation completes before public HTTP. Only the Node host guard's port 8000 is public; backend 8001 and crawler SSRF proxy 8002 stay loopback. Login/static pages and allowed-host readiness are public, while private bookmark API access requires authentication. Opt-in public shares deliberately grant bearer access to shared text, with a one-hour default lifetime; saved images require native bookmark permission under this recipe's private-media guard, including on share pages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Readeck | [tech-progress/readeck-reading-desk](https://github.com/tech-progress/readeck-reading-desk) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP listener and public target port; do not expose SQL. |
| `READECK_SECRET_KEY` | (secret) | Stable generated instance key, min 48 characters; retain for tokens and full export/import. |
| `READECK_OWNER_EMAIL` | - | REQUIRED owner mailbox; SMTP is not included, password reset email needs separate setup. |
| `READECK_ALLOWED_HOSTS` | - | Comma-separated approved hostnames (no ports); include Railway healthcheck host. |
| `READECK_WORKER_NUMBER` | 2 | Two in-process extraction workers; no separate shared-volume worker. |
| `READECK_OWNER_PASSWORD` | (secret) | Generated private initial password, min 16 characters; not reset for existing users. |
| `READECK_OWNER_USERNAME` | (secret) | Initial private owner username; keep stable to avoid creating an additional administrator. |
| `READECK_SERVER_BASE_URL` | - | Canonical HTTPS origin for links and secure cookies. |
| `READECK_PUBLIC_SHARE_TTL` | 1 | Public bearer share-link lifetime in hours; shares are opt-in and are not authentication. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/readeck`

**Category:** Other · **Languages:** JavaScript, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/readeck-reading-desk)
