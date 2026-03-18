# Deploy Joplin (Open-Source Note-Taking & Knowledge Management Platform) on Railway

Joplin [Mar ’26] (Markdown Notes, Task List & E2E Encrypted Sync) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/joplin)

## About

Joplin is a free, open-source note-taking and to-do application available on GitHub, offering privacy-focused personal knowledge management as an alternative to proprietary cloud apps like Evernote and Notion.

You can self host Joplin to keep all your notes, to-dos, and personal information entirely under your control, with zero third-party involvement. With Joplin note management, you benefit from advanced markdown support, synchronisation across devices, and complete data privacy tailored to your needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| server | `joplin/server:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `APP_PORT` | server | 22300 |
| `DB_CLIENT` | server | pg |
| `POSTGRES_USER` | server | (secret) |
| `POSTGRES_PASSWORD` | server | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/template/joplin)
