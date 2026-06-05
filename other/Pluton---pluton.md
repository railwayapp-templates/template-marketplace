# Deploy Pluton on Railway

Modern encrypted backups | Alt to Borg, Restic, Duplicati

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pluton)

## About

Pluton is a self-hosted backup management platform that simplifies automated, incremental backups across multiple devices and storage destinations. It provides a centralized web interface to create, schedule, monitor, and manage backups for local and remote machines while using Restic and Rclone under the hood.

Hosting Pluton on Railway lets you run its web interface and backup orchestration layer on a managed deployment platform instead of maintaining your own application server. Pluton is built for centralized backup management, allowing you to configure credentials, encryption, storage targets, and backup behavior through environment variables and the web UI. A typical deployment also needs persistent storage for app data and a reachable public URL for the interface. Railway makes this easier by handling deployment, networking, and environment variable management in one place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pluton | `plutonhq/pluton:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |
| `APP_TITLE` | Pluton |
| `IS_DOCKER` | true |
| `SERVER_PORT` | 5173 |
| `USER_PASSWORD` | (secret) |
| `SESSION_DURATION` | 7 |
| `ALLOW_FILE_BROWSER` | true |
| `DISABLE_EVENT_SCRIPTS` | false |
| `MAX_CONCURRENT_BACKUPS` | 2 |
| `ALLOW_CUSTOM_RESTORE_PATH` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/pluton)
