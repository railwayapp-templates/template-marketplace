# Deploy Linkwarden | Open-Source Bookmark Manager on Railway

Self Host Linkwarden. Save, archive, organize bookmarks & much more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/linkwarden)

## About

Deploy Linkwarden on Railway to run a self-hosted collaborative bookmark manager with built-in webpage archiving. Linkwarden lets teams and individuals collect, organize, annotate, and fully preserve web content — capturing screenshots, PDFs, and readable text of every saved link before it disappears.

This Railway template pre-configures Linkwarden with PostgreSQL for persistent storage and Meilisearch for fast full-text search, so you can self-host Linkwarden and start bookmarking in minutes.

![Linkwarden Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776950676/51f5a4b5-cc87-4e17-b2bd-37b1c94aa55c.png)

Linkwarden is an open-source bookmark manager built with Next.js that goes beyond simple link saving. It archives entire webpages so your bookmarks survive even when the original content is taken down or changed.

- **Webpage preservation** — auto-captures screenshots, PDFs, and readable text for every saved link
- **Collections & tags** — organize with nested collections, sub-collections, and custom tags
- **Full-text search** — powered by Meilisearch for instant results across all saved content
- **Team collaboration** — shared collections with granular permissions for groups and projects
- **Reader view** — clean reading mode with highlighting and annotation support
- **AI tagging** — optional AI-powered automatic tag suggestions (supports OpenAI, Anthropic, Ollama)
- **Browser extensions** — official Chrome and Firefox extensions for one-click saving
- **RSS feeds** — subscribe to feeds and auto-save new articles
- **50+ SSO providers** — GitHub, Google, Discord, Keycloak, Authentik, and more

The Railway deployment runs three services: the Linkwarden Next.js application, a PostgreSQL database for link and user data, and Meilisearch for search indexing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Meilisearch | `getmeili/meilisearch:v1.12.8` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Linkwarden | `ghcr.io/linkwarden/linkwarden:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_ENV` | Meilisearch | production | Runtime environment |
| `MEILI_MASTER_KEY` | Meilisearch | - | API authentication key |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable telemetry |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Linkwarden | 3000 | HTTP server port |
| `MEILI_HOST` | Linkwarden | - | Meilisearch internal URL |
| `DATABASE_URL` | Linkwarden | - | PostgreSQL connection string |
| `NEXTAUTH_URL` | Linkwarden | - | Auth callback URL |
| `STORAGE_FOLDER` | Linkwarden | data | Archive storage directory |
| `NEXTAUTH_SECRET` | Linkwarden | (secret) | JWT session signing secret |
| `MEILI_MASTER_KEY` | Linkwarden | - | Meilisearch auth key |
| `NEXT_PUBLIC_CREDENTIALS_ENABLED` | Linkwarden | (secret) | Enable password auth |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | Linkwarden | false | Allow new signups |

## Configuration

- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/linkwarden)
