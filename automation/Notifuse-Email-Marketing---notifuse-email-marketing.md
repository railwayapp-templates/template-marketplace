# Deploy Notifuse Email Marketing on Railway

Email campaigns with PostgreSQL and a protected first-run setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notifuse-email-marketing)

## About

Email campaigns with PostgreSQL and a protected first-run setup.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Three services: core, PostgreSQL and gateway. Setup routes are owner-protected; native app authentication protects normal APIs while tracking and provider callbacks remain reachable. PostgreSQL is a dedicated cluster because Notifuse creates workspace databases. v40 uses the upstream Business Source License and the free self-host tier is limited to three workspaces. Paid permissions, SES tenant features, SSO and multilingual variants are not unlocked; NOTIFUSE_LICENSE_KEY is optional and operator supplied.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17-alpine@sha256:18cfe3ef5e6815560c98237d6216d1e5119702fb0f3894c8785dd58b8bbe5d73` | Database |
| notifuse | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| core | `notifuse/notifuse:v40.0@sha256:ffc9058741be942401281da44a17f5c00befca887b46f7e5fc43b6f1cc444c69` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | notifuse | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | notifuse | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | notifuse | true | Owner auth for notifuse. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | notifuse | setup | Owner scope for notifuse. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | notifuse | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | notifuse | 8080 | Upstream port for notifuse. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | notifuse | (secret) | Generated access password. Keep private and preserve with backups. |
| `DB_HOST` | core | - | Db host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DB_NAME` | core | notifuse_system | Db name for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_PORT` | core | 5432 | Db port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_USER` | core | (secret) | Db user for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_PREFIX` | core | notifuse | Db prefix for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SMTP_HOST` | core | - | SMTP server for login/setup email. |
| `SMTP_PORT` | core | - | SMTP port, usually 587. |
| `DB_SSLMODE` | core | disable | Db sslmode for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ROOT_EMAIL` | core | - | Required operator email. Complete the protected initial setup with this address. |
| `SECRET_KEY` | core | (secret) | Generated secret key. Keep private and preserve with backups. |
| `DB_PASSWORD` | core | (secret) | Db password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ENVIRONMENT` | core | production | Environment for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SERVER_HOST` | core | 0.0.0.0 | Server host for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SERVER_PORT` | core | 8080 | Server port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `API_ENDPOINT` | core | - | Api endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SMTP_PASSWORD` | core | (secret) | SMTP password. |
| `SMTP_USERNAME` | core | (secret) | SMTP username. |
| `SMTP_FROM_EMAIL` | core | - | Verified sender address. |
| `SMTP_BRIDGE_ENABLED` | core | false | Smtp bridge enabled for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `NOTIFUSE_LICENSE_KEY` | core | - | Optional paid upstream license; no license is included. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/notifuse-email-marketing)
