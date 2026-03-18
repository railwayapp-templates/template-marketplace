# Deploy Postgres17 + Extensions on Railway

Railway Postgres 17 + Extensions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/daaDbI)

## About

This template deploys a production-ready PostgreSQL 17 instance with SSL certificates automatically generated and renewed. Unlike the standard Railway Postgres template, this image includes five popular extensions compiled from source and ready to enable, plus a built-in nanoid() function for generating compact, URL-friendly unique IDs. The image is specifically versioned to match PGLite, allowing developers to use PGLite for fast local testing while deploying to this identical environment in production. SSL certificates are valid for 820 days by default and automatically renew when the container restarts if expiring within 30 days.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres-ssl:17 | `ghcr.io/derek-rein/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Postgres Database Name |
| `DATABASE_URL` | - | Connection Url (Public) |
| `PGPRIVATEHOST` | - | Postgres Private Host |
| `POSTGRES_USER` | (secret) | Postgres Username |
| `POSTGRES_PASSWORD` | (secret) | Randomly Generated Password |
| `DATABASE_PRIVATE_URL` | - | Database Connection URL (Internal) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/daaDbI)
