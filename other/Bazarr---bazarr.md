# Deploy Bazarr on Railway

Manage and download subtitles for Sonarr and Radarr

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bazarr)

## About

### Deploy and Host Bazarr on Railway

Bazarr is a companion application to Sonarr and Radarr that manages and downloads subtitles based on your requirements. This template deploys the official LinuxServer Docker container for Bazarr on Railway with persistent configuration storage and exposes the web management interface on a public HTTPS domain.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/bazarr)

#### About Hosting Bazarr

Hosting Bazarr on Railway runs a single container using the `linuxserver/bazarr:1.6.1` image. A persistent volume is mounted at `/config` to preserve configuration files, logs, and internal state across deployments. The server listens on port `6767` and is made publicly accessible via Railway's automatically generated HTTPS domain.

#### Common Use Cases

* **Automated subtitle fetching** for TV shows (via Sonarr) and movies (via Radarr) across dozens of subtitle providers.
* **Centralized management** of subtitle languages, audio track matching, and synchronization rules.
* **Automatic post-processing**, translation, and subtitle format conversions.
* **Manual searching and downloading** for missing or out-of-sync subtitles when automated rules need adjustment.

#### Dependencies for Bazarr Hosting

* **Bazarr image:** `linuxserver/bazarr:1.6.1`
* **One persistent volume** attached at `/config`
* **Railway public domain** mapped to port `6767`
* No external database required (uses SQLite internally)

Upstream: [Bazarr Wiki](https://wiki.bazarr.media/) · [GitHub](https://github.com/morpheus65535/bazarr) · [LinuxServer Docs](https://docs.linuxserver.io/images/docker-bazarr/)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `linuxserver/bazarr:1.6.1` |
| **Web UI Port** | `6767` |
| **Config Volume** | `/config` |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **Bazarr** | Subtitle management + Web UI | `/config` | Yes (Port `6767`) | Single container instance |

###### Volumes (drives) — what to mount

The volume is attached by default in the template and survives redeployments.

| Mount path | What is stored |
| ------ | ------ |
| `/config` | Application configuration, SQLite database, provider settings, and operational logs |

Do **not** remove or detach the `/config` volume — settings, API keys, and language profile configurations will be lost on subsequent deploys.

#### Quick Start

1. Click the **Deploy on Railway** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the service container and persistent volume to provision.
4. Open the **Bazarr** service → **Settings** → **Networking** and click the generated public domain URL.
5. Complete the initial setup:
    * Navigate to **Settings** → **Sonarr** / **Radarr** and enter your API keys and host URLs to link your media managers.
    * Configure your preferred subtitle providers under **Settings** → **Providers**.
    * Define default languages and scoring profiles under **Settings** → **Languages**.

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `6767` | Port the server listens on inside the container |
| `DOMAIN` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Public domain where the service is accessible |

##### Custom Domain

1. Open the **Bazarr** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access the dashboard securely at `https://your.custom.domain`.

#### Updating Bazarr

1. Open the **Bazarr** service → **Settings** → **Source**.
2. Update the image tag (e.g., `linuxserver/bazarr:1.6.1` to a newer stable version).
3. Click **Redeploy**.

All configuration data remains intact inside the `/config` volume. Always review the [Bazarr Releases](https://github.com/morpheus65535/bazarr/releases) before upgrading.

#### Traps

**Ways this still fails or surprises people:**

* **Missing `/config` volume** — If the `/config` mount path is detached or deleted, all connected indexers, API keys, and language profiles will be wiped during a redeploy.
* **Sonarr / Radarr network connectivity** — If your Sonarr or Radarr instances run on Railway within the same project, connect using private networking (e.g., `http://${{Sonarr.RAILWAY_PRIVATE_DOMAIN}}:8989`) rather than public domains.
* **Path mapping mismatches** — Ensure path mappings between Sonarr/Radarr and Bazarr match if media paths differ across containers.
* **Provider rate limits** — Certain subtitle providers (e.g., OpenSubtitles) require user account credentials or impose rate limits on unauthenticated IPs.

View live logs: service → **Deployments** → latest deployment → **View Logs**.

#### Why Deploy Bazarr on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.
By deploying Bazarr on Railway, you get an always-on, auto-healing subtitle manager with persistent storage and automatic HTTPS encryption.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bazarr | `linuxserver/bazarr:1.6.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6767 | Port the server listens on. |
| `DOMAIN` | - | Public domain where service is accessible. Railway automatically provides this domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/bazarr)
