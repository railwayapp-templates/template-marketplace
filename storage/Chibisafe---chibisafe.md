# Deploy Chibisafe on Railway

A beautiful and performant vault to save all your files in the cloud.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chibisafe)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/chibisafe)

### Deploy and Host Chibisafe on Railway

**Chibisafe** is a lightweight, self-hosted media host and file uploader designed to store and share images, videos, and documents effortlessly. This Railway template provisions a multi-service stack featuring the **Chibisafe API Server** (`chibisafe_server`), the **Chibisafe Web Frontend** (`chibisafe`), and a **Caddy Reverse Proxy Gateway** (`gateway`) for unified public traffic routing and persistent file storage.

---

#### About Hosting Chibisafe

Hosting Chibisafe on Railway runs a three-tier containerized architecture:

* **Chibisafe Server (`chibisafe_server`)**: Core backend API powered by `chibisafe/chibisafe-server:latest`. Listens on port `8000`, manages database records, handles file processing, and mounts three persistent volumes at `/app/database`, `/app/uploads`, and `/app/logs`.
* **Chibisafe Frontend (`chibisafe`)**: Modern web UI powered by `chibisafe/chibisafe:latest`. Listens on port `8001` and connects to the backend API via Railway's private network (`BASE_API_URL`).
* **Gateway (`gateway`)**: A reverse proxy built from `OpenSource-Templates/chibisafe-caddy` that exposes a public HTTPS endpoint, routing client traffic seamlessly between the frontend UI and backend API.

---

#### Common Use Cases

* **Self-hosted media and file vault**: Store, organize, and view images, webp files, videos, and arbitrary documents.
* **Shareable short links**: Generate instant direct links and album URLs for sharing media across chat platforms and social media.
* **Custom domain file hosting**: Host personal image dumps and asset CDN endpoints under your own domain name.
* **Role-based admin management**: Control public registration, upload limits, user accounts, and album permissions via an intuitive web dashboard.

---

#### Dependencies for Chibisafe Hosting

* **Chibisafe Server image:** `chibisafe/chibisafe-server:latest`
* **Chibisafe Frontend image:** `chibisafe/chibisafe:latest`
* **Caddy Gateway repository:** `https://github.com/OpenSource-Templates/chibisafe-caddy`
* **Three persistent volumes** mounted on `chibisafe_server`:
  * `database` at `/app/database`
  * `uploads` at `/app/uploads`
  * `logs` at `/app/logs`
* **Railway public domain** attached to the `gateway` service

