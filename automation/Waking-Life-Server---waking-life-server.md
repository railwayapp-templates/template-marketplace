# Deploy Waking Life Server on Railway

Telegram Unifi Monitoring Bot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waking-life-server)

## About

A production-ready webhook service that transforms UniFi Protect camera alerts into intelligent Telegram notifications with priority routing, interactive responses, and optional snapshots - all for ~$2/month.

This FastAPI-based service receives motion detection events from UniFi Protect and forwards them to Telegram with smart filtering, priority-based routing to multiple chats, and interactive acknowledgment buttons. Deploy in minutes via GitHub integration with automatic updates. Railway's persistent environment variables securely store your credentials, while the lightweight architecture keeps hosting costs minimal. Includes health checks, chat ID discovery tools, and comprehensive logging for easy maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| waking_life_server | [KingRaver/waking_life_server](https://github.com/KingRaver/waking_life_server) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FILTER_MODE` | all |
| `UNIFI_WH_HOST` | 10.40.1.1 |
| `SEND_SNAPSHOTS` | true |
| `UNIFI_LAKE_HOST` | 10.0.1.115 |
| `TELEGRAM_CHAT_ID` | -1003072929886 |
| `PROTECT_WH_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |
| `UNIFI_PROTECT_HOST` | 10.0.1.115 |
| `PROTECT_LAKE_API_KEY` | (secret) |
| `UNIFI_PROTECT_PASSWORD` | (secret) |
| `UNIFI_PROTECT_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/waking-life-server)
