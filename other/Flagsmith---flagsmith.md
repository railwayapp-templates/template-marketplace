# Deploy Flagsmith on Railway

Open-source feature flag & remote config platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flagsmith)

## About

Flagsmith is an open-source feature flag and remote configuration platform that helps teams control feature rollouts, manage environment-specific configurations, and experiment safely without redeploying code. It supports multi-environment setups, user segmentation, and real-time flag updates across web, mobile, and backend applications.

Hosting Flagsmith involves deploying its API, UI, and background task processor along with a PostgreSQL database for storing feature flags, environments, users, and analytics data. In production setups, Flagsmith typically runs as containerized services and relies on environment variables for configuration such as database connections, allowed hosts, and domain settings. Railway simplifies this process by handling container orchestration, networking, scaling, and environment management, allowing you to focus on feature management instead of infrastructure maintenance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres-bm9x | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| flagsmith/flagsmith:latest | `flagsmith/flagsmith:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres-bm9x | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-bm9x | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-bm9x | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-bm9x | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres-bm9x | - | Public URL to connect to Postgres database, used by the Data panel. |
| `LOG_LEVEL` | flagsmith/flagsmith:latest | WARNING | Lower log level = lower log volume  Saves Railway log quota  Easier debugging when scaling |
| `ENVIRONMENT` | flagsmith/flagsmith:latest | production | # set to 'production' in production. |
| `DATABASE_URL` | flagsmith/flagsmith:latest | - | DATABASE_URL = internal DB connection string used by Flagsmith/Django. |
| `ALLOWED_HOSTS` | flagsmith/flagsmith:latest | - | ALLOWED_HOSTS - Flagsmith internal usage Some Flagsmith components still read this Acts as a fallback / compatibility var |
| `FLAGSMITH_DOMAIN` | flagsmith/flagsmith:latest | - | FLAGSMITH_DOMAIN - Used to generate: Invite links Password reset URLs OAuth callbacks Webhook URLs |
| `DJANGO_ALLOWED_HOSTS` | flagsmith/flagsmith:latest | - | Django security - Tells Django which domains can serve requests | Prevents Host-header attacks |
| `USE_POSTGRES_FOR_ANALYTICS` | flagsmith/flagsmith:latest | true | # Store API and Flag Analytics data in Postgres |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/flagsmith)
