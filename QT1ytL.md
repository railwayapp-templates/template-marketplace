# Deploy Joplin on Railway

Elevate your productivity with this versatile and intuitive template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/QT1ytL)

## About

# Joplin Template

## Overview

This Joplin template provides a convenient starting point for various projects. It's designed to streamline your workflow and enhance productivity.

## Credentials

The default credentials are:
1. **Email:** `admin@localhost`
2. **Password:** `admin`

( Recommended to change these credentials after deploying Joplin )

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Joplin | `ghcr.io/etechonomy/joplin-server:3.3.13` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `APP_PORT` | Joplin | 3000 | The port your app runs on |
| `DB_CLIENT` | Joplin | pg | - |
| `APP_BASE_URL` | Joplin | - | Your app's base URL |
| `TINI_SUBREAPER` | Joplin | 1 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `tini -- yarn start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/QT1ytL)
