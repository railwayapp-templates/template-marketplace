# Deploy Collabora Office on Railway

Powerful, Flexible, and Secure Online Office Suite Designed to Break Free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/collabora-office)

## About

### Deploy and Host Collabora Online (CODE) on Railway

**Collabora Online Development Edition (CODE)** is a powerful, enterprise-ready, open-source online office suite that enables collaborative editing of word processing documents, spreadsheets, and presentations directly within web applications like Nextcloud, ownCloud, and custom WOPI integrations. This Railway template deploys `collabora/code:latest` as a single container service listening on port `9980`.

---

#### About Hosting Collabora Online

Hosting Collabora Online on Railway runs a single container instance using `collabora/code:latest`. The service acts as an editing engine using the WOPI protocol, rendering and editing documents provided by a host storage system (such as Nextcloud or ownCloud). Because Railway terminates TLS at its edge proxy, Collabora is configured with `--o:ssl.enable=false` in `extra_params` to accept HTTP traffic internally on port `9980` while serving secure HTTPS externally.

---

#### Common Use Cases

* **Real-time document co-authoring**: Edit DOCX, XLSX, PPTX, and ODF files simultaneously with multiple users inside your browser.
* **Nextcloud / ownCloud Office backend**: Seamlessly integrate with self-hosted storage platforms to provide native web office functionality.
* **Embedded document viewer & editor**: Add rich document editing capabilities into custom WebDAV or WOPI-compliant web applications.
* **Privacy-focused productivity suite**: Retain total control over corporate documents and sensitive files on private cloud infrastructure.

---

#### Dependencies for Collabora Hosting

* **Collabora image:** `collabora/code:latest`
* **Railway public domain** mapped to port `9980`
* **Auto-generated credentials:** Admin console `username` (12 chars) and `password` (32 chars)
* **Proxy SSL setting:** `--o:ssl.enable=false` (configured in `extra_params`)

**Upstream:** [Collabora Office Site](https://www.collaboraoffice.com/code/) · [GitHub](https://github.com/CollaboraOnline/online) · [Docker Hub](https://hub.docker.com/r/collabora/code)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `collabora/code:latest` |
| **WOPI / Web Port** | `9980` |
| **Storage / Volume** | None (Stateless) |
| **SSL Mode** | Proxy Terminated (`--o:ssl.enable=false`) |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **collabora** | CODE Office Engine & WOPI Server | None | Yes (Port `9980`) | Stateless container serving WOPI clients |

###### Volumes (drives) — what to mount

This container is **stateless**. Documents are loaded into memory for editing and saved directly back to the host application (e.g. Nextcloud) via WOPI API calls.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the `collabora` container to provision.
4. Retrieve your auto-generated admin credentials (`username` and `password`) from the **Variables** tab.
5. Open the **collabora** service → **Settings** → **Networking** and copy the generated public domain URL (e.g. `https://collabora-production.up.railway.app`).
6. Connect Collabora to your host application:
   * In Nextcloud, go to **Administration settings** → **Nextcloud Office**.
   * Select **Use your own server** and enter your Railway public URL.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `domain` | `${{RAILWAY_PUBLIC_DOMAIN}}` | Allowed host domain regex for WOPI connection handshakes |
| `username` | Auto-generated secret (12 chars) | Username for accessing the Collabora admin console (`/browser/dist/admin/admin.html`) |
| `password` | Auto-generated secret (32 chars) | Password for accessing the Collabora admin console |
| `extra_params` | `--o:ssl.enable=false` | Disables internal TLS because Railway's edge proxy manages SSL termination |
| `PORT` | `9980` | Internal HTTP port the server listens on |

##### Custom Domain & WOPI Setup

1. Open the **collabora** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain (e.g., `office.yourdomain.com`) and configure DNS records as instructed.
3. If connecting to a Nextcloud instance on a specific domain, update the `domain` variable to include your Nextcloud domain regex (e.g., `nextcloud\\.yourdomain\\.com`).

---

#### Updating Collabora

1. Open the **collabora** service → **Settings** → **Source**.
2. Update the image tag (e.g., `collabora/code:latest` to a specific release tag).
3. Click **Redeploy**.

---

#### Traps

**Common pitfalls and failure modes:**

* **Internal SSL Conflict (`--o:ssl.enable=false`)** — Railway handles edge HTTPS encryption and routes HTTP traffic to port `9980`. Removing `--o:ssl.enable=false` causes Collabora to expect raw SSL sockets, producing `502 Bad Gateway` errors.
* **WOPI Host Domain Rejection** — Collabora restricts document requests to authorized domains. If `domain` is set too strictly or doesn't match your Nextcloud server's domain name, document loading will fail with "Access denied" errors.
* **Discovery Endpoint Connection Failure** — Host applications verify Collabora availability by fetching `https://${{RAILWAY_PUBLIC_DOMAIN}}/hosting/discovery`. Ensure public domain networking is enabled and reachable.
* **Resource Constraints during Document Rendering** — Complex spreadsheets or large PDF/DOCX presentations require memory during conversion. Ensure sufficient RAM is allocated to avoid container OOM kills.

---

#### Why Deploy Collabora on Railway?

Railway provides a simple, scalable cloud platform for hosting backend office infrastructure. Deploying Collabora on Railway gives you automated HTTPS provisioning, zero-downtime updates, flexible resource scaling, and seamless integration with self-hosted cloud storage systems.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| collabora | `collabora/code:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9980 | Port the application server listens on. |
| `domain` | - | Public domain automatically provided by Railway for accessing the application. |
| `password` | (secret) | Randomly generated 32-character password used to secure application access. |
| `username` | (secret) | Randomly generated 12-character username used for application access. |
| `extra_params` | --o:ssl.enable=false | Additional application parameters; disables SSL for the application's internal or configured connection. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/collabora-office)
