# Deploy Telegram MTProto Proxy on Railway

[Jun'26] Run your own private Telegram MTProto proxy in minutes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-mtproto-proxy)

## About

Self-Hosted Telegram MTProto Proxy lets you run a private Telegram proxy server using Telegram's native MTProto protocol. This template uses the official `telegrammessenger/proxy` container and keeps the proxy configuration persistent with Railway volume storage.

Hosting a Telegram MTProto Proxy means running a lightweight TCP-based proxy service that Telegram clients can connect to directly. It does not run a web dashboard, REST API, or normal HTTP application. Instead, it listens for MTProto traffic and forwards Telegram client connections through your deployed proxy service.

This template is designed for a simple self-hosted setup: deploy the container, attach persistent storage, enable Railway TCP Proxy, then use the generated TCP hostname, port, and secret to create your Telegram proxy link.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `telegrammessenger/proxy:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET` | (secret) |

## Configuration

- **TCP Proxies:** 443
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/telegram-mtproto-proxy)
