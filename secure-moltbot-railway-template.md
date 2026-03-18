# Deploy secure-moltbot-railway-template on Railway

Moltbot setup with Cloudflare Tunnel secured

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/secure-moltbot-railway-template)

## About

MoltBot is a production-ready AI chatbot framework with enterprise-grade security. This template provides one-click deployment with built-in Telegram, Discord, and Slack integrations, comprehensive security layers including Cloudflare Tunnel support, device pairing, and a user-friendly web setup wizard. Deploy your secure AI assistant in minutes.

This template deploys MoltBot with production-grade security configured out-of-the-box. It includes a web-based setup wizard accessible at `/setup` to configure chat platform integrations (Telegram, Discord, Slack) without touching the command line. The deployment features persistent state via Railway volumes, automatic SSL/TLS, health checks, and optional Cloudflare Tunnel integration for enhanced DDoS protection and custom domain support. All sensitive data is stored securely in encrypted volumes, and the setup includes multi-layer authentication: setup password protection, MoltBot gateway authentication, and device-level pairing for zero-trust security.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| secure-moltbot-railway-template | [gopalanj/secure-moltbot-railway-template](https://github.com/gopalanj/secure-moltbot-railway-template) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SETUP_PASSWORD` | (secret) |
| `MOLTBOT_STATE_DIR` | /data/.moltbot |
| `MOLTBOT_GATEWAY_TOKEN` | (secret) |
| `MOLTBOT_WORKSPACE_DIR` | /data/workspace |
| `CLOUDFLARE_TUNNEL_TOKEN` | (secret) |

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/secure-moltbot-railway-template)
