# Deploy Apache Answer + Postgres on Railway

Community‑driven Q&A/knowledge‑base platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-answer-postgres)

## About

**Apache Answer** is an open-source Q&amp;A platform built as a modern alternative to Stack Overflow. It enables teams and communities to create self-hosted question-and-answer sites with features such as reputation systems, moderation tools, tagging, and plugin-based extensibility.

Hosting Apache Answer on Railway with Postgres involves running the Apache Answer application alongside a managed PostgreSQL database. This template includes Postgres as part of the deployment, but database configuration is completed during the Apache Answer setup flow. During initial setup in the Apache Answer UI, users must select **PostgreSQL** as the database type and provide the appropriate connection details. Railway manages the database lifecycle, networking, and persistence, while Apache Answer handles schema initialization and migrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Apache Answer | `apache/answer:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/apache-answer-postgres)
