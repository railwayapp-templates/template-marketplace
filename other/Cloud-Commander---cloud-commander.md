# Deploy Cloud Commander on Railway

File Manager in The Web Includes a Command-Line Console and A Text Editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloud-commander)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/cloud-commander)

### Deploy and Host Cloud Commander (CloudCmd) on Railway

**Cloud Commander (CloudCmd)** is a feature-rich, web-based file manager that provides a dual-panel interface, built-in file viewer/editor, and integrated terminal access directly within your web browser. This Railway template deploys `coderaiser/cloudcmd:18.5.1` as a single container service paired with persistent storage for your target file directory.

---

#### About Hosting Cloud Commander

Hosting Cloud Commander on Railway runs a single container instance using `coderaiser/cloudcmd:18.5.1`. A persistent storage volume is mounted at `/mnt/fs`, which Cloud Commander exposes as its root directory (`CLOUDCMD_ROOT=/mnt/fs`). Web authentication (`CLOUDCMD_AUTH=true`) is enabled by default, using automatically generated credentials (`CLOUDCMD_USERNAME` and `CLOUDCMD_PASSWORD`) to protect file management access. The service listens internally on port `8000` and is exposed securely via Railway's public HTTPS domain.

---

#### Common Use Cases

* **Browser-based file management**: Upload, download, create, edit, rename, and delete files on your persistent volume through a responsive web UI.
* **Dual-panel file navigation**: Easily move, copy, and compare files and directories between two side-by-side file trees.
* **In-browser code & text editing**: View and modify files directly using built-in editors with syntax highlighting (Dope, Edward, or Deepword).
* **Remote file storage portal**: Maintain an accessible cloud drive on personal infrastructure without setting up complex FTP or WebDAV servers.

---

#### Dependencies for CloudCmd Hosting

* **CloudCmd image:** `coderaiser/cloudcmd:18.5.1`
* **One persistent volume** mounted at `/mnt/fs`
* **Railway public domain** mapped to port `8000`
* **Auto-generated credentials:** `CLOUDCMD_USERNAME` (12 chars) and `CLOUDCMD_PASSWORD` (32 chars)

**Upstream:** [Cloud Commander Site](https://cloudcmd.io) · [GitHub](https://github.com/coderaiser/cloudcmd) · [Docker Hub](https://hub.docker.com/r/coderaiser/cloudcmd)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `coderaiser/cloudcmd:18.5.1` |
| **Web UI Port** | `8000` |
| **Storage / Volume** | `/mnt/fs` |
| **Authentication** | Basic HTTP Auth (`CLOUDCMD_AUTH=true`) |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **cloudcmd** | Web File Manager UI & Console | `/mnt/fs` | Yes (Port `8000`) | Single container deployment |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **cloudcmd** | `/mnt/fs` | Persistent root filesystem directory containing all managed files, folders, and uploaded assets |

> **Warning:** Do **not** remove or detach the `/mnt/fs` volume — deleting this volume will permanently erase all stored files, uploaded documents, and directories during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container and persistent volume to provision.
4. Open the **cloudcmd** service → **Variables** tab to copy your auto-generated `CLOUDCMD_USERNAME` and `CLOUDCMD_PASSWORD`.
5. Open the **cloudcmd** service → **Settings** → **Networking** and click the generated public domain URL.
6. Enter your credentials when prompted by the browser authentication modal to access the Cloud Commander dashboard.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `CLOUDCMD_ROOT` | `/mnt/fs` | Root directory path exposed by Cloud Commander inside the web interface |
| `CLOUDCMD_AUTH` | `true` | Enables HTTP Basic Authentication modal on web access |
| `CLOUDCMD_USERNAME` | Auto-generated secret (12 chars) | Username required for web dashboard login |
| `CLOUDCMD_PASSWORD` | Auto-generated secret (32 chars) | Password required for web dashboard login |
| `PORT` | `8000` | HTTP port the server listens on inside the container |

##### Custom Domain

1. Open the **cloudcmd** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your file manager securely at `https://your.custom.domain`.

---

#### Updating CloudCmd

1. Open the **cloudcmd** service → **Settings** → **Source**.
2. Update the image tag (e.g., `coderaiser/cloudcmd:18.5.1` to a newer release tag).
3. Click **Redeploy**.

All stored files inside the `/mnt/fs` volume will remain intact across container updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/mnt/fs` Volume** — If the `/mnt/fs` volume is detached or omitted, any files uploaded or edited will exist only in container ephemeral storage and will be wiped permanently on container restart.
* **Root Path Mismatch** — If `CLOUDCMD_ROOT` is changed to a directory that does not exist or is not mounted (e.g. `/root`), CloudCmd may fail to boot or show permission errors.
* **Authentication Lockout** — If `CLOUDCMD_AUTH` is set to `true` without noting down `CLOUDCMD_USERNAME` and `CLOUDCMD_PASSWORD` from the Railway variables tab, you will be unable to access the web UI.
* **Disabling Authentication on Public Domains** — Setting `CLOUDCMD_AUTH=false` while exposed on a public HTTPS domain allows unauthenticated read/write access to your filesystem by anyone on the internet.

---

#### Why Deploy CloudCmd on Railway?

Railway provides zero-overhead hosting for Docker applications with persistent volume attachments. Hosting Cloud Commander on Railway gives you a secure, browser-accessible file manager with automatic HTTPS encryption, encrypted secret management, and persistent volume storage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudcmd | `coderaiser/cloudcmd:18.5.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Port the Cloud Commander server listens on. |
| `CLOUDCMD_AUTH` | true | Enables authentication for accessing Cloud Commander. |
| `CLOUDCMD_ROOT` | /mnt/fs | Root directory exposed to Cloud Commander for file management. |
| `CLOUDCMD_PASSWORD` | (secret) | Randomly generated 32-character password used to secure Cloud Commander access. |
| `CLOUDCMD_USERNAME` | (secret) | Randomly generated 12-character username for Cloud Commander access. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/fs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cloud-commander)
