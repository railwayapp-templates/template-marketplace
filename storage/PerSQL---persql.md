# Deploy PerSQL on Railway

An isolated SQLite database for your Railway service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/persql)

## About

PerSQL gives each app, agent, PR, or tenant its own isolated SQLite database on the edge, backed by Cloudflare Durable Objects. Provision one instantly, then read and write it over a typed HTTP API or the PerSQL SDK. You pay only for the requests, rows, and storage you use — there is no per-database fee.

This template deploys a minimal Node web service that connects to a PerSQL database — a starter for running a PerSQL-backed app on Railway. The database itself lives on PerSQL's edge (Cloudflare Durable Objects), not on Railway, so the service you deploy here is stateless: it talks to the database over HTTPS. Before deploying, provision a database and a scoped token at railway.persql.com/connect — you will get three values. Set them as the service's environment variables (`PERSQL_API_URL`, `PERSQL_DATABASE`, `PERSQL_TOKEN`), and the app reads and writes SQL through the PerSQL SDK. Railway runs the build, the healthcheck, and serves the public URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-starter | [persql/railway-starter](https://github.com/persql/railway-starter) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PERSQL_TOKEN` | (secret) | Admin token for that database from railway.persql.com/connect |
| `PERSQL_API_URL` | https://api.persql.com | PerSQL API base URL. Leave as the default. |
| `PERSQL_DATABASE` | - | Your <namespace>/<db-slug> from railway.persql.com/connect |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/healthz`

**Category:** Storage · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/persql)
