# Deploy tracedown-core-template on Railway

Deploy Tracedown platform on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tracedown-core-template)

## About

[Tracedown](https://tracedown.dev) is a self-hosted API monitoring platform: probes written in the Lace scripting language run against your endpoints on schedules, with assertions, multi-step journeys,
notifications, and a full dashboard. This template deploys the complete Tracedown Core stack — eight JVM services, PostgreSQL (TimescaleDB), Redis, and an edge proxy serving the UI.

The template deploys eleven services in one click: the API gateway (which runs schema migrations and internal-CA init on startup), probe scheduler, result ingestor, notification
dispatcher, email service, metrics service, aggregate worker, realtime WebSocket service, a Caddy edge proxy that serves the dashboard and routes `/api`, `/ws`, and `/metrics`, plus
TimescaleDB and Redis. Nothing builds from source — every service fetches versioned release artifacts from GitHub, so deploys are fast and upgrades are a one-line version bump.
Secrets are generated at deploy time and shared by reference; you enter only your admin email and password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aggregate-worker | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| email-service | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| notification-dispatcher | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| proxy | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Web service |
| realtime-service | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| result-ingestor | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| gateway | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Database |
| metrics-service | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| probe-scheduler | [tracedown/tracedown-railway-template](https://github.com/tracedown/tracedown-railway-template) | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `timescale/timescaledb:latest-pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | aggregate-worker | 20860 | Aggregate Worker port |
| `REDIS_A_URL` | aggregate-worker | - | Redis A URL |
| `REDIS_B_URL` | aggregate-worker | - | Redis B URL |
| `REDIS_C_URL` | aggregate-worker | - | Redis C URL |
| `DATABASE_URL` | aggregate-worker | - | Database URL |
| `DATABASE_USER` | aggregate-worker | (secret) | Database user |
| `PLATFORM_AES_KEY` | aggregate-worker | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | aggregate-worker | (secret) | Database password |
| `STORAGE_S3_BUCKET` | aggregate-worker | - | S3 Bucket |
| `STORAGE_S3_PREFIX` | aggregate-worker | - | S3 Prefix |
| `STORAGE_S3_ENDPOINT` | aggregate-worker | - | S3 endpoint |
| `STORAGE_S3_ACCESS_KEY` | aggregate-worker | - | S3 Access Key ID |
| `STORAGE_S3_SECRET_KEY` | aggregate-worker | (secret) | S3 Secret key |
| `PORT` | email-service | 20840 | Email Service port |
| `REDIS_A_URL` | email-service | - | Redis A URL |
| `REDIS_B_URL` | email-service | - | Redis B URL |
| `REDIS_C_URL` | email-service | - | Redis C URL |
| `DATABASE_URL` | email-service | - | Database URL |
| `DATABASE_USER` | email-service | (secret) | Database user |
| `EMAIL_PROVIDER` | email-service | console | Email provider. "smtp", "mailgun", "resend", "console" |
| `EMAIL_FROM_NAME` | email-service | Tracedown | Sender display name |
| `EMAIL_SMTP_HOST` | email-service | - | SMTP host; SMTP-only |
| `EMAIL_SMTP_PORT` | email-service | 587 | SMTP port; SMTP-only |
| `PLATFORM_AES_KEY` | email-service | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | email-service | (secret) | Database password |
| `EMAIL_FROM_ADDRESS` | email-service | - | Sender address |
| `EMAIL_SMTP_PASSWORD` | email-service | (secret) | SMTP password; SMTP-only |
| `EMAIL_SMTP_TLS_MODE` | email-service | STARTTLS | SMTP TLS mode; SMTP-only |
| `EMAIL_SMTP_USERNAME` | email-service | (secret) | SMTP username; SMTP-only |
| `EMAIL_MAILGUN_DOMAIN` | email-service | - | Mailgun domain; Mailgun-only |
| `EMAIL_MAILGUN_REGION` | email-service | us | Mailgun region; Mailgun-only |
| `EMAIL_RESEND_API_KEY` | email-service | (secret) | Resend API key; Resend-only |
| `EMAIL_MAILGUN_API_KEY` | email-service | (secret) | Mailgun API key; Mailgun-only |
| `PORT` | notification-dispatcher | 20830 | Notifications Dispatcher port |
| `REDIS_A_URL` | notification-dispatcher | - | Redis A URL |
| `REDIS_B_URL` | notification-dispatcher | - | Redis B URL |
| `REDIS_C_URL` | notification-dispatcher | - | Redis C URL |
| `DATABASE_URL` | notification-dispatcher | - | Database URL |
| `DATABASE_USER` | notification-dispatcher | (secret) | Database user |
| `PLATFORM_AES_KEY` | notification-dispatcher | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | notification-dispatcher | (secret) | Database password |
| `PORT` | proxy | 8080 | Deployment entry port |
| `GATEWAY_HOST` | proxy | - | Gateway internal URL |
| `METRICS_HOST` | proxy | - | Metrics internal URL |
| `REALTIME_HOST` | proxy | - | Realtime service internal URL |
| `PORT` | realtime-service | 20870 | Realtime Service port |
| `REDIS_A_URL` | realtime-service | - | Redis A URL |
| `REDIS_B_URL` | realtime-service | - | Redis B URL |
| `REDIS_C_URL` | realtime-service | - | Redis C URL |
| `DATABASE_URL` | realtime-service | - | Database URL |
| `DATABASE_USER` | realtime-service | (secret) | Database user |
| `PLATFORM_AES_KEY` | realtime-service | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | realtime-service | (secret) | Database password |
| `PORT` | result-ingestor | 20820 | Result Ingestor port |
| `REDIS_A_URL` | result-ingestor | - | Redis A URL |
| `REDIS_B_URL` | result-ingestor | - | Redis B URL |
| `REDIS_C_URL` | result-ingestor | - | Redis C URL |
| `DATABASE_URL` | result-ingestor | - | Database URL |
| `DATABASE_USER` | result-ingestor | (secret) | Database user |
| `PLATFORM_AES_KEY` | result-ingestor | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | result-ingestor | (secret) | Database password |
| `STORAGE_S3_BUCKET` | result-ingestor | - | S3 Bucket |
| `STORAGE_S3_PREFIX` | result-ingestor | - | S3 Prefix |
| `STORAGE_S3_ENDPOINT` | result-ingestor | - | S3 endpoint |
| `STORAGE_S3_ACCESS_KEY` | result-ingestor | - | S3 Access Key ID |
| `STORAGE_S3_SECRET_KEY` | result-ingestor | (secret) | S3 Secret key |
| `PORT` | gateway | 20714 | Gateway port |
| `APP_URL` | gateway | - | Public app URL |
| `JWT_SECRET` | gateway | (secret) | Sessions secret |
| `REDIS_A_URL` | gateway | - | Redis A URL |
| `REDIS_B_URL` | gateway | - | Redis B URL |
| `REDIS_C_URL` | gateway | - | Redis C URL |
| `DATABASE_URL` | gateway | - | Database URL |
| `DATABASE_USER` | gateway | (secret) | Database user |
| `DEMO_USER_EMAIL` | gateway | - | Root user email |
| `PLATFORM_AES_KEY` | gateway | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | gateway | (secret) | Database password |
| `STORAGE_S3_BUCKET` | gateway | - | S3 Bucket |
| `STORAGE_S3_PREFIX` | gateway | bodies | S3 Prefix |
| `DEMO_USER_PASSWORD` | gateway | (secret) | Root user password |
| `STORAGE_S3_ENDPOINT` | gateway | - | S3 endpoint |
| `STORAGE_S3_ACCESS_KEY` | gateway | - | S3 Access Key ID |
| `STORAGE_S3_SECRET_KEY` | gateway | (secret) | S3 Secret key |
| `PORT` | metrics-service | 20850 | Metrics Service port |
| `REDIS_A_URL` | metrics-service | - | Redis A URL |
| `REDIS_B_URL` | metrics-service | - | Redis B URL |
| `REDIS_C_URL` | metrics-service | - | Redis C URL |
| `DATABASE_URL` | metrics-service | - | Database URL |
| `DATABASE_USER` | metrics-service | (secret) | Database user |
| `PLATFORM_AES_KEY` | metrics-service | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | metrics-service | (secret) | Database password |
| `PORT` | probe-scheduler | PORT="20810" | Probe Scheduler port |
| `GATEWAY_URL` | probe-scheduler | - | Gateway internal URL |
| `REDIS_A_URL` | probe-scheduler | - | Redis A URL |
| `REDIS_B_URL` | probe-scheduler | - | Redis B URL |
| `REDIS_C_URL` | probe-scheduler | - | Redis C URL |
| `DATABASE_URL` | probe-scheduler | - | Database URL |
| `DATABASE_USER` | probe-scheduler | (secret) | Database user |
| `PLATFORM_AES_KEY` | probe-scheduler | - | Platform AES encryption key |
| `DATABASE_PASSWORD` | probe-scheduler | (secret) | Database password |
| `REDISHOST` | Redis | - | Redis host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Redis URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password |
| `POSTGRES_DB` | Postgres | tracedown | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `TS_TUNE_MAX_CONNS` | Postgres | 100 | Database max connections |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/data/bodies`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/tracedown-core-template)
