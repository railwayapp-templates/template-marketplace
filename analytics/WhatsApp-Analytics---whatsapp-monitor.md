# Deploy WhatsApp Analytics on Railway

Track WhatsApp group activity with a real-time web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whatsapp-monitor)

## About

WhatsApp Monitor is an enterprise-grade WhatsApp group monitoring platform that provides a secure web dashboard for tracking messages, members, reactions, polls, and events in real time. Using a regular WhatsApp account as a linked device, it delivers live analytics, searchable history, CSV/JSON exports, backups, and administrative controls without requiring the WhatsApp Business API.

![Whatsapp Monitor](https://raw.githubusercontent.com/arloodots/WA-Monitor/refs/heads/main/WA%20Monitor-2.png)

Hosting WhatsApp Monitor on Railway provides a reliable, always-on environment for monitoring WhatsApp groups through a secure web interface. Railway automatically builds the application from the repository and provides HTTPS, public networking, and simple deployments with minimal configuration.

The application stores WhatsApp session credentials, SQLite databases, backups, and application settings in persistent storage. A Railway Volume is recommended to preserve these files across deployments and restarts, allowing the linked WhatsApp session to reconnect automatically without scanning a new QR code after normal service restarts.

The web dashboard is protected with administrator credentials (`ADMIN_USERNAME` and `ADMIN_PASSWORD`) and provides centralized access to analytics, monitoring, configuration, exports, and backups. Since the application uses an embedded SQLite database, no external database service is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WA-Monitor | [arloodots/WA-Monitor](https://github.com/arloodots/WA-Monitor) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `DATA_DIR` | ./data |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics · **Languages:** TypeScript, HTML, CSS, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/whatsapp-monitor)
