# Deploy Lago Usage Billing on Railway

Usage billing with PostgreSQL, Redis, background jobs and invoice PDFs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lago-usage-billing)

## About

Usage billing with PostgreSQL, Redis, background jobs and invoice PDFs.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Five services. The API adapter supervises the API, Sidekiq worker and clock in one service so the RSA key and local file storage share /data. PostgreSQL partman, Redis and PDF rendering are private; frontend and authenticated API are public. General signup and the Sidekiq web UI are disabled. Preserve all encryption variables and /data/keys/private.pem. Upstream AGPL-3.0 applies to community code; enterprise features and payment-provider accounts are not included. Invoice correctness and jurisdiction-specific billing setup are the operator's responsibility.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pdf | `getlago/lago-gotenberg:8.15@sha256:c05a9d3926c0b2b14b4086cbf83c9399f7c1f2473d2d5b96857a16666b725353` | Worker |
| api | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| postgres | `getlago/postgres-partman:15.0-alpine@sha256:27a1e3a1138a69b5a0911ce125dfa613b9ced07604a2d781b9d31141f7f96036` | Database |
| lago | `getlago/front:v1.53.0@sha256:16646b2b1c834f110e57e3460d09cf24c7a487ced721f50f5886d65d4d6228af` | Web service |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `RAILS_ENV` | api | production | Rails env for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | api | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `DATABASE_URL` | api | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `LAGO_API_URL` | api | - | Lago api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LAGO_PDF_URL` | api | - | Lago pdf url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LAGO_ORG_NAME` | api | My organization | Lago org name for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_FRONT_URL` | api | - | Lago front url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_PASSWORD` | api | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `LAGO_CREATE_ORG` | api | true | Lago create org for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_FROM_EMAIL` | api | - | Verified sender email. |
| `LAGO_USE_AWS_S3` | api | false | Lago use aws s3 for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SECRET_KEY_BASE` | api | (secret) | Generated application signing secret. Preserve across restarts and backup restores. |
| `LAGO_ORG_API_KEY` | api | (secret) | Generated lago org api key. Keep private and preserve with backups. |
| `LAGO_SIDEKIQ_WEB` | api | false | Lago sidekiq web for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_SMTP_ADDRESS` | api | - | SMTP host for invoices and account emails. |
| `LAGO_SMTP_PASSWORD` | api | (secret) | SMTP password. |
| `LAGO_SMTP_USERNAME` | api | (secret) | SMTP username. |
| `LAGO_DISABLE_SIGNUP` | api | true | Lago disable signup for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_ORG_USER_EMAIL` | api | - | Required first organization administrator email. |
| `RAILS_LOG_TO_STDOUT` | api | true | Rails log to stdout for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_DISABLE_SEGMENT` | api | true | Lago disable segment for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_REDIS_CACHE_URL` | api | - | Lago redis cache url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LAGO_ORG_USER_PASSWORD` | api | (secret) | Generated lago org user password. Keep private and preserve with backups. |
| `LAGO_REDIS_CACHE_PASSWORD` | api | (secret) | Lago redis cache password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LAGO_ENCRYPTION_PRIMARY_KEY` | api | - | Generated lago encryption primary key. Keep private and preserve with backups. |
| `LAGO_ENCRYPTION_DETERMINISTIC_KEY` | api | - | Generated lago encryption deterministic key. Keep private and preserve with backups. |
| `LAGO_ENCRYPTION_KEY_DERIVATION_SALT` | api | - | Generated lago encryption key derivation salt. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | lago | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `API_URL` | lago | - | Api url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APP_ENV` | lago | production | App env for lago. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LAGO_OAUTH_PROXY_URL` | lago | https://proxy.getlago.com | Lago oauth proxy url for lago. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Start command:** `gotenberg --libreoffice-disable-routes=true --chromium-disable-javascript=true --api-timeout=300s`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/lago-usage-billing)
