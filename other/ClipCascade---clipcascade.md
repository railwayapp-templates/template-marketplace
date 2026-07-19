# Deploy ClipCascade on Railway

Self-hosted encrypted clipboard sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clipcascade)

## About

> [!CAUTION]
> Open the generated domain and immediately change the default `admin` / `admin123` credentials using **Change Password**.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clipcascade)

[ClipCascade](https://github.com/Sathvik-Rao/ClipCascade) automatically synchronises text, images, and files between Windows, macOS, Linux, and Android devices. It supports authentication, multiple users, client-side end-to-end encryption, a web dashboard, and self-hosting.

This repository maintains the community Railway template, validation suite, and launch evidence. Railway deploys the official upstream image directly; this repository is not an application fork or wrapper image.

Hosting ClipCascade on Railway provides a private, always-available relay for encrypted clipboard data while keeping the application database in your own persistent Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClipCascade | `sathvikrao/clipcascade:0.7.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port used by ClipCascade. Keep this set to 8080. |
| `CC_PORT` | - | ClipCascade listen port. This references PORT. |
| `CC_P2P_ENABLED` | false | Use peer-to-server mode for the Railway deployment. |
| `CC_SIGNUP_ENABLED` | false | Public signup is disabled by default. Set true only if you want account creation. |
| `CC_ALLOWED_ORIGINS` | - | Allowed WebSocket origin, restricted to the generated Railway domain. |
| `CC_SERVER_DB_PASSWORD` | (secret) | Generated two-part password for the embedded encrypted H2 database. Do not change it after first deployment. |
| `CC_MAX_MESSAGE_SIZE_IN_MiB` | 5 | Maximum clipboard payload size in MiB. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/database`

**Category:** Other

[View on Railway →](https://railway.com/deploy/clipcascade)
