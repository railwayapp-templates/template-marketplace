# Deploy AEX Run on Railway

Self-hosted AI-powered ERP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aex-run)

## About

AEX Run is an AI-First, self-hosted, single-tenant ERP. Users interact entirely via chat to manage dynamic database schemas, execute business operations, send emails through SMTP, and run workflow automations. Fully customizable per
  business niche, from retail to manufacturing.

  ## About Hosting AEX Run

  AEX Run requires a PostgreSQL database for persistent storage, Redis for background job queues (email sending, workflow execution), and two application services. The API handles authentication, tRPC endpoints, AI agent processing, and
  SMTP email delivery. The Web frontend is a React SPA served through Caddy, which also reverse proxies API requests over the internal network. On first deploy, database migrations run automatically and the setup wizard guides you through
  organization, email, and AI provider configuration.

  ## Common Use Cases

  - Small and medium businesses looking for a self-hosted ERP they can customize through natural language chat
  - Companies that need a single platform combining CRM, inventory, invoicing, HR, and project management without vendor lock-in
  - Teams that want AI-driven automation for business workflows like lead capture, order processing, and financial tracking

  ## Dependencies for AEX Run Hosting

  - PostgreSQL 17 for data storage, authentication, and dynamic entity schemas
  - Redis 7 for BullMQ background job processing (email delivery, workflow execution, data sync)

  ### Deployment Dependencies

  - [AEX Run GitHub Repository](https://github.com/aex-partners/run)
  - [Drizzle ORM](https://orm.drizzle.team) for database migrations
  - [Better Auth](https://www.better-auth.com) for authentication
  - [Nodemailer](https://nodemailer.com) for SMTP email sending

  ## Why Deploy AEX Run on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying AEX Run on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | `ghcr.io/aex-partners/run-web:latest` | Web service |
| Redis | `redis:8.2.1` | Database |
| api | `ghcr.io/aex-partners/run-api:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | web | 80 | Caddy web server port |
| `API_URL` | web | - | Internal API URL for reverse proxy (private network) |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | api | 3001 | HTTP server port |
| `REDIS_URL` | api | - | Redis connection string for BullMQ job queues |
| `CORS_ORIGIN` | api | - | Public URL of the frontend (allowed CORS origin) |
| `DATABASE_URL` | api | - | PostgreSQL connection string |
| `ENCRYPTION_KEY` | api | - | 32-char key for encrypting plugin credentials (AES-256) |
| `BETTER_AUTH_URL` | api | - | Public URL of the API (used for auth callbacks) |
| `BETTER_AUTH_SECRET` | api | (secret) | Secret key for session signing and JWT tokens |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/aex-run)
