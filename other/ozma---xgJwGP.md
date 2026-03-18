# Deploy ozma on Railway

A CRM/ERP platform for rapid development of customizable web apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xgJwGP)

## About

Ozma is an open-source CRM/ERP platform that allows for the rapid development of customizable enterprise systems. Build and tailor CRM/ERP solutions quickly and efficiently to meet your business needs.

### Features

* Low-Code Development: Accelerate your system development;
* Fully Customizable: Adaptable to any business process.
* Developer-Friendly: No expensive training required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis-ozma | `bitnami/redis:7.2.5` | Database |
| keycloak | [ozma-io/ozma](https://github.com/ozma-io/ozma) | Worker |
| ozma-report-generator | `ozmaio/ozma-report-generator:master` | Worker |
| postgres-ozma-report-generator | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| postgres-ozma | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| postgres-keycloak | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| ozma | `ozmaio/ozma:master` | Web service |
| ozmadb | [ozma-io/ozma](https://github.com/ozma-io/ozma) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis-ozma | - | Railway Private Domain Name. |
| `REDISPORT` | redis-ozma | 6379 | Port to connect to Redis. |
| `REDISUSER` | redis-ozma | default | Default user to connect to Redis. |
| `REDIS_URL` | redis-ozma | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | redis-ozma | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | redis-ozma | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | redis-ozma | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | redis-ozma | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | redis-ozma | no | Disable writing to AOF file. |
| `KC_DB` | keycloak | postgres | - |
| `KC_PROXY` | keycloak | edge | - |
| `ADMIN_EMAIL` | keycloak | - | Your email which also serves as a login |
| `KC_LOG_LEVEL` | keycloak | info | - |
| `ADMIN_PASSWORD` | keycloak | (secret) | Password to log into ozma and Keycloak. |
| `KC_DB_PASSWORD` | keycloak | (secret) | - |
| `KC_DB_USERNAME` | keycloak | (secret) | - |
| `KEYCLOAK_ADMIN` | keycloak | admin | - |
| `KC_PROXY_HEADERS` | keycloak | xforwarded | - |
| `EXTERNAL_PROTOCOL` | keycloak | https | - |
| `KC_METRICS_ENABLED` | keycloak | true | - |
| `KC_HTTP_RELATIVE_PATH` | keycloak | /auth | - |
| `KC_HOSTNAME_BACKCHANNEL_DYNAMIC` | keycloak | true | - |
| `DB_USER` | ozma-report-generator | (secret) | - |
| `PATH_BASE` | ozma-report-generator | /report-generator | - |
| `DB_PASSWORD` | ozma-report-generator | (secret) | - |
| `AUTH_CLIENT_ID` | ozma-report-generator | ozma-report-generator | - |
| `EXTERNAL_PROTOCOL` | ozma-report-generator | https | - |
| `OZMA_DB_FORCE_INSTANCE` | ozma-report-generator | ozma | - |
| `POSTGRES_DB` | postgres-ozma-report-generator | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres-ozma-report-generator | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres-ozma-report-generator | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres-ozma-report-generator | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres-ozma-report-generator | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_DB` | postgres-ozma | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres-ozma | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres-ozma | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres-ozma | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres-ozma | - | Public URL to connect to Postgres database, used by the Data panel. |
| `POSTGRES_DB` | postgres-keycloak | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres-keycloak | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres-keycloak | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres-keycloak | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres-keycloak | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | ozma | 8080 | - |
| `TRUSTED_PROXIES` | ozma | 0.0.0.0/0 | - |
| `DB_USER` | ozmadb | (secret) | - |
| `DB_PASSWORD` | ozmadb | (secret) | - |
| `EXTERNAL_PROTOCOL` | ozmadb | https | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Vue, TypeScript, SCSS, JavaScript, HTML, CSS, Python, Shell, Nix

[View on Railway →](https://railway.com/deploy/xgJwGP)
