# Deploy Send Email at AWS SES Pricing — Self-Host useSend on Railway on Railway

Self-host email at AWS SES pricing. No SendGrid or Resend markup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/usesend-email-platform)

## About

useSend is the open-source email platform that gives you the power of SendGrid, Resend, and
Postmark — self-hosted on your own infrastructure, powered by **Amazon SES at $0.10 per
1,000 emails**. Transactional REST API, SMTP relay, bulk campaign sending, contact
management, visual WYSIWYG email editor, and real-time delivery analytics (opens, clicks,
bounces, unsubscribes) — all in one platform you fully control.

At 100,000 emails/month: SendGrid costs $89.95. Resend costs $40. Postmark costs $75.
useSend on Railway costs ~$10 in SES fees plus Railway compute. No per-platform markup.

---

Managed email platforms like SendGrid and Resend are pay-to-play — the more email you send,
the more you pay in platform fees. useSend routes email through Amazon SES, which charges
$0.10 per 1,000 emails with no monthly minimum — the same infrastructure behind AWS's
most reliable email service, billed directly at cost with no middleman markup.

Railway provisions the full six-service stack automatically. PostgreSQL, Redis, and MinIO
are pre-wired over private networking. useSend runs as a Next.js application behind
Railway's HTTPS proxy with automatic domain management and API key generation.

Typical cost: **~$10–15/month** on Railway's Hobby plan for the full six-service stack
plus your AWS SES usage at $0.10/1,000 emails. At 500,000 emails/month, total cost is
~$65/month — versus SendGrid at ~$299/month or Resend at ~$90/month at the same volume.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO Bucket Creator | `minio/mc:RELEASE.2025-04-16T18-13-26Z` | Database |
| Redis | `redis:8.2.1` | Database |
| Storage | `minio/minio:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Worker |
| Server | `usesend/usesend` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `GITHUB_SECRET` | Server | (secret) | - |
| `AWS_SECRET_KEY` | Server | (secret) | - |
| `NEXTAUTH_SECRET` | Server | (secret) | - |
| `AWS_DEFAULT_REGION` | Server | us-east-1 | - |
| `S3_COMPATIBLE_SECRET_KEY` | Server | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/usesend-email-platform)
