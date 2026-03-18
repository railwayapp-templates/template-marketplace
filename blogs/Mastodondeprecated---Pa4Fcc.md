# Deploy Mastodon(deprecated) on Railway

An unofficial template for Mastodon

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Pa4Fcc)

## About

### This template is deprecated. The image version will not be updated beyond 4.2.13

---

This is an unofficial template for [Mastodon](https://joinmastodon.org/).

**Note: This template only works with the Hobby plan or higher.**

It is set up for single-user mode, but can also be used in regular mode by adding a mail server.

For detailed instructions, please check the README.

https://github.com/mkizka/mastodon-railway-template

Please report any issues [here](https://github.com/mkizka/mastodon-railway-template/issues). Thank you!

Template icon: https://joinmastodon.org/ja/branding

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mastodon | `ghcr.io/mkizka/mastodon-railway` | Web service |
| Mastodon-Streaming | `ghcr.io/mkizka/mastodon-railway` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OTP_SECRET` | Mastodon | (secret) | - |
| `OWNER_EMAIL` | Mastodon | - | Email for owner account. |
| `OWNER_USERNAME` | Mastodon | (secret) | Username for owner account. |
| `SECRET_KEY_BASE` | Mastodon | (secret) | - |
| `SINGLE_USER_MODE` | Mastodon | true | - |
| `PORT` | Mastodon-Streaming | 4000 | - |
| `OTP_SECRET` | Mastodon-Streaming | (secret) | - |
| `SECRET_KEY_BASE` | Mastodon-Streaming | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mastodon/public/system`
- **Start command:** `node ./streaming`
- **Healthcheck:** `/api/v1/streaming/health`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/Pa4Fcc)
