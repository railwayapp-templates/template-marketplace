# Deploy Chief Onboarding on Railway

Onboarding and Employee Management Platform Designed for Businesses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chief-onboarding)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/chief-onboarding)

### Deploy and Host ChiefOnboarding on Railway

**ChiefOnboarding** is an open-source employee onboarding platform designed to build automated onboarding workflows, manage tasks, and streamline new hire experiences. This Railway template deploys the core **ChiefOnboarding** web application (`chiefonboarding`) paired with a high-availability PostgreSQL database (`db`) with SSL support and persistent storage.

---

#### About Hosting ChiefOnboarding

Hosting ChiefOnboarding on Railway deploys a two-tier architecture:

* **ChiefOnboarding Web App (`chiefonboarding`)**: Core web application container using `chiefonboarding/chiefonboarding:v2.2.5`. It handles web dashboard requests, onboarding task workflows, and notifications. It listens internally on port `8000` and connects to the PostgreSQL database via private networking.
* **PostgreSQL Database (`db`)**: Relational database container using `ghcr.io/railwayapp-templates/postgres-ssl:latest`. It mounts a persistent volume at `/var/lib/postgresql/data` to ensure data durability across deployments and provides TCP proxying for external administrative access.

---

#### Common Use Cases

* **Automated employee onboarding**: Create structured onboarding sequences, tasks, and welcome packages for new hires.
* **Team & manager tracking**: Assign mentors, track progress, and automate check-ins for new team members.
* **Self-hosted HR portal**: Maintain complete data ownership for internal employee records on infrastructure you control.
* **Integrated database stack**: Fully managed PostgreSQL backend with SSL encryption and automated secret provisioning.

---

#### Dependencies for ChiefOnboarding Hosting

* **ChiefOnboarding image:** `chiefonboarding/chiefonboarding:v2.2.5`
* **PostgreSQL image:** `ghcr.io/railwayapp-templates/postgres-ssl:latest`
* **One persistent volume** mounted at `/var/lib/postgresql/data` on the `db` service
* **Railway public domain** mapped to port `8000` for `chiefonboarding`
* **Auto-generated secrets:** Django secret key (`SECRET_KEY`) and database password (`POSTGRES_PASSWORD`)

**Upstream:** [ChiefOnboarding Site](https://chiefonboarding.com) · [GitHub](https://github.com/chiefonboarding/chiefonboarding)

##### Implementation Details

| Service | Image | Role | Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **chiefonboarding** | `chiefonboarding/chiefonboarding:v2.2.5` | Web Application & Workflow Engine | `8000` | None |
| **db** | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | PostgreSQL Database (SSL enabled) | `5432` | `/var/lib/postgresql/data` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **chiefonboarding** | Main Application UI | None | Yes (Port `8000`) | Connects to `db` using `${{db.DATABASE_URL}}` |
| **db** | Relational Database | `/var/lib/postgresql/data` | TCP Proxy (Port `5432`) | High availability template (`postgres-ha`) |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **db** | `/var/lib/postgresql/data` | PostgreSQL data directory, table indices, user records, and application state |

> **Warning:** Do **not** remove or detach the `/var/lib/postgresql/data` volume on the `db` service — deleting this volume will permanently erase all employee records, workflows, and database tables during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for both the `db` database and `chiefonboarding` application services to provision.
4. Open the **chiefonboarding** service → **Settings** → **Networking** and click the generated public domain URL.
5. Follow the on-screen setup prompts to create your initial administrator account and organization settings.

---

#### Configuration

##### Application Variables (`chiefonboarding`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `SECRET_KEY` | Auto-generated secret (16 chars) | Cryptographic key used for session signing and security |
| `DATABASE_URL` | `${{db.DATABASE_URL}}` | Internal PostgreSQL connection string provided by the `db` service |
| `ALLOWED_HOSTS` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Public domain host check for Django web security |
| `PORT` | `8000` | Internal port the web application listens on |

##### Database Variables (`db`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `POSTGRES_DB` | `chiefonboarding` | Name of the default database created on startup |
| `POSTGRES_USER` | `postgres` | Administrative database user |
| `POSTGRES_PASSWORD` | Auto-generated secret (32 chars) | Secure database access password |
| `DATABASE_URL` | `postgresql://${{PGUSER}}:${{POSTGRES_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:5432/${{PGDATABASE}}` | Internal private connection URL |
| `DATABASE_PUBLIC_URL` | Connection string via TCP Proxy | External connection URL for remote database management |
| `SSL_CERT_DAYS` | `820` | Certificate validity period for SSL connections |
| `PGDATA` | `/var/lib/postgresql/data/pgdata` | Subdirectory path for PostgreSQL data files |

##### Custom Domain

1. Open the **chiefonboarding** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Update the `ALLOWED_HOSTS` environment variable to include your custom domain (or set to `*` or comma-separated domains).
4. Railway provisions TLS automatically.

---

#### Updating ChiefOnboarding

1. Open the **chiefonboarding** service → **Settings** → **Source**.
2. Update the image tag (e.g., `chiefonboarding/chiefonboarding:v2.2.5` to a newer version).
3. Click **Redeploy**.

All application data inside the PostgreSQL volume (`/var/lib/postgresql/data`) will remain safe across updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **`ALLOWED_HOSTS` domain mismatch** — Django enforces host security. If you attach a custom domain or access the app through an unlisted host header, ChiefOnboarding will return `400 Bad Request` or `Invalid HTTP_HOST header` errors. Ensure `ALLOWED_HOSTS` includes your domain.
* **Missing PostgreSQL volume** — If the database volume `/var/lib/postgresql/data` is removed, all user accounts, employee profiles, and workflow data will be permanently wiped on container restart.
* **Database migration timing** — During initial deployment, the application container runs database migrations against `db`. If the web service boots before PostgreSQL is ready, wait for `db` healthchecks to pass and redeploy `chiefonboarding`.
* **Private Network connection delay** — Ensure `DATABASE_URL` references `${{db.DATABASE_URL}}` so ChiefOnboarding communicates over Railway's internal private network rather than public TCP proxies.

---

#### Why Deploy ChiefOnboarding on Railway?

Railway provides a complete platform for multi-container web applications and databases. Hosting ChiefOnboarding on Railway gives you private service networking, automated SSL database provisioning, persistent storage mounts, auto-generated secret keys, and zero-maintenance infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chiefonboarding | `chiefonboarding/chiefonboarding:v2.2.5` | Web service |
| db | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | chiefonboarding | 8000 | Port the server listens on. |
| `SECRET_KEY` | chiefonboarding | (secret) | Random secret key used to secure and sign application data. |
| `DATABASE_URL` | chiefonboarding | - | Database connection URL automatically provided by the Railway database service. |
| `ALLOWED_HOSTS` | chiefonboarding | - | Public domain allowed to access the application. Railway automatically provides this domain. |
| `POSTGRES_DB` | db | chiefonboarding | Name of the PostgreSQL database created for the application. |
| `DATABASE_URL` | db | - | Internal PostgreSQL connection URL for services within Railway. |
| `POSTGRES_USER` | db | (secret) | PostgreSQL administrator username. |
| `POSTGRES_PASSWORD` | db | (secret) | Randomly generated 32-character password used to secure the PostgreSQL database. |
| `DATABASE_PUBLIC_URL` | db | - | Public PostgreSQL connection URL using Railway's TCP proxy. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/chief-onboarding)
