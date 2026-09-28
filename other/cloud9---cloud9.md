# Deploy cloud9 on Railway

Cloud-Based Integrated Development Environment (IDE)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloud9)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/cloud9)

### Deploy and Host Cloud9 IDE on Railway

**Cloud9 IDE** (via LinuxServer.io) is a cloud-based web IDE that lets you code, build, and run applications directly from your browser. This Railway template deploys the official LinuxServer Cloud9 Docker container (`lscr.io/linuxserver/cloud9:1.29.2`) with persistent code storage and auto-generated HTTP basic authentication credentials.

---

#### About Hosting Cloud9 IDE

Hosting Cloud9 on Railway runs a single container instance that exposes a full-featured web development workspace in your browser. A persistent volume is mounted at `/code` to preserve your code files, repositories, workspace configuration, and installed development dependencies across deployments. The service listens internally on port `8000` and is protected by HTTP basic authentication credentials (`USERNAME` and `PASSWORD`).

---

#### Common Use Cases

* **Cloud Development Environment**: Write, edit, and run code directly from any web browser or tablet without local toolchain installation.
* **Automated Repository Cloning**: Automatically clone a target git repository on initial startup via the `GITURL` environment variable.
* **Persistent Web Workspace**: Maintain project files, terminal configurations, and code state across container updates inside `/code`.
* **Remote Terminal & Tooling**: Access an embedded bash terminal with common Linux utilities for testing and execution.

---

#### Dependencies for Cloud9 Hosting

* **Cloud9 image:** `lscr.io/linuxserver/cloud9:1.29.2`
* **One persistent volume** mounted at `/code`
* **Railway public domain** mapped to port `8000`
* **Auto-generated secrets:** `USERNAME` (12 chars) and `PASSWORD` (32 chars) for web access protection

**Upstream:** [LinuxServer Cloud9 Docs](https://docs.linuxserver.io/images/docker-cloud9/) · [GitHub (LinuxServer Docker Cloud9)](https://github.com/linuxserver/docker-cloud9)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `lscr.io/linuxserver/cloud9:1.29.2` |
| **Web UI Port** | `8000` |
| **Storage / Volume** | `/code` |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **cloud9** | Browser IDE + Web Terminal | `/code` | Yes (Port `8000`) | Runs with PUID=1000 / PGID=1000 |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **cloud9** | `/code` | Workspace code files, cloned Git repositories, IDE settings, and build artifacts |

> **Warning:** Do **not** remove or detach the `/code` volume — deleting this volume will permanently erase all code files, repositories, and workspace state during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container and `/code` volume to provision.
4. Open the **cloud9** service → **Variables** tab to copy your auto-generated `USERNAME` and `PASSWORD`.
5. Open the **cloud9** service → **Settings** → **Networking** and click the generated public domain URL.
6. Enter your `USERNAME` and `PASSWORD` when prompted by the browser HTTP authentication challenge to access your IDE.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `USERNAME` | Auto-generated secret (12 chars) | HTTP Basic Auth username for web access |
| `PASSWORD` | Auto-generated secret (32 chars) | HTTP Basic Auth password for web access |
| `GITURL` | `https://github.com/linuxserver/docker-cloud9.git` | Optional Git repository to automatically clone into `/code` on startup |
| `PUID` | `1000` | User ID for internal file permissions |
| `PGID` | `1000` | Group ID for internal file permissions |
| `TZ` | `Europe/London` | Container timezone |
| `PORT` | `8000` | Port the web IDE listens on inside the container |

##### Custom Domain

1. Open the **cloud9** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your Cloud9 IDE securely at `https://your.custom.domain`.

---

#### Updating Cloud9

1. Open the **cloud9** service → **Settings** → **Source**.
2. Update the image tag (e.g., `lscr.io/linuxserver/cloud9:1.29.2` to a newer version).
3. Click **Redeploy**.

All code files, Git history, and project configuration inside the `/code` volume remain intact.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/code` Volume** — If the `/code` mount path is detached or deleted, all workspace files, git repositories, and uncommitted code changes will be lost when Railway restarts or updates the container.
* **HTTP Basic Auth Lockout** — Cloud9 requires authentication. If `USERNAME` or `PASSWORD` variables are changed or deleted without updating your browser credentials, login attempts will fail.
* **Git Repository Overwrite / Initial Sync Delay** — If `GITURL` is provided, Cloud9 pulls the repo on boot. On large repositories or slow network conditions, startup may take extra time before the web IDE interface becomes responsive.
* **File Permission Mismatches (`PUID`/`PGID`)** — Ensure `PUID` and `PGID` match the permissions needed for mounted volumes if modifying non-root ownership.

---

#### Why Deploy Cloud9 IDE on Railway?

Railway provides an instant, zero-maintenance platform for hosting cloud development environments. Hosting Cloud9 on Railway gives you an always-available browser IDE with persistent storage, automated HTTPS encryption, custom domain support, and password protection out of the box.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloud9 | `linuxserver/cloud9:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Europe/London | Time zone used by the application and container. |
| `PGID` | 1000 | Group ID used by the container to manage file permissions. |
| `PORT` | 8000 | Port the Cloud9 server listens on. |
| `PUID` | 1000 | User ID used by the container to run processes and access files. |
| `GITURL` | https://github.com/linuxserver/docker-cloud9.git | Git repository URL used to retrieve the Cloud9 application source. |
| `PASSWORD` | (secret) | Randomly generated 32-character password for securing Cloud9 access. |
| `USERNAME` | (secret) | Randomly generated 12-character username for accessing Cloud9. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/code`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloud9)
