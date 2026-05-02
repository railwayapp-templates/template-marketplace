# Deploy Plume | Open Source Federated Blogging Platform on Railway

Self host Plume. Blogging engine with multi-blog support & full-text search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plume)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plume?referralCode=QXdhdr)

Plume is a federated blogging engine built on ActivityPub that lets authors publish articles visible across the entire Fediverse — Mastodon, Pleroma, and any ActivityPub-compatible platform. Deploy Plume on Railway to self-host a fully functional multi-user blogging instance with PostgreSQL for data persistence and a persistent volume for media uploads and full-text search.

Self-host Plume on Railway and get a production-ready federated blog in minutes. This template pre-configures the Plume application service with an idempotent startup sequence (database migrations, search index initialization, admin user creation), a Railway-managed PostgreSQL database, and persistent storage for uploaded media and Tantivy search indexes.

![Plume Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777642589/1f4ec669-db7d-4bf5-9734-f009f4ec2767.png)

Plume is an open-source (AGPL-3.0) federated blogging engine written in Rust. It solves the problem of centralized blogging platforms controlling your content by giving you full ownership of your writing while maintaining discoverability through ActivityPub federation.

- **Multi-blog support** — one account can manage multiple blogs for different topics
- **ActivityPub federation** — posts appear in Mastodon, Pleroma, and other Fediverse timelines
- **Full-text search** — Tantivy-powered search across all articles on your instance
- **Media management** — upload images and other media files alongside posts
- **Multi-user** — host blogs for your community, organization, or team
- **WebFinger & NodeInfo** — standard Fediverse discovery protocols built in

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Plume | `plumeorg/plume:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Plume | 7878 | Railway routing port |
| `SIGNUP` | Plume | password | Registration policy |
| `BASE_URL` | Plume | - | Public domain for federation |
| `RUST_LOG` | Plume | info | Application log level |
| `ADMIN_EMAIL` | Plume | - | Admin account email |
| `ROCKET_PORT` | Plume | 7878 | HTTP server port |
| `STARTUP_B64` | Plume | IyEvYmluL3NoCnNldCAtZQpta2RpciAtcCAvZGF0YS9tZWRpYSAvZGF0YS9zZWFyY2hfaW5kZXgKcGxtIG1pZ3JhdGlvbiBydW4KcGxtIHNlYXJjaCBpbml0IHx8IHRydWUKcGxtIGluc3RhbmNlIG5ldyAtZCAiJEJBU0VfVVJMIiAtbiAiJElOU1RBTkNFX05BTUUiIHx8IHRydWUKcGxtIHVzZXJzIG5ldyAtbiAiJEFETUlOX1VTRVJOQU1FIiAtTiAiJEFETUlOX0RJU1BMQVlfTkFNRSIgLWUgIiRBRE1JTl9FTUFJTCIgLXAgIiRBRE1JTl9QQVNTV09SRCIgLS1hZG1pbiB8fCB0cnVlCmV4ZWMgcGx1bWUK | Idempotent init sequence |
| `DATABASE_URL` | Plume | - | PostgreSQL connection string |
| `SEARCH_INDEX` | Plume | /data/search_index | Tantivy search index path |
| `INSTANCE_NAME` | Plume | Plume | Instance display name |
| `ADMIN_PASSWORD` | Plume | (secret) | Admin password (bootstrap-only) |
| `ADMIN_USERNAME` | Plume | (secret) | Admin account username |
| `ROCKET_ADDRESS` | Plume | 0.0.0.0 | HTTP bind address |
| `ROCKET_SECRET_KEY` | Plume | (secret) | Cookie signing key. needs to be B64 with padding |
| `ADMIN_DISPLAY_NAME` | Plume | Admin | Admin display name |
| `MIGRATION_DIRECTORY` | Plume | migrations/postgres | Database migration path |
| `MEDIA_UPLOAD_DIRECTORY` | Plume | /data/media | Uploaded media storage path |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'echo "$STARTUP_B64" | base64 -d | /bin/sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/plume)
