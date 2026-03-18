# Deploy Standalone `pgvector` Service on Railway

A PostgreSQL instance with `vector` extension enabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uYYYQy)

## About

This template deploys a Postgres instance with `pgvector`, an extension which gives your normal Postgres database the power of a vector database.

## ✨ Features

- Everything of a normal Postgres database.
- Goodies of a vector database made by a mature ecosystem.

## 💁‍♀️ How to use

- Click the Railway button.
- Add the required environment variables.
- Deploy.

## 📝 Notes

- `pgvector`: https://github.com/pgvector/pgvector
- `PostgreSQL`: https://www.postgresql.org/docs/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | [edmondwinston/railway-pgvector](https://github.com/edmondwinston/railway-pgvector) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | Your database name.  If it is not specified, then the value of POSTGRES_USER will be used. |
| `POSTGRES_USER` | (secret) | Your database username. |
| `POSTGRES_PASSWORD` | (secret) | Your database password. |

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/uYYYQy)
