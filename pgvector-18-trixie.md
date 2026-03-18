# Deploy pgvector 18 trixie on Railway

Open-source vector similarity search for Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pgvector-18-trixie)

## About

run the following SQL in your database
```
CREATE EXTENSION IF NOT EXISTS vector;
```


Connect with: Postgres.Variables. DATABASE_PUBLIC_URL

A fork of Railway's Postgres 17 with Postgres 18 and pgvector support. Everything is working the same as the original Railway Postgres including UIs, connection management, and more.

**pgvector** is a powerful open-source extension for PostgreSQL that enables vector similarity search, making it ideal for AI and machine learning applications. Built on Postgres 18, this deployment combines the latest PostgreSQL features with native support for storing and querying high-dimensional vectors.

Hosting pgvector involves provisioning a managed PostgreSQL instance with the pgvector extension pre-installed, configuring storage, networking, and security settings, and ensuring automated backups and updates. Deploying on a platform like Railway abstracts away much of the operational complexity, providing developers with easy access to database endpoints, monitoring, and scaling options. With minimal setup, you can focus on building your AI-powered application while Railway manages infrastructure, uptime, and maintenance for your vector database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18-trixie` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`

**Category:** Other

[View on Railway →](https://railway.com/template/pgvector-18-trixie)
