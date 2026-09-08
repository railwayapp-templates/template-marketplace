# Deploy Multica on Railway

Platform for building and orchestrating AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica)

## About

Multica is an open-source platform for running AI agents as persistent teammates. Agents get issues assigned the way people do, execute on machines you control through the Multica CLI daemon, and report back in a Linear-style web app with boards, projects, and agent activity. This template deploys the upstream Multica v0.4.41 images together with PostgreSQL + pgvector on Railway.

Hosting Multica on Railway means three services. `frontend` runs the Next.js web app and proxies API calls over Railway's private network to `backend`, the Go API, realtime, and daemon hub, which keeps uploaded files on a volume. `pgvector` is PostgreSQL 17 with the pgvector extension on its own volume. Both application services run the upstream prebuilt images, so a first deploy takes about a minute and an upgrade is a one-line tag bump. Database migrations run automatically every time the backend starts. No API keys are needed to get going: with no email provider configured, login codes are printed to the backend logs.

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
| `NEXT_PUBLIC_WS_URL` | frontend | - | Leave empty on Railway domains; the frontend proxies the realtime WebSocket to the backend itself. Set only when the browser should open its WebSocket to the backend host directly, e.g. wss://api.example.com/ws on custom subdomains, and then also set COOKIE_DOMAIN on backend. |
| `POSTGRES_DB` | pgvector | multica | The name of the default database to create. |
| `POSTGRES_USER` | pgvector | (secret) | The username for the primary database administrator. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | The password for the primary database administrator (generate a secret). |
| `PORT` | backend | 8080 | The port on which the Go backend API will listen (usually 8080). |
| `APP_ENV` | backend | production | The execution environment (set to production for Railway). |
| `JWT_SECRET` | backend | (secret) | Secret key used to sign and verify authentication tokens (generate a secret). |
| `ALLOW_SIGNUP` | backend | true | Set to true to allow new users to register on this instance. |
| `DATABASE_URL` | backend | - | The connection string for the PostgreSQL database (including credentials and domain). |
| `COOKIE_DOMAIN` | backend | - | Leave empty on Railway domains. Set to the narrowest parent domain covering both custom domains, e.g. .example.com, when the browser reaches the backend host directly. Required together with NEXT_PUBLIC_WS_URL on frontend; never an IP address. |
| `ALLOWED_EMAILS` | backend | - | Comma-separated email addresses allowed to sign up. Leave empty to allow any address. |
| `RESEND_API_KEY` | backend | (secret) | Resend API key for emailing login codes. Leave empty (not a space) to print codes to the backend log instead. |
| `FRONTEND_ORIGIN` | backend | - | The public URL of your frontend service (used for CORS and auth redirects). |
| `MULTICA_APP_URL` | backend | - | The primary public URL used to access the Multica application. |
| `GOOGLE_CLIENT_ID` | backend | - | Google OAuth client ID for social login. Leave empty to hide Google login. |
| `LOCAL_UPLOAD_DIR` | backend | /app/data/uploads | Path to the directory where uploaded assets and logs are stored. |
| `RESEND_FROM_EMAIL` | backend | - | Verified sender address for Resend. Leave empty when RESEND_API_KEY is empty. |
| `ANALYTICS_DISABLED` | backend | true | Set to true to opt-out of telemetry and usage tracking. |
| `DATABASE_MAX_CONNS` | backend | 10 | The maximum number of simultaneous connections to the database. |
| `DATABASE_MIN_CONNS` | backend | 2 | The minimum number of idle connections to keep open in the database pool. |
| `GOOGLE_REDIRECT_URI` | backend | - | The OAuth2 callback URL for Google login (must match your Google Cloud Console). |
| `CORS_ALLOWED_ORIGINS` | backend | - | Comma-separated list of origins allowed to make cross-site requests to the API. |
| `GOOGLE_CLIENT_SECRET` | backend | (secret) | Google OAuth client secret for social login. Leave empty when GOOGLE_CLIENT_ID is empty. |
| `ALLOWED_EMAIL_DOMAINS` | backend | - | Comma-separated email domains, e.g. company.com, allowed to sign up. Leave empty to allow any domain. |
| `LOCAL_UPLOAD_BASE_URL` | backend | - | The base public URL used to serve locally uploaded files (usually the backend domain). |
| `REALTIME_METRICS_TOKEN` | backend | (secret) | Secret token required to access the internal real-time performance metrics endpoint (generate a secret). |
| `MULTICA_DAEMON_SERVER_URL` | backend | - | Server URL shown in the web app's multica setup self-host command, so the CLI daemon connects to the backend directly. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Volume:** `/app/data/uploads`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/multica)
