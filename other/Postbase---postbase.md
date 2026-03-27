# Deploy Postbase on Railway

The open-source alternative to Firebase and Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postbase)

## About

Postbase is a self-hosted auth and database platform for Next.js. Drop it into your stack, configure 25+ auth providers from a dashboard, and connect your app with a single SDK call. Think self-hosted Supabase or Clerk — you own the data, you control the infra.

Postbase ships as a single Docker container bundling PostgreSQL 18 (with pg_cron and pgmq), MinIO object storage, and the Next.js dashboard — all managed by supervisord. Deploying on Railway means one service, one attached volume, and a handful of environment variables. Railway detects the root Dockerfile automatically. You attach a volume at `/data` to persist your database and object storage, set a few secrets, generate a public domain, and you're live. No separate database service or storage bucket required — everything runs together out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [harshalone/postbase](https://github.com/harshalone/postbase) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_SECRET` | (secret) |
| `POSTGRES_DB` | N76ajJPP69zZGboyZvVn7IxuOa280R |
| `NEXTAUTH_URL` | update_later |
| `POSTGRES_USER` | (secret) |
| `MINIO_ENDPOINT` | http://localhost:9000 |
| `MINIO_ROOT_USER` | (secret) |
| `NEXTAUTH_SECRET` | (secret) |
| `MINIO_SECRET_KEY` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |
| `MINIO_ROOT_PASSWORD` | (secret) |
| `POSTBASE_JWT_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/postbase)
