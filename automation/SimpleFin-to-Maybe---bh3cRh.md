# Deploy SimpleFin to Maybe on Railway

An add-on to sync financial accounts between SimpleFIN and Maybe 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bh3cRh)

## About

### SimpleFIN to Maybe

A synchronization tool to connect SimpleFIN accounts with Maybe Finance.

  -  SimpleFIN Integration
  -  Maybe Finance Sync
  -  Automatic Syncing
  -  Transaction Rule
  -  Transaction History
  -  Web Interface
  -  Event Notification

For any issues or bugs, please refer to the github repo and open an issue!

https://github.com/Toby-Null/SimpleFIN-to-Maybe/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SimpleFIN-to-Maybe | [Toby-Null/SimpleFIN-to-Maybe](https://github.com/Toby-Null/SimpleFIN-to-Maybe) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SimpleFIN-to-Maybe | 3000 | - |
| `DB_NAME` | SimpleFIN-to-Maybe | railway | - |
| `DB_PORT` | SimpleFIN-to-Maybe | 5432 | - |
| `DB_USER` | SimpleFIN-to-Maybe | (secret) | - |
| `NODE_ENV` | SimpleFIN-to-Maybe | development | - |
| `DB_PASSWORD` | SimpleFIN-to-Maybe | (secret) | - |
| `SESSION_SECRET` | SimpleFIN-to-Maybe | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** JavaScript, EJS, CSS

[View on Railway →](https://railway.com/deploy/bh3cRh)
