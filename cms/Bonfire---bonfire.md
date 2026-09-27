# Deploy Bonfire on Railway

Federated Social Networking Toolkit

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bonfire)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/bonfire)

### Deploy and Host Bonfire on Railway

**Bonfire** is an open-source, modular, federated social networking platform built with Elixir and Phoenix. It empowers communities to create custom digital spaces with ActivityPub federation. This Railway template deploys a complete **Bonfire** stack featuring the core application server (`bonfire`), a **PostGIS** geospatial database (`db`), and a **Meilisearch** search engine instance (`search`).

---

#### About Hosting Bonfire

Hosting Bonfire on Railway runs a modern three-tier infrastructure stack:

* **Bonfire App Server (`bonfire`)**: The core Elixir/Phoenix backend and social web interface (`bonfirenetworks/bonfire:1.0.5-social-amd64`). It handles user interactions, ActivityPub federation protocol messages, and media processing. It mounts a persistent volume at `/opt/app/data/uploads` for media storage and listens on port `4000`.
* **PostGIS Database (`db`)**: PostgreSQL database with geospatial extensions (`postgis/postgis:17-3.5-alpine`). It stores application state, user profiles, posts, and social graph data with persistent storage mounted at `/var/lib/postgresql/data`.
* **Meilisearch (`search`)**: Lightning-fast full-text search engine (`getmeili/meilisearch:v1.11`) configured with `SEARCH_ADAPTER=meili` to power instant search across social feeds, users, topics, and federated content. Persistent storage is mounted at `/meili_data`.

---

#### Common Use Cases

* **Self-hosted federated social networks**: Launch an independent node connected to the broader ActivityPub Fediverse (Mastodon, Pleroma, Misskey, etc.).
* **Custom community platforms**: Build tailored digital spaces for discussions, collaboration, and content sharing.
* **Privacy-focused social networking**: Maintain full ownership of community data, uploaded media, and social analytics.
* **Full-text search enabled community hubs**: Provide high-performance search across discussions, posts, tags, and user profiles via Meilisearch integration.

---

#### Dependencies for Bonfire Hosting

* **Bonfire Application image:** `bonfirenetworks/bonfire:1.0.5-social-amd64`
* **PostGIS Database image:** `postgis/postgis:17-3.5-alpine`
* **Meilisearch image:** `getmeili/meilisearch:v1.11`
* **Three persistent volumes:**
  * `bonfire`: `/opt/app/data/uploads` (User media and file attachments)
  * `db`: `/var/lib/postgresql/data` (PostgreSQL database files)
  * `search`: `/meili_data` (Meilisearch indices and internal state)
* **Railway public domain** for the `bonfire` web interface (port `4000`)
* **Auto-generated secrets:** `SECRET_KEY_BASE` (64 chars) and `POSTGRES_PASSWORD` (32 chars)

