# Deploy Formbricks on Railway

An open source surveys & experience management solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/PPDzCd)

## About

Formbricks is an open source survey and experience management platform for collecting user feedback through embedded surveys. It provides tools for creating in-product micro-surveys that can be targeted to specific users based on behavioral triggers and user attributes.

Formbricks runs as a Next.js application with PostgreSQL backend, requiring Node.js runtime and database connection management. The application handles survey data collection, user targeting logic, and real-time response processing. You'll need to manage database migrations, file storage for survey assets, authentication sessions, and integration webhooks. The system generates survey response data that grows over time, requiring backup strategies and performance monitoring for database queries and API endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Formbricks | `formbricks/formbricks:latest` | Web service |
| Postgres | `pgvector/pgvector:pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MAIL_FROM` | Formbricks | - | Email from address |
| `SMTP_HOST` | Formbricks | - | SMTP hostname |
| `SMTP_PORT` | Formbricks | - | SMTP port |
| `SMTP_USER` | Formbricks | (secret) | SMTP username, likely your email address |
| `WEBAPP_URL` | Formbricks | - | Your public-facing URL |
| `CRON_SECRET` | Formbricks | (secret) | API Secret for running cron jobs |
| `DATABASE_URL` | Formbricks | - | Connects to Postgres over the private network |
| `NEXTAUTH_URL` | Formbricks | - | Your public-facing URL |
| `SMTP_PASSWORD` | Formbricks | (secret) | SMTP password |
| `ENCRYPTION_KEY` | Formbricks | - | 64 Character key for encryption |
| `INVITE_DISABLED` | Formbricks | 0 | Set it to 1 to disable Invites |
| `NEXTAUTH_SECRET` | Formbricks | (secret) | Automatically generated Next Auth secret |
| `SIGNUP_DISABLED` | Formbricks | 0 | Set it to 1 to disable Signups |
| `EMAIL_AUTH_DISABLED` | Formbricks | 0 | Set it to 1 to disable logging in with email |
| `NEXT_PUBLIC_WEBAPP_URL` | Formbricks | - | Your public-facing URL |
| `COREPACK_INTEGRITY_KEYS` | Formbricks | 0 | - |
| `PASSWORD_RESET_DISABLED` | Formbricks | (secret) | Set to 0 to enable Password Reset |
| `PRISMA_GENERATE_DATAPROXY` | Formbricks | true | [Data proxy info](https://www.prisma.io/docs/data-platform/data-proxy/use-data-proxy) |
| `EMAIL_VERIFICATION_DISABLED` | Formbricks | 1 | Set to 0 to enable Email Verification for new signups |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Formbricks | true | Enables Formbricks to resolve private network domains |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started |
| `DATABASE_URL` | Postgres | - | Public URL to connect to Postgres database |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private Database URL |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nextjs/apps/web/uploads/`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/PPDzCd)
