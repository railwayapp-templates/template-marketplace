# Deploy slashdocs on Railway

Publish, share, and comment on HTML documents from coding agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slashdocs)

## About

SlashDocs lets people and coding agents publish self-contained HTML documents,
share them, and comment on them. It is one Go server with an embedded web app,
a CLI, and a remote MCP endpoint at `/mcp`.

This template starts two services from the `razorpay/slashdocs` image, a
Postgres database, and a storage bucket. The `slashdocs` service serves the web
app and the API. The `render` service serves uploaded HTML on a different
hostname, so that documents cannot read your session. Migrations run when the
server starts.

Before you deploy, create a Google OAuth web client and enter its ID and secret.
After the deploy, add the `slashdocs` domain with the path
`/v1/auth/google/callback` as an authorized redirect URI of that client, for
example `https://slashdocs-production-1a2b.up.railway.app/v1/auth/google/callback`.
Then open the `slashdocs` domain and sign in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| render | `razorpay/slashdocs:latest` | Web service |
| slashdocs | `razorpay/slashdocs:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SESSION_SECRET` | render | (secret) |
| `BLOB_SECRET_ACCESS_KEY` | render | (secret) |
| `GOOGLE_OAUTH_CLIENT_SECRET` | render | (secret) |
| `SESSION_SECRET` | slashdocs | (secret) |
| `BLOB_SECRET_ACCESS_KEY` | slashdocs | (secret) |
| `GOOGLE_OAUTH_CLIENT_SECRET` | slashdocs | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/slashdocs)
