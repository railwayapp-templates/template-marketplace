# Deploy ntfy-latest on Railway

Deploy and Host ntfy-latest with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-latest)

## About

ntfy-latest is the newest stable build of **ntfy**, a lightweight publish/subscribe notification server. It allows you to send push-style messages to devices, scripts, and services using HTTP. Messages can be sent from shell scripts, automation tools, CI/CD, or backend applications, and clients can receive notifications instantly via web, CLI, mobile apps, or integrations.

---

Hosting ntfy-latest on Railway gives you a running notification server without managing hardware or complex infrastructure. Incoming messages are published to topics, and any subscribed devices or processes receive them in real time. Railway supports mounting a persistent volume so ntfy can safely store authentication databases, message cache files, and optional file attachments. You can run ntfy publicly, privately, or internally depending on your configuration. Text-only notifications work immediately without external setup. File-attachment support requires a valid `base-url` and persistent storage, but remains optional.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `NTFY_BASE_URL` | https://ntfy.mydomain.com | Fill your own base_url |
| `NTFY_AUTH_FILE` | /var/lib/ntfy/auth.db | - |
| `NTFY_CACHE_FILE` | /var/lib/ntfy/cache.db | - |
| `NTFY_BEHIND_PROXY` | false | - |
| `NTFY_ENABLE_LOGIN` | (secret) | - |
| `NTFY_ENABLE_SIGNUP` | false | - |
| `NTFY_AUTH_DEFAULT_ACCESS` | deny-all | - |
| `NTFY_ATTACHMENT_CACHE_DIR` | /var/lib/ntfy/attachments | - |

## Configuration

- **Start command:** `ntfy serve`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/ntfy-latest)
