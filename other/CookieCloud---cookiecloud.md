# Deploy CookieCloud on Railway

Sync and Manage Browser Cookies Across Devices Securely

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cookiecloud)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/cookiecloud)

### Deploy and Host CookieCloud on Railway

**CookieCloud** is an open-source, privacy-first cookie and browser data synchronization server. It enables browser extensions and automation tools to securely sync browser cookies and local storage data across devices using end-to-end symmetric encryption. This Railway template deploys `easychen/cookiecloud:latest` as a single container service paired with persistent volume storage for application state and encrypted sync vaults.

---

#### About Hosting CookieCloud

Hosting CookieCloud on Railway deploys a single container service running `easychen/cookiecloud:latest`. The container exposes a REST API and web service listening internally on port `8088`, with an automatic healthcheck mapped to `/`. Persistent storage is mounted at `/data/api/data` to ensure all user sync accounts, encrypted cookie stores, and server configuration files remain safe across container updates and redeployments.

---

#### Common Use Cases

* **Cross-browser cookie synchronization**: Automatically synchronize session cookies and localStorage between multiple browsers, machines, or mobile devices using the CookieCloud browser extension.
* **Session persistence for web automation**: Share active login sessions with headless scripts, web scraping routines, or automation bots without re-authenticating manually.
* **Encrypted browser state backup**: Maintain continuous, encrypted cloud backups of browser session tokens on infrastructure you control.
* **Self-hosted credential vault**: Replaces third-party commercial sync services with a private, self-hosted deployment.

---

#### Dependencies for CookieCloud Hosting

* **CookieCloud image:** `easychen/cookiecloud:latest`
* **One persistent volume** mounted at `/data/api/data`
* **Railway public domain** mapped to port `8088`
* **Health Check Path:** `/`

**Upstream:** [GitHub (easychen/CookieCloud)](https://github.com/easychen/CookieCloud) · [Docker Hub](https://hub.docker.com/r/easychen/cookiecloud)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `easychen/cookiecloud:latest` |
| **Server Port** | `8088` |
| **Healthcheck Endpoint** | `/` |
| **Storage / Volume** | `/data/api/data` |
| **Primary Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **cookiecloud** | Sync Server & REST API | `/data/api/data` | Yes (Port `8088`) | Single container deployment |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **cookiecloud** | `/data/api/data` | Encrypted user data vaults, server sqlite/json database, session files |

> **Warning:** Do **not** remove or detach the `/data/api/data` volume — deleting this volume will permanently wipe all stored user sync accounts, encrypted cookie vaults, and server records.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container and persistent volume to provision.
4. Open the **cookiecloud** service → **Settings** → **Networking** and copy the generated public domain URL (e.g., `https://cookiecloud-production.up.railway.app`).
5. Install the **CookieCloud browser extension** (available for Chrome, Edge, and Firefox).
6. In the extension settings:
   * **Server URL**: Paste your Railway public domain (`https://cookiecloud-production.up.railway.app`).
   * **User Key (UUID)**: Enter or generate a unique User ID.
   * **Password**: Set a strong end-to-end encryption password.
7. Click **Save & Sync** to initiate encrypted cookie synchronization.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `8088` | Internal HTTP port the server listens on |

##### Custom Domain

1. Open the **cookiecloud** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain (e.g., `cookiecloud.yourdomain.com`) and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Update the **Server URL** in your CookieCloud browser extension to point to your new custom domain.

---

#### Updating CookieCloud

1. Open the **cookiecloud** service → **Settings** → **Source**.
2. Update the image tag (e.g., `easychen/cookiecloud:latest` or a specific release tag).
3. Click **Redeploy**.

All encrypted user vaults and session data inside `/data/api/data` remain intact across container updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/data/api/data` Volume Mount** — If the persistent volume at `/data/api/data` is unmounted or omitted, all registered User Keys and encrypted cookie sync data will be wiped whenever Railway restarts or redeploys the container.
* **Extension Sync Failures via HTTP** — CookieCloud extensions require HTTPS connections for secure end-to-end encryption. Always ensure you use `https://` with your Railway public domain or custom domain when configuring extension client settings.
* **Forgotten Encryption Password** — CookieCloud encrypts data client-side before sending it to the server. If you lose your client password or User Key (UUID), server data cannot be decrypted or recovered.
* **Port Mismatch** — Ensure Railway's target port remains set to `8088` to align with the internal container execution port.

---

#### Why Deploy CookieCloud on Railway?

Railway offers zero-maintenance, always-on cloud hosting for lightweight API containers. Hosting CookieCloud on Railway gives you a private, encrypted cookie sync server with automated HTTPS certificates, persistent storage volumes, and seamless redeployment handling.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cookiecloud | `easychen/cookiecloud:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `PORT` | Server Port |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/api/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cookiecloud)
