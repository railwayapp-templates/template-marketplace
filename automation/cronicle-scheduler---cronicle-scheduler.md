# Deploy cronicle-scheduler on Railway

Single-node task scheduling with persistent job history

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cronicle-scheduler)

## About

Cronicle is a web-based task scheduler and runner with event timing, command plugins, live progress, job history, and operator access control. This template deploys stable version 0.9.125 as a supported single-node scheduler.

Sign in using `CRONICLE_ADMIN_USERNAME` and the generated `CRONICLE_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cronicle | [monotykamary/railway-template-cronicle](https://github.com/monotykamary/railway-template-cronicle) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3012 | Cronicle HTTP port used by the Railway public domain. |
| `CRONICLE_SECRET_KEY` | (secret) | Persistent internal signing key. Keep unchanged across redeployments. |
| `CRONICLE_ADMIN_EMAIL` | admin@localhost | Initial administrator email. Configure SMTP before relying on email workflows. |
| `CRONICLE_PUBLIC_DOMAIN` | - | Public Railway hostname used in generated job and UI links. |
| `CRONICLE_ADMIN_PASSWORD` | (secret) | Generated initial password for the Cronicle administrator. |
| `CRONICLE_ADMIN_USERNAME` | (secret) | Initial administrator username. |

## Configuration

- **Healthcheck:** `/api/app/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/cronicle/data`

**Category:** Automation · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/cronicle-scheduler)
