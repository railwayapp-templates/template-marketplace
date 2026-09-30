# Deploy Didacta on Railway

Didacta Is a Fair-Code Self-Hosted Learning Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/didacta)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/didacta)

### Deploy and Host Didacta Community on Railway

**Didacta Community** is a modern, open-source learning management and educational platform designed for creating, managing, and delivering online courses, training modules, and knowledge systems. This Railway template provisions a full three-tier production stack featuring the **Didacta Application Server** (`didacta`), a **pgvector-enabled PostgreSQL database** (`postgres`), and a **Redis cache engine** (`redis`), complete with persistent volume storage and automated secret provisioning.

---

#### About Hosting Didacta

Hosting Didacta Community on Railway deploys a robust multi-container architecture:

* **Didacta Core Application (`didacta`)**: Node.js web and API application container running `ghcr.io/va360labs/didacta-community:0.0.1-alpha.107`. It serves both the user-facing web dashboard and API endpoints (listening on web port `3000` and API port `4000`), processes file uploads in `/app/data/storage`, and connects to PostgreSQL and Redis over Railway's internal private network.
* **Vector PostgreSQL Database (`postgres`)**: Relational and vector database running `pgvector/pgvector:pg16`. It handles structured application data and vector embeddings, mounting a persistent storage volume at `/var/lib/postgresql/data`.
* **Redis In-Memory Cache (`redis`)**: Cache and pub/sub message broker running `redis:7-alpine`. It handles session caching and background job processing, mounting a persistent volume at `/data`.

---

#### Common Use Cases

* **Self-hosted Learning Management System (LMS)**: Create, manage, and distribute structured online learning courses and training paths.
* **Vector-assisted educational search**: Leverage `pgvector` for semantic search, intelligent AI indexing, and content retrieval across course materials.
* **Internal employee onboarding & knowledge base**: Build private training hubs for staff and community members with full data sovereignty.
* **Integrated educational technology stack**: Pre-configured database, Redis queues, and persistent local storage out of the box.

---

#### Dependencies for Didacta Hosting

* **Didacta Community image:** `ghcr.io/va360labs/didacta-community:0.0.1-alpha.107`
* **PostgreSQL image with pgvector:** `pgvector/pgvector:pg16`
* **Redis image:** `redis:7-alpine`
* **Three persistent volumes**:
  * `didacta`: `/app/data` (for local file storage and media uploads)
  * `postgres`: `/var/lib/postgresql/data` (for database tables and vector indices)
  * `redis`: `/data` (for cache state and task queues)
* **Railway public domain** mapped to port `3000` for `didacta`
* **Auto-generated secrets:** Cryptographic session secret (`AUTH_SECRET`), setup token (`DIDACTA_SETUP_TOKEN`), and database passwords (`POSTGRES_PASSWORD`)

