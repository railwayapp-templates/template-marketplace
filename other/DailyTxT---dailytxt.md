# Deploy DailyTxT on Railway

DailyTxT is an encrypted Diary/Journal WebApp

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dailytxt)

## About

DailyTxT is an encrypted, self-hosted diary and journaling web application. It encrypts entries and uploaded files before storing them on disk, supports Markdown, tagging, search, multi-user accounts with per-user keys, and includes a lightweight admin panel for managing access.

DailyTxT runs as a single Docker-based web service and does not require an external database. All data is stored as encrypted JSON files on disk, making deployment simple and portable. On Railway, you attach one persistent volume to retain journal entries and uploads across deploys, set a required secret token, and optionally configure admin access and registration behavior. A common setup is to temporarily enable registration to create initial users, then disable it and manage users via the admin panel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DailyTxT | `phitux/dailytxt:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `INDENT` | 4 | - |
| `SECRET_TOKEN` | (secret) | - |
| `ADMIN_PASSWORD` | (secret) | - |
| `LOGOUT_AFTER_DAYS` | 30 | - |
| `ALLOW_REGISTRATION` | true | Disable after first user registration |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/dailytxt)
