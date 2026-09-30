# Deploy Directory Lister on Railway

Application that Lists the Contents of Any Web-Accessible Directory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/directory-lister)

## About

### Deploy and Host Directory Lister on Railway

**Directory Lister** is a simple, elegant PHP application designed to turn any directory of files into a modern, web-accessible file browser and download portal. This Railway template deploys `directorylister/directorylister:latest` as a single container service paired with persistent storage to serve and share files easily over HTTPS.

---

#### About Hosting Directory Lister

Hosting Directory Lister on Railway runs a single container using the `directorylister/directorylister:latest` Docker image listening on port `80`. A persistent volume is mounted at `/data` to store and serve files, documents, downloads, or media assets. Railway automatically provisions an HTTPS domain and handles reverse proxy routing, giving you an instant, stylish web frontend for browsing your server storage without needing complex web server configurations (like Nginx index directives).

---

#### Common Use Cases

* **Public file hosting & download portal**: Share software builds, documents, archives, or assets publicly via an intuitive browser interface.
* **Simple web-based asset browser**: Serve static media files, PDFs, image collections, or logs with real-time directory indexing and breadcrumb navigation.
* **Lightweight private cloud drive**: Store personal or team files on persistent Railway storage with direct HTTPS download links.
* **Custom themed media library**: Customize Directory Lister layouts and search interfaces to present organized file mirrors.

---

#### Dependencies for Directory Lister Hosting

* **Directory Lister image:** `directorylister/directorylister:latest`
* **One persistent volume** mounted at `/data`
* **Railway public domain** mapped to port `80`
* No external database required (reads directory contents directly from `/data`)

**Upstream:** [Directory Lister Site](https://www.directorylister.com) · [GitHub](https://github.com/DirectoryLister/DirectoryLister) · [Docker Hub](https://hub.docker.com/r/directorylister/directorylister)

##### Implementation Details

| Item | Value |
| ------ | ------ |
| **Image** | `directorylister/directorylister:latest` |
| **Web UI Port** | `80` |
| **Storage / Volume** | `/data` |
| **Database** | None (Flat file system index) |
| **Domain** | `${{RAILWAY_PUBLIC_DOMAIN}}` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **directory-lister** | Web Directory Indexer UI | `/data` | Yes (Port `80`) | Serves files directly from volume mount |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **directory-lister** | `/data` | Persistent file directory containing files, folders, documents, and media to be indexed and downloaded |

> **Warning:** Do **not** remove or detach the `/data` volume — deleting this volume will permanently erase all stored files and directories served by Directory Lister during container redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for the container and persistent volume to provision.
4. Open the **directory-lister** service → **Settings** → **Networking** and click the generated public domain URL.
5. Upload files into the `/data` volume to see them indexed in real time.

---

#### Configuration

Container-level choices defined in the template:

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `PORT` | `80` | HTTP port the web server listens on inside the container |

##### Custom Domain

1. Open the **directory-lister** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions].
3. Railway provisions TLS certificates automatically.
4. Access your file index securely at `https://your.custom.domain`.

---

#### Updating Directory Lister

1. Open the **directory-lister** service → **Settings** → **Source**.
2. Update the image tag (e.g., `directorylister/directorylister:latest` or a specific release tag).
3. Click **Redeploy**.

All stored files inside the `/data` volume will remain intact across container updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Empty Directory Display** — If no files or folders are placed in `/data`, Directory Lister will display an empty root index. Ensure your files are uploaded directly into the `/data` mount path.
* **Permissions Issues** — Files placed in `/data` must be readable by the container user. Unreadable file permissions will result in `403 Forbidden` or hidden files in the UI.
* **Missing `/data` Volume Mount** — If the `/data` volume is detached or omitted, files added directly to the container's ephemeral filesystem will be lost whenever Railway redeploys or restarts the service.
* **Large File Upload Limitations** — Directory Lister is primarily a web reader/indexer. To add large files to `/data`, upload them directly via volume management tools or CLI rather than web forms unless custom upload handlers are configured.

---

#### Why Deploy Directory Lister on Railway?

Railway provides a simple, cloud-native hosting platform for web containers with automated persistent volume mounts, zero-configuration TLS certificates, and high availability. Hosting Directory Lister on Railway gives you an instant, always-on file server and download portal accessible globally without managing local Nginx/Apache servers or static site generators.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| directory-lister | `directorylister/directorylister:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | service port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/directory-lister)
