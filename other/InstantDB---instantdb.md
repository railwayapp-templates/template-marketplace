# Deploy InstantDB on Railway

Self-hosted InstantDB with Postgres and Railway Bucket object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/instantdb)

## About

InstantDB is a modern realtime database for building collaborative and local-first applications. It provides client-friendly
  data sync, permissions, auth, and backend infrastructure so teams can build reactive apps without manually stitching
  together databases, APIs, websockets, and sync logic.

  ## About Hosting InstantDB

  Hosting InstantDB on Railway runs the InstantDB backend, dashboard, Postgres database, and object storage in one Railway
  project. Postgres stores application data and WAL history, while Railway Bucket provides S3-compatible object storage for
  files and backend storage needs. The backend service exposes the InstantDB API, and the dashboard service provides the web
  UI for managing apps, auth, schema, permissions, and runtime settings.

  ## Common Use Cases

  - Build realtime collaborative apps with synced client state
  - Self-host InstantDB for more control over infrastructure and data residency
  - Prototype full-stack apps quickly with auth, permissions, storage, and database sync included

  ## Dependencies for InstantDB Hosting

  - Railway Postgres-compatible database service
  - Railway Bucket for S3-compatible object storage
  - InstantDB server and dashboard container images

  ### Deployment Dependencies

  - InstantDB self-hosting docs: https://www.instantdb.com/docs/self-hosting
  - InstantDB GitHub: https://github.com/instantdb/instant
  - Railway Buckets: https://docs.railway.com/storage-buckets
  - Railway Templates: https://docs.railway.com/templates/create

  ### Implementation Details

  This template deploys three services and one Railway Bucket:

  - `server`: InstantDB backend API
  - `dashboard`: InstantDB dashboard UI
  - `postgres`: Postgres with InstantDB-compatible settings
  - `instantdb-storage`: Railway Bucket used through S3-compatible environment variables

  The server is configured with Railway reference variables for Postgres and Bucket credentials, including `DATABASE_URL`,
  `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_ENDPOINT`, `S3_PUBLIC_ENDPOINT`, and `S3_BUCKET`.

  ## Why Deploy InstantDB on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have
  to deal with configuration, while allowing you to vertically and horizontally scale it.

  By deploying InstantDB on Railway, you are one step closer to supporting a complete full-stack application with minimal
  burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/instantdb/server:latest` | Web service |
| dashboard | `ghcr.io/instantdb/dashboard:latest` | Web service |
| postgres | `ghcr.io/instantdb/postgresql:postgresql-16-pg-hint-plan` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | server | 8888 | Port the backend listens on. |
| `JAVA_OPTS` | server | -Xmx1024m -Xms256m | JVM heap settings for the InstantDB backend. |
| `S3_BUCKET` | server | - | Railway Bucket name for InstantDB storage objects. |
| `AWS_REGION` | server | - | Railway Bucket region. |
| `S3_ENDPOINT` | server | - | S3-compatible endpoint for the Railway Bucket. |
| `DATABASE_URL` | server | - | Internal Postgres connection URL. |
| `POSTMARK_TOKEN` | server | (secret) | Optional Postmark token. If omitted, magic-code emails are logged by the server. |
| `STRIPE_API_KEY` | server | (secret) | Optional Stripe API key for billing-related InstantDB features. |
| `AWS_ACCESS_KEY_ID` | server | - | Railway Bucket access key used by InstantDB object storage. |
| `S3_PUBLIC_ENDPOINT` | server | - | Public S3-compatible endpoint used when InstantDB creates signed URLs. |
| `INSTANT_BACKEND_URL` | server | - | Public URL of this InstantDB backend service. |
| `WAL_HISTORY_STORAGE` | server | pg | Store WAL history in Postgres. |
| `AWS_SECRET_ACCESS_KEY` | server | (secret) | Railway Bucket secret access key used by InstantDB object storage. |
| `INSTANT_DASHBOARD_URL` | server | - | Public URL of the InstantDB dashboard service. |
| `INSTANT_EMAIL_REPLY_TO` | server | - | Optional reply-to email address for InstantDB emails. |
| `INSTANT_APP_EMAIL_SENDER_NAME` | server | Instant | Sender name for app emails. |
| `INSTANT_APP_EMAIL_SENDER_EMAIL` | server | - | Optional sender email for app emails when Postmark is configured. |
| `INSTANT_TEAM_EMAIL_SENDER_NAME` | server | Instant | Sender name for team emails. |
| `INSTANT_TEAM_EMAIL_SENDER_EMAIL` | server | - | Optional sender email for team emails when Postmark is configured. |
| `INSTANT_DASHBOARD_EMAIL_SENDER_NAME` | server | Instant | Sender name for dashboard emails. |
| `INSTANT_DASHBOARD_EMAIL_SENDER_EMAIL` | server | - | Optional sender email for dashboard emails when Postmark is configured. |
| `PORT` | dashboard | 3000 | Port the dashboard listens on. |
| `INSTANT_BACKEND_URL` | dashboard | - | Public URL of the InstantDB backend service. |
| `POSTGRES_DB` | postgres | instant | Default database created by the Postgres image. |
| `DATABASE_URL` | postgres | - | Internal Postgres connection URL. |
| `POSTGRES_USER` | postgres | (secret) | Default Postgres user created by the Postgres image. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated Postgres password. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/resources/config`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/instantdb)
