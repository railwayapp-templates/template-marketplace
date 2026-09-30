# Deploy SiYuan on Railway

Privacy-first personal knowledge management (unofficial SiYuan)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siyuan-2)

## About

SiYuan is a privacy-first personal knowledge management system with block-level references, Markdown WYSIWYG editing and notebooks. This template deploys the official b3log/siyuan image (pinned to v3.8.5) with a persistent workspace volume. Unofficial template.

The template runs one service from the official image with a volume mounted at /siyuan/workspace, which holds all your notes. Your lock-screen password is the auto-generated SIYUAN_ACCESS_AUTH_CODE variable: find it in the service Variables tab after deploying, then open the generated domain and enter it. Docker hosting is browser-only: no desktop or mobile app connection, no PDF/HTML/Word export and no Markdown file import. Run a single instance only; never mount the same workspace in two instances.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| b3log/siyuan:v3.8.5 | `b3log/siyuan:v3.8.5` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for the SiYuan process, as an IANA name (for example Europe/London). Defaults to UTC. |
| `PGID` | 1000 | Group ID the SiYuan process runs as inside the container. Leave at 1000; the image entrypoint sets workspace ownership to PUID/PGID. |
| `PORT` | 6806 | Port the SiYuan kernel listens on (6806). Railway routes the public domain to this port; do not change it. |
| `PUID` | 1000 | User ID the SiYuan process runs as inside the container. Leave at 1000; the image entrypoint sets workspace ownership to PUID/PGID. |
| `SIYUAN_WORKSPACE_PATH` | /siyuan/workspace | Directory where SiYuan stores your notes and settings. This is the mounted volume path; do not change it or data will not persist. |
| `SIYUAN_ACCESS_AUTH_CODE` | - | Lock-screen password for your SiYuan instance, auto-generated (24 characters) at deploy. Find it in this service's Variables tab and enter it on the lock screen. Do not remove it. |

## Configuration

- **Start command:** `/opt/siyuan/entrypoint.sh serve`
- **Healthcheck:** `/api/system/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/siyuan/workspace`

**Category:** Other

[View on Railway →](https://railway.com/deploy/siyuan-2)
