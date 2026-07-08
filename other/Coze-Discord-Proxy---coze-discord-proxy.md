# Deploy Coze Discord Proxy on Railway

Call the Discord bot managed by Coze via API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coze-discord-proxy)

## About

Coze Discord Proxy is an API gateway that lets you interact with Discord bots hosted on Coze through standard HTTP requests. It bridges your applications with Discord and Coze, making it easy to integrate AI-powered bots into websites, services, automation workflows, and custom applications.

Hosting Coze Discord Proxy on Railway provides a fast and reliable way to expose your Coze-hosted Discord bot as an API. Railway handles deployment, networking, HTTPS, and scaling, allowing you to focus on building integrations instead of managing infrastructure. Simply deploy the Docker image, configure your Discord and Coze credentials, and Railway automatically provides a public HTTPS endpoint for your application. The template requires no database or persistent storage, making deployment lightweight while remaining suitable for production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deanxv/coze-discord-proxy:latest | `deanxv/coze-discord-proxy:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Asia/Shanghai |
| `GUILD_ID` | your_discord_guild_id |
| `BOT_TOKEN` | (secret) |
| `COZE_BOT_ID` | your_coze_bot_id |
| `USER_AUTHORIZATION` | your_discord_user_token |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/coze-discord-proxy)
