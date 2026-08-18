# Deploy Linkwarden on Railway

Self-hosted collaborative bookmark manager with full page preservation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden-railway)

## About

Linkwarden is an open-source bookmark manager that refuses to let your links rot. Where most read-it-later tools store a URL and a title, Linkwarden captures the page itself as you save it — a screenshot, a PDF, a reader-mode extraction and a single-file HTML archive — so the bookmark still opens after the original goes dark.

Self-host Linkwarden on Railway and you get the production shape rather than the demo one. This template runs the Next.js web app and the archival worker as **separate services**, so a slow capture never blocks someone browsing their library. Managed **PostgreSQL** holds links, collections and users; **Meilisearch** indexes the *text of preserved pages*, so search finds a phrase buried in an article you saved months ago; archives go to a **Railway object storage bucket** shared by both app services; and **Mailpit** supplies SMTP for verification and password-reset mail.

![Linkwarden Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786977291/9b0ae162-6623-462a-82e0-b2da4f4bee41.png)

Linkwarden is a Next.js application backed by PostgreSQL, paired with a worker that drives headless Chromium and the Rust `monolith` tool. Self-hosting matters more here than for most apps: the product's whole value is a private, permanent copy of what you read.

Key features:

- Four preservation formats per link — screenshot, PDF, reader view and self-contained HTML
- Full-text search across the *content* of archived pages, not just titles and URLs
- Collections with per-member permissions, tags, highlights and public sharing
- RSS subscriptions, Chrome and Firefox extensions, a REST API and mobile apps
- Optional AI tagging via OpenAI, Anthropic, Azure, OpenRouter, Perplexity or local Ollama

The **web service** serves the UI and API and streams archived files to the browser. The **worker** captures the four formats and pushes text into Meilisearch. Splitting them keeps the interface responsive during a capture and lets you scale the archiver independently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1.12.8` | Database |
| linkwarden | [gridalpha/linkwarden-railway](https://github.com/gridalpha/linkwarden-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| linkwarden-worker | [gridalpha/linkwarden-railway](https://github.com/gridalpha/linkwarden-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | meilisearch | 7700 | HTTP server listening port |
| `MEILI_ENV` | meilisearch | production | Disables the unauthenticated dev dashboard |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index location on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Dump output directory |
| `MEILI_HTTP_ADDR` | meilisearch | 0.0.0.0:7700 | Bind address for the HTTP API |
| `MEILI_MASTER_KEY` | meilisearch | - | API key required in production mode |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disables anonymous telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Snapshot output directory |
| `MEILI_MAX_INDEXING_MEMORY` | meilisearch | 512 MiB | Caps indexing memory to container size |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Caps indexing threads to CPU quota |
| `PORT` | linkwarden | 3000 | HTTP server listening port |
| `ROLE` | linkwarden | web | Runs the Next.js web application |
| `BASE_URL` | linkwarden | - | Public app URL used in email |
| `ADMIN_NAME` | linkwarden | Administrator | First administrator display name |
| `EMAIL_FROM` | linkwarden | linkwarden@example.com | Sender address for outgoing mail |
| `MEILI_HOST` | linkwarden | - | Private search service URL |
| `SPACES_KEY` | linkwarden | - | Object storage access key |
| `ADMIN_EMAIL` | linkwarden | admin@example.com | First administrator email address |
| `DATABASE_URL` | linkwarden | - | PostgreSQL connection string |
| `EMAIL_SERVER` | linkwarden | - | SMTP connection URL |
| `NEXTAUTH_URL` | linkwarden | - | Auth base URL, suffix required |
| `NODE_OPTIONS` | linkwarden | --max-old-space-size=1024 | Caps Node heap to container size |
| `SPACES_REGION` | linkwarden | - | Object storage region |
| `SPACES_SECRET` | linkwarden | (secret) | Object storage secret key |
| `ADMIN_PASSWORD` | linkwarden | (secret) | First administrator password, change after login |
| `ADMIN_USERNAME` | linkwarden | (secret) | First administrator login name |
| `NEXTAUTH_SECRET` | linkwarden | (secret) | Signs sessions and preserved-file links |
| `SPACES_ENDPOINT` | linkwarden | - | Object storage endpoint URL |
| `MEILI_MASTER_KEY` | linkwarden | - | Search service API key |
| `NEXT_PUBLIC_ADMIN` | linkwarden | 1 | User id treated as administrator |
| `SPACES_BUCKET_NAME` | linkwarden | - | Bucket holding preserved files |
| `NEXT_PUBLIC_EMAIL_PROVIDER` | linkwarden | true | Shows password reset in the UI |
| `NEXT_PUBLIC_CREDENTIALS_ENABLED` | linkwarden | (secret) | Enables username and password sign-in |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | linkwarden | true | Disables public self-service signup |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | HTTP server listening port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener bind address |
| `PORT` | linkwarden-worker | 3000 | Port for the worker health endpoint |
| `ROLE` | linkwarden-worker | worker | Runs the archiver instead of the web app |
| `BASE_URL` | linkwarden-worker | - | Public app URL used in email |
| `EMAIL_FROM` | linkwarden-worker | - | Sender address for outgoing mail |
| `MEILI_HOST` | linkwarden-worker | - | Private search service URL |
| `SPACES_KEY` | linkwarden-worker | - | Object storage access key |
| `DATABASE_URL` | linkwarden-worker | - | PostgreSQL connection string |
| `EMAIL_SERVER` | linkwarden-worker | - | SMTP connection URL |
| `NODE_OPTIONS` | linkwarden-worker | --max-old-space-size=1536 | Caps Node heap to container size |
| `SPACES_REGION` | linkwarden-worker | - | Object storage region |
| `SPACES_SECRET` | linkwarden-worker | (secret) | Object storage secret key |
| `BROWSER_TIMEOUT` | linkwarden-worker | 5 | Minutes before abandoning a page load |
| `SPACES_ENDPOINT` | linkwarden-worker | - | Object storage endpoint URL |
| `MEILI_MASTER_KEY` | linkwarden-worker | - | Search service API key |
| `ARCHIVE_TAKE_COUNT` | linkwarden-worker | 5 | Links archived per worker pass |
| `SPACES_BUCKET_NAME` | linkwarden-worker | - | Bucket holding preserved files |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Healthcheck:** `/api/v1/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/linkwarden-railway)
