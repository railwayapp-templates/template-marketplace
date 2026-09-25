# Deploy Muninn on Railway

A live website for your guild's Valheim server. Players install nothing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/muninn)

## About

Muninn is a free, open-source website for a Valheim guild. A plugin on your dedicated server reports what happens in the world, and the site shows it live: who is online, bosses, raids, deaths, builds, the world map, a world clock and a comfort planner. Players install nothing.

This template runs the Muninn site from its public Docker image, with a PostgreSQL database and a volume for its nightly backups. The database address is filled in for you, and the site generates its own secrets when it first starts. Open `/admin` on the new domain to set the admin password. The admin Plugin page then gives you the plugin and a config with your site's address and secret: put both in BepInEx on your Valheim dedicated server and restart it. The Plugin page shows when the server first reports in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | `ghcr.io/oddessentials/muninn:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | web | 3000 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/backups`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/muninn)
