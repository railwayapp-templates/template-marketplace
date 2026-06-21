# Deploy Bemby on Railway

Bemby | Emby 签到保活面板 ｜ Keep Emby account active

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bemby)

## About

Bemby is a self-hosted automation tool for managing daily Telegram bot check-ins and Emby video watch sessions. It includes a web admin portal supporting multiple accounts, a built-in task scheduler, real-time logs, AI-assisted button recognition, and Telegram notifications.

Hosting Bemby involves running a persistent Node.js/Express server that maintains active Telegram MTProto connections and a background task scheduler. All data is stored in a SQLite database, so a persistent volume is required to survive restarts. A single container serves the backend API, the Vue 3 web portal, and the scheduler together. Railway provisions the container directly from the official Docker Hub image and exposes it on port 3000. You supply an admin username, password, and a JWT secret at deploy time — everything else is handled automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bemby | `liveinaus/bemby:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | ${TZ:-Asia/Shanghai} | 时区 |
| `JWT_SECRET` | (secret) | 请修改 JWT 密钥 |
| `ADMIN_PASSWORD` | (secret) | 默认密码 |
| `ADMIN_USERNAME` | (secret) | 默认用户名 |

## Configuration

- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bemby)
