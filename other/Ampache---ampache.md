# Deploy Ampache on Railway

Web-Based Audio/Video Streaming Application And File Manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ampache)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ampache)

### Deploy and Host Ampache on Railway

**Ampache** is an open-source web-based audio and video streaming application and file manager. It allows you to host, organize, and stream your music, podcast, and video library from anywhere using a browser or compatible mobile and desktop media apps (such as Subsonic, Plex, or WebDAV clients). This template deploys Ampache on Railway with persistent configuration storage and public web interface access.

---

#### About Hosting Ampache

Hosting Ampache on Railway runs a single container service using the official `ampache/ampache:latest` Docker image. A persistent volume is mounted at `/var/www/config` to retain server settings, database connection details, indexer configurations, and user preferences across redeployments. The service listens on internal port `80` and is exposed to the internet using Railway's public domain routing.

---

#### Common Use Cases

* **Self-hosted personal music cloud**: Stream your audio collection across web browsers, mobile phones, and smart devices.
* **Subsonic API server**: Connect third-party Subsonic clients (DSub, Ample, Substreamer, Ultrasonic) directly to your Ampache backend.
* **Podcast aggregation and streaming**: Manage and listen to private or public podcast feeds.
* **Multi-user audio catalog**: Share music and media libraries with family or friends using fine-grained access control.

---

#### Dependencies for Ampache Hosting

* **Ampache image:** `ampache/ampache:latest`
* **One persistent volume** mounted at `/var/www/config`
* **Railway public domain** mapped to port `80`
* An internal or external MySQL/MariaDB database (can be added within Railway or configured during web setup)

**Upstream:** [Ampache Website](https://ampache.org/) · [GitHub Repository](https://github.com/ampache/ampache) · [Documentation](https://github.com/ampache/ampache/wiki)

##### Implementation Details

| Service | Image | Role | Web Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **ampache** | `ampache/ampache:latest` | Web Interface & Streaming Backend | `80` | `/var/www/config` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **ampache** | Audio/Video Streaming + Web UI | `/var/www/config` | Yes (Port `80`) | Centralized web server & Subsonic API provider |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **ampache** | `/var/www/config` | Ampache application configuration (`ampache.cfg.php`), keys, and session data |

> **Warning:** Do **not** remove or detach the `/var/www/config` volume — doing so will cause your site configuration and database credentials to be reset on subsequent deployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the `ampache` container and persistent volume to provision.
4. Open the **ampache** service → **Settings** → **Networking** and click the generated public domain URL.
5. Follow the web installation wizard to complete database set up, create an administrative account, and configure media folder paths.

---

#### Configuration

##### Core Variables

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `80` | Internal HTTP port the server listens on inside the container |

##### Custom Domain

1. Open the **ampache** service → **Settings** → **Networking** → **Custom Domain**.
2. Enter your custom domain name and follow Railway’s DNS setup instructions (CNAME record).
3. Railway handles TLS certificate provisioning automatically.
4. Access Ampache securely over HTTPS at `https://your.custom.domain`.

---

#### Updating Ampache

1. Open the **ampache** service → **Settings** → **Source**.
2. Verify or update the container image tag (e.g., `ampache/ampache:latest`).
3. Click **Redeploy**.

All persistent application settings stored in `/var/www/config` will remain intact across updates.

---

#### Traps

**Common pitfalls and deployment caveats:**

* **Missing persistent config volume** — Detaching or removing `/var/www/config` will reset your `ampache.cfg.php` configuration upon every redeploy.
* **Database requirement** — Ampache requires a MySQL or MariaDB database backend. You can add a MySQL database service within the same Railway project and reference its private host (`${{MySQL.RAILWAY_PRIVATE_DOMAIN}}`) during initial web setup.
* **Large catalog indexing timeouts** — When building initial music indexes over network volumes or remote mounts, run background task workers or run manual scans through the admin panel to prevent web request timeouts.

---

#### Why Deploy Ampache on Railway?

Railway provides a reliable cloud container platform for media servers. Deploying Ampache on Railway offers automatic SSL/TLS termination, seamless domain attachment, simple persistent storage management, and continuous uptime without server hardware management.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ampache | `ampache/ampache:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Ampache Service Port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ampache)
