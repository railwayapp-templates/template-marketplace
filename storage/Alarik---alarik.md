# Deploy Alarik on Railway

Alarik is a high-performance, S3-compatible object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alarik)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/alarik)

### Deploy and Host Alarik on Railway

**Alarik** by Achtung Software is an open-source management platform consisting of a core API backend and a modern Nuxt-based web administration console. This Railway template deploys both the **Alarik API** server (`alarik`) and the **Alarik Console** web dashboard (`console`) with persistent file storage and automated secret configuration.

---

#### About Hosting Alarik

Hosting Alarik on Railway runs two connected container services:

* **Alarik API (`alarik`)**: Core backend service using `ghcr.io/achtungsoftware/alarik:latest`. It handles API requests, user authentication, JWT token signing, and data persistence. It mounts a persistent volume at `/app/Storage` and listens on port `8080`.
* **Alarik Console (`console`)**: Web management frontend using `ghcr.io/achtungsoftware/alarik-console:latest`. It provides the Nuxt dashboard UI, listening on port `3000` and communicating with the API service over HTTPS.

Both services are assigned Railway public domains so users can access the administrative UI and API endpoints securely.

---

#### Common Use Cases

* **Self-hosted administrative platform**: Manage Alarik services and accounts on infrastructure you control.
* **Decoupled API & Console architecture**: Manage frontend and backend services within a single Railway project.
* **Secure multi-tenant / multi-user management**: Configurable admin credentials and account creation controls.
* **Persistent file & state storage**: Retain application files, configurations, and database state across container redeployments.

---

#### Dependencies for Alarik Hosting

* **Alarik API image:** `ghcr.io/achtungsoftware/alarik:latest`
* **Alarik Console image:** `ghcr.io/achtungsoftware/alarik-console:latest`
* **One persistent volume** mounted at `/app/Storage` on the `alarik` backend service
* **Railway public domains** for both `alarik` and `console` services
* **Auto-generated secrets:** Admin password (`ADMIN_PASSWORD`) and JWT signing key (`JWT`)