**Upstream:** [GitHub (va360labs/didacta-community)](https://github.com/va360labs/didacta-community) · [Docker Registry (GHCR)](https://ghcr.io/va360labs/didacta-community)

##### Implementation Details

| Service | Image | Role | Web / Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **didacta** | `ghcr.io/va360labs/didacta-community:0.0.1-alpha.107` | Web UI & API Engine | `3000` (Web) / `4000` (API) | `/app/data` |
| **postgres** | `pgvector/pgvector:pg16` | Relational & Vector Database | `5432` | `/var/lib/postgresql/data` |
| **redis** | `redis:7-alpine` | Cache & Job Broker | `6379` | `/data` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **didacta** | Main Application UI & API | `/app/data` | Yes (Port `3000`) | Healthcheck at `/healthz` |
| **postgres** | Relational Vector DB | `/var/lib/postgresql/data` | TCP Proxy (Port `5432`) | `pgvector` extension enabled |
| **redis** | Cache & Session Store | `/data` | TCP Proxy (Port `6379`) | Shared password with PostgreSQL |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **didacta** | `/app/data` | Local file uploads, media assets, export archives (`/app/data/storage`) |
| **postgres** | `/var/lib/postgresql/data` | PostgreSQL tables, vector embeddings, course records, user accounts |
| **redis** | `/data` | Redis persistent cache, queue state, active session keys |

> **Warning:** Do **not** remove or detach any of the three persistent volumes — deleting volumes will cause permanent loss of uploaded course files, user records, or database indexes during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 2–3 minutes for all three services (`postgres`, `redis`, and `didacta`) and their persistent volumes to initialize.
4. Retrieve the initial setup credentials from the `didacta` service variables (`DIDACTA_SETUP_TOKEN` or `POSTGRES_PASSWORD`).
5. Open the **didacta** service → **Settings** → **Networking** and click the generated public domain URL.
6. Access the setup wizard / admin login page to complete your initial administrator configuration.

---

#### Configuration

##### Application Variables (`didacta`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `NODE_ENV` | `production` | Node.js execution environment |
| `DIDACTA_CORE_VERSION` | `0.0.1-alpha.107` | Core platform version tag |
| `WEB_PUBLIC_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Public canonical base URL for the web interface |
| `WEB_PUBLIC_ALLOWED_HOSTS` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Allowed host headers for security verification |
| `POSTGRES_USER` | `didacta` | Application database username |
| `POSTGRES_PASSWORD` | `${{postgres.POSTGRES_PASSWORD}}` | Database password referenced from `postgres` service |
| `POSTGRES_DB` | `didacta` | Main application database name |
| `ADMIN_DATABASE_URL` | `${{postgres.DATABASE_URL}}` | Private database connection URL |
| `REDIS_URL` | `${{redis.REDIS_URL}}` | Private Redis connection URL |
| `AUTH_SECRET` | Auto-generated secret (64 chars) | Cryptographic secret key for session signing |
| `DIDACTA_SETUP_TOKEN` | `${{postgres.POSTGRES_PASSWORD}}` | Token required for initial administrative setup |
| `STORAGE_DRIVER` | `local` | File storage adapter (`local` or S3) |
| `STORAGE_ROOT` | `/app/data/storage` | Root path for stored file assets inside volume |
| `PORT` | `3000` | HTTP port exposed to Railway router |

##### Database Variables (`postgres`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `POSTGRES_DB` | `railway` | Initial system database created on startup |
| `POSTGRES_USER` | `postgres` | Superuser database account |
| `POSTGRES_PASSWORD` | Auto-generated secret (32 chars) | Master database password |
| `DATABASE_URL` | Private connection URL | Internal network database string |
| `DATABASE_PUBLIC_URL` | TCP Proxy URL | External connection URL for administrative tools |

##### Redis Variables (`redis`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `REDIS_PASSWORD` | `${{postgres.POSTGRES_PASSWORD}}` | Shared authentication password |
| `REDIS_URL` | Private connection URL | Internal Redis connection string |
| `REDIS_PUBLIC_URL` | TCP Proxy URL | External connection string via TCP proxy |

##### Custom Domain

1. Open the **didacta** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain (e.g. `lms.yourdomain.com`) and update your DNS CNAME record per Railway instructions.
3. Update `WEB_PUBLIC_URL` to `https://lms.yourdomain.com`.
4. Update `WEB_PUBLIC_ALLOWED_HOSTS` to `lms.yourdomain.com`.
5. Railway automatically issues and renews TLS certificates.

---

#### Updating Didacta

1. Open the **didacta** service → **Settings** → **Source**.
2. Update the image tag (e.g., `ghcr.io/va360labs/didacta-community:0.0.1-alpha.107` to a newer version tag).
3. Click **Redeploy**.

All uploaded files (`/app/data`), database records (`/var/lib/postgresql/data`), and cache state (`/data`) will remain safe across updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Host Header Mismatch (`WEB_PUBLIC_ALLOWED_HOSTS`)** — If you attach a custom domain without updating `WEB_PUBLIC_ALLOWED_HOSTS` and `WEB_PUBLIC_URL`, Didacta will reject web traffic with host security errors or broken redirect URLs.
* **Database Volume Detachment** — Ensure all three volume mounts (`/app/data`, `/var/lib/postgresql/data`, `/data`) remain attached. Removing the `/app/data` volume will delete uploaded course assets and media files.
* **Database Initialization Order** — On first boot, `didacta` requires `postgres` to be ready. If `didacta` fails during initial migration, wait for `postgres` healthchecks to pass and trigger a redeploy on `didacta`.
* **Private Network vs TCP Proxy Connections** — Ensure `ADMIN_DATABASE_URL` and `REDIS_URL` point to private domain URLs rather than public TCP proxy domains for lower latency and better security.

---

#### Why Deploy Didacta on Railway?

Railway provides a complete platform for hosting multi-container web applications, vector databases, and Redis caches. Deploying Didacta Community on Railway gives you private service networking, persistent volume storage, auto-generated cryptographic keys, automatic HTTPS termination, and zero-maintenance cloud hosting.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `redis:7-alpine` | Database |
| postgres | `pgvector/pgvector:pg16` | Database |
| didacta | `ghcr.io/va360labs/didacta-community:0.0.1-alpha.107` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | redis | - | Private hostname used to connect to Redis over Railway's private network. |
| `REDISPORT` | redis | 6379 | Default port Redis listens on. |
| `REDISUSER` | redis | default | Redis username used to authenticate with the Redis server. |
| `REDIS_URL` | redis | - | Internal Redis connection URL for services within Railway. |
| `REDISPASSWORD` | redis | (secret) | Redis password, linked to the configured REDIS_PASSWORD variable. |
| `REDIS_PASSWORD` | redis | (secret) | Redis password retrieved from the connected PostgreSQL service. |
| `REDIS_PUBLIC_URL` | redis | - | Public Redis connection URL using Railway's TCP proxy. |
| `POSTGRES_DB` | postgres | railway | Name of the PostgreSQL database used by the application. |
| `DATABASE_URL` | postgres | - | Internal PostgreSQL connection URL for services within Railway. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL administrator username. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Randomly generated 32-character password used to secure the PostgreSQL database. |
| `DATABASE_PUBLIC_URL` | postgres | - | Public PostgreSQL connection URL using Railway's TCP proxy. |
| `PORT` | didacta | 3000 | Port the main web service listens on. |
| `API_PORT` | didacta | 4000 | Port the Didacta API server listens on. |
| `NODE_ENV` | didacta | production | Sets the application environment to production mode. |
| `WEB_PORT` | didacta | 3000 | Port the Didacta web server listens on. |
| `REDIS_URL` | didacta | - | Redis connection URL provided by the connected Redis service. |
| `SMTP_FROM` | didacta | - | Email address used as the sender for outgoing messages. |
| `SMTP_HOST` | didacta | - | SMTP server hostname used for sending emails. |
| `SMTP_PASS` | didacta | - | Password used to authenticate with the SMTP server. |
| `SMTP_PORT` | didacta | 587 | Port used by the SMTP server for outgoing email. |
| `SMTP_USER` | didacta | (secret) | Username used to authenticate with the SMTP server. |
| `AUTH_SECRET` | didacta | (secret) | Randomly generated 64-character secret used to secure authentication and sessions. |
| `POSTGRES_DB` | didacta | didacta | Name of the PostgreSQL database used by Didacta. |
| `SMTP_SECURE` | didacta | false | Disables secure SMTP mode. Set according to the requirements of your SMTP provider. |
| `STORAGE_ROOT` | didacta | /app/data/storage | Directory where Didacta stores files and other local storage data. |
| `POSTGRES_USER` | didacta | (secret) | PostgreSQL username used by Didacta. |
| `STORAGE_DRIVER` | didacta | local | Configures Didacta to use local filesystem storage. |
| `WEB_PUBLIC_URL` | didacta | - | Public HTTPS URL used to access the Didacta web application. |
| `POSTGRES_PASSWORD` | didacta | (secret) | PostgreSQL password retrieved from the connected PostgreSQL service. |
| `ADMIN_DATABASE_URL` | didacta | - | PostgreSQL connection URL used by the Didacta administration/backend services. |
| `DIDACTA_LICENSE_KEY` | didacta | - | License key used to activate licensed Didacta features. |
| `DIDACTA_SETUP_TOKEN` | didacta | (secret) | Token used during the Didacta setup process, derived from the PostgreSQL password. |
| `DIDACTA_CORE_VERSION` | didacta | 0.0.1-alpha.107 | Specifies the version of the Didacta Core application to use. |
| `WEB_PUBLIC_ALLOWED_HOSTS` | didacta | - | Public hostname allowed by the web application. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/didacta)
