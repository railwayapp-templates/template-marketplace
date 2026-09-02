# Deploy Astrbot on Railway

AI Agent Assistant & Chatbot Platform - multi-platform, LLM-agnostic

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/astrbot-1)

## About

Deploying AstrBot on Railway gives you a self-hosted AI agent platform with persistent storage, automatic scaling, and a managed environment. No server maintenance required.

AstrBot runs as a single container on Railway with a persistent volume for SQLite data. The WebUI is served on port 6185 and accessible via your Railway public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| astrbot | [INAPP-Mobile/astrbot](https://github.com/INAPP-Mobile/astrbot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone (e.g., UTC, America/New_York, Asia/Shanghai) |
| `ASTRBOT_DASHBOARD_INITIAL_PASSWORD` | (secret) | Initial password for the AstrBot dashboard (username: astrbot). Must be 8+ chars with uppercase, lowercase, and digit. Change after first login. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/AstrBot/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/astrbot-1)
