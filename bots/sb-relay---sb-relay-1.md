# Deploy sb-relay on Railway

抓取 sb.sb 论坛的通知，并转发到 Telegram 机器人

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sb-relay-1)

## About

sb-relay is a lightweight, self-hosted notification relay for the sb.sb forum. It periodically checks your forum notifications and forwards new alerts directly to Telegram through your own bot. Built with Go, it features notification deduplication, burst handling across multiple pages, configurable polling intervals, and persistent state support.

Hosting sb-relay on Railway provides an easy way to keep the relay running 24/7 without maintaining your own server. The application runs as a lightweight container and requires only a few environment variables: your sb.sb user ID and authentication cookie, plus a Telegram bot token and target chat ID. By default, sb-relay checks for new notifications every 60 seconds, although the interval can be customized. For reliable deduplication across deployments and restarts, attaching a Railway persistent volume to /data is recommended. No database, web server, or additional infrastructure is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sb-relay | `ghcr.io/krabdo/sb-relay:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SB_COOKIE` | - | 完整 Cookie 值 |
| `SB_USER_ID` | - | 论坛中的数字用户 ID |
| `STATE_FILE` | /data/state.json | 状态文件路径 |
| `POLL_INTERVAL` | 60s | 轮询间隔，最短 10s |
| `TELEGRAM_CHAT_ID` | - | Telegram 聊天 ID |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram Bot Token |

**Category:** Bots

[View on Railway →](https://railway.com/deploy/sb-relay-1)
