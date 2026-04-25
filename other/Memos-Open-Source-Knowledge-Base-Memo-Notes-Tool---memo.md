# Deploy Memos (Open-Source Knowledge Base & Memo Notes Tool) on Railway

Memos [May ’26] (Open-Source Knowledge Base & Memo Notes Tool), Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memo)

## About

Memos App is a free, open-source knowledge base and memo notes tool available on GitHub. It offers a lightweight yet powerful way to capture thoughts, store online memos, and collaborate. With Memos, you gain full control over your notes and data, whether you self host the memos app or use managed memos hosting. This makes it one of the most flexible **free note taking tools** for individuals, teams, and enterprises. You can host it directly by clicking the 'Deploy Now' button.

You can self host the **Memos App** to keep all your online memo notes and configurations under your control, with zero third-party dependencies. The **self hosted memos app** is built to be simple, privacy-friendly, and easy to deploy. With Railway, you can launch Memos in just one click without worrying about server setup, scaling, or ongoing maintenance. This makes Railway the perfect choice for deploying **oss memos hosting** or experimenting with new workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memos-github | [Shinyduo/memos-github](https://github.com/Shinyduo/memos-github) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MEMOS_DRIVER` | memos-github | postgres |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/memos`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/memo)
