# Deploy gowa-whatsapp-web-multidevice on Railway

GOWA - WhatsApp Multi-Device REST API (Self-hosted)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gowa-whatsapp-web-multidevice)

## About

**GOWA** is a lightweight, self-hosted WhatsApp REST API built with Go. Go is known for being extremely efficient with memory and handling many concurrent tasks easily. GOWA's architecture is technically superior in terms of performance.

It supports multiple WhatsApp devices in a single instance, provides a web UI for management, and includes webhook support for real-time events. It also has an official [n8n community node](https://www.npmjs.com/package/@aldinokemal2104/n8n-nodes-gowa) for easy workflow automation.

This template deploys GOWA using its official Docker image. It includes persistent storage for WhatsApp sessions, automatic generation of a secure admin password, and a webhook secret. The service runs efficiently with low resource usage and supports both the web interface and REST API.

A Railway volume is required to persist WhatsApp authentication data across restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gowa-services | `aldinokemal2104/go-whatsapp-web-multidevice:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_OS` | Chrome | OS name (device name in WhatsApp) |
| `APP_HOST` | 0.0.0.0 | Host address to bind the server |
| `APP_PORT` | 3000 | Application port |
| `APP_DEBUG` | false | Enable debug logging |
| `APP_BASIC_AUTH` | - | Basic authentication credentials |
| `WHATSAPP_WEBHOOK` | - | Webhook URL(s) for events (comma-separated) |
| `APP_AUTO_MARK_READ` | false | Auto-mark incoming messages as read |
| `APP_AUTO_REJECT_CALL` | true | Auto reject incoming calls |
| `APP_AUTO_DOWNLOAD_MEDIA` | true | Auto-download media from incoming messages |
| `APP_PRESENCE_ON_CONNECT` | unavailable | Presence on connect: available, unavailable, or none |
| `WHATSAPP_WEBHOOK_EVENTS` | message,message.ack | Whitelist of events to forward (comma-separated, empty = all) |
| `WHATSAPP_WEBHOOK_SECRET` | (secret) | Webhook secret for validation |
| `WHATSAPP_WEBHOOK_INSECURE_SKIP_VERIFY` | false | Skip TLS verification for webhooks (insecure) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storages`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/gowa-whatsapp-web-multidevice)
