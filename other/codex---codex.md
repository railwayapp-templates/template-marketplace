# Deploy codex on Railway

Create High-Quality Open-Source Projects.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex)

## About

### Deploy and Host Codex on Railway

**Codex** is an open-source, modern documentation, note-taking, and content publishing platform designed for organizing knowledge, managing documents, and collaborating effectively. This Railway template deploys a two-tier architecture featuring the **Codex Web Application** (`codex`) connected to a dedicated **MongoDB Database** (`mongo`) with persistent file uploads and database storage.

---

#### About Hosting Codex

Hosting Codex on Railway runs two connected container services:

* **Codex Web Application (`codex`)**: Core application built from `OpenSource-Templates/codex` (branch `main`). It manages document editing, user authentication, and web page rendering. It mounts a persistent volume at `/usr/src/app/uploads` for user-uploaded assets, listens on port `3000`, and connects securely to MongoDB via Railway's private network.
* **MongoDB Database (`mongo`)**: NoSQL database container running `mongo:4`. It mounts a persistent volume at `/data/db` to guarantee data durability across container updates, listening internally on port `27017` with root authentication enabled (`authSource=admin`).

---

#### Common Use Cases

* **Self-hosted team documentation & wiki**: Build, organize, and host internal knowledge bases and product documentation.
* **Personal note-taking & publishing portal**: Maintain structured notes, technical guides, and public articles under your custom domain.
* **Media-rich document management**: Upload images, files, and attachments securely stored on dedicated persistent storage.
* **Decoupled cloud architecture**: Fully managed Node.js web app paired with an isolated, authenticated MongoDB database.

---

#### Dependencies for Codex Hosting

* **Codex application repo:** `OpenSource-Templates/codex` (main branch)
* **MongoDB image:** `mongo:4`
* **Two persistent volumes:**
  * Uploads volume mounted at `/usr/src/app/uploads` on `codex`
  * Database volume mounted at `/data/db` on `mongo`
* **Railway public domain** attached to the `codex` web service on port `3000`
* **Auto-generated secrets:** Authentication password (`APP_CONFIG_auth_password`), auth secret token (`APP_CONFIG_auth_secret`), and MongoDB root password (`MONGO_INITDB_ROOT_PASSWORD`)

