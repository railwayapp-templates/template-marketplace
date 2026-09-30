# Deploy Dockge on Railway

Dockge Is a Reactive, Self-Hosted Docker Compose Stack Manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dockge)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/dockge)

### Deploy and Host Dockge on Railway

**Dockge** (by Louis Lam) is a self-hosted, reactive manager for Docker Compose stacks featuring an intuitive web interface, interactive compose editor, and real-time container log viewer. This Railway template deploys `louislam/dockge:1` as a single-container web service paired with persistent storage for application data and stack definitions.

---

#### About Hosting Dockge

Hosting Dockge on Railway provisions a single container service using the official `louislam/dockge:1` Docker image. The application listens internally on port `5001` (`PORT=5001`) and is exposed securely over HTTPS via Railway's public domain routing. Dockge mounts a persistent storage volume at `/app/data` to retain application configuration, database records, and stack metadata across container updates and redeployments. The default stack directory is configured to `/opt/stacks` (`DOCKGE_STACKS_DIR=/opt/stacks`).

---

#### Common Use Cases

* **Interactive Compose Editing**: Write, edit, and format `docker-compose.yml` stack files directly inside a modern web-based code editor with syntax checks.
* **Stack Management UI**: Organize, start, stop, restart, and monitor multi-container Docker applications from a centralized reactive dashboard.
* **Real-time Log Streaming**: Inspect live stdout/stderr container output streams and terminal responses directly in your web browser.
* **Compose File Repository**: Centralize and back up server orchestration configs and compose files in persistent cloud storage.

---

#### Dependencies for Dockge Hosting

* **Dockge image:** `louislam/dockge:1`
* **One persistent volume** mounted at `/app/data`
* **Railway public domain** mapped to port `5001`
* **No external database required** (uses internal storage inside `/app/data`)

**Upstream:** [Dockge Site](https://dockge.kuma.pet) · [GitHub (louislam/dockge)](https://github.com/louislam/dockge) · [Docker Hub](https://hub.docker.com/r/louislam/dockge)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `louislam/dockge:1` |
| **Web UI Port** | `5001` |
| **Storage / Volume** | `/app/data` |
| **Stacks Directory** | `/opt/stacks` |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **dockge** | Web UI & Stack Manager | `/app/data` | Yes (Port `5001`) | Single container deployment |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **dockge** | `/app/data` | Application database, authentication settings, stack configurations, and runtime state |

> **Warning:** Do **not** remove or detach the `/app/data` volume — deleting this volume will permanently erase all stored Dockge settings, user credentials, and stack definitions during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container service and persistent volume to provision.
4. Open the **dockge** service → **Settings** → **Networking** and click the generated public domain URL.
5. On initial launch, follow the on-screen prompt to set up your administrator username and password.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `DOCKGE_STACKS_DIR` | `/opt/stacks` | Directory path where Docker Compose stack files are saved |
| `PORT` | `5001` | HTTP port the web application listens on inside the container |

##### Custom Domain

1. Open the **dockge** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions].
3. Railway provisions TLS automatically.
4. Access your Dockge dashboard securely at `https://your.custom.domain`.

---

#### Updating Dockge

1. Open the **dockge** service → **Settings** → **Source**.
2. Update the image tag (e.g., `louislam/dockge:1` to a specific release tag).
3. Click **Redeploy**.

All application settings and stack configurations inside the `/app/data` volume remain safe across updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Docker Socket Availability** — Dockge is designed to control a host Docker daemon via `/var/run/docker.sock`. On serverless container platforms like Railway without privileged host socket mounting, Dockge serves primarily as a web-based compose editor and stack catalog manager unless connected to an external remote Docker daemon endpoint.
* **Missing `/app/data` Volume** — If the `/app/data` mount path is omitted or detached, user accounts, application state, and compose files will be wiped whenever Railway restarts or updates the container.
* **Port Mismatch** — Dockge runs on port `5001` by default. Changing `PORT` in environment variables without updating Railway's target port under service settings will cause public network requests to fail.

---

#### Why Deploy Dockge on Railway?

Railway provides a lightweight, zero-maintenance platform for containerized applications. Hosting Dockge on Railway gives you an always-accessible web dashboard with persistent volume storage, automatic HTTPS encryption, and simple one-click deployments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dockge | `louislam/dockge:1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5001 | Port the Dockge server listens on. |
| `DOCKGE_STACKS_DIR` | /opt/stacks | Directory where Dockge stores and manages Docker Compose stacks. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/dockge)
