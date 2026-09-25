# Deploy GOWA (WhatsApp REST API) on Railway

GOWA 9.4: WhatsApp REST API and MCP server in Go, with webhooks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gowa-whatsapp-rest-api)

## About

GOWA (go-whatsapp-web-multidevice) is a WhatsApp REST API and MCP server written in Go. It links WhatsApp accounts as companion devices and lets you send and receive messages, media, locations, polls and group actions over HTTP, with webhooks for incoming events. It supports several accounts in one instance.

This template runs the official `aldinokemal2104/go-whatsapp-web-multidevice:v9.4.0` image as one service. The dashboard and the whole API are behind basic auth (user `admin` and a generated password); only `/health` is public. Linked-device sessions and chat storage live in SQLite on a Railway volume at `/app/storages`, so paired accounts survive redeploys. Set `WHATSAPP_WEBHOOK` to receive incoming messages, signed with a generated secret. It is a single small Go binary and fits the Hobby plan. WhatsApp can ban numbers used for spam, so use a number you can afford to lose and respect their terms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gowa | `aldinokemal2104/go-whatsapp-web-multidevice:v9.4.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `APP_OS` | GOWA |
| `APP_PORT` | 3000 |
| `GOWA_PASSWORD` | (secret) |
| `APP_TRUSTED_PROXIES` | 0.0.0.0/0 |
| `WHATSAPP_WEBHOOK_SECRET` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storages`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/gowa-whatsapp-rest-api)
