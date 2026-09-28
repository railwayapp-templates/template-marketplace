# Deploy Commento++ on Railway

Fast, Lightweight Comments Box that You Can Embed in Your Static Website.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/commento)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/commento)

### Deploy and Host Commento++ on Railway

**Commento++** is a fast, lightweight, privacy-focused open-source commenting engine. Designed as a modern community-driven continuation of Commento, it allows website owners to embed privacy-conscious, ad-free comment sections into blogs, static sites, and documentation portals. This Railway template deploys the core **Commento++** application (`commentoplusplus`) paired with a high-availability PostgreSQL database (`postgres`) with persistent storage.

---

#### About Hosting Commento++

Hosting Commento++ on Railway provisions a two-tier container architecture:

* **Commento++ (`commentoplusplus`)**: The main web server and comment widget API running `caroga/commentoplusplus:v1.8.7`. It serves the admin dashboard, handles comment moderation and embedding scripts, listens internally on port `8080`, and communicates with the database over Railway's private network.
* **PostgreSQL Database (`postgres`)**: A relational database container using `ghcr.io/railwayapp-templates/postgres-ssl:latest`. It mounts a persistent volume at `/var/lib/postgresql/data` to ensure all comments, registered user profiles, and site domain configurations persist across deployments.

---

#### Common Use Cases

* **Privacy-focused commenting engine**: Replace invasive commenting platforms like Disqus with an ad-free, tracking-free commenting system.
* **Static site & blog integration**: Easily embed comment sections on Hugo, Jekyll, Astro, Next.js, Gatsby, or WordPress sites.
* **Multi-domain support**: Enable wildcard domain matching (`COMMENTO_ENABLE_WILDCARDS=true`) to embed comment widgets across multiple subdomains or external sites.
* **Self-hosted community discussions**: Maintain full ownership of user data, comments, and moderation logs on your own cloud infrastructure.

---

#### Dependencies for Commento++ Hosting

* **Commento++ image:** `caroga/commentoplusplus:v1.8.7`
* **PostgreSQL image:** `ghcr.io/railwayapp-templates/postgres-ssl:latest`
* **One persistent volume** mounted at `/var/lib/postgresql/data` on the `postgres` service
* **Railway public domain** mapped to port `8080` for `commentoplusplus`
* **Auto-generated secrets:** PostgreSQL password (`POSTGRES_PASSWORD`)

