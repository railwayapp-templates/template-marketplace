# Deploy Borgitory on Railway

interface for managing BorgBackup archives.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/borgitory)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/borgitory)

### Deploy and Host Borgitory on Railway

**Borgitory** is a lightweight, web-based management UI and dashboard for BorgBackup repositories. This Railway template deploys the `mlapaglia/borgitory:latest` Docker image as a single container service, complete with persistent storage for application data and configuration.

---

#### About Hosting Borgitory

Hosting Borgitory on Railway runs a single container instance using `mlapaglia/borgitory:latest`. A persistent volume is mounted at `/app/data` to safeguard configuration settings, SSH keys, repository metadata, and job state across container redeployments. The service listens internally on port `8000` and is exposed securely via Railway's automatically assigned HTTPS domain.

---

#### Common Use Cases

* **Web UI for BorgBackup**: Manage BorgBackup repositories, schedules, and backup status through an intuitive graphical dashboard.
* **Automated backup scheduling**: Set up periodic background backup jobs for remote or local data targets without managing cron scripts manually.
* **Repository status monitoring**: View prune policies, encryption details, archive history, and disk space usage across multiple Borg repositories.
* **Centralized backup orchestration**: Manage encryption keys and SSH authentication for off-site backup destinations from one dashboard.

---

#### Dependencies for Borgitory Hosting

* **Borgitory image:** `mlapaglia/borgitory:latest`
* **One persistent volume** mounted at `/app/data`
* **Railway public domain** mapped to port `8000`
* No external database required (uses internal flat-file/SQLite storage inside `/app/data`)

**Upstream:** [GitHub (mlapaglia/borgitory)](https://github.com/mlapaglia/borgitory) · [Docker Hub](https://hub.docker.com/r/mlapaglia/borgitory)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `mlapaglia/borgitory:latest` |
| **Web UI Port** | `8000` |
| **Storage / Volume** | `/app/data` |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **borgitory** | Borg UI + Scheduler | `/app/data` | Yes (Port `8000`) | Single container deployment |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **borgitory** | `/app/data` | Application configuration, database, SSH keys, and log files |

> **Warning:** Do **not** remove or detach the `/app/data` volume — deleting this volume will permanently wipe your application settings, SSH keys, repository links, and execution logs during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container and persistent volume to provision.
4. Open the **borgitory** service → **Settings** → **Networking** and click the generated public domain URL.
5. Access the Borgitory web dashboard to configure your backup repositories, SSH keys, and backup schedules.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `8000` | Port the web server listens on inside the container |

##### Custom Domain

1. Open the **borgitory** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access the dashboard securely at `https://your.custom.domain`.

---

#### Updating Borgitory

1. Open the **borgitory** service → **Settings** → **Source**.
2. Update the image tag (e.g., `mlapaglia/borgitory:latest` or a specific release tag).
3. Click **Redeploy**.

All application settings and repository records remain intact inside the `/app/data` volume.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/app/data` Volume** — If the `/app/data` mount path is omitted or detached, all configuration state, SSH keys, and job histories will be lost whenever Railway restarts or updates the container.
* **SSH Key & Remote Target Connectivity** — When backing up to remote SSH destinations (e.g. BorgBase or a remote VPS), SSH host key verification or private key permission errors may prevent jobs from connecting unless SSH keys are properly saved in `/app/data`.
* **Out-of-Memory (OOM) during large Borg operations** — Large BorgBackup repository checks (`borg check`) or heavy compaction jobs can consume significant memory. Ensure your Railway service plan has sufficient RAM allocated.
* **Port Mismatch** — If `PORT` is changed in variables without updating Railway's target port under service settings, public routing will fail.

---

#### Why Deploy Borgitory on Railway?

Railway provides a simple, zero-maintenance platform for hosting Docker containers. Hosting Borgitory on Railway gives you an always-on backup orchestrator with persistent volume storage, automatic HTTPS certificates, and seamless single-click deployments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| borgitory | `mlapaglia/borgitory:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | service web port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/borgitory)
