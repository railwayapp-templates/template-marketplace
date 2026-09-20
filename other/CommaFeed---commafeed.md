# Deploy CommaFeed on Railway

Self-hosted RSS reader with PostgreSQL and private gateway access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/commafeed)

## About

Self-hosted RSS reader with PostgreSQL and private gateway access.

| Service | Access | Persistent storage |
| --- | --- | --- |
| commafeed | Public HTTPS | None |
| app | Private | None |
| postgres | Private | /var/lib/postgresql/data |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| commafeed | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `athou/commafeed:7.3.2-postgresql@sha256:d6bc790a175c29ba5c3b37ccd71297ededc000615dbb7fe32e13d2df0592f95d` | Database |
| postgres | `postgres:17@sha256:f4c66b820c6f974249089d3d16d86a3698eae11e8746eb6644b2271031e91232` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | commafeed | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | commafeed | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | commafeed | all | Protect all application routes. |
| `UPSTREAM_HOST` | commafeed | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | commafeed | 8082 | Upstream port for commafeed. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | commafeed | (secret) | Generated access password. Keep private and preserve with backups. |
| `QUARKUS_HTTP_HOST` | app | 0.0.0.0 | Quarkus http host for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `QUARKUS_HTTP_PORT` | app | 8082 | Quarkus http port for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `QUARKUS_DATASOURCE_JDBC_URL` | app | - | Quarkus datasource jdbc url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUARKUS_DATASOURCE_PASSWORD` | app | (secret) | Quarkus datasource password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `QUARKUS_DATASOURCE_USERNAME` | app | (secret) | Quarkus datasource username for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `COMMAFEED_USERS_ALLOW_REGISTRATIONS` | app | false | Commafeed users allow registrations for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `COMMAFEED_USERS_CREATE_DEMO_ACCOUNT` | app | false | Commafeed users create demo account for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `COMMAFEED_USERS_MINIMUM_PASSWORD_LENGTH` | app | (secret) | Commafeed users minimum password length for app. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `QUARKUS_HTTP_AUTH_SESSION_ENCRYPTION_KEY` | app | - | Generated quarkus http auth session encryption key. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | commafeed | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/commafeed)
