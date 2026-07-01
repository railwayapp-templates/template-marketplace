# Deploy Simpler Development on Railway

A template for running the Simpler Development platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simpler-development)

## About

GitHub repository: https://github.com/SimplerDevelopment/SimplerDevelopment

  SimplerDevelopment is a portal-first, self-serve platform for agencies and operators. It combines websites, CRM, email marketing, bookings, surveys, contracts,
  invoicing, AI chat, company knowledge, automations, pitch decks, hosting, and more into one connected product suite. Instead of stitching together separate tools,
  teams get one unified system for running client work, internal operations, and customer-facing experiences.

  ## About Hosting SimplerDevelopment

  Hosting SimplerDevelopment on Railway means deploying the full product stack behind one experience: the main web app, realtime collaboration services, internal agent
  tooling, persistent data storage, and S3-compatible media handling. The platform is designed to work as a connected system, with shared authentication, service-to-
  service wiring, and tenant-aware infrastructure that supports the portal, module onboarding, and ongoing customer operations.

  Railway is a strong fit for this stack because it can provision the supporting services SimplerDevelopment depends on while keeping the deployment model simple. That
  makes it easier to run the application as a cohesive product rather than a set of disconnected apps.

  ## Common Use Cases

  - Launching a full SimplerDevelopment workspace for a new team, client, or tenant
  - Running the portal, realtime features, and agent services together in one environment
  - Hosting the platform with managed Postgres and S3-compatible storage already connected
  - Spinning up a production-ready deployment for the self-serve onboarding and module activation flow

  ## Dependencies for SimplerDevelopment Hosting

  - A Railway project and workspace
  - PostgreSQL for application and tenant data
  - S3-compatible object storage for uploads and media assets
  - The SimplerDevelopment application repository

  ### Deployment Dependencies

  - Railway documentation: https://docs.railway.com
  - PostgreSQL: https://www.postgresql.org/
  - Amazon S3: https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html

  ## Why Deploy SimplerDevelopment on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying SimplerDevelopment on Railway, you get one place to run the app, the realtime layer, the agents service, and the backing infrastructure that keeps the
  product experience coherent. That makes it easier to ship a complete portal, onboard users quickly, and support a modern full-stack application without splitting the
  stack across multiple systems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| agents | [SimplerDevelopment/SimplerDevelopment](https://github.com/SimplerDevelopment/SimplerDevelopment) (root: /simplerdevelopment-agents) | Worker |
| realtime | [SimplerDevelopment/SimplerDevelopment](https://github.com/SimplerDevelopment/SimplerDevelopment) (root: /packages/realtime-server) | Web service |
| app | [SimplerDevelopment/SimplerDevelopment](https://github.com/SimplerDevelopment/SimplerDevelopment) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | Bootstrap database name used when the Postgres container starts. |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string used by application services. |
| `POSTGRES_USER` | Postgres | (secret) | Bootstrap username used when the Postgres container starts. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Bootstrap password used when the Postgres container starts. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public TCP connection string for external clients. |
| `PORT` | agents | - | Railway-injected listen port for the Mastra agents service. |
| `SD_MCP_URL` | agents | - | Public portal MCP endpoint used by the agents service. |
| `SD_AGENTS_INTERNAL_SECRET` | agents | (secret) |  Shared secret for internal app-to-agents requests. |
| `PORT` | realtime | 3030 | Railway-injected listen port for the realtime server. |
| `DATABASE_URL` | realtime | - | Internal Postgres connection string used to persist realtime snapshots. |
| `REALTIME_JWT_SECRET` | realtime | (secret) | JWT signing secret shared with the app service. |
| `REALTIME_INTERNAL_SECRET` | realtime | (secret) | Shared secret for app-to-realtime internal requests. |
| `S3_REGION` | app | - | S3-compatible storage region identifier. |
| `AUTH_SECRET` | app | (secret) | Auth.js secret used to sign sessions and tokens. |
| `S3_ENDPOINT` | app | - | S3-compatible storage endpoint URL. |
| `DATABASE_URL` | app | - | Internal Postgres connection string used by the app. |
| `NEXTAUTH_URL` | app | - | Canonical public app URL used by NextAuth. |
| `SD_AGENTS_URL` | app | - | Public app URL used by agents for MCP access. |
| `PORTAL_KMS_KEY` | app | - | Base64-encoded KMS key used to encrypt portal secrets. |
| `S3_BUCKET_NAME` | app | - | Object storage bucket name used for uploaded media. |
| `AUTH_TRUST_HOST` | app | - | Tells Auth.js to trust Railway proxy headers. |
| `NEXTAUTH_SECRET` | app | (secret) | NextAuth secret used to sign sessions. |
| `S3_ACCESS_KEY_ID` | app | - | Access key used for S3-compatible object storage. |
| `OAUTH_STATE_SECRET` | app | (secret) | Secret used to protect OAuth state values. |
| `NEXT_PUBLIC_APP_URL` | app | - | Public browser-facing URL for the app. |
| `REALTIME_JWT_SECRET` | app | (secret) | JWT signing secret shared with the realtime service. |
| `NEXT_PUBLIC_SITE_URL` | app | - | Public site URL used in rendered links. |
| `S3_SECRET_ACCESS_KEY` | app | (secret) | Secret key paired with the S3 access key. |
| `REALTIME_INTERNAL_URL` | app | - | Private URL used by the app to reach realtime. |
| `NEXT_PUBLIC_REALTIME_URL` | app | - | Public WebSocket URL for the realtime service. |
| `REALTIME_INTERNAL_SECRET` | app | (secret) | Shared secret for internal app-to-realtime requests. |
| `SD_AGENTS_INTERNAL_SECRET` | app | (secret) | Shared secret for internal app-to-agents requests. |
| `WORKSPACE_TENANT_SECRETS_KEY` | app | (secret) | Workspace-level key used to encrypt tenant secrets. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** ` /health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, Shell, CSS, PLpgSQL, Python, Batchfile, Ruby, Swift, Dockerfile, C

[View on Railway →](https://railway.com/deploy/simpler-development)