**Upstream:** [Codex Repository](https://github.com/OpenSource-Templates/codex) · [MongoDB Documentation](https://www.mongodb.com/docs/manual/)

##### Implementation Details

| Service | Source | Role | Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **codex** | `OpenSource-Templates/codex` | Web App & Document Engine | `3000` | `/usr/src/app/uploads` |
| **mongo** | `mongo:4` | MongoDB Database Store | `27017` | `/data/db` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **codex** | Web Frontend & API | `/usr/src/app/uploads` | Yes (Port `3000`) | Connects to `mongo` via private URI |
| **mongo** | Document Database | `/data/db` | TCP Proxy (Port `27017`) | Authenticates via `authSource=admin` |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **codex** | `/usr/src/app/uploads` | Uploaded images, documents, attachments, and media files |
| **mongo** | `/data/db` | MongoDB database collections, indexes, document data, and user accounts |

> **Warning:** Do **not** remove or detach the persistent volumes mounted on `codex` or `mongo` — deleting `/data/db` will permanently erase all documents and user accounts, while removing `/usr/src/app/uploads` will delete uploaded media files.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 1–2 minutes for both the `mongo` database and `codex` web application services to provision.
4. Retrieve your auto-generated login secret from the `codex` service → **Variables** tab (`APP_CONFIG_auth_password`).
5. Open the `codex` service → **Settings** → **Networking** and click the generated public domain URL.
6. Access your Codex instance and log in to begin creating documents and managing content.

---

#### Configuration

##### Codex Application Variables (`codex`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `APP_CONFIG_database_driver` | `mongodb` | Database driver selection |
| `APP_CONFIG_database_mongodb_uri` | `mongodb://${{mongo.MONGO_INITDB_ROOT_USERNAME}}:${{mongo.MONGO_INITDB_ROOT_PASSWORD}}@${{mongo.RAILWAY_PRIVATE_DOMAIN}}:27017/?authSource=admin` | Private MongoDB connection string |
| `APP_CONFIG_auth_password` | Auto-generated secret (16 chars) | Administrative authentication password |
| `APP_CONFIG_auth_secret` | Auto-generated secret (32 chars) | Cryptographic secret for signing sessions and JWT tokens |
| `APP_CONFIG_host` | `0.0.0.0` | Server network binding host |
| `PORT` | `3000` | Internal port the web application listens on |

##### MongoDB Database Variables (`mongo`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MONGO_INITDB_ROOT_USERNAME` | `mongo` | Root administrative database username |
| `MONGO_INITDB_ROOT_PASSWORD` | Auto-generated secret (16 chars) | Root administrative database password |
| `MONGOHOST` | `${{RAILWAY_PRIVATE_DOMAIN}}` | Internal private network host address |
| `MONGOPORT` | `27017` | Standard MongoDB database port |
| `MONGOUSER` | `${{MONGO_INITDB_ROOT_USERNAME}}` | Database username alias |
| `MONGOPASSWORD` | `${{MONGO_INITDB_ROOT_PASSWORD}}` | Database password alias |
| `MONGO_URL` | Private connection URL | Internal MongoDB connection string |
| `DATABASE_URL` | Private connection URL | Unified database URL for application linking |

##### Custom Domain

1. Open the **codex** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your documentation portal securely at `https://your.custom.domain`.

---

#### Updating Codex

1. Open the **codex** service → **Settings** → **Source**.
2. Trigger a redeploy or update the repository branch settings.
3. Click **Redeploy**.

All application documents inside MongoDB (`/data/db`) and uploaded media files (`/usr/src/app/uploads`) will remain safe across updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Missing `/data/db` Volume** — If the database volume mounted on `mongo` is deleted or detached, all articles, collections, user records, and settings will be permanently wiped on container restart.
* **Missing `/usr/src/app/uploads` Volume** — If the uploads volume on `codex` is detached, uploaded images and file attachments will disappear during redeployments.
* **Database Readiness Delay** — On initial deployment, if the `codex` container initializes before `mongo` finishes setting up the admin database user, restart the `codex` deployment once MongoDB health checks pass.
* **Auth Password Loss** — Make sure to note your auto-generated `APP_CONFIG_auth_password` from the `codex` variables tab, as it is generated securely at initial deploy time.

---

#### Why Deploy Codex on Railway?

Railway provides an effortless platform for running multi-container stacks. Hosting Codex on Railway gives you private service networking between Node.js and MongoDB, automated SSL certificate generation, persistent storage volumes, auto-generated secret keys, and simple single-click deployments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:4` | Database |
| codex | [OpenSource-Templates/codex](https://github.com/OpenSource-Templates/codex) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | mongo | - | Private hostname used to connect to MongoDB over Railway's private network. |
| `MONGOPORT` | mongo | 27017 | Default port MongoDB listens on. |
| `MONGOUSER` | mongo | - | MongoDB username, linked to the configured root username. |
| `MONGO_URL` | mongo | - | MongoDB connection URL for applications using the MONGO_URL variable. |
| `DATABASE_URL` | mongo | - | MongoDB connection URL provided through the standard DATABASE_URL variable. |
| `MONGOPASSWORD` | mongo | (secret) | MongoDB password, linked to the configured root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Randomly generated 16-character password for the MongoDB root administrator account. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Username for the MongoDB root administrator account. |
| `PORT` | codex | 3000 | Port the application server listens on. |
| `APP_CONFIG_host` | codex | 0.0.0.0 | Binds the application to all network interfaces so it can accept incoming connections. |
| `APP_CONFIG_auth_secret` | codex | (secret) | Randomly generated 32-character secret used to secure authentication sessions and application data. |
| `APP_CONFIG_auth_password` | codex | (secret) | Randomly generated 16-character password used for application authentication. |
| `APP_CONFIG_database_driver` | codex | mongodb | Database driver used by the application to connect to MongoDB. |
| `APP_CONFIG_database_mongodb_uri` | codex | - | MongoDB connection URI using the database service's private Railway hostname and root credentials. |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/uploads`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/codex)
