# Deploy Whatsapp Web Multidevice on Railway

High-performance Go-based WhatsApp REST API for chatbots and automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-web-multidevice)

## About

Whatsapp Web Multidevice is a lightweight, self-hosted WhatsApp REST API built with Go for memory efficiency and high performance. It allows users to connect and manage multiple WhatsApp accounts simultaneously in a single instance. Key features include a Web UI, webhook notifications for real-time events, Model Context Protocol (MCP) support for AI agents, and integration with Chatwoot and n8n.

Hosting Whatsapp Web Multidevice on Railway provides a managed container execution environment with zero infrastructure maintenance. Railway deploys the official Docker image, provides public HTTPS networking, and manages SSL termination automatically. The deployment requires a persistent Railway Volume mounted to store WhatsApp session authentication data, SQLite database files, and cached web assets across service restarts. Built-in HTTP proxying forwards external traffic directly to the container's application port. The service operates efficiently with low resource usage, enabling fast API response times and scalable webhook handling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Whatsapp Web Multidevice | `aldinokemal2104/go-whatsapp-web-multidevice:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_OS` | Chrome | OS name (device name in WhatsApp) |
| `APP_HOST` | 0.0.0.0 | Host address to bind the server |
| `APP_PORT` | 3000 | Application port |
| `APP_DEBUG` | false | Enable debug logging |
| `APP_BASIC_AUTH` | admin:admin | Basic authentication credentials i.e username and passward |
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

[View on Railway →](https://railway.com/deploy/whatsapp-web-multidevice)
