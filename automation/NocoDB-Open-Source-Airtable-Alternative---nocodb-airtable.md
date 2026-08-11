# Deploy NocoDB | Open Source Airtable Alternative on Railway

Self-hosted Airtable alternative — a no-code database over Postgres

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb-airtable)

## About

NocoDB turns any database into a smart spreadsheet — grid, gallery, kanban and form views over your data, with roles, shares, an Airtable importer and a REST/GraphQL API on top. This template deploys the whole thing from NocoDB's own official image: the web app, a background worker, Postgres, a Valkey cache/queue, and managed object storage for attachments.

Four services and a bucket, all from official upstream images:

- **NocoDB** — the web app (dashboard, the REST/GraphQL API, email/password auth). The only service with a domain.
- **NocoDB Worker** — the same image in worker mode. It pulls long-running jobs — Airtable/CSV imports, webhook delivery, exports — off the queue so they never block the web app.
- **Postgres** — your bases, tables, rows and metadata, on a volume. NocoDB requires Postgres for a real deployment.
- **Valkey** — the cache and the job queue that connects the web app to the worker. A drop-in Redis fork.
- **Bucket** — Railway object storage for avatars and every file you attach to a record.

All variables are filled in and described on the deploy screen. **There is nothing you have to supply** — open the URL, register, and the first account becomes the super admin.

Four things this template does that are worth knowing about:

**The image is pinned.** Both other NocoDB templates ship `nocodb/nocodb:latest`, so a redeploy months from now can pull a different NocoDB under your live bases. This template pins a version (`2026.08.0`): a redeploy gives you exactly what you already ran, and you move up deliberately — bump the tag, back up first — instead of by surprise.

**Attachments actually work, and the app tier is stateless.** NocoDB signs presigned URLs that your browser fetches straight from storage. That means the addressing style matters: Railway storage only sends CORS headers on the path-style (`host/bucket/key`) endpoint, so `NC_S3_FORCE_PATH_STYLE` is on — with virtual-hosted URLs every attachment fails in the browser while `curl` still reports 200. Because attachments live in the bucket and everything else lives in Postgres, the web and worker containers hold no state: they share one attachment store, and a redeploy loses nothing. The other approach — attachments on a local disk — puts them on one container that the worker cannot see.

**The cache has no volume, on purpose.** Both other NocoDB templates give their Redis a persistent volume, and on Railway that is a trap: a fresh volume ships a `lost+found` directory the Redis image refuses to write around, so its first save fails and it then rejects every write — minutes after a deploy that went green. Here the queue and cache are Valkey with no volume, because a cache and a job queue have nothing to persist. Nothing to corrupt, nothing to back up.

**Everything talks over the private network.** Postgres and Valkey have no public proxy; the web app and worker reach them over Railway's private network. Your database is not on the internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NocoDB Worker | `nocodb/nocodb:2026.08.0` | Worker |
| NocoDB | `nocodb/nocodb:2026.08.0` | Web service |
| Postgres | `postgres:18.4-alpine` | Database |
| Valkey | `valkey/valkey:8.1.9-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NC_DB` | NocoDB Worker | - | Postgres connection over the private network (NocoDB's pg://host:port?u=&p=&d= form). No SSL, no public proxy. NocoDB requires Postgres for a production deployment. |
| `NC_REDIS_URL` | NocoDB Worker | - | Valkey/Redis connection over the private network — used for the cache and the background-job queue the worker consumes. No family hint: NocoDB hands this straight to ioredis, which resolves the private IPv6 address on its own. |
| `NC_S3_REGION` | NocoDB Worker | - | Bucket region. |
| `NC_PUBLIC_URL` | NocoDB Worker | - | Same public URL as the web service (referenced from it), so links the worker generates match. |
| `NC_S3_ENDPOINT` | NocoDB Worker | - | Object-storage endpoint (the Railway bucket). |
| `NC_DISABLE_TELE` | NocoDB Worker | true | Anonymous usage telemetry off by default. Set to false to opt back in. |
| `NC_S3_ACCESS_KEY` | NocoDB Worker | - | Bucket access key. |
| `NC_S3_BUCKET_NAME` | NocoDB Worker | - | Railway object-storage bucket for attachments and avatars. |
| `NC_AUTH_JWT_SECRET` | NocoDB Worker | (secret) | Referenced from the NocoDB web service so both sign and validate tokens with the same key. |
| `NC_S3_ACCESS_SECRET` | NocoDB Worker | (secret) | Bucket secret key. |
| `NC_WORKER_CONTAINER` | NocoDB Worker | true | Runs this container in worker mode: no HTTP server, it pulls background jobs (Airtable/CSV imports, webhook delivery, long operations) off the Valkey queue. |
| `NC_S3_FORCE_PATH_STYLE` | NocoDB Worker | true | Keep this on. NocoDB signs presigned URLs the browser fetches directly, and Railway storage only sends CORS headers on the path-style (host/bucket/key) endpoint — with virtual-hosted URLs every attachment fails in the browser while curl still reports 200. |
| `PORT` | NocoDB | 8080 | Port the NocoDB server listens on. Railway routes traffic and the health check here. |
| `NC_DB` | NocoDB | - | Postgres connection over the private network (NocoDB's pg://host:port?u=&p=&d= form). No SSL, no public proxy. NocoDB requires Postgres for a production deployment. |
| `NC_REDIS_URL` | NocoDB | - | Valkey/Redis connection over the private network — used for the cache and the background-job queue the worker consumes. No family hint: NocoDB hands this straight to ioredis, which resolves the private IPv6 address on its own. |
| `NC_S3_REGION` | NocoDB | - | Bucket region. |
| `NC_PUBLIC_URL` | NocoDB | - | Public URL of this instance — used for share links, invite emails and attachment URLs. Set it to your own domain if you add one. |
| `NC_S3_ENDPOINT` | NocoDB | - | Object-storage endpoint (the Railway bucket). |
| `NC_DISABLE_TELE` | NocoDB | true | Anonymous usage telemetry off by default. Set to false to opt back in. |
| `NC_S3_ACCESS_KEY` | NocoDB | - | Bucket access key. |
| `NC_S3_BUCKET_NAME` | NocoDB | - | Railway object-storage bucket for attachments and avatars. |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | Signs session tokens. Generated once; changing it logs everyone out. |
| `NC_S3_ACCESS_SECRET` | NocoDB | (secret) | Bucket secret key. |
| `NC_S3_FORCE_PATH_STYLE` | NocoDB | true | Keep this on. NocoDB signs presigned URLs the browser fetches directly, and Railway storage only sends CORS headers on the path-style (host/bucket/key) endpoint — with virtual-hosted URLs every attachment fails in the browser while curl still reports 200. |
| `POSTGRES_DB` | Postgres | nocodb | Database NocoDB uses; the NC_DB connection string points at this name. |
| `POSTGRES_USER` | Postgres | (secret) | Database user created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password, generated once. It is embedded in NC_DB's query string, so letters and digits only. |
| `REDIS_PASSWORD` | Valkey | (secret) | Valkey password, generated once. Embedded in NC_REDIS_URL, so letters and digits only. Valkey is a drop-in Redis fork; NocoDB connects to it exactly as it would to Redis. |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD"'`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/nocodb-airtable)
