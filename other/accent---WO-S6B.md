# Deploy accent on Railway

An open-source, developer-oriented translation and localization tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WO-S6B)

## About

Accent is an open source, developer-oriented localization and translation tool developed by Mirego. 

This deployment is configured with dummy auth enabled to allow users to log in for evaluation. 

In production, it is recommended to configure any of the available authentication providers: https://github.com/mirego/accent?tab=readme-ov-file#authentication-setup

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| mirego/accent | `mirego/accent` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `ECTO_IPV6` | mirego/accent | true | Use IPV6 for Database connection (required for private networking) |
| `FORCE_SSL` | mirego/accent | true | - |
| `MAILER_FROM` | mirego/accent | - | The email address used to send emails. |
| `CANONICAL_URL` | mirego/accent | - | The public service or customer domain. |
| `DUMMY_LOGIN_ENABLED` | mirego/accent | (secret) | If specified, the password-less authentication (with only the email) will be available. |
| `RESTRICTED_PROJECT_CREATOR_EMAIL_DOMAIN` | mirego/accent | - | Only authenticated users from this domain name will be able to create new projects, remove to disable. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/bash -c "echo Starting Accent, waiting 3s for private networks && sleep 3 && /usr/local/bin/docker-entrypoint.sh start"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/WO-S6B)