**Upstream:** [Chibisafe Documentation](https://chibisafe.app) · [GitHub (chibisafe)](https://github.com/chibisafe/chibisafe)

##### Implementation Details

| Service | Source | Role | Web Port | Volumes / Storage |
| ------ | ------ | ------ | ------ | ------ |
| **chibisafe_server** | `chibisafe/chibisafe-server:latest` | Core Backend API & Storage | `8000` | `/app/database`, `/app/uploads`, `/app/logs` |
| **chibisafe** | `chibisafe/chibisafe:latest` | Web UI Frontend | `8001` | None |
| **gateway** | `OpenSource-Templates/chibisafe-caddy` | Caddy Reverse Proxy / Router | Public | None |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **chibisafe_server** | Backend API & Database | `/app/database`, `/app/uploads`, `/app/logs` | Private | Health check at `/api/health` |
| **chibisafe** | Frontend Web App | None | Private | Health check at `/` |
| **gateway** | Caddy Edge Router | None | Yes | Routes public requests to frontend and API |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **chibisafe_server** | `/app/database` | SQLite database state, settings, and user data |
| **chibisafe_server** | `/app/uploads` | Stored file uploads, thumbnails, and generated media |
| **chibisafe_server** | `/app/logs` | Application diagnostic logs and execution history |

> **Warning:** Do **not** remove or detach the volumes mounted on `chibisafe_server` — deleting `/app/uploads` or `/app/database` will result in permanent loss of uploaded files and user account records.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 2–3 minutes for all three services (`chibisafe_server`, `chibisafe`, `gateway`) and persistent volumes to provision.
4. Open the **chibisafe_server** service → **Variables** tab and immediately change the default `ADMIN_PASSWORD` from `admin` to a strong, secure password.
5. Open the **gateway** service → **Settings** → **Networking** and click the generated public domain URL.
6. Log in to your Chibisafe instance using the username `admin` and your updated `ADMIN_PASSWORD`.

---

#### Configuration

##### Chibisafe Server Variables (`chibisafe_server`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `ADMIN_PASSWORD` | `admin` | Initial admin account password (**Change immediately after deploy**) |
| `PORT` | `8000` | Internal HTTP port the API server listens on |

##### Chibisafe Frontend Variables (`chibisafe`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `8001` | Internal HTTP port the frontend UI server listens on |
| `BASE_API_URL` | `http://${{chibisafe_server.RAILWAY_PRIVATE_DOMAIN}}:8000` | Private network address for backend API communication |

##### Gateway Variables (`gateway`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `BACKEND_URL` | `http://${{chibisafe_server.RAILWAY_PRIVATE_DOMAIN}}:8000` | Target URL for proxying API requests |
| `FRONTEND_URL` | `http://${{chibisafe.RAILWAY_PRIVATE_DOMAIN}}:8001` | Target URL for proxying web UI traffic |

##### Custom Domain

1. Open the **gateway** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your file uploader securely at `https://your.custom.domain`.

---

#### Updating Chibisafe

1. For `chibisafe_server` and `chibisafe`, go to **Settings** → **Source**.
2. Update the Docker image tag (e.g., `chibisafe/chibisafe-server:latest` or a specific release tag).
3. Click **Redeploy**.

All uploaded assets and database records remain safely preserved inside the attached persistent volumes.

---

#### Traps

**Common pitfalls and failure modes:**

* **Default Admin Credentials (`ADMIN_PASSWORD=admin`)** — Leaving the initial admin password as `admin` leaves your uploader vulnerable to unauthorized access. Always update `ADMIN_PASSWORD` during or immediately following deployment.
* **Missing Volume Mounts** — Detaching or omitting any of the three volume mounts (`/app/database`, `/app/uploads`, `/app/logs`) on `chibisafe_server` will result in database corruption or loss of uploaded assets upon container redeployments.
* **Gateway Routing Mismatch** — The `gateway` service uses Railway's private networking variables (`RAILWAY_PRIVATE_DOMAIN`) to route traffic to the backend and frontend. If service names are modified, ensure `BACKEND_URL` and `FRONTEND_URL` in the gateway service reflect the updated names.
* **Large File Upload Limits** — If you encounter client timeouts or file size restriction errors when uploading large files, check proxy body size limits on the Caddy gateway or custom domain proxy settings.

---

#### Why Deploy Chibisafe on Railway?

Railway provides seamless orchestration for multi-container web stacks. Hosting Chibisafe on Railway gives you private service-to-service communication, persistent multi-volume storage, automated SSL/TLS termination via the Caddy gateway, and instant zero-downtime redeployments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [OpenSource-Templates/chibisafe-caddy](https://github.com/OpenSource-Templates/chibisafe-caddy) | Web service |
| chibisafe | `chibisafe/chibisafe:latest` | Worker |
| chibisafe_server | `chibisafe/chibisafe-server:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | To Auto Generate Domain |
| `DOMAIN` | gateway | - | Public domain where service is accessible. Railway automatically provides this domain. |
| `BACKEND_URL` | gateway | - | Internal backend URL used to communicate with the Chibisafe server over Railway's private network. |
| `FRONTEND_URL` | gateway | - | Internal frontend URL used to connect to the Chibisafe service over Railway's private network. |
| `PORT` | chibisafe | 8001 | Port the server listens on. |
| `BASE_API_URL` | chibisafe | - | Internal API URL used to communicate with the Chibisafe server over Railway's private network. |
| `PORT` | chibisafe_server | 8000 | Port the server listens on. |
| `ADMIN_PASSWORD` | chibisafe_server | (secret) | Password used to access the application's administrator account. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/uploads`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/chibisafe)
