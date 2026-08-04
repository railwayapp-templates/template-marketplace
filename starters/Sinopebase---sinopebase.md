# Deploy Sinopebase on Railway

Ship the product. We run the rest. DB, Auth, AI, storage. Pay per use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sinopebase)

## About

**Stop building backends. Start shipping products.**

Auth, database, storage, realtime, and AI — one deploy, zero boilerplate. You already know the API.

Sinopebase is a single Bun service. One click deploys the container, connects your database and bucket, and gives you a public URL. TLS is terminated at Railway's edge — your service speaks plain HTTP internally, HTTPS externally.

Startup takes under a second. System migrations run automatically against your PostgreSQL instance. Auth works immediately — email, password, and OAuth providers are ready to configure. Your database is query-able via the REST API. File uploads just work. Realtime WebSocket channels are live.

The admin UI at `/_/` lets you browse tables, manage users, view logs, and monitor metrics without leaving your browser. API docs are auto-generated at `/api/docs`.

To add OAuth providers, set environment variables like `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your Railway service settings and redeploy. To add AI features, set `OPENAI_API_KEY` (or swap `OPENAI_BASE_URL` for DeepSeek, Groq, or Ollama).

Scales vertically with bigger Railway instances. For production, enable `SINOPEBASE_PRODUCTION=true` to enforce strong secrets and fail-closed infrastructure checks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| kalvexdotdev/sinopebase:latest | `ghcr.io/kalvexdotdev/sinopebase:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `JWT_SECRET ` | kalvexdotdev/sinopebase:latest | (secret) | Secret key for JWTs |
| `POSTGRES_URL` | kalvexdotdev/sinopebase:latest | - | Connection String for Postgres |
| `BETTER_AUTH_URL` | kalvexdotdev/sinopebase:latest | - | Public URL for Oauth Callbacks |
| `OPENAI_BASE_URL` | kalvexdotdev/sinopebase:latest | - | OpenAI compatible endpoint for inferrence |
| `RUSTFS_ENDPOINT` | kalvexdotdev/sinopebase:latest | - | API Endpoint for an S3 Compatible Object Storage |
| ` OPENAI_API_KEY ` | kalvexdotdev/sinopebase:latest | (secret) | Secret Key used for your inferrence provider |
| `RUSTFS_ACCESS_KEY` | kalvexdotdev/sinopebase:latest | - | S3 Compatible Access Key |
| `RUSTFS_SECRET_KEY` | kalvexdotdev/sinopebase:latest | (secret) | S3 Compatible Secret Key |
| `MASTRA_REQUIRE_AUTH ` | kalvexdotdev/sinopebase:latest | true | Used to check if AI endpoints require a bearer token, highly recommended. |
| `SINOPEBASE_ANON_KEY ` | kalvexdotdev/sinopebase:latest | - | Anonymous access key to sinopebase |
| ` SINOPEBASE_PRODUCTION` | kalvexdotdev/sinopebase:latest | true | Sets Sinope base into production mode, highly recommended. |
| `SINOPEBASE_SERVICE_ROLE_KEY ` | kalvexdotdev/sinopebase:latest | - | Service role key for the instance, keep this safe. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters

[View on Railway →](https://railway.com/deploy/sinopebase)
