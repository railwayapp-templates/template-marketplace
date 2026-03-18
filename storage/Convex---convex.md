# Deploy Convex on Railway

Deploy and Host Convex with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/convex)

## About

Convex is an open-source reactive database designed for web app developers and LLMs. Fetch data and implement business logic with strong consistency using pure TypeScript.

---

Self-hosting Convex gives you full control over deployment, scaling, and security. This guide covers running a self-hosted Convex instance on Railway, including configuration for public/private access and admin key management. Railway automates provisioning, networking, and updates—so you can focus on application logic instead of infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Convex Backend | `ghcr.io/get-convex/convex-backend:latest` | Web service |
| Convex Dashboard | `ghcr.io/get-convex/convex-dashboard:latest` | Web service |
| Postgres | `postgres:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Convex Backend | 3210 | Port of the Cloud API. Do not change. |
| `RUST_LOG` | Convex Backend | info | Logging level for the Convex backend service (e.g., info, debug, warn). |
| `POSTGRES_URL` | Convex Backend | - | Connection URL for accessing PostgreSQL, sourced from the Postgres service. |
| `INSTANCE_NAME` | Convex Backend | - | Name of the current database instance. |
| `DISABLE_BEACON` | Convex Backend | true | If true, disables beacon or telemetry reporting. |
| `INSTANCE_SECRET` | Convex Backend | (secret) | Secret key for the instance, used for security/authentication. If you want to make changes, please check the template guide: https://railway.com/deploy/convex |
| `CONVEX_SITE_ORIGIN` | Convex Backend | - | Origin URL for Convex HTTP API as accessed by the frontend. |
| `DO_NOT_REQUIRE_SSL` | Convex Backend | true | If true, disables SSL requirement for backend communication. |
| `CONVEX_CLOUD_ORIGIN` | Convex Backend | - | Origin URL for Convex Cloud API as accessed by the client/frontend. |
| `CONVEX_SELF_HOSTED_URL` | Convex Backend | - | URL for self-hosted Convex backend. |
| `PUBLIC_CONVEX_SITE_ORIGIN` | Convex Backend | - | Public URL for Convex HTTP API, routed through Railway TCP proxy. |
| `PRIVATE_CONVEX_SITE_ORIGIN` | Convex Backend | - | Private/internal URL for Convex HTTP API, accessible only inside the Railway network. |
| `PUBLIC_CONVEX_CLOUD_ORIGIN` | Convex Backend | - | Publicly accessible URL for Convex Cloud API. |
| `PRIVATE_CONVEX_CLOUD_ORIGIN` | Convex Backend | - | Private/internal URL for Convex Cloud API, only within Railway network. |
| `CONVEX_SELF_HOSTED_ADMIN_KEY` | Convex Backend | invalid | Admin key for self-hosted Convex backend; CHANGE THIS, CHECK TEMPLATE GUIDE: https://railway.com/deploy/convex |
| `PORT` | Convex Dashboard | 8080 | Port of the dashboard. |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | Convex Dashboard | - | URL of the Convex Cloud API. |
| `PGSSLMODE` | Postgres | disable | SSL connection mode for PostgreSQL. |
| `POSTGRES_DB` | Postgres | railway | Name of the default PostgreSQL database to be created and used. |
| `DATABASE_URL` | Postgres | - | Full connection string to access the PostgreSQL database. |
| `POSTGRES_USER` | Postgres | (secret) | Default PostgreSQL user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the default PostgreSQL user. |
| `CONVEX_DATABASE_URL` | Postgres | - | Database URL for Convex to connect to the PostgreSQL instance. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string to access the PostgreSQL database, typically via a proxy. |

## Configuration

- **Start command:** `sh -c 'mkdir -p "/convex/data/credentials" && echo "$INSTANCE_SECRET" > "/convex/data/credentials/instance_secret" && echo "$INSTANCE_NAME" > "/convex/data/credentials/instance_name" && ([ -z "$CONVEX_SELF_HOSTED_ADMIN_KEY" ] || [ "$CONVEX_SELF_HOSTED_ADMIN_KEY" = "invalid" ]) && ./generate_admin_key.sh || echo "Admin key: $CONVEX_SELF_HOSTED_ADMIN_KEY" && exec ./run_backend.sh'`
- **Healthcheck:** `/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/convex/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/convex)
