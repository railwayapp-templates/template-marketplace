# Deploy SiYuan on Railway

Self-host SiYuan with secure access, persistent notes, and tested recovery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siyuan-1)

## About

Run SiYuan `v3.8.2` as one authenticated Railway service with a persistent
workspace, immutable image pins, non-root steady processes, and true
boot-progress readiness.

Wait for deployment health, open the Railway domain, and enter the generated
access code from Railway Variables. Create a synthetic notebook, note, asset,
and search before importing important data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| siyuan | [l4time/railway-siyuan-template](https://github.com/l4time/railway-siyuan-template) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 1000 | Group ID for the non-root SiYuan process and workspace files. |
| `PORT` | 8080 | Internal HTTP port used by Railway and the SiYuan wrapper. |
| `PUID` | 1000 | User ID for the non-root SiYuan process and workspace files. |
| `SIYUAN_WORKSPACE_PATH` | /siyuan/workspace | Persistent workspace directory mounted on the Railway volume. |
| `SIYUAN_ACCESS_AUTH_CODE` | - | Generated login code for SiYuan. Save it securely after deployment. |
| `SIYUAN_ACCESS_AUTH_CODE_BYPASS` | false | Keeps SiYuan authentication bypass disabled. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/siyuan/workspace`

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/siyuan-1)
