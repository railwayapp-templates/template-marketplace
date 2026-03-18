# Deploy genius-invokation on Railway

Deploy and Host genius-invokation with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/genius-invokation)

## About

A Genius Invokation TCG simulator in TypeScript

This template will deploy:

- A PostgreSQL database to store users, games and decks

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| genius-invokation | [genius-invokation/genius-invokation](https://github.com/genius-invokation/genius-invokation) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | genius-invokation | (secret) | - |
| `GH_CLIENT_SECRET` | genius-invokation | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, C++, Python, CSS, C#, C, JavaScript, HTML, Rust, CMake, Dockerfile

[View on Railway →](https://railway.com/deploy/genius-invokation)
