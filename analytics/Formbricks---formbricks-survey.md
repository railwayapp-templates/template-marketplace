# Deploy Formbricks on Railway

Typeform Alternative. Build beautiful surveys, but open source.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/formbricks-survey)

## About

Formbricks is an open-source experience management suite built around a survey engine, used by product, research and support teams who want Typeform-style forms and Qualtrics-style analysis without sending customer feedback to a third party. It runs link surveys shared by URL, in-app and website surveys triggered by user actions, and email-embedded surveys, collecting answers into a workspace with per-question summaries, NPS and CSAT breakdowns, contact attributes and targeting rules. Teams self-host Formbricks when responses contain personal data that must stay in their own infrastructure, or when they want unlimited responses rather than a per-response plan.

Deploy Formbricks on Railway and the whole production stack comes up wired together, not just the web container: the web application, PostgreSQL, Redis, the Formbricks Hub API and its worker, a Cube semantic-layer service, and a managed object storage bucket. Browser traffic reaches only the web service, which renders the dashboard and public survey pages, runs its migrations on boot, and processes background jobs through Redis-backed BullMQ queues. Hub owns the unified feedback tables in the same database while its worker drains webhook jobs, and Cube reads those tables to answer analytics queries signed with a shared secret. Uploads go to object storage, so the web service stays stateless.

![Formbricks Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786974607/9c697d0c-f75b-4825-aacd-7569fe06abb7.png)

Formbricks replaces the tools most teams stitch together — a form builder for research, an in-app widget for feature feedback, and a spreadsheet where answers end up. Self-hosting matters because responses are frequently personal data: open-text answers naming individuals, emails attached to contacts, NPS scores tied to accounts. Running it yourself keeps that in a database you control.

Key features:

- Link, website, in-app and email surveys from one editor, 30+ question types
- Conditional logic, answer recall, multi-language surveys and quotas
- NPS, CSAT, CES and star-rating templates with built-in scoring
- Contact attributes and targeting so a survey reaches only the right users
- Webhooks, Slack, Notion, Airtable and Google Sheets integrations
- An open API and JavaScript SDK for embedding surveys in your product

The deployment splits work across services rather than one container: a web tier that also runs the job workers in-process, a database, a cache and queue, the Hub API with its own worker, and an analytics layer — each described under Dependencies below.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| hub | `ghcr.io/formbricks/hub:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cube | [gridalpha/formbricks-railway](https://github.com/gridalpha/formbricks-railway) | Worker |
| formbricks | `ghcr.io/formbricks/formbricks:latest` | Web service |
| hub-worker | `ghcr.io/formbricks/hub:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | hub | 8080 | HTTP listening port |
| `API_KEY` | hub | (secret) | Shared secret with the web app |
| `LOG_LEVEL` | hub | info | Log level |
| `LOG_FORMAT` | hub | json | Structured log output |
| `DATABASE_URL` | hub | - | Same database as Formbricks |
| `DATABASE_MAX_CONNS` | hub | 15 | Postgres connection pool size |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | cube | 4000 | HTTP listening port |
| `CUBEJS_DB_HOST` | cube | - | Postgres private hostname |
| `CUBEJS_DB_NAME` | cube | - | Database name |
| `CUBEJS_DB_PASS` | cube | - | Database password |
| `CUBEJS_DB_PORT` | cube | - | Postgres port |
| `CUBEJS_DB_TYPE` | cube | postgres | Upstream database driver |
| `CUBEJS_DB_USER` | cube | (secret) | Database user |
| `CUBEJS_API_SECRET` | cube | (secret) | Verifies JWTs from the web app |
| `CUBEJS_JWT_ISSUER` | cube | formbricks-web | Required JWT issuer claim |
| `CUBEJS_JWT_AUDIENCE` | cube | formbricks-cube | Required JWT audience claim |
| `CUBEJS_EXTERNAL_DEFAULT` | cube | false | No external pre-aggregations |
| `CUBEJS_DEFAULT_API_SCOPES` | cube | meta,data | Only meta and data endpoints |
| `CUBEJS_CACHE_AND_QUEUE_DRIVER` | cube | memory | Single-replica in-memory driver |
| `PORT` | formbricks | 3000 | HTTP listening port |
| `LOG_LEVEL` | formbricks | info | Application log level |
| `REDIS_URL` | formbricks | - | Cache, rate limit, queue |
| `S3_REGION` | formbricks | - | Bucket region |
| `WEBAPP_URL` | formbricks | - | Public URL of the instance |
| `CRON_SECRET` | formbricks | (secret) | Authenticates scheduled job endpoints |
| `HUB_API_KEY` | formbricks | (secret) | Shared secret for the Hub API |
| `HUB_API_URL` | formbricks | http://hub.railway.internal:8080 | Private Hub endpoint |
| `DATABASE_URL` | formbricks | - | Postgres connection string |
| `NEXTAUTH_URL` | formbricks | - | Auth callback base, matches WEBAPP_URL |
| `NODE_OPTIONS` | formbricks | --max-old-space-size=2048 | Node heap ceiling |
| `S3_ACCESS_KEY` | formbricks | - | Object storage access key |
| `S3_SECRET_KEY` | formbricks | (secret) | Object storage secret key |
| `CUBEJS_API_URL` | formbricks | http://cube.railway.internal:4000 | Private Cube endpoint |
| `ENCRYPTION_KEY` | formbricks | - | Encrypts 2FA and single-use links |
| `S3_BUCKET_NAME` | formbricks | - | Upload bucket name |
| `NEXTAUTH_SECRET` | formbricks | (secret) | Session signing key |
| `S3_ENDPOINT_URL` | formbricks | - | S3-compatible endpoint |
| `SESSION_MAX_AGE` | formbricks | 604800 | Session lifetime in seconds |
| `AUDIT_LOG_ENABLED` | formbricks | 1 | Write audit log through Redis |
| `CUBEJS_API_SECRET` | formbricks | (secret) | Signs JWTs sent to Cube |
| `CUBEJS_JWT_ISSUER` | formbricks | formbricks-web | Expected JWT issuer claim |
| `CUBEJS_JWT_AUDIENCE` | formbricks | formbricks-cube | Expected JWT audience claim |
| `S3_FORCE_PATH_STYLE` | formbricks | 1 | Use path-style addressing |
| `PASSWORD_RESET_DISABLED` | formbricks | (secret) | Set 0 once SMTP is configured |
| `EMAIL_VERIFICATION_DISABLED` | formbricks | 1 | Set 0 once SMTP is configured |
| `API_KEY` | hub-worker | (secret) | Shared secret with the web app |
| `LOG_LEVEL` | hub-worker | info | Log level |
| `LOG_FORMAT` | hub-worker | json | Structured log output |
| `DATABASE_URL` | hub-worker | - | Same database as Formbricks |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/app/hub-worker`

**Category:** Analytics · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/formbricks-survey)
