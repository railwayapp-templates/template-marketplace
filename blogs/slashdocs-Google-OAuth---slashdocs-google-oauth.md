# Deploy slashdocs + Google OAuth on Railway

Deploy and host slashdocs from Razorpay + Google OAuth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slashdocs-google-oauth)

## About

slashdocs is a self-hosted platform for publishing, versioning and reviewing HTML documents. Engineers and AI agents publish reports, specs and RCAs from a CLI, and reviewers comment inline in the browser. This template comes with Google OAuth sign-in already set up, so your team logs in with their Google accounts.

This template deploys four resources, already wired together. **slashdocs** runs the web app, API, MCP endpoint and CLI downloads. **slashdocs-render** serves uploaded HTML on a separate domain, so documents run in a sandbox away from your login session. **Postgres** stores metadata, comments and sessions, and a **storage bucket** holds every document version. Database URLs, bucket credentials, both public origins and the session secret are configured for you. You only provide a Google OAuth client ID and secret. After deploying, add your app's callback URL to the Google OAuth client so sign-in works.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| slashdocs-render | `razorpay/slashdocs:0.3` | Web service |
| slashdocs | `razorpay/slashdocs:0.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start |
| `DATABASE_URL` | Postgres | - | Private connection URL for Postgres, built from the variables below |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first start |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated randomly at deploy |
| `BLOB_BUCKET` | slashdocs-render | - | Storage bucket for document versions, taken from slashdocs-docs. |
| `BLOB_REGION` | slashdocs-render | auto | S3 signing region for the bucket. Keep "auto". |
| `DATABASE_URL` | slashdocs-render | - | Postgres connection, taken from the Postgres service. |
| `BLOB_ENDPOINT` | slashdocs-render | - | S3 endpoint of the bucket |
| `SESSION_SECRET` | slashdocs-render | (secret) | session key as the slashdocs service |
| `SLASHDOCS_MIGRATE` | slashdocs-render | false | Keep "false". Only the slashdocs service runs database migrations. |
| `BLOB_ACCESS_KEY_ID` | slashdocs-render | - | Bucket access key |
| `SLASHDOCS_APP_ORIGIN` | slashdocs-render | - | Public URL of the app |
| `BLOB_SECRET_ACCESS_KEY` | slashdocs-render | (secret) |  Bucket secret key |
| `GOOGLE_OAUTH_CLIENT_ID` | slashdocs-render | - | Google OAuth client id |
| `SLASHDOCS_RENDER_ORIGIN` | slashdocs-render | - |  Public URL where documents render. |
| `SLASHDOCS_KV_EVENTS_MODE` | slashdocs-render | notify | How live comments and presence sync between the two services. |
| `GOOGLE_OAUTH_CLIENT_SECRET` | slashdocs-render | (secret) | Google OAuth client secret |
| `BLOB_BUCKET` | slashdocs | - | Storage bucket for document versions, taken from slashdocs-docs. |
| `BLOB_REGION` | slashdocs | auto | S3 signing region for the bucket |
| `DATABASE_URL` | slashdocs | - | Postgres connection, taken from the Postgres service. |
| `BLOB_ENDPOINT` | slashdocs | - | S3 endpoint of the bucket |
| `SESSION_SECRET` | slashdocs | (secret) | Key for signing login sessions. |
| `BLOB_ACCESS_KEY_ID` | slashdocs | - | Bucket access key |
| `SLASHDOCS_APP_ORIGIN` | slashdocs | - | Public URL of the app. |
| `BLOB_SECRET_ACCESS_KEY` | slashdocs | (secret) | Bucket secret key |
| `GOOGLE_OAUTH_CLIENT_ID` | slashdocs | - | Client ID of your Google OAuth web client |
| `SLASHDOCS_RENDER_ORIGIN` | slashdocs | - | Public URL where documents render. |
| `SLASHDOCS_KV_EVENTS_MODE` | slashdocs | notify | How live comments and presence sync between the two services. |
| `GOOGLE_OAUTH_CLIENT_SECRET` | slashdocs | (secret) | Client secret of the same Google OAuth web client. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/slashdocs-google-oauth)
