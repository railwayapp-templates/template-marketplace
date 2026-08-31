# Deploy Boop on Railway

Self-hosted notification inbox: pushes from your apps, on your phone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/boop)

## About

Boop is a tiny, self-hosted notification inbox for developers. Your applications `POST` an event to a single API endpoint; the server stores it in SQLite, renders it in a built-in web inbox, and pushes it to your phone through Apple Push Notifications. There is no hosted relay, no account system, and no telemetry — everything runs inside your own Railway project.

This template deploys the Boop server (Go, with the web UI embedded in the binary) pinned to upstream release v1.3.0, with a persistent volume for the database and a health check on `/health`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| boop | [monotykamary/railway-template-boop](https://github.com/monotykamary/railway-template-boop) (root: /server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APNS_KEY_ID` | - | APNs key identifier (the XXXXXXXXXX part of AuthKey_XXXXXXXXXX.p8). |
| `APNS_TEAM_ID` | - | Apple Developer Team ID for push notifications. Leave empty to run without pushes; events still reach the web inbox. |
| `BOOP_BASE_URL` | - | Public address your phone will use to reach Boop. Generated from the service domain; update it if you attach a custom domain. |
| `APNS_BUNDLE_ID` | - | Bundle identifier of your self-built Boop iOS app. |
| `BOOP_LOG_LEVEL` | info | Log level: debug, info, warn, or error. |
| `BOOP_MCP_TOKEN` | (secret) | Bearer token for the read-only MCP endpoint (/mcp) that AI agents connect to. 16+ characters. Leave empty to allow only device credentials and admin login. |
| `BOOP_ADMIN_USER` | (secret) | Web UI and admin API login user. |
| `APNS_ENVIRONMENT` | production | APNs environment: production, or sandbox for Xcode debug builds. |
| `APNS_PRIVATE_KEY` | - | Contents of the APNs .p8 key, PEM text or base64 (easiest). Leave APNS_PRIVATE_KEY_PATH empty when using this. |
| `BOOP_ADMIN_PASSWORD` | (secret) | Web UI and admin API login password. Generated at deploy time; 8+ characters. |
| `BOOP_RETENTION_DAYS` | 90 | Days of event history to keep (0 keeps everything). Overrides the value saved in the web UI when set. |
| `APNS_PRIVATE_KEY_PATH` | - | Path to a mounted .p8 key file. Takes precedence over APNS_PRIVATE_KEY when set; leave empty to use the pasted key. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** Go, Svelte, TypeScript, CSS, Dockerfile, HTML, Shell, JavaScript

[View on Railway →](https://railway.com/deploy/boop)