**Upstream:** [Bonfire Networks](https://bonfirenetworks.org/) · [GitHub Repo](https://github.com/bonfire-networks/bonfire-app) · [Meilisearch Docs](https://www.meilisearch.com/docs)

##### Implementation Details

| Service | Image | Role | Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **bonfire** | `bonfirenetworks/bonfire:1.0.5-social-amd64` | Social Network Core & Web UI | `4000` | `/opt/app/data/uploads` |
| **db** | `postgis/postgis:17-3.5-alpine` | Relational & Geospatial Database | `5432` | `/var/lib/postgresql/data` |
| **search** | `getmeili/meilisearch:v1.11` | Full-Text Search Engine | `7700` | `/meili_data` |

---

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **bonfire** | `/opt/app/data/uploads` | User avatars, images, media attachments, and uploaded files |
| **db** | `/var/lib/postgresql/data` | PostgreSQL tables, PostGIS spatial data, indexes, and transaction logs |
| **search** | `/meili_data` | Meilisearch indexes, documents, and search engine state |



---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Allow 2–3 minutes for all three services (`db`, `search`, and `bonfire`) to build and provision.
4. Open the **bonfire** service → **Settings** → **Networking** and click the generated public domain URL.
5. Complete the initial admin setup in the Bonfire web onboarding wizard.
6. *(Optional)* Configure SMTP settings in the `bonfire` environment variables if email verification or notification delivery is required for your network.

---

#### Configuration

##### Core Application Variables (`bonfire`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `HOSTNAME` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Canonical public hostname for web traffic and ActivityPub federation |
| `SERVER_PORT` | `4000` | HTTP listening port for the Elixir application server |
| `PUBLIC_PORT` | `80` | Public HTTP port exposed to clients |
| `APP_NAME` | `Bonfire` | Name of your social networking instance |
| `LANG` | `en_US.UTF-8` | System locale setting |
| `SECRET_KEY_BASE` | Auto-generated secret (64 chars) | Cryptographic secret for session signing and cookies |
| `SIGNING_SALT` | `${{db.POSTGRES_PASSWORD}}` | Salt for security token signing |
| `ENCRYPTION_SALT` | `${{db.POSTGRES_PASSWORD}}` | Salt for data encryption at rest |
| `RELEASE_COOKIE` | `${{db.POSTGRES_PASSWORD}}` | Erlang cluster distribution release cookie |
| `POSTGRES_HOST` | `${{db.RAILWAY_PRIVATE_DOMAIN}}` | Private network hostname of the PostGIS database |
| `POSTGRES_USER` | `postgres` | Database username |
| `POSTGRES_DB` | `bonfire_db` | Main database name |
| `POSTGRES_PASSWORD` | `${{db.POSTGRES_PASSWORD}}` | Database authentication password |
| `DB_MIGRATE_INDEXES_CONCURRENTLY` | `false` | Disable concurrent index creation during database migrations |
| `SEARCH_ADAPTER` | `meili` | Enables Meilisearch integration for full-text search |
| `SEARCH_MEILI_INSTANCE` | `https://${{search.RAILWAY_PRIVATE_DOMAIN}}:7700` | Internal Meilisearch connection URL |
| `MEILI_MASTER_KEY` | `${{db.POSTGRES_PASSWORD}}` | Master API key for Meilisearch authentication |
| `UPLOAD_LIMIT` | `20` | Maximum file upload size limit in MB |
| `MAIL_BACKEND` | `none` | Email delivery backend (`none`, `smtp`, etc.) |
| `MAIL_SERVER` | `""` | SMTP mail server hostname |
| `MAIL_PORT` | `""` | SMTP mail server port |
| `MAIL_USER` | `""` | SMTP authentication username |
| `MAIL_PASSWORD` | `""` | SMTP authentication password |
| `PORT` | `4000` | Web server listening port |

##### Database Variables (`db`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PGDATA` | `/var/lib/postgresql/data/pgdata` | Internal data path inside the PostgreSQL container |
| `POSTGRES_DB` | `bonfire_db` | Initial database created on startup |
| `POSTGRES_USER` | `postgres` | Default superuser name |
| `POSTGRES_PASSWORD` | Auto-generated secret (32 chars) | Database password secret |
| `DATABASE_URL` | `postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{PGDATABASE}}` | Internal database connection string |

##### Search Variables (`search`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MEILI_MASTER_KEY` | `${{db.POSTGRES_PASSWORD}}` | Authentication key shared with `bonfire` |
| `MEILI_ENV` | `production` | Production environment mode |
| `MEILI_NO_ANALYTICS` | `true` | Disables telemetry reporting |

##### Custom Domain

1. Open the **bonfire** service → **Settings** → **Networking** → **Custom Domain**.
2. Enter your custom domain (e.g., `social.yourdomain.com`) and configure the CNAME record in your DNS provider.
3. Update the `HOSTNAME` environment variable on the `bonfire` service to match your custom domain (`social.yourdomain.com`).
4. Railway automatically handles SSL/TLS certificate provisioning.

---

#### Updating Bonfire

1. Open the **bonfire** service → **Settings** → **Source**.
2. Update the image tag to a newer release (e.g., `bonfirenetworks/bonfire:1.0.5-social-amd64`).
3. Click **Redeploy**.

Database schema migrations run automatically on startup. All database state, uploaded files, and search indexes remain safe inside their attached volumes.

---

#### Traps

**Common pitfalls and failure modes:**

* **`HOSTNAME` Mismatch for ActivityPub Federation** — Federation protocol messages embed canonical URLs. Changing `HOSTNAME` after creating federated accounts or posts can break existing ActivityPub actor IDs and remote follower connections.
* **Unconfigured Mail Backend (`MAIL_BACKEND=none`)** — With email disabled by default, password reset emails and user registration confirmations will not be delivered. Configure SMTP settings (`MAIL_SERVER`, `MAIL_USER`, `MAIL_PASSWORD`, `MAIL_FROM`) for production deployments.
* **Database Connection Race Condition** — On cold starts or first-time deploys, the `bonfire` container may attempt to run database migrations before PostGIS is fully initialized. Railway will auto-restart `bonfire` until `db` accepts connections.
* **Meilisearch Master Key Mismatch** — Ensure `MEILI_MASTER_KEY` in the `search` service matches the `MEILI_MASTER_KEY` variable in `bonfire`. They both derive from `${{db.POSTGRES_PASSWORD}}` by default.

---

#### Why Deploy Bonfire on Railway?

Railway delivers a powerful cloud platform for deploying multi-container federated architectures. Hosting Bonfire on Railway provides high-performance PostGIS database support, private inter-service networking, persistent storage volumes, automated SSL encryption, and simple scale-out capabilities without managing underlying servers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| search | `getmeili/meilisearch:v1.11` | Database |
| db | `postgis/postgis:17-3.5-alpine` | Database |
| bonfire | `bonfirenetworks/bonfire:1.0.5-social-amd64` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MEILI_ENV` | search | production | Runtime mode for Meilisearch; production disables the dev-only dashboard and enforces the master key |
| `MEILI_MASTER_KEY` | search | - | API key required to authenticate to this Meilisearch instance (reuses the "db" service's Postgres password) |
| `MEILI_NO_ANALYTICS` | search | true | Disables sending anonymous usage analytics to Meilisearch's telemetry service |
| `POSTGRES_DB` | db | bonfire_db | Name of the database created on first init |
| `DATABASE_URL` | db | - | Full connection string for other services to reach this database over Railway's private network |
| `POSTGRES_USER` | db | (secret) | Superuser account created on first init |
| `POSTGRES_PASSWORD` | db | (secret) | Auto-generated password for the postgres superuser |
| `DATABASE_PUBLIC_URL` | db | - | Full connection string for reaching this database from outside Railway's private network (via TCP proxy) |
| `LANG` | bonfire | en_US.UTF-8 | System locale used by the app |
| `PORT` | bonfire | 4000 | Port the app listens on inside the container |
| `APP_NAME` | bonfire | Bonfire | Display name of the instance, shown in the UI |
| `HOSTNAME` | bonfire | - | Public hostname the app runs on (this service's Railway public domain) |
| `POSTGRES_DB` | bonfire | bonfire_db | Name of the Postgres database to use |
| `PUBLIC_PORT` | bonfire | 80 | Public-facing port used when building external URLs (e.g. federation links) |
| `SERVER_PORT` | bonfire | 4000 | Internal port the app server binds to |
| `MAIL_BACKEND` | bonfire | none | Email delivery backend; "none" disables outgoing email |
| `SIGNING_SALT` | bonfire | - | Salt used to sign tokens/cookies (reuses the "db" service's Postgres password as a shared secret) |
| `UPLOAD_LIMIT` | bonfire | 20 | Max upload size, in MB |
| `POSTGRES_HOST` | bonfire | - | Hostname of the Postgres database (private domain of the "db" service) |
| `POSTGRES_USER` | bonfire | (secret) | Postgres username |
| `RELEASE_COOKIE` | bonfire | - | Erlang distribution cookie used for clustering BEAM/Elixir nodes (reuses the Postgres password as a shared secret) |
| `SEARCH_ADAPTER` | bonfire | meili | Selects Meilisearch as the search backend |
| `ENCRYPTION_SALT` | bonfire | - | Salt used for encrypting sensitive data at rest (reuses the Postgres password as a shared secret) |
| `SECRET_KEY_BASE` | bonfire | (secret) | Auto-generated base secret used for signing/encrypting sessions and cookies (Phoenix/Elixir apps) |
| `MEILI_MASTER_KEY` | bonfire | - | API key for authenticating to the Meilisearch instance (reuses the Postgres password as a shared secret) |
| `POSTGRES_PASSWORD` | bonfire | (secret) | Password for the Postgres database (from the "db" service) |
| `SEARCH_MEILI_INSTANCE` | bonfire | - | URL of the Meilisearch instance (private domain of the "search" service, port 7700) |
| `DB_MIGRATE_INDEXES_CONCURRENTLY` | bonfire | false | Whether database index creation during migrations runs concurrently (non-blocking) or not |

## Configuration

- **Volume:** `/meili_data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/app/data/uploads`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bonfire)
