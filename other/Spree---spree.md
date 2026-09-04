# Deploy Spree on Railway

Open-source eCommerce platform with a REST API and admin dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/spree)

## About

Spree is an open-source headless commerce platform built on Ruby on Rails, under the BSD 3-Clause licence. It ships a REST API, a TypeScript SDK, a React admin dashboard and a production-ready Next.js storefront, so brands, B2B wholesalers and marketplaces can run a real store with no platform fees and no vendor lock-in. Teams self-host Spree when a hosted platform cannot express their pricing or checkout: price lists per customer group, per-country markets, gift cards and digital products are all in the open-source core.

Deploy Spree on Railway and this template wires the production shape for you. The `spree` service runs Puma, the admin dashboard and the REST API. `spree-worker` is a dedicated Solid Queue process handling emails, image processing, imports, webhooks and search indexing off the request path. `Postgres` holds the catalogue and orders and — because Spree uses the Solid stack — the job queue, cache and Action Cable messages, so there is no Redis to run. `meilisearch` gives typo-tolerant product search, `mailpit` captures outbound email, and a Railway bucket holds product images through Active Storage.

![Diagram of Spree web, worker, Postgres, Meilisearch and Mailpit on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788445979/spree-architecture.png)

Spree is API-first: the admin dashboard, the Next.js storefront, a mobile app and a point of sale all talk to the same REST API, so you can start with one backend and add channels later. Self-hosting earns its keep when you need to own customer and order data outright, or when your pricing rules are too specific for a SaaS product.

- Sales channels, markets and multi-currency cross-border selling
- B2B price lists, customer groups and gated catalogues
- Promotions engine, gift cards, store credit and digital products
- Stripe, Adyen and PayPal payment plugins bundled in the image

Web and worker run the same image; the web service hands jobs over by setting `SOLID_QUEUE_IN_PUMA=false`. Meilisearch switches on purely by the presence of `MEILISEARCH_URL`, so it needs no code change. Mailpit is capture-only — swap it for a real provider before you take orders.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spree | `ghcr.io/spree/spree:5.6.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| meilisearch | `getmeili/meilisearch:v1.53` | Database |
| mailpit | `axllent/mailpit:v1.31` | Web service |
| spree-worker | `ghcr.io/spree/spree:5.6.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | spree | 3000 | Puma listening port |
| `SMTP_HOST` | spree | - | Outbound mail host |
| `SMTP_PORT` | spree | 1025 | Mailpit plaintext SMTP port |
| `RAILS_HOST` | spree | - | Public host, no scheme |
| `ADMIN_EMAIL` | spree | admin@example.com | First admin, seeded on first boot |
| `JOB_THREADS` | spree | 3 | Sizes the database connection pool |
| `DATABASE_URL` | spree | - | Postgres connection string |
| `ADMIN_PASSWORD` | spree | (secret) | First admin password, seeded once |
| `MEILISEARCH_URL` | spree | - | Enables the Meilisearch provider |
| `SECRET_KEY_BASE` | spree | (secret) | Rails session and cookie signing key |
| `WEB_CONCURRENCY` | spree | 2 | Puma processes, ~1 GB each |
| `CLOUDFLARE_BUCKET` | spree | - | Bucket name for Active Storage |
| `RAILS_MAX_THREADS` | spree | 5 | Puma threads per process |
| `SMTP_FROM_ADDRESS` | spree | - | Rails default from address |
| `CLOUDFLARE_ENDPOINT` | spree | - | S3-compatible storage endpoint |
| `MEILISEARCH_API_KEY` | spree | (secret) | Meilisearch master key |
| `SOLID_QUEUE_IN_PUMA` | spree | false | Jobs run in spree-worker |
| `MISSION_CONTROL_USER` | spree | (secret) | Basic auth user for /jobs |
| `CLOUDFLARE_ACCESS_KEY_ID` | spree | - | Bucket access key |
| `MISSION_CONTROL_PASSWORD` | spree | (secret) | Basic auth password for /jobs |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | spree | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | meilisearch | 7700 | Health check port |
| `MEILI_ENV` | meilisearch | production | Disables the dev web interface |
| `PRIVATE_URL` | meilisearch | http://meilisearch.railway.internal:7700 | Referenced by Spree |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index directory on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Dump directory on the volume |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Dual-stack bind for private callers |
| `MEILI_MASTER_KEY` | meilisearch | - | API key, read by the server |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disables telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Snapshot directory on the volume |
| `MEILI_MAX_INDEXING_MEMORY` | meilisearch | 512 MiB | Caps indexing memory to the container |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Caps indexing threads to the container |
| `MEILI_EXPERIMENTAL_DUMPLESS_UPGRADE` | meilisearch | true | In-place upgrade on version bumps |
| `PORT` | mailpit | 8025 | Health check and domain target port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `PRIVATE_HOST` | mailpit | mailpit.railway.internal | Referenced by Spree as SMTP_HOST |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring buffer size |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack inbox bind |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack SMTP bind for private callers |
| `SMTP_HOST` | spree-worker | - | Outbound mail host |
| `SMTP_PORT` | spree-worker | 1025 | Mailpit plaintext SMTP port |
| `RAILS_HOST` | spree-worker | - | Public host for generated URLs |
| `JOB_THREADS` | spree-worker | 5 | Concurrent jobs per worker process |
| `DATABASE_URL` | spree-worker | - | Postgres connection string |
| `JOB_CONCURRENCY` | spree-worker | 1 | Worker processes |
| `MEILISEARCH_URL` | spree-worker | - | Search provider endpoint |
| `SECRET_KEY_BASE` | spree-worker | (secret) | Must match the web service |
| `CLOUDFLARE_BUCKET` | spree-worker | - | Bucket name for Active Storage |
| `RAILS_MAX_THREADS` | spree-worker | 3 | Sizes the database connection pool |
| `SMTP_FROM_ADDRESS` | spree-worker | - | Rails default from address |
| `CLOUDFLARE_ENDPOINT` | spree-worker | - | S3-compatible storage endpoint |
| `MEILISEARCH_API_KEY` | spree-worker | (secret) | Meilisearch master key |
| `CLOUDFLARE_ACCESS_KEY_ID` | spree-worker | - | Bucket access key |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | spree-worker | (secret) | Bucket secret key |

## Configuration

- **Start command:** `/bin/sh -c "sed -i s/prunable/trimmable/ /rails/config/recurring.yml; exec /rails/bin/docker-entrypoint ./bin/rails server -b 0.0.0.0"`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "sed -i s/prunable/trimmable/ /rails/config/recurring.yml; exec /rails/bin/docker-entrypoint ./bin/jobs"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/spree)
