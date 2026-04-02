# Deploy AdonisJS Railway Template on Railway

A template to simply deploy Adonisjs7 and PostgreSQL to Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adonisjs-railway-template)

## About

A template to simply deploy Adonisjs7 and PostgreSQL to Railway.

A simple starter template for deploying an AdonisJS 7 + Inertia.js React + PostgreSQL full-stack application to Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| adonisjs-railway-template | [yuta-hayashi/adonisjs-railway-template](https://github.com/yuta-hayashi/adonisjs-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | adonisjs-railway-template | UTC | Your application's time zone. |
| `HOST` | adonisjs-railway-template | 0.0.0.0 | - |
| `APP_KEY` | adonisjs-railway-template | - | Secret string of execution result of node ace generate:key --show |
| `DB_USER` | adonisjs-railway-template | (secret) | - |
| `NODE_ENV` | adonisjs-railway-template | production | - |
| `LOG_LEVEL` | adonisjs-railway-template | info | Can be changed according to your preference. |
| `DB_PASSWORD` | adonisjs-railway-template | (secret) | - |
| `SESSION_DRIVER` | adonisjs-railway-template | cookie | Can be changed according to your preference. |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `cd build && node bin/server.js`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript, Edge

[View on Railway →](https://railway.com/deploy/adonisjs-railway-template)
