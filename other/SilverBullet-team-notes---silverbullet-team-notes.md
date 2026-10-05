# Deploy SilverBullet team notes on Railway

Authenticated multi-space Markdown notes without a browser runtime

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/silverbullet-team-notes)

## About

Authenticated multi-space Markdown notes without a browser runtime.

Run [SilverBullet](https://silverbullet.md/) as a single-node workspace for a small trusted team. Create independently authorized Markdown spaces with notes, attachments and the native account dashboard. This recipe uses pinned SilverBullet2.11.1 slim, a generated administrator password and one persistent5000MB volume mounted at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SilverBullet | [tech-progress/silverbullet-team-notes](https://github.com/tech-progress/silverbullet-team-notes) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 1000 | PGID: pinned deployment setting; see README for scope and recovery requirements. |
| `PORT` | 3000 | PORT: pinned deployment setting; see README for scope and recovery requirements. |
| `PUID` | 1000 | PUID: pinned deployment setting; see README for scope and recovery requirements. |
| `SB_PORT` | 3000 | SB_PORT: pinned deployment setting; see README for scope and recovery requirements. |
| `SB_FOLDER` | /data | SB_FOLDER: pinned deployment setting; see README for scope and recovery requirements. |
| `SB_HOSTNAME` | :: | SB_HOSTNAME: pinned deployment setting; see README for scope and recovery requirements. |
| `SB_ADMIN_USER` | (secret) | SB_ADMIN_USER: pinned deployment setting; see README for scope and recovery requirements. |
| `SB_ADMIN_PASSWORD` | (secret) | Generated initial administrator password; changing it does not reset existing accounts. Keep the full /data root. |

## Configuration

- **Healthcheck:** `/.instance`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/silverbullet-team-notes)
