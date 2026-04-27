# Deploy Multica on Railway

Platform for building and orchestrating AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica)

## About

Multica is an open-source platform for building, managing, and orchestrating AI agents that execute directly on your infrastructure. It provides a full-stack environment for agent communication, task management, and tool integration, allowing you to build persistent AI teammates that live where your code does.

Hosting Multica on Railway provides a robust, production-ready environment for your agent operations. This template automates the deployment of a three-tier architecture: a Go backend for high-performance API and WebSocket handling, a Next.js frontend for a seamless management interface, and a pgvector-enabled PostgreSQL database for long-term memory and semantic search. By hosting on Railway, you benefit from automatic SSL, private networking between services, and persistent volumes for agent logs and uploads, all without the overhead of manual server configuration or container orchestration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | [RockinPaul/multica_railway_template](https://github.com/RockinPaul/multica_railway_template) | Web service |
| pgvector | `pgvector/pgvector:pg17` | Database |
| backend | [RockinPaul/multica_railway_template](https://github.com/RockinPaul/multica_railway_template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | frontend | 3000 | The port on which the Next.js server will listen (usually 3000). |
| `DOCS_URL` | frontend | https://multica.ai | The URL where the application documentation is hosted (defaults to https://multica.ai). |
| `HOSTNAME` | frontend | 0.0.0.0 | The network interface the server binds to (set to 0.0.0.0 for Railway). |
| `REMOTE_API_URL` | frontend | - | The internal Railway URL used by the frontend to proxy requests to the backend. |
| `NEXT_PUBLIC_APP_VERSION` | frontend | railway-template | A version identifier for the frontend build (e.g., railway-template). |
| `POSTGRES_DB` | pgvector | multica | The name of the default database to create. |
| `POSTGRES_USER` | pgvector | (secret) | The username for the primary database administrator. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | The password for the primary database administrator (generate a secret). |
| `PORT` | backend | 8080 | The port on which the Go backend API will listen (usually 8080). |
| `APP_ENV` | backend | production | The execution environment (set to production for Railway). |
| `JWT_SECRET` | backend | (secret) | Secret key used to sign and verify authentication tokens (generate a secret). |
| `ALLOW_SIGNUP` | backend | true | Set to true to allow new users to register on this instance. |
| `DATABASE_URL` | backend | - | The connection string for the PostgreSQL database (including credentials and domain). |
| `ALLOWED_EMAILS` | backend |   | Comma-separated list of specific email addresses allowed to sign up. |
| `RESEND_API_KEY` | backend | (secret) | API key for the Resend email delivery service (optional for local logs). |
| `FRONTEND_ORIGIN` | backend | - | The public URL of your frontend service (used for CORS and auth redirects). |
| `MULTICA_APP_URL` | backend | - | The primary public URL used to access the Multica application. |
| `GOOGLE_CLIENT_ID` | backend |   | The Google OAuth2 Client ID for social authentication. |
| `LOCAL_UPLOAD_DIR` | backend | /app/data/uploads | Path to the directory where uploaded assets and logs are stored. |
| `RESEND_FROM_EMAIL` | backend |   | The verified sender email address for Resend notifications. |
| `ANALYTICS_DISABLED` | backend | true | Set to true to opt-out of telemetry and usage tracking. |
| `DATABASE_MAX_CONNS` | backend | 10 | The maximum number of simultaneous connections to the database. |
| `DATABASE_MIN_CONNS` | backend | 2 | The minimum number of idle connections to keep open in the database pool. |
| `GOOGLE_REDIRECT_URI` | backend | - | The OAuth2 callback URL for Google login (must match your Google Cloud Console). |
| `CORS_ALLOWED_ORIGINS` | backend | - | Comma-separated list of origins allowed to make cross-site requests to the API. |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | The Google OAuth2 Client Secret for social authentication. |
| `ALLOWED_EMAIL_DOMAINS` | backend |   | Comma-separated list of email domains (e.g., company.com) allowed to sign up. |
| `LOCAL_UPLOAD_BASE_URL` | backend | - | The base public URL used to serve locally uploaded files (usually the backend domain). |
| `REALTIME_METRICS_TOKEN` | backend | (secret) | Secret token required to access the internal real-time performance metrics endpoint (generate a secret). |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Volume:** `/app/data/uploads`

**Category:** AI/ML · **Languages:** TypeScript, Go, MDX, CSS, JavaScript, Shell, PowerShell, Makefile, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/multica)
