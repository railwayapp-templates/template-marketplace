# Deploy corteza-low-code on Railway

Low-code apps, records, workflows, and reports

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/corteza-low-code)

## About

Corteza is an open-source low-code platform for data applications, records, workflows, reports, privacy tooling, roles, and integrations. This template deploys stable version 2024.9.9 with PostgreSQL and generated super-administrator credentials.

Sign in with `CORTEZA_ADMIN_EMAIL` and the generated `CORTEZA_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| corteza | [monotykamary/railway-template-corteza](https://github.com/monotykamary/railway-template-corteza) (root: /corteza) | Web service |
| postgres | [monotykamary/railway-template-corteza](https://github.com/monotykamary/railway-template-corteza) (root: /postgres) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | corteza | 80 | Corteza HTTP port used by the Railway domain. |
| `DB_DSN` | corteza | - | Private PostgreSQL connection string using a Railway reference. |
| `DOMAIN` | corteza | - | Generated public hostname. |
| `HTTP_ADDR` | corteza | :80 | Corteza listener address. |
| `LOG_LEVEL` | corteza | info | Production log level. |
| `ENVIRONMENT` | corteza | production | Enables production safeguards. |
| `STORAGE_PATH` | corteza | /data/store | Persistent local object-storage directory. |
| `AUTH_BASE_URL` | corteza | - | Absolute HTTPS authentication URL. |
| `DOMAIN_WEBAPP` | corteza | - | Generated hostname for embedded webapps. |
| `AUTH_JWT_SECRET` | corteza | (secret) | Stable JWT signing secret. |
| `AUTH_CSRF_SECRET` | corteza | (secret) | Stable CSRF protection secret. |
| `CORREDOR_ENABLED` | corteza | false | External Corredor integration is not deployed. |
| `HTTP_API_ENABLED` | corteza | true | Enable Corteza REST APIs. |
| `AUTH_CSRF_ENABLED` | corteza | true | Enable CSRF protection. |
| `RBAC_BYPASS_ROLES` | corteza | super-admin | Keep the built-in super administrator bypass role. |
| `CORTEZA_ADMIN_EMAIL` | corteza | admin@example.com | Initial administrator email. |
| `HTTP_SSL_TERMINATED` | corteza | true | Railway terminates HTTPS before Corteza. |
| `HTTP_WEBAPP_ENABLED` | corteza | true | Serve embedded Corteza web applications. |
| `CORTEZA_ADMIN_PASSWORD` | corteza | (secret) | Generated initial administrator password. |
| `HTTP_ENABLE_VERSION_ROUTE` | corteza | true | Expose the version route for operational verification. |
| `AUTH_SESSION_COOKIE_SECURE` | corteza | true | Restrict authentication cookies to HTTPS. |
| `AUTH_EXTERNAL_COOKIE_SECRET` | corteza | (secret) | Stable external authentication cookie secret. |
| `HTTP_ENABLE_HEALTHCHECK_ROUTE` | corteza | true | Expose full dependency health checks. |
| `PORT` | postgres | 5432 | Private PostgreSQL port. |
| `POSTGRES_DB` | postgres | corteza | Database initialized for Corteza. |
| `POSTGRES_USER` | postgres | (secret) | Database application user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated PostgreSQL application password. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Python, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/corteza-low-code)
