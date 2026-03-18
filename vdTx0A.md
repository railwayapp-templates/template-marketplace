# Deploy DiscordPy Advanced on Railway

An advanced boilerplate for bots using discord.py

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vdTx0A)

## About

## Overview

This bot comes bundled with a bunch of things to make sure you kick-start your bot with most basic items that it needs.

## Highlights

- Intuitive cog-based architecture
- Base context and cogs for better scalability

- Comes bundled with:
  - Logging
  - Boilerplate help command
  - Owner commands
  - Global error handler

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bot | [GetPsyched/dpy-boilerplate-advanced](https://github.com/GetPsyched/dpy-boilerplate-advanced) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `LOG_URL` | Bot | - | A valid Discord webhook URL for the bot to send logs |
| `BOT_TOKEN` | Bot | (secret) | The token of the bot on which this code will run |
| `DEV_BOT_TOKEN` | Bot | (secret) | The token of the bot this code will run when in dev mode |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots · **Languages:** Python

[View on Railway →](https://railway.com/template/vdTx0A)
