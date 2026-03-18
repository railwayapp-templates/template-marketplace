# Deploy Docmost on Railway

Collaborative wiki and documentation. Alternative to Notion & Confluence. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/W4t6Ei)

## About

# Docmost

Docmost is an open-source collaborative wiki and documentation software. It is an open-source alternative to Confluence and Notion. 

After deploying, register your first user as the admin.

## Features
- Real-time collaboration
- Spaces
- Permissions management
- Groups
- Comments
- Page history
- Search
- File attachment

## Known Issues

The Docmost container connects to the Redis instance through the public URL. Connecting through the private URL results in errors. I am working on a fix.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:latest` | Database |
| docmost/docmost:latest | `docmost/docmost:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Valkey | - | Railway Private Domain Name. |
| `REDISPORT` | Valkey | 6379 | Port to connect to Redis. |
| `REDISUSER` | Valkey | default | Default user to connect to Redis. |
| `REDIS_URL` | Valkey | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Valkey | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Valkey | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Valkey | - | Public URL to connect to Redis, needed for the Data panel. |
| `APP_SECRET` | docmost/docmost:latest | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data/storage`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/W4t6Ei)
