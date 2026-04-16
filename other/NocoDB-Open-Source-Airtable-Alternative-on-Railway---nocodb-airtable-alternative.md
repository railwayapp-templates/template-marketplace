# Deploy NocoDB | Open Source Airtable Alternative on Railway on Railway

Self Host NocoDB. Turn any database into a smart spreadsheet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-airtable-alternative)

## About

Deploy NocoDB on Railway to get a fully self-hosted Airtable alternative backed by PostgreSQL. NocoDB turns any database into a smart spreadsheet with grid, gallery, kanban, calendar, and form views — all without writing code.

This Railway template pre-configures NocoDB with a managed PostgreSQL database and persistent volume storage. Self-host NocoDB on Railway and get unlimited users, unlimited storage, and full API access with zero per-seat pricing.

![NocoDB Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776264238/noco_db_railway_arch_ldohoh.png)

NocoDB is an open-source no-code database platform with 62.7k+ GitHub stars. It provides a spreadsheet interface on top of relational databases, making production data accessible to non-technical team members without SQL.

- **Multiple views**: Grid, Gallery, Kanban, Calendar, Form
- **Rich field types**: Attachments, formulas, lookups, rollups, links, QR codes
- **Role-based access control**: Owner, Creator, Editor, Commenter, Viewer roles
- **REST API**: Auto-generated API for every table with Swagger docs
- **Webhooks and automations**: Trigger actions on record create, update, delete
- **Integrations**: Slack, Discord, Mattermost, AWS S3, Minio, SMTP

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| NocoDB | `nocodb/nocodb:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | NocoDB | 8080 | HTTP server listening port |
| `NC_DB` | NocoDB | - | Postgres connection configuration string |
| `NC_REDIS_URL` | NocoDB | - | Redis connection string |
| `NODE_OPTIONS` | NocoDB | --max-old-space-size=512 | Node memory allocation settings |
| `NC_PUBLIC_URL` | NocoDB | - | Public base URL for instance |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | JWT secret for authentication tokens |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nocodb-airtable-alternative)
