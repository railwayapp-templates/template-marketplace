# Deploy Probo on Railway

Open source GRC platform for SOC 2, ISO 27001, HIPAA and GDPR compliance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/probo)

## About

Probo is an open source governance, risk and compliance platform for engineering and security teams: risk register, control library, policies with sign-off, vendor reviews, access reviews, audit programs and a public compliance page, covering SOC 2, ISO 27001, HIPAA and GDPR. It is MIT licensed and built to be self-hosted. This template deploys Probo with PostgreSQL, a storage bucket and the headless Chrome it uses to render PDFs and vendor assessments.

![Probo console overview](https://raw.githubusercontent.com/getprobo/probo/main/.github/cover_v3.png)

The **Probo** service runs the official `ghcr.io/getprobo/probo` image on a public domain with a volume at `/data`. **Postgres** is Railway's SSL-enabled PostgreSQL 17 on its own volume, reached over the private network. **Chrome** runs `chromedp/headless-shell`, which Probo drives for PDF export and website risk assessments. File storage (evidence, attachments, documents) goes to a Railway bucket, whose endpoint and credentials are referenced into the `AWS_*` variables. The cookie secret, password pepper, encryption key and trust-token secret are generated at deploy time.

SMTP is optional. Without it Probo runs but does not send invitations or notifications; fill in `SMTP_ADDR`, `SMTP_USER`, `SMTP_PASSWORD` and `MAILER_SENDER_EMAIL` when you want email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chrome | `chromedp/headless-shell:140.0.7259.2` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Probo | `ghcr.io/getprobo/probo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PG_ADDR` | Probo | - | Host and port address of your PostgreSQL database that Probo uses |
| `API_ADDR` | Probo | 0.0.0.0:8080 | The address and port on which Probo’s API server binds (where it listens for HTTP requests) |
| `SMTP_ADDR` | Probo | - | Hostname (and port) of the SMTP server for sending email |
| `SMTP_USER` | Probo | (secret) | Username to authenticate to the SMTP server |
| `AWS_BUCKET` | Probo | - | Name of the AWS (or S3-compatible) bucket used for file/storage needs (e.g. attachments, artifacts) |
| `AWS_REGION` | Probo | auto | Region setting for AWS — indicates which region the bucket/other AWS services are located |
| `PG_DATABASE` | Probo | - | The name of the PostgreSQL database that Probo should connect to |
| `PG_PASSWORD` | Probo | (secret) | The password for the PostgreSQL user |
| `PG_USERNAME` | Probo | (secret) | The username for the PostgreSQL connection |
| `AWS_ENDPOINT` | Probo | - | Custom endpoint for AWS or S3-compatible storage (if not standard AWS) |
| `PG_POOL_SIZE` | Probo | 100 | Size of the database connection pool — how many DB connections Probo can hold open concurrently |
| `SMTP_PASSWORD` | Probo | (secret) | Password to authenticate to the SMTP server |
| `CHROME_DP_ADDR` | Probo | - | Address/port for a Chrome headless/debugging service — possibly used if Probo needs to render or snapshot something via headless Chrome |
| `PROBOD_BASE_URL` | Probo | - | Base URL for Probo — used to generate links (e.g. in emails, callbacks) |
| `AWS_ACCESS_KEY_ID` | Probo | - | AWS access key ID used to authenticate against AWS (or S3-compatible) storage |
| `SMTP_TLS_REQUIRED` | Probo | - | Whether TLS is required/used when connecting to SMTP (i.e. encrypted connection) |
| `AUTH_COOKIE_SECRET` | Probo | (secret) | Secret key used to sign authentication cookies for Probo’s web interface (session security) |
| `MAILER_SENDER_EMAIL` | Probo | - | The “from” email address used when Probo sends emails (e.g. notifications, invites) |
| `AUTH_PASSWORD_PEPPER` | Probo | (secret) | A “pepper” value for password hashing — extra secret mixed with user passwords to strengthen security |
| `AWS_SECRET_ACCESS_KEY` | Probo | (secret) | AWS secret access key paired with access key ID — used to authorize storage operations |
| `PROBOD_ENCRYPTION_KEY` | Probo | - | Encryption key used internally by Probo (e.g. to encrypt sensitive stored data) |
| `TRUST_AUTH_TOKEN_SECRET` | Probo | (secret) | Secret used to sign/validate auth tokens (e.g. for API authentication or trustworthy sessions) |
| `API_CORS_ALLOWED_ORIGINS` | Probo | - | List (or single) origin(s) allowed by CORS — which front-end domains are allowed to call Probo’s API |

## Configuration

- **Start command:** `/headless-shell/run.sh --headless --disable-gpu --disable-dev-shm-usage --hide-scrollbars --mute-audio --no-default-browser-check --no-first-run --disable-background-networking --disable-background-timer-throttling --disable-extensions`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/probo)
