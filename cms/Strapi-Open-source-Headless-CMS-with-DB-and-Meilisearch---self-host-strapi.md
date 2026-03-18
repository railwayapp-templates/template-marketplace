# Deploy Strapi | Open-source Headless CMS with DB and Meilisearch on Railway

Self Host Strapi: REST & GraphQL APIs, full-text search, admin panel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/self-host-strapi)

## About

Deploy a fully configured, self-hosted Strapi instance on Railway in one click. This template provisions Strapi from the [`railwayapp-templates/strapi`](https://github.com/railwayapp-templates/strapi) GitHub repo alongside a managed PostgreSQL database for persistent storage and Meilisearch (`getmeili/meilisearch:v1.9.0`) for fast full-text search — all pre-wired with internal private networking, auto-generated secrets, and zero manual configuration.
![Strapi railway arch](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773124673/strapi_railway_arc_wsdexx.png)

---

Strapi is an open-source, Node.js-based headless CMS that decouples content management from content delivery. It exposes your content via REST or GraphQL APIs, letting you push data to any frontend — Next.js, React Native, Vue, or IoT devices — without being locked into a templating layer.

**Key features:**
- REST and GraphQL APIs out of the box
- Customisable content types via a visual builder
- Role-based access control (RBAC) and API token management
- Plugin ecosystem: i18n, media library, Meilisearch, and more
- Self-hosted or Strapi Cloud — you own your data either way

**Template architecture:** Strapi (port `1337`) connects to Postgres over Railway's private network for persistent content storage, and to Meilisearch (port `7700`) for search indexing — no public exposure of either dependency required.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Meilisearch | `getmeili/meilisearch:v1.9.0` | Web service |
| Strapi | [railwayapp-templates/strapi](https://github.com/railwayapp-templates/strapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created during initialization |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default Postgres administrator user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated password for Postgres user |
| `DATABASE_PUBLIC_URL` | Postgres | - | External Postgres connection string |
| `PORT` | Meilisearch | 3331 | HTTP API port for Meilisearch |
| `MEILI_ENV` | Meilisearch | production | Run Meilisearch in production mode |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | Path storing Meilisearch index data |
| `MEILI_HTTP_ADDR` | Meilisearch | - | Network address Meilisearch binds to |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master API key for Meilisearch |
| `URL` | Strapi | - | Public base URL of Strapi app |
| `HOST` | Strapi | :: | Listen on all IPv6 interfaces |
| `PORT` | Strapi | 1337 | HTTP server listening port |
| `BROWSER` | Strapi | false | Disable automatic browser launch |
| `APP_KEYS` | Strapi | - | Keys used for session security |
| `JWT_SECRET` | Strapi | (secret) | Secret for authentication tokens |
| `DATABASE_URL` | Strapi | - | Internal Postgres connection string |
| `API_TOKEN_SALT` | Strapi | (secret) | Salt used for API token generation |
| `ENCRYPTION_KEY` | Strapi | - | Key for encrypting sensitive data |
| `ADMIN_JWT_SECRET` | Strapi | (secret) | JWT secret for admin authentication |
| `MEILISEARCH_HOST` | Strapi | - | Internal Meilisearch endpoint |
| `DATABASE_PUBLIC_URL` | Strapi | - | External Postgres connection string |
| `TRANSFER_TOKEN_SALT` | Strapi | (secret) | Salt used for transfer tokens |
| `MEILISEARCH_ADMIN_API_KEY` | Strapi | (secret) | Admin API key for Meilisearch |
| `STRAPI_TELEMETRY_DISABLED` | Strapi | true | Disable Strapi telemetry reporting |
| `STRAPI_DISABLE_UPDATE_NOTIFICATION` | Strapi | true | Disable update notification checks |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Healthcheck:** `/admin`
- **Volume:** `/public/uploads`

**Category:** CMS · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/self-host-strapi)