**Upstream:** [GitHub (caroga/commentoplusplus)](https://github.com/caroga/commentoplusplus) · [Docker Hub](https://hub.docker.com/r/caroga/commentoplusplus)

##### Implementation Details

| Service | Image | Role | Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **commentoplusplus** | `caroga/commentoplusplus:v1.8.7` | Commenting Engine & Admin Web UI | `8080` | None |
| **postgres** | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | PostgreSQL Database (SSL enabled) | `5432` | `/var/lib/postgresql/data` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **commentoplusplus** | Main Server & Widget API | None | Yes (Port `8080`) | Connects to `postgres` using internal URI |
| **postgres** | Relational Database | `/var/lib/postgresql/data` | TCP Proxy (Port `5432`) | High availability template (`postgres-ha`) |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **postgres** | `/var/lib/postgresql/data` | Relational database files, comments, user accounts, and domain settings |

> **Warning:** Do **not** remove or detach the `/var/lib/postgresql/data` volume on the `postgres` service — deleting this volume will permanently erase all published comments, user accounts, and site registrations during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for both the `postgres` database and `commentoplusplus` application services to provision.
4. Open the **commentoplusplus** service → **Settings** → **Networking** and click the generated public domain URL.
5. Register the initial owner account through the web dashboard. The first account created automatically gains administrative permissions.
6. Add your website domain in the Commento++ dashboard, copy the HTML embed snippet, and paste it into your site templates.

---

#### Configuration

##### Commento++ Variables (`commentoplusplus`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `COMMENTO_ORIGIN` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Public canonical origin URL where Commento++ is hosted |
| `COMMENTO_POSTGRES` | `postgres://${{postgres.POSTGRES_USER}}:${{postgres.POSTGRES_PASSWORD}}@${{postgres.RAILWAY_PRIVATE_DOMAIN}}:5432/${{postgres.POSTGRES_DB}}?sslmode=disable` | Connection string for internal PostgreSQL database |
| `COMMENTO_ENABLE_WILDCARDS` | `true` | Allows embedding the comment widget across wildcard domains and subdomains |
| `PORT` | `8080` | Internal port the HTTP server listens on |

##### Database Variables (`postgres`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `POSTGRES_DB` | `postgres` | Name of the default database created on startup |
| `POSTGRES_USER` | `postgres` | Administrative database user |
| `POSTGRES_PASSWORD` | Auto-generated secret (16 chars) | Secure database access password |
| `DATABASE_URL` | `postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{PGDATABASE}}` | Internal private connection URL |
| `DATABASE_PUBLIC_URL` | Connection string via TCP Proxy | External connection URL for remote database management |
| `SSL_CERT_DAYS` | `820` | Certificate validity period for SSL connections |
| `PGDATA` | `/var/lib/postgresql/data/pgdata` | Subdirectory path for PostgreSQL data files |

##### Custom Domain

1. Open the **commentoplusplus** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain (e.g. `comments.yourdomain.com`) and follow Railway’s DNS setup instructions.
3. Update the `COMMENTO_ORIGIN` environment variable on the `commentoplusplus` service to match your new URL (`https://comments.yourdomain.com`).
4. Railway provisions TLS automatically.

---

#### Updating Commento++

1. Open the **commentoplusplus** service → **Settings** → **Source**.
2. Update the image tag (e.g., `caroga/commentoplusplus:v1.8.7` to a newer version).
3. Click **Redeploy**.

All comments and database records remain safe inside the attached PostgreSQL volume.

---

#### Traps

**Common pitfalls and failure modes:**

* **`COMMENTO_ORIGIN` Mismatch** — Commento++ relies heavily on `COMMENTO_ORIGIN` for security verification and CORS checks. If you attach a custom domain or change the public domain without updating `COMMENTO_ORIGIN`, the embedded comment widget will fail to load or throw origin error blocks.
* **Missing PostgreSQL Volume** — Removing or detaching the `/var/lib/postgresql/data` volume on the `postgres` service will permanently erase all user accounts, comments, and registered site settings.
* **Initial Registration Security** — Anyone can register the first account on a fresh Commento++ instance to claim administrator privileges. Ensure you access the domain immediately after deployment and complete the registration step.
* **Database Connection `sslmode`** — The connection string uses `sslmode=disable` because communication takes place over Railway's isolated internal private network (`${{postgres.RAILWAY_PRIVATE_DOMAIN}}`). Altering this parameter without configuring database certificates may prevent Commento++ from connecting to PostgreSQL.

---

#### Why Deploy Commento++ on Railway?

Railway delivers a seamless environment for running containerized web services and databases. Deploying Commento++ on Railway provides private service networking, persistent volume mounts, automated HTTPS certificates, and effortless single-click deployments without complex server maintenance.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| commentoplusplus | `caroga/commentoplusplus:v1.8.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | postgres | Name of the PostgreSQL database used by the service. |
| `DATABASE_URL` | postgres | - | Internal PostgreSQL connection URL for services within Railway. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL administrator username. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Randomly generated 16-character password used to secure the PostgreSQL database. |
| `DATABASE_PUBLIC_URL` | postgres | - | Public PostgreSQL connection URL using Railway's TCP proxy. |
| `PORT` | commentoplusplus | 8080 | Port the Commento server listens on. |
| `COMMENTO_ORIGIN` | commentoplusplus | - | Public URL used by Commento as the origin for the application. |
| `COMMENTO_POSTGRES` | commentoplusplus | - | PostgreSQL connection URL used by Commento to connect to the PostgreSQL service over Railway's private network. |
| `COMMENTO_ENABLE_WILDCARDS` | commentoplusplus | true | Enables wildcard domain support for Commento. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/commento)
