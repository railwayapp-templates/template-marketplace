# Deploy Miniflux on Railway

Feedly alternative. Minimalist self-hosted RSS/Atom feed reader

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/miniflux-railway)

## About

Miniflux is a minimalist, opinionated feed reader written in Go: subscribe to RSS, Atom, JSON Feed or RDF sources and get a fast, distraction-free reading list with keyboard shortcuts, full-text search, article scraping, filter rules and a tracker-stripping media proxy. It is what you reach for when Feedly or Inoreader feel heavy, ad-supported or too interested in what you read — everything lives in your own PostgreSQL database.

Deploy Miniflux on Railway in the production shape rather than the demo shape. The template runs three services: a **Miniflux web service** on a public HTTPS domain serving the UI, the REST API and the Fever and Google Reader compatible APIs; a private **Miniflux scheduler service** from the same image, owning background feed polling, the worker pool and the nightly cleanup job; and a managed **PostgreSQL 18** database holding feeds, entries, sessions and settings. Splitting the background tier out lets you scale the web tier without every replica polling the same feeds twice, and the first administrator is created on boot from the username and password you supply.

![Miniflux Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786978893/2485256a-3db1-4930-add6-9f759650c7b9.png)

Miniflux solves one problem well: following hundreds of sources without handing your reading history to an ad network. Self-host it when you want subscriptions and read state to outlive any vendor.

- Fetches full article content from truncated feeds using per-feed scraper rules
- Blocklist, keeplist and rewrite rules that filter entries on arrival
- PostgreSQL-backed full-text search, plus Fever and Google Reader API compatibility
- Media proxy that strips referrers and trackers from images
- Passkeys/WebAuthn, OIDC single sign-on and API keys beside password login

The two Miniflux services are one image in different roles: the web service answers requests, while the scheduler picks feeds whose next check has expired, hands them to its worker pool and archives old entries daily. Both reach PostgreSQL over the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| miniflux-scheduler | `miniflux/miniflux:latest` | Worker |
| miniflux | `miniflux/miniflux:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | miniflux-scheduler | 8080 | Health-check port, kept private |
| `HTTPS` | miniflux-scheduler | 1 | Secure cookies and HSTS header |
| `BASE_URL` | miniflux-scheduler | - | Public URL in generated links |
| `LOG_LEVEL` | miniflux-scheduler | info | Log verbosity: debug, info, warning, error |
| `BATCH_SIZE` | miniflux-scheduler | 100 | Feeds queued per batch |
| `DATABASE_URL` | miniflux-scheduler | - | Postgres connection string |
| `WORKER_POOL_SIZE` | miniflux-scheduler | 16 | Background feed-fetch workers |
| `POLLING_FREQUENCY` | miniflux-scheduler | 60 | Minutes between scheduler batches |
| `PORT` | miniflux | 8080 | HTTP listening port |
| `HTTPS` | miniflux | 1 | Secure cookies and HSTS header |
| `BASE_URL` | miniflux | - | Public URL in generated links |
| `LOG_LEVEL` | miniflux | info | Log verbosity: debug, info, warning, error |
| `CREATE_ADMIN` | miniflux | 1 | Create first administrator on boot |
| `DATABASE_URL` | miniflux | - | Postgres connection string |
| `ADMIN_PASSWORD` | miniflux | (secret) | First administrator password |
| `ADMIN_USERNAME` | miniflux | (secret) | First administrator username |
| `DISABLE_SCHEDULER_SERVICE` | miniflux | 1 | Web tier never polls feeds |
| `TRUSTED_REVERSE_PROXY_NETWORKS` | miniflux | 100.64.0.0/10,fd00::/8 | Trust Railway edge for XFF |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Start command:** `/bin/sh -c 'for i in $(seq 1 60); do /usr/bin/miniflux -migrate && exec /usr/bin/miniflux; echo "waiting for database ($i/60)"; sleep 5; done; echo "database never became ready"; exit 1'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/miniflux-railway)
