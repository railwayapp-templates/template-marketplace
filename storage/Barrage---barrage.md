# Deploy Barrage on Railway

Deluge & Manage Your Torrents with Ease from Any Device.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/barrage)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/barrage)

### Deploy and Host Barrage on Railway

**Barrage** is a modern, responsive web UI dashboard for managing and monitoring Deluge torrent client instances. This Railway template deploys Barrage as a single container service (`maulik9898/barrage:0.3.0`), providing secure NextAuth-protected web access and seamless connection to your Deluge server.

---

#### About Hosting Barrage

Hosting Barrage on Railway runs a single container instance listening on port `3000`. The service acts as a frontend dashboard and management proxy for an external or co-located Deluge daemon/web client (`DELUGE_URL`). Authentication is handled securely using NextAuth with auto-generated secrets (`NEXTAUTH_SECRET`) and configurable login credentials (`BARRAGE_PASSWORD` / `DELUGE_PASSWORD`).

---

#### Common Use Cases

* **Modern web frontend for Deluge**: Replace or supplement the default Deluge Web UI with a sleek, mobile-friendly interface.
* **Remote torrent monitoring & management**: View active downloads, manage bandwidth limits, add magnet links, and control torrent states from anywhere.
* **Secure password-protected access**: Protect your torrent client dashboard behind NextAuth authentication.
* **Railway media stack integration**: Pair Barrage with Deluge or other media automation tools hosted inside or outside Railway.

---

#### Dependencies for Barrage Hosting

* **Barrage image:** `maulik9898/barrage:0.3.0`
* **Target Deluge instance:** An accessible Deluge server URL (`DELUGE_URL`)
* **Railway public domain** mapped to port `3000`
* **Auto-generated secrets:** `NEXTAUTH_SECRET` (32 chars) and `DELUGE_PASSWORD` / `BARRAGE_PASSWORD` (16 chars)

**Upstream:** [GitHub (maulik9898/barrage)](https://github.com/maulik9898/barrage) · [Docker Hub](https://hub.docker.com/r/maulik9898/barrage)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `maulik9898/barrage:0.3.0` |
| **Web UI Port** | `3000` |
| **Storage / Volume** | None (Stateless container) |
| **Authentication** | NextAuth + Password |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **barrage** | Web UI Dashboard & Deluge Client | None | Yes (Port `3000`) | Connects to external `DELUGE_URL` |

###### Volumes (drives) — what to mount

This container is **stateless** and does not require persistent volume mounts. All configuration is managed via environment variables, and download files remain on your Deluge host server.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Open the **barrage** service → **Variables** tab and update `DELUGE_URL` to point to your Deluge Web UI instance (e.g., `http://192.168.1.100:8112` or private Railway URL `http://${{Deluge.RAILWAY_PRIVATE_DOMAIN}}:8112`).
4. Retrieve the auto-generated login password from the `BARRAGE_PASSWORD` (or `DELUGE_PASSWORD`) environment variable.
5. Open the **barrage** service → **Settings** → **Networking** and click the generated public domain URL.
6. Log in to the Barrage UI using your configured credentials.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `NEXTAUTH_SECRET` | Auto-generated secret (32 chars) | Secret key used for signing NextAuth session tokens |
| `NEXTAUTH_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Public canonical URL for NextAuth callbacks |
| `DELUGE_URL` | `http://your-deluge-ip:8112` | Address and port of the target Deluge server |
| `DELUGE_PASSWORD` | Auto-generated secret (16 chars) | Password used for authenticating with Deluge |
| `BARRAGE_PASSWORD` | `${{barrage.DELUGE_PASSWORD}}` | Web UI login password for Barrage (defaults to `DELUGE_PASSWORD`) |
| `PORT` | `3000` | Internal HTTP port the server listens on |

##### Custom Domain

1. Open the **barrage** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Update `NEXTAUTH_URL` to match your new custom domain (`https://barrage.yourdomain.com`).
4. Railway provisions TLS automatically.

---

#### Updating Barrage

1. Open the **barrage** service → **Settings** → **Source**.
2. Update the image tag (e.g., `maulik9898/barrage:0.3.0` to a newer release tag).
3. Click **Redeploy**.

---

#### Traps

**Common pitfalls and failure modes:**

* **Unreachable `DELUGE_URL`** — If `DELUGE_URL` points to an unroutable IP (`http://your-deluge-ip:8112` default placeholder or `localhost`), Barrage will fail to connect or display API errors. Ensure Deluge is accessible via public IP or internal Railway network name.
* **Incorrect `NEXTAUTH_URL`** — If you attach a custom domain without updating `NEXTAUTH_URL`, NextAuth authentication and cookie verification may fail or redirect to the default Railway domain.
* **Deluge Web UI API password mismatch** — Ensure `DELUGE_PASSWORD` matches the password set on your Deluge Web UI interface so Barrage can authenticate successfully.
* **CORS / Mixed Content warnings** — If Barrage is hosted over HTTPS on Railway while Deluge is hosted over unencrypted HTTP, ensure server-side API proxying is configured correctly without client-side mixed-content blocks.

---

#### Why Deploy Barrage on Railway?

Railway enables simple, cloud-native hosting for modern web dashboards. Deploying Barrage on Railway provides instant HTTPS encryption, automated session security, custom domain integration, and reliable uptime for monitoring your media automation infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Barrage | `maulik9898/barrage:0.3.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the app listens on inside the container |
| `DELUGE_URL` | - | http://your-deluge-ip:8112 |
| `NEXTAUTH_URL` | - | Public base URL used by NextAuth for auth callbacks (this service's Railway public domain) |
| `DELUGE_PASSWORD` | (secret) | Auto-generated password for the Deluge WebUI/daemon |
| `NEXTAUTH_SECRET` | (secret) | Auto-generated secret NextAuth uses to sign/encrypt session tokens |
| `BARRAGE_PASSWORD` | (secret) | Mirrors the Deluge password from the "barrage" service, so this app can authenticate to it |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/barrage)
