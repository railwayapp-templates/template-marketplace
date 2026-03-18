# Deploy webhook-catcher on Railway

🔍 Developer-friendly webhook debugging tool with real-time capture

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/webhook-catcher)

## About

**webhook-catcher** is a lightweight FastAPI-based tool to receive, view, debug, and replay webhooks with a clean HTML UI. It includes features like search, filtering, dark mode, and replay support — perfect for testing integrations and inspecting webhook payloads in real-time.

Hosting `webhook-catcher` on Railway is fast and simple. Once deployed, you'll receive a public HTTPS URL where any service can send webhooks for testing or debugging. All received payloads are stored in SQLite and displayed in a minimal dashboard. You can replay requests, forward them to another service, or export logs. No extra configuration is required — just deploy and start catching webhooks!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webhook-catcher | [BigDaddyAman/webhook-catcher](https://github.com/BigDaddyAman/webhook-catcher) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_TOKEN` | (secret) | Admin token for sensitive operations (clear logs, replay webhooks). Leave empty to disable protection. |
| `FORWARD_WEBHOOK_URL` | - | Optional: Forward webhooks to another service (bot, processor, etc.) |
| `FORWARD_WEBHOOK_TOKEN` | (secret) | Optional: Authentication token for webhook forwarding security |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability · **Languages:** HTML, Python, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/webhook-catcher)
