# Deploy farmOS Farm Records on Railway

Farm planning, asset and activity records with PostgreSQL and file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/farmos-farm-records)

## About

Farm planning, asset and activity records with PostgreSQL and file storage.

farmOS 4.0.6 provides farm planning, asset records and activity logs on Drupal, backed by PostgreSQL. A single app volume persists the Drupal sites directory, uploaded files, settings and signing keys. Apache recognizes HTTPS forwarded by the private owner gateway, so the installer uses the public HTTPS address.

| Service | Access | Persistent storage |
| --- | --- | --- |
| postgres | Private | /var/lib/postgresql/data |
| core | Private | /data |
| farmos | Public HTTPS | None |

Railway terminates public TLS. Keep volume-backed services at one replica. Database and core application ports are private; only the generated owner gateway is public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Database |
| farmos | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| postgres | `postgres:17@sha256:f4c66b820c6f974249089d3d16d86a3698eae11e8746eb6644b2271031e91232` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | core | UTC | Tz for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SETUP_DATABASE_HOST` | core | - | Copy this private hostname into the protected PostgreSQL installer. This is an operator reference, not an automatic farmOS setting. |
| `SETUP_DATABASE_NAME` | core | farm | Use this existing database name in the installer. |
| `SETUP_DATABASE_PORT` | core | 5432 | Use this PostgreSQL port in the installer. |
| `SETUP_DATABASE_USER` | core | (secret) | Use this database user in the installer. |
| `SETUP_DATABASE_PASSWORD` | core | (secret) | Copy this generated password into the installer. Preserve it with the database backup. |
| `PORT` | farmos | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | farmos | true | Owner auth for farmos. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | farmos | all | Owner scope for farmos. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | farmos | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | farmos | 80 | Upstream port for farmos. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | farmos | (secret) | Generated access password. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | farm | Initial PostgreSQL database name, or the matching database selected by the application. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/farmos-farm-records)
