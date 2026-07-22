# Deploy Bookmark Manager on Railway

Self-hosted bookmarking, reading, and web archiving platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookmark-manager)

## About

Bookmark Manager is a self-hosted application for saving, organizing, and preserving web content in one place. It helps individuals and teams build searchable collections of bookmarks while archiving webpages with screenshots, PDFs, and readable text. With collaboration features, tagging, and powerful search, it provides a reliable knowledge base that remains accessible even when original webpages change or disappear.

![Manager](https://linkwarden.app/app/home.jpeg)

Hosting Bookmark Manager on Railway provides a fully managed environment for running the application alongside its required services. Railway deploys the application, provisions networking, and automatically provides HTTPS for secure access. This template includes a PostgreSQL database for persistent application data and Meilisearch for fast full-text search across archived content. Archived webpages, screenshots, and PDFs require persistent storage, which Railway Volumes provide. Internal service networking securely connects the application to PostgreSQL and Meilisearch without additional configuration. As your bookmark library grows, Railway makes it easy to scale compute resources and storage while reducing operational overhead.

![1](https://linkwarden.app/app/devices.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Linkwarden | `ghcr.io/linkwarden/linkwarden:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Meilisearch | `getmeili/meilisearch:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Linkwarden | 3000 | HTTP server port |
| `MEILI_HOST` | Linkwarden | - | Meilisearch internal URL |
| `DATABASE_URL` | Linkwarden | - | PostgreSQL Database |
| `NEXTAUTH_URL` | Linkwarden | - | Auth callback URL |
| `STORAGE_FOLDER` | Linkwarden | data | storage directory |
| `NEXTAUTH_SECRET` | Linkwarden | (secret) | JWT session  secret |
| `MEILI_MASTER_KEY` | Linkwarden | - | Meilisearch key |
| `NEXT_PUBLIC_CREDENTIALS_ENABLED` | Linkwarden | (secret) | Enable password |
| `NEXT_PUBLIC_DISABLE_REGISTRATION` | Linkwarden | false | Allow  signups |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MEILI_ENV` | Meilisearch | production | environment |
| `MEILI_MASTER_KEY` | Meilisearch | - | API key |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | No telemetry |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/meili_data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/bookmark-manager)
