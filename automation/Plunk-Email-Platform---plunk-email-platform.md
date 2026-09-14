# Deploy Plunk Email Platform on Railway

Email campaigns and transactional delivery with AWS SES and storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plunk-email-platform)

## About

Email campaigns and transactional delivery with AWS SES and storage.

**Validation scope: static configuration checks only. Image builds and Railway application workflows have not been validated.** Deploying this template incurs Railway usage and any external provider charges.

Seven services include the API/dashboard, background processes, PostgreSQL, Redis, MinIO, and protected landing/docs endpoints. Only the uploads bucket is anonymously readable, to render email images; it must never contain confidential documents. Recipient unsubscribe, preference, public-contact and SNS callback routes bypass the owner gateway and rely on upstream validation. SMTP inbound/TCP delivery is not exposed; this template is for SES-backed HTTP sending. SES production access, sending reputation, DNS and provider fees belong to the operator. AGPL-3.0 upstream terms apply.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| landing | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| postgres | `postgres:16-alpine@sha256:cf78e76683b9ca8c5733cbbdce6c9262b45b6767934dd0a95e671f9a0fc20685` | Database |
| plunk | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| docs | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Web service |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/fifteen-template-drafts) | Database |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | landing | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | landing | true | Owner auth for landing. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | landing | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | landing | 80 | Upstream port for landing. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | landing | (secret) | Access password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `POSTGRES_DB` | postgres | plunk | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | plunk | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | plunk | true | Owner auth for plunk. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | plunk | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | plunk | 3000 | Upstream port for plunk. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | plunk | (secret) | Generated access password. Keep private and preserve with backups. |
| `S3_BUCKETS` | storage | uploads | S3 buckets for storage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_BUCKET` | storage | uploads | Public email-image bucket. Do not upload confidential files; only this bucket allows anonymous reads. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `PORT` | docs | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | docs | true | Owner auth for docs. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | docs | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | docs | 80 | Upstream port for docs. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | docs | (secret) | Access password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `API_URI` | core | - | Api uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `SERVICE` | core | all | Service for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `NODE_ENV` | core | production | Node.js runtime mode. Keep production for hosted deployments. |
| `NTFY_URL` | core | - | Ntfy url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | core | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `S3_BUCKET` | core | uploads | S3 bucket for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `USE_HTTPS` | core | true | Use https for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `API_DOMAIN` | core | - | Api domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `JWT_SECRET` | core | (secret) | Generated jwt secret. Keep private and preserve with backups. |
| `NGINX_PORT` | core | 80 | Nginx port for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_ENDPOINT` | core | - | S3 endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `WIKI_DOMAIN` | core | - | Wiki domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_URL` | core | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `DASHBOARD_URI` | core | - | Dashboard uri resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_PUBLIC_URL` | core | - | S3 public url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AWS_SES_REGION` | core | - | Required region of your configured AWS SES account. |
| `LANDING_DOMAIN` | core | - | Landing domain resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DISABLE_SIGNUPS` | core | false | Owner gateway protects registration. After creating your account, set true to close new registrations. |
| `DASHBOARD_DOMAIN` | core | dashboard.internal.invalid | Dashboard domain for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_ACCESS_KEY_ID` | core | - | S3 access key id resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DIRECT_DATABASE_URL` | core | - | Direct database url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_FORCE_PATH_STYLE` | core | true | S3 force path style for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `AUTO_PROJECT_DISABLE` | core | false | Auto project disable for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_ACCESS_KEY_SECRET` | core | (secret) | S3 access key secret resolved automatically from the linked service. Keep this reference when using the included topology. |
| `AWS_SES_ACCESS_KEY_ID` | core | - | Required operator-owned SES access key. Never use a template author credential. |
| `SES_CONFIGURATION_SET` | core | - | Required SES configuration set with the SNS callback described below. |
| `AWS_SES_SECRET_ACCESS_KEY` | core | (secret) | Required operator-supplied aws ses secret access key. Enter your own value before deployment. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Volume:** `/app/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** Automation · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/plunk-email-platform)
