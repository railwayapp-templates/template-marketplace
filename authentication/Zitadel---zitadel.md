# Deploy Zitadel on Railway

Deploy a modern IAM solution with Zitadel on Railway in minutes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zitadel)

## About

**Zitadel** is a modern identity and access management (IAM) solution built for the cloud. It provides authentication, authorization, user management, and identity federation with support for standards like OAuth2, OpenID Connect, and SAML—without needing a dedicated DevOps team.

**Short Description:** Deploy a modern IAM solution with Zitadel on Railway in minutes.

Hosting Zitadel involves running a secure and scalable IAM platform with PostgreSQL as the primary database. Deployment typically includes configuring environment variables, setting up the database backend, and securing the system with appropriate service accounts and secrets. With Railway, the entire process becomes easier—Zitadel can be deployed with a single click using Docker, removing the need for manual server setup or configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zitadel | [sethumadhavan-k/zitadel](https://github.com/sethumadhavan-k/zitadel) | Worker |
| zitadel-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ZITADEL_MASTERKEY` | zitadel | - | A secure 32-byte encryption key used for cryptographic operations. Must remain secret |
| `ZITADEL_EXTERNALDOMAIN` | zitadel | - | Publicly accessible domain for your Zitadel instance (e.g., auth.example.com) |
| `ZITADEL_EXTERNALSECURE` | zitadel | true | Indicates if the external domain uses HTTPS. Set to "true" for production |
| `ZITADEL_DATABASE_POSTGRES_HOST` | zitadel | - | Hostname of the PostgreSQL database. Usually auto-injected by Railway as ${{postgres.PGHOST}} |
| `ZITADEL_DATABASE_POSTGRES_PORT` | zitadel | - | Port number of the PostgreSQL database. Usually ${{postgres.PGPORT}} |
| `ZITADEL_DATABASE_POSTGRES_DATABASE` | zitadel | zitadel | Name of the Zitadel database (usually "zitadel") |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | zitadel | (secret) | Password for the above DB user. Default is "zitadel" for dev. Use strong password in production |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | zitadel | disable | SSL mode for application DB connection. Use "disable" for local/dev |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | zitadel | (secret) | Application-specific DB user used by Zitadel. Default is "zitadel" |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | zitadel | (secret) | Admin password for PostgreSQL. Referenced from the Railway PostgreSQL plugin |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | zitadel | disable | SSL mode for the admin connection (usually "disable" in dev, use "require" in prod) |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | zitadel | (secret) | Admin username for the PostgreSQL instance. Populated from Railway's service variables |
| `POSTGRES_DB` | zitadel-postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | zitadel-postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | zitadel-postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | zitadel-postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | zitadel-postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/zitadel)
