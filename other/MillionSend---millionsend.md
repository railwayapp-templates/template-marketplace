# Deploy MillionSend on Railway

Open source email API and broadcasts on your own AWS SES, Resend compatible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/millionsend)

## About

MillionSend is an open source email platform for transactional email and broadcasts, with an HTTP API that is wire-compatible with Resend: an existing integration moves over by changing the API key and base URL. It sends through your own AWS SES account. This template runs the dashboard, API and worker from the official image with PostgreSQL, the only datastore it needs.

![The MillionSend dashboard showing the Emails page, with each recipient's delivery status: delivered, opened, clicked, bounced](https://raw.githubusercontent.com/MillionSend/millionsend/main/.github/screenshots/emails.png)

The official `ghcr.io/millionsend/millionsend` image contains three processes, and `PROCESS` selects which one a container runs. The template splits them into three services, so each gets its own domain, logs and restarts:

- **MillionSend** (`PROCESS=web`) is the dashboard on port 3000, with a health check on `/login`. It also serves the open and click tracking links and the hosted unsubscribe pages.
- **MillionSend API** (`PROCESS=api`) is the REST API on port 3001, with a health check on `/health`. SDKs, HTTP integrations and MCP clients talk to this domain.
- **MillionSend Worker** (`PROCESS=worker`) sends queued mail, runs broadcasts and scheduled jobs, and long-polls the SQS queue for SES delivery, bounce and complaint events. It needs no domain.
- **Postgres** is Railway's SSL-enabled PostgreSQL 17 on a volume. It also holds the job queue (pg-boss), so there is no Redis. It starts with `max_connections=200`, as MillionSend's own compose file does, because the three processes hold pools of up to 24 connections each.

Every service runs the database migrations on boot, behind a Postgres advisory lock, so the first container applies them and the others wait. The body encryption key and the session secret are generated at deploy time; `APP_BASE_URL` and `PUBLIC_API_URL` are set to the two public domains. The API and worker reference the dashboard service's variables, so you fill in AWS credentials once.

The first account to sign up becomes the instance operator. After that, signup is closed (`ALLOW_SIGNUP=false`), because anyone with an account can create API keys that send through your SES account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| MillionSend Worker | `ghcr.io/millionsend/millionsend:latest` | Worker |
| MillionSend | `ghcr.io/millionsend/millionsend:latest` | Web service |
| MillionSend API | `ghcr.io/millionsend/millionsend:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when the image starts |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres over the private network |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to Postgres |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres, used by the Data panel |
| `PROCESS` | MillionSend Worker | worker | Which MillionSend process this container runs: the worker (sending, broadcasts, SES events, scheduled jobs) |
| `AWS_REGION` | MillionSend Worker | - | Same as AWS_REGION on the MillionSend service |
| `ALLOW_SIGNUP` | MillionSend Worker | - | Same as ALLOW_SIGNUP on the MillionSend service |
| `APP_BASE_URL` | MillionSend Worker | - | Same as APP_BASE_URL on the MillionSend service |
| `DATABASE_URL` | MillionSend Worker | - | PostgreSQL connection string, over the private network |
| `SQS_QUEUE_URL` | MillionSend Worker | - | Same as SQS_QUEUE_URL on the MillionSend service |
| `PUBLIC_API_URL` | MillionSend Worker | - | Same as PUBLIC_API_URL on the MillionSend service |
| `SNS_TOPIC_ARNS` | MillionSend Worker | - | Same as SNS_TOPIC_ARNS on the MillionSend service |
| `AUTH_EMAIL_FROM` | MillionSend Worker | - | Same as AUTH_EMAIL_FROM on the MillionSend service |
| `AWS_ACCESS_KEY_ID` | MillionSend Worker | - | Same as AWS_ACCESS_KEY_ID on the MillionSend service |
| `BETTER_AUTH_SECRET` | MillionSend Worker | (secret) | Same as BETTER_AUTH_SECRET on the MillionSend service |
| `AWS_SECRET_ACCESS_KEY` | MillionSend Worker | (secret) | Same as AWS_SECRET_ACCESS_KEY on the MillionSend service |
| `MASTER_ENCRYPTION_KEY` | MillionSend Worker | - | Same as MASTER_ENCRYPTION_KEY on the MillionSend service |
| `SES_CONFIGURATION_SET` | MillionSend Worker | - | Same as SES_CONFIGURATION_SET on the MillionSend service |
| `PORT` | MillionSend | 3000 | Port the dashboard listens on; Railway's health check and domain use it |
| `PROCESS` | MillionSend | web | Which MillionSend process this container runs: the dashboard |
| `AWS_REGION` | MillionSend | us-east-1 | AWS region of your SES account (also used for SQS) |
| `ALLOW_SIGNUP` | MillionSend | false | The first account can always sign up and becomes the operator. Keep false so nobody else can create accounts that send through your SES |
| `APP_BASE_URL` | MillionSend | - | Public origin of the dashboard. Sign-in is only accepted from this exact origin; update it if you add a custom domain |
| `DATABASE_URL` | MillionSend | - | PostgreSQL connection string, over the private network |
| `SQS_QUEUE_URL` | MillionSend | - | SQS queue the worker polls for bounces, complaints and deliveries, from `npx @millionsend/setup` |
| `PUBLIC_API_URL` | MillionSend | - | Public origin of the API, shown in the dashboard as the SDK base URL |
| `SNS_TOPIC_ARNS` | MillionSend | - | SNS topic ARN(s) allowed to deliver SES events, comma-separated, from `npx @millionsend/setup` |
| `AUTH_EMAIL_FROM` | MillionSend | - | Sender for password reset and email verification, e.g. MillionSend <no-reply@example.com>, on a domain verified in SES. Empty: both features are off |
| `AWS_ACCESS_KEY_ID` | MillionSend | - | IAM access key with SES send rights. Get it from `npx @millionsend/setup`; sending is off until it is set |
| `BETTER_AUTH_SECRET` | MillionSend | (secret) | Signs dashboard sessions. Generated at deploy time |
| `AWS_SECRET_ACCESS_KEY` | MillionSend | (secret) | Secret for AWS_ACCESS_KEY_ID, from `npx @millionsend/setup` |
| `MASTER_ENCRYPTION_KEY` | MillionSend | - | Encrypts email bodies at rest (32 bytes, base64). Generated once; back it up with the database and never change it, or stored bodies become unreadable |
| `SES_CONFIGURATION_SET` | MillionSend | - | SES configuration set that publishes delivery events, from `npx @millionsend/setup` |
| `PORT` | MillionSend API | 3001 | Port the API listens on; Railway's health check and domain use it |
| `PROCESS` | MillionSend API | api | Which MillionSend process this container runs: the REST API |
| `AWS_REGION` | MillionSend API | - | Same as AWS_REGION on the MillionSend service |
| `ALLOW_SIGNUP` | MillionSend API | - | Same as ALLOW_SIGNUP on the MillionSend service |
| `APP_BASE_URL` | MillionSend API | - | Same as APP_BASE_URL on the MillionSend service |
| `DATABASE_URL` | MillionSend API | - | PostgreSQL connection string, over the private network |
| `SQS_QUEUE_URL` | MillionSend API | - | Same as SQS_QUEUE_URL on the MillionSend service |
| `PUBLIC_API_URL` | MillionSend API | - | Same as PUBLIC_API_URL on the MillionSend service |
| `SNS_TOPIC_ARNS` | MillionSend API | - | Same as SNS_TOPIC_ARNS on the MillionSend service |
| `AUTH_EMAIL_FROM` | MillionSend API | - | Same as AUTH_EMAIL_FROM on the MillionSend service |
| `AWS_ACCESS_KEY_ID` | MillionSend API | - | Same as AWS_ACCESS_KEY_ID on the MillionSend service |
| `BETTER_AUTH_SECRET` | MillionSend API | (secret) | Same as BETTER_AUTH_SECRET on the MillionSend service |
| `AWS_SECRET_ACCESS_KEY` | MillionSend API | (secret) | Same as AWS_SECRET_ACCESS_KEY on the MillionSend service |
| `MASTER_ENCRYPTION_KEY` | MillionSend API | - | Same as MASTER_ENCRYPTION_KEY on the MillionSend service |
| `SES_CONFIGURATION_SET` | MillionSend API | - | Same as SES_CONFIGURATION_SET on the MillionSend service |

## Configuration

- **Start command:** `wrapper.sh postgres --port=5432 -c max_connections=200 -c max_parallel_workers_per_gather=0`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/millionsend)
