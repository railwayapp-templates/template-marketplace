# Deploy Open Archiver on Railway

Self-hosted email archiving: ingest mailboxes, keep them searchable

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-archiver)

## About

Open Archiver copies your organisation's mail out of Google Workspace, Microsoft 365, a generic IMAP
mailbox, or a PST, EML or mbox export, and keeps it in storage you control. Everything it archives
becomes full-text searchable, attachments included, and stays searchable after the original message
is deleted from the mailbox it came from. This is a community-maintained template; it is not
affiliated with the Open Archiver project.

Open Archiver is a real platform rather than a single app, and hosting it reflects that. One
container runs the web interface, the API, and three background workers that ingest, index and
schedule. Around it sit a PostgreSQL database for metadata, a Valkey instance for the job queues, a
Meilisearch index for the search, and a volume for the archived mail itself. All four must agree on
connection strings and two shared keys.

The part that needs care is the first minute. A fresh instance shows a setup page that creates the
first Super Admin. The project closes that page correctly once an account exists, but on a hosting
platform the public address is live from the moment the service starts, and what sits behind that
page is an organisation's entire mail history. This template completes the setup inside the
container, before the public port is opened, so the instance is claimed before anybody can reach it.
It also refuses to start on the placeholder secrets shipped in the project's example configuration,
which are easy to copy and quiet when wrong.

Be aware of the cost. This is a four-service deployment, the application container idles at several
hundred megabytes before any mail is ingested, and the image reinstalls its dependencies on every
start, so deploys take minutes rather than seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cache | `valkey/valkey:8-alpine` | Database |
| app | `ghcr.io/youssefsiam38/openarchiver-railway:1.0.0` | Web service |
| search | `getmeili/meilisearch:v1.38` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | cache | (secret) | Password for the job queue, shared with the app. |
| `PORT` | app | 8080 | Port the gate listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `APP_URL` | app | - | Public URL. Sets the CORS origin and forms the OAuth redirect URI, so a wrong value breaks sign-in and mailbox connection. |
| `JWT_SECRET` | app | (secret) | Signs session tokens. The wrapper refuses upstream example value. |
| `MEILI_HOST` | app | - | Private URL of the search service. |
| `REDIS_HOST` | app | - | Private hostname of the job-queue service. |
| `REDIS_PORT` | app | 6379 | Job-queue port. |
| `DATABASE_URL` | app | - | PostgreSQL connection string. |
| `ENCRYPTION_KEY` | app | - | Encrypts the stored credentials of every mailbox you connect. Exactly 64 hex characters. Changing it makes existing credentials unreadable. |
| `REDIS_PASSWORD` | app | (secret) | Job-queue password. Must match the cache service. |
| `SYNC_FREQUENCY` | app | */15 * * * * | How often live mailboxes are re-synced. Upstream's default is every minute. |
| `BODY_SIZE_LIMIT` | app | 100M | Upload limit for PST and mbox imports. |
| `MEILI_MASTER_KEY` | app | - | Search API key. Must match the search service. |
| `REDIS_TLS_ENABLED` | app | false | The queue is reached over the private network, not TLS. |
| `OPENARCHIVER_ADMIN_EMAIL` | app | admin@example.com | E-mail of the Super Admin created on first start. Change it to your own. |
| `OPENARCHIVER_ADMIN_PASSWORD` | app | (secret) | That account's password. Sign in with it, then change it in the app. |
| `INDEXING_WORKER_MAX_OLD_SPACE_MB` | app | 1024 | Heap ceiling for the indexing worker. Upstream's default is 2048; lower it further on a small plan. |
| `MEILI_HTTP_ADDR` | search | [::]:7700 | Bind dual-stack so Railway's private network can reach it. |
| `MEILI_MASTER_KEY` | search | - | Search API key, shared with the app. |
| `MEILI_NO_ANALYTICS` | search | true | Disable Meilisearch telemetry. |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |

## Configuration

- **Start command:** `valkey-server --requirepass ${REDIS_PASSWORD} --bind :: 0.0.0.0`
- **Volume:** `/data`
- **Healthcheck:** `/api/v1/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/data/open-archiver`
- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/open-archiver)
