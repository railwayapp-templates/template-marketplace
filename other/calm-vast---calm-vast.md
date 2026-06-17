# Deploy calm-vast on Railway

Deploy and Host calm-vast with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-vast)

## About

Evolution API is a free, open-source WhatsApp automation gateway that connects your WhatsApp number to a REST API. It lets you send and receive WhatsApp messages programmatically with no per-message fees and no Meta Business verification required.

Hosting Evolution API on Railway gives you a persistent, always-on WhatsApp API server with a public URL. Once deployed, you connect your WhatsApp number by scanning a QR code through the built-in manager dashboard. The server maintains a live WhatsApp Web session and exposes a REST API that your automation tools — like n8n — can call to send messages, receive replies via webhooks, and manage multiple WhatsApp instances. Railway handles the infrastructure so you never touch server config.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-api | [evolution-foundation/evolution-api](https://github.com/evolution-foundation/evolution-api) | Worker |

**Category:** Other · **Languages:** TypeScript, Shell, JavaScript, Dockerfile, PLpgSQL

[View on Railway →](https://railway.com/deploy/calm-vast)
