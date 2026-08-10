# Deploy Picsur on Railway

Easily host and programmatically transform your own images.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picsur)

## About

This community template runs Picsur 0.5.6 with PostgreSQL 17.4. Picsur is the
only public service: Railway terminates HTTPS and routes traffic to port `8080`,
while database traffic remains on Railway's private network. Railway checks `/`
before marking the application healthy. PostgreSQL stores uploaded images and
application metadata on a persistent volume mounted at
`/var/lib/postgresql`. Required database settings use service references, and
the database and administrator passwords use deployment-time generators, so no
credential input or value is included in this overview. Upstream labels Picsur
as beta and currently states that the project is not maintained; assess that
status before using it for public or production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:17.4@sha256:fe3f571d128e8efadcd8b2fde0e2b73ebab6dbec33f6bfe69d98c682c7d8f7bd` | Database |
| Picsur | `ghcr.io/caramelfur/picsur:0.5.6@sha256:209ce21d338cd7d9a1adc838a67695e903149359bf192359819607df1b3c4417` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | picsur |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PICSUR_PORT` | Picsur | 8080 |
| `PICSUR_DB_PORT` | Picsur | 5432 |
| `PICSUR_DB_PASSWORD` | Picsur | (secret) |
| `PICSUR_DB_USERNAME` | Picsur | (secret) |
| `PICSUR_MAX_FILE_SIZE` | Picsur | 128000000 |
| `PICSUR_ADMIN_PASSWORD` | Picsur | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/picsur)
