# Deploy Logchef on Railway

Log exploration and dashboards with private, persistent ClickHouse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logchef)

## About

Logchef is an open-source log exploration, dashboarding, alerting, and access-control workspace for ClickHouse and VictoriaLogs. This template deploys a pinned Logchef release with built-in email/password authentication and a private ClickHouse LTS service, giving a new installation durable metadata, durable log storage, and a preconfigured datasource without requiring an external identity provider.

Hosting Logchef provides a shared query and visualization layer over structured logs. The public Logchef service serves the browser application and API over Railway HTTPS. Its SQLite control-plane database stores users, sessions, teams, sources, dashboards, alerts, and saved queries on a dedicated volume. A separate ClickHouse service stores log events on its own volume and is reachable only through Railway private networking.

The first administrator is created idempotently from `LOGCHEF_AUTH__LOCAL__ADMIN_EMAIL` and the generated `LOGCHEF_AUTH__LOCAL__ADMIN_PASSWORD`. The template also generates the API-token hashing secret and ClickHouse password. After signing in, create a team, add the administrator, and assign the preconfigured `Railway ClickHouse` source.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| logchef | [monotykamary/railway-template-logchef](https://github.com/monotykamary/railway-template-logchef) (root: /logchef) | Web service |
| clickhouse | [monotykamary/railway-template-logchef](https://github.com/monotykamary/railway-template-logchef) (root: /clickhouse) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | logchef | 8125 | HTTP port used by Logchef and the Railway public domain. |
| `LOGCHEF_SERVER__PORT` | logchef | 8125 | Logchef HTTP listener port; keep synchronized with PORT. |
| `LOGCHEF_AUTH__ADMIN_EMAILS` | logchef | - | Makes the bootstrap local user a global Logchef administrator. |
| `LOGCHEF_CLICKHOUSE_PASSWORD` | logchef | (secret) | Shared ClickHouse password reference; do not replace with an unrelated value. |
| `LOGCHEF_AUTH__LOCAL__ENABLED` | logchef | true | Enable Logchef built-in email and password authentication. |
| `LOGCHEF_SERVER__FRONTEND_URL` | logchef | - | Public Logchef origin used for browser links and runtime settings. |
| `LOGCHEF_CLICKHOUSE_HEALTH_URL` | logchef | - | Private authenticated ClickHouse readiness endpoint. |
| `LOGCHEF_SERVER__SECURE_COOKIE` | logchef | true | Require HTTPS-only authentication cookies on the Railway domain. |
| `LOGCHEF_AUTH__API_TOKEN_SECRET` | logchef | (secret) | Generated secret used to hash Logchef API tokens. |
| `LOGCHEF_AUTH__LOCAL__ADMIN_EMAIL` | logchef | admin@example.com | Bootstrap administrator email. Change this before the first login. |
| `LOGCHEF_CLICKHOUSE_WAIT_ATTEMPTS` | logchef | 150 | Maximum two-second readiness attempts before Logchef exits for Railway to retry. |
| `LOGCHEF_AUTH__LOCAL__ADMIN_PASSWORD` | logchef | (secret) | Generated bootstrap administrator password. Read it from the Logchef service variables. |
| `PORT` | clickhouse | 8123 | ClickHouse HTTP port used by Railway health checks. |
| `CLICKHOUSE_DB` | clickhouse | default | Database initialized for the Logchef logs table. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Private ClickHouse account used by Logchef. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generated password shared with Logchef through a service reference. |
| `CLICKHOUSE_INIT_TIMEOUT` | clickhouse | 300 | Maximum startup wait in seconds for first-boot initialization scripts. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Enable access management for the generated ClickHouse user. |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`

**Category:** Observability · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/logchef)
