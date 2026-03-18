# Deploy Zitadel on Railway

Robust & customizable turnkey solution for authentication and authorization

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Q0uE7q)

## About

Are you searching for a user management tool that is quickly set up like Auth0 and open source like Keycloak?

Do you have a project that requires multi-tenant user management with self-service for your customers?

Look no further — ZITADEL is the identity infrastructure, simplified for you.

This template spins up Zitadel instance and connects it to a Postgres database.
First time you login, you can access the instance by visting your railway public url and with the following credentials:

root@email.com
RootPassword1!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Zitadel-railway | [leonardochappuis/Zitadel-railway](https://github.com/leonardochappuis/Zitadel-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default DB name |
| `DATABASE_URL` | Postgres | - | Connection URL |
| `POSTGRES_USER` | Postgres | (secret) | default postgres user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Default Postgres Password |
| `DATABASE_PRIVATE_URL` | Postgres | - | private connection URL string |
| `PORT` | Zitadel-railway | 8080 | Internal Zitadel Port |
| `ZITADEL_MASTERKEY` | Zitadel-railway | - | Zitadel masterkey |
| `ZITADEL_EXTERNALPORT` | Zitadel-railway | 443 | default https port |
| `ZITADEL_EXTERNALDOMAIN` | Zitadel-railway | - | your public accessible domain |
| `ZITADEL_EXTERNALSECURE` | Zitadel-railway | true | If access should be ssl |
| `ZITADEL_DATABASE_POSTGRES_HOST` | Zitadel-railway | - | Postgres HOST |
| `ZITADEL_DATABASE_POSTGRES_PORT` | Zitadel-railway | - | Postgres PORT |
| `ZITADEL_FIRSTINSTANCE_ORG_NAME` | Zitadel-railway | First | First organization name |
| `ZITADEL_DATABASE_POSTGRES_DATABASE` | Zitadel-railway | - | Postgres Database Name |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | Zitadel-railway | (secret) | Postgres PASSWORD |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | Zitadel-railway | disable | Default ssl mode for postgres |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | Zitadel-railway | (secret) | PGUSER |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | Zitadel-railway | (secret) | Postgres Password |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | Zitadel-railway | disable | default ssl mode for postgres access |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | Zitadel-railway | (secret) | Postgres USER |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD` | Zitadel-railway | (secret) | admin password |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME` | Zitadel-railway | (secret) | admin username |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_EMAIL_ADDRESS` | Zitadel-railway | root@email.com | Admin login |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/Q0uE7q)