Upstream: [GitHub](https://github.com/achtungsoftware/alarik)

##### Implementation Details

| Service | Image | Role | Web Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **alarik** | `ghcr.io/achtungsoftware/alarik:latest` | Core Backend API & Storage | `8080` | `/app/Storage` |
| **console** | `ghcr.io/achtungsoftware/alarik-console:latest` | Nuxt Web Admin Dashboard | `3000` | None |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **alarik** | Core API + Data Store | `/app/Storage` | Yes (Port `8080`) | Runs with `RAILWAY_RUN_UID=0` for volume write permissions |
| **console** | Frontend Web Dashboard | None | Yes (Port `3000`) | Nuxt UI pointing to `alarik` API domain |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **alarik** | `/app/Storage` | Application data, persistent storage, logs, and database files |

> **Warning:** Do **not** remove or detach the `/app/Storage` volume on the `alarik` service — application data and state will be lost on subsequent deploys.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for both the `alarik` API and `console` web services to provision.
4. Open the **alarik** service → **Variables** to retrieve your auto-generated `ADMIN_PASSWORD` (default username is `alarik`).
5. Open the **console** service → **Settings** → **Networking** and click the generated public domain URL.
6. Log in to the Alarik Console using your administrative credentials.

---

#### Configuration

##### Core Backend Variables (`alarik`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `API_BASE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Public URL for the Alarik API |
| `CONSOLE_BASE_URL` | `https://${{console.RAILWAY_PUBLIC_DOMAIN}}` | Public URL for the Alarik Console frontend |
| `ADMIN_USERNAME` | `alarik` | Default administrative username |
| `ADMIN_PASSWORD` | Auto-generated secret (16 chars) | Admin account password |
| `JWT` | Auto-generated secret (64 chars) | Secret key used for signing JWT tokens |
| `ALLOW_ACCOUNT_CREATION` | `false` | Disable or enable public user registration |
| `PORT` | `8080` | Internal port the API server listens on |
| `RAILWAY_RUN_UID` | `0` | Runs process as root to ensure write access to `/app/Storage` |

##### Web Console Variables (`console`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `NUXT_PUBLIC_API_BASE_URL` | `https://${{alarik.RAILWAY_PUBLIC_DOMAIN}}` | Points Nuxt frontend to the `alarik` API domain |
| `NUXT_PUBLIC_CONSOLE_BASE_URL` | `https://${{alarik.RAILWAY_PUBLIC_DOMAIN}}` | Console public domain reference |
| `NUXT_PUBLIC_ALLOW_ACCOUNT_CREATION` | `false` | Controls frontend registration UI behavior |
| `PORT` | `3000` | Internal port the Nuxt server listens on |

##### Custom Domain

1. Open the target service (`console` or `alarik`) → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Update `CONSOLE_BASE_URL` or `API_BASE_URL` environment variables if custom domains are used.
4. Railway provisions TLS automatically.

---

#### Updating Alarik

1. For both `alarik` and `console` services, go to **Settings** → **Source**.
2. Update the image tag (e.g., `ghcr.io/achtungsoftware/alarik:latest` or a specific release tag).
3. Click **Redeploy**.

All application data inside `/app/Storage` will remain intact across updates.

---

#### Traps

**Ways this still fails or surprises people:**

* **Volume Permissions (`RAILWAY_RUN_UID`)** — The `alarik` container requires `RAILWAY_RUN_UID=0` so it can write data into the mounted `/app/Storage` volume. Removing this variable may cause permission denied errors on startup.
* **Missing `/app/Storage` Volume** — If the `/app/Storage` volume is deleted or detached, all persistent application state and stored files will be lost during a redeploy.
* **Domain Mismatch between Console and API** — The `console` service depends on `NUXT_PUBLIC_API_BASE_URL` pointing to the public URL of the `alarik` service. If custom domains are added without updating environment variables, CORS or connection errors may occur.
* **Auto-generated Secrets lost on recreation** — Make sure to copy down `ADMIN_PASSWORD` from the `alarik` service variables tab after the initial deployment.

---

#### Why Deploy Alarik on Railway?

Railway provides a complete platform to host multi-container architecture stacks without complex server configuration. Hosting Alarik on Railway gives you private service networking, persistent volume mounts, auto-generated security tokens, and automatic HTTPS certificates out of the box.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| alarik | `ghcr.io/achtungsoftware/alarik:latest` | Web service |
| console | `ghcr.io/achtungsoftware/alarik-console:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT` | alarik | - | Secret key used to sign/verify JWT auth tokens |
| `PORT` | alarik | 8080 | Port the app listens on inside the container |
| `API_BASE_URL` | alarik | - | Public base URL for the API (this service's own Railway public domain) |
| `ADMIN_PASSWORD` | alarik | (secret) | Password for the built-in admin account |
| `ADMIN_USERNAME` | alarik | (secret) | Username for the built-in admin account |
| `CONSOLE_BASE_URL` | alarik | - | Public base URL for the admin/console UI (public domain of the "console" service) |
| `ALLOW_ACCOUNT_CREATION` | alarik | false | Toggles whether new users can self-register; "false" disables public signup |
| `PORT` | console | 3000 | Port the app listens on inside the container |
| `NUXT_PUBLIC_API_BASE_URL` | console | - | Public base URL the frontend uses to reach the API (Railway public domain of the "alarik" service) |
| `NUXT_PUBLIC_CONSOLE_BASE_URL` | console | - | Public base URL for the admin/console UI (same public domain as the API here) |
| `NUXT_PUBLIC_ALLOW_ACCOUNT_CREATION` | console | false | Toggles whether new users can self-register; "false" disables public signup |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/Storage`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/alarik)
