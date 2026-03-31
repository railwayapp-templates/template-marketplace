# Deploy Papermark on Railway

Papermark: Your #1 alternative to Docsend. Open Source.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/papermark)

## About

This template clones the upstream [mfts/papermark](https://github.com/mfts/papermark) repository and builds it inside a multi-stage Dockerfile on Node 22. Prisma generates the database client at build time and migrations run automatically at container startup via `prisma migrate deploy`. The app listens on port 3000 and connects to PostgreSQL through `POSTGRES_PRISMA_URL`. Document uploads require blob storage: either a Vercel Blob token or S3-compatible credentials (AWS, MinIO, Cloudflare R2). Email notifications require a Resend API key. Google OAuth and passkey login are optional.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| web | [atoolz/railway-papermark](https://github.com/atoolz/railway-papermark) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | papermark | logical database/schema name created on first init |
| `DATABASE_URL` | Postgres | - | in-cluster connection string; web service uses ${{Postgres.DATABASE_URL}} as POSTGRES_PRISMA_URL |
| `POSTGRES_USER` | Postgres | (secret) | superuser name on first init |
| `POSTGRES_PASSWORD` | Postgres | (secret) | generated root password; never commit real values to git |
| `DATABASE_PUBLIC_URL` | Postgres | - | postgresql:// via Railway TCP proxy for clients outside the private network |
| `PORT` | web | 3000 | HTTP port the Next.js server listens on |
| `NEXTAUTH_URL` | web | - | canonical app URL used by NextAuth for callbacks |
| `QSTASH_TOKEN` | web | (secret) | Upstash QStash token for background jobs and queues (https://upstash.com) |
| `HANKO_API_KEY` | web | (secret) | Hanko Passkey API key; required for passkey login (https://docs.hanko.io) |
| `RESEND_API_KEY` | web | (secret) | Resend API key for magic-link and notification emails (https://resend.com) |
| `TINYBIRD_TOKEN` | web | (secret) | Tinybird token for analytics event ingestion (optional) |
| `NEXTAUTH_SECRET` | web | (secret) | session signing key; generated at provision |
| `GOOGLE_CLIENT_ID` | web | - | Google OAuth client ID for social login |
| `TRIGGER_SECRET_KEY` | web | (secret) | Trigger.dev secret key for background task orchestration (optional) |
| `POSTGRES_PRISMA_URL` | web | - | pooled Postgres connection string for Prisma queries |
| `GOOGLE_CLIENT_SECRET` | web | (secret) | Google OAuth client secret paired with the client ID above |
| `NEXT_PUBLIC_BASE_URL` | web | - | public-facing base URL for links, OG images, and redirects |
| `BLOB_READ_WRITE_TOKEN` | web | (secret) | Vercel Blob read/write token; only needed if UPLOAD_TRANSPORT=vercel |
| `UPSTASH_REDIS_REST_URL` | web | - | Upstash Redis REST endpoint for rate limiting (https://console.upstash.com) |
| `QSTASH_NEXT_SIGNING_KEY` | web | - | next (rotated) QStash signing key; used during key rotation |
| `UPSTASH_REDIS_REST_TOKEN` | web | (secret) | Upstash Redis REST token paired with the URL above |
| `NEXT_PUBLIC_APP_BASE_HOST` | web | - | bare hostname (no protocol); used by middleware to distinguish app vs custom domains |
| `NEXT_PUBLIC_MARKETING_URL` | web | - | marketing site URL; same as base URL in self-hosted setups |
| `NEXT_PRIVATE_UPLOAD_BUCKET` | web | - | S3 bucket name for document storage |
| `NEXT_PRIVATE_UPLOAD_REGION` | web | us-east-1 | S3 bucket region |
| `QSTASH_CURRENT_SIGNING_KEY` | web | - | current QStash webhook signature key for request verification |
| `NEXT_PUBLIC_HANKO_TENANT_ID` | web | - | Hanko tenant ID paired with the API key above |
| `NEXT_PRIVATE_UPLOAD_ENDPOINT` | web | - | S3-compatible endpoint URL; leave empty for AWS S3 |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | web | s3 | storage backend: "vercel" (Vercel Blob) or "s3" (any S3-compatible) |
| `UPSTASH_REDIS_REST_LOCKER_URL` | web | - | Upstash Redis REST endpoint for tus.io bulk-upload locking |
| `POSTGRES_PRISMA_URL_NON_POOLING` | web | - | direct (non-pooled) Postgres connection for migrations |
| `UPSTASH_REDIS_REST_LOCKER_TOKEN` | web | (secret) | Upstash Redis REST token for the locker instance |
| `NEXT_PRIVATE_VERIFICATION_SECRET` | web | (secret) | HMAC secret for verification link checksums |
| `NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID` | web | - | S3 access key ID |
| `NEXT_PRIVATE_DOCUMENT_PASSWORD_KEY` | web | (secret) | encryption key for document password protection |
| `NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST` | web | - | CDN hostname (CloudFront, S3, or Blob) used in next.config.mjs image remotes |
| `NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY` | web | (secret) | S3 secret access key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/papermark)
