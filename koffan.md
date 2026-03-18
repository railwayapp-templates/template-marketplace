# Deploy Koffan on Railway

Free selfhosted groceries list for families and shared households.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/koffan)

## About

Koffan is an ultra-lightweight, self-hosted shopping list web app designed for families and shared households. It provides real-time synchronization across devices, offline support, and a simple password-based login, all while consuming minimal system resources.

Hosting Koffan is intentionally simple. The application is a single Go binary backed by SQLite, packaged to run cleanly in a containerized environment. On Railway, deployment requires no external services beyond persistent storage and environment variables. The app listens on a single port, manages its own database file, and supports WebSocket-based real-time updates out of the box. Resource usage is extremely low (~2.5 MB RAM idle), making it well-suited for small instances and cost-efficient deployments.

⚠️ **Authentication note**: Koffan requires an application password. Railway will generate an `APP_PASSWORD` environment variable at deploy time, or you may set it manually. This password is required to log in to the app after startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Koffan | [PanSalut/Koffan](https://github.com/PanSalut/Koffan) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port of the application. |
| `APP_ENV` | production | Application environment. |
| `DB_PATH` | /data/shopping.db | Database path for SQLite. |
| `APP_PASSWORD` | (secret) | Application password. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/koffan)
