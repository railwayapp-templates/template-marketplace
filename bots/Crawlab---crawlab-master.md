# Deploy Crawlab on Railway

Crawlab Is a Distributed Web Crawler Admin Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crawlab-master)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/crawlab-master)

### Deploy and Host Crawlab on Railway

**Crawlab** is an open-source, distributed web crawler management platform designed to organize, schedule, execute, and monitor web spiders (Scrapy, Puppeteer, Selenium, Playwright, Python, Golang, Node.js) through a powerful web-based dashboard. This Railway template deploys a two-tier stack featuring the **Crawlab Master Node** (`crawlab-master`) paired with a dedicated **MongoDB Database** (`mongo`).

---

#### About Hosting Crawlab

Hosting Crawlab on Railway deploys a two-container architecture connected via Railway's private network:

* **Crawlab Master Node (`crawlab-master`)**: Core control server running `crawlabteam/crawlab:latest`. It hosts the web administration dashboard, API endpoints, spider task scheduler, and node controller. It listens internally on port `8080` and mounts a persistent volume at `/root/.crawlab` to preserve configuration files, uploaded spiders, and task execution logs.
* **MongoDB Database (`mongo`)**: Document database using `mongo:4.2`. It stores spider metadata, execution results, task logs, cron schedules, user accounts, and system state, with persistent data secured on a volume mounted at `/data/db`.

---

#### Common Use Cases

* **Centralized Web Spider Management**: Upload, configure, run, and monitor Scrapy, Python, Node.js, or custom web crawlers from a single unified web console.
* **Automated Task Scheduling**: Configure cron-like automated schedules for recurring web scraping and data extraction pipelines.
* **Real-time Task Analytics & Log Viewer**: Inspect execution logs, task statuses, success/failure rates, and runtime statistics in real time.
* **Multi-language Scraping Infrastructure**: Execute web crawlers written in Python, Node.js, Go, or shell scripts without maintaining manual server cron jobs or SSH scripts.

---

#### Dependencies for Crawlab Hosting

* **Crawlab Master image:** `crawlabteam/crawlab:latest`
* **MongoDB image:** `mongo:4.2`
* **Two persistent volumes:**
  * `/root/.crawlab` on `crawlab-master`
  * `/data/db` on `mongo`
* **Railway public domain** mapped to port `8080` on `crawlab-master`
* **Auto-generated database secret:** `MONGO_INITDB_ROOT_PASSWORD` (24-character secret)

**Upstream:** [Crawlab Site](https://crawlab.cn) · [GitHub (crawlab-team/crawlab)](https://github.com/crawlab-team/crawlab) · [Docker Hub](https://hub.docker.com/r/crawlabteam/crawlab)

##### Implementation Details

| Service | Image | Role | Web Port / Internal | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **crawlab-master** | `crawlabteam/crawlab:latest` | Master Controller & Web Console | `8080` | `/root/.crawlab` |
| **mongo** | `mongo:4.2` | Document Database Backend | `27017` | `/data/db` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **crawlab-master** | Master Node & Web UI | `/root/.crawlab` | Yes (Port `8080`) | Connects to `mongo` via `${{mongo.RAILWAY_PRIVATE_DOMAIN}}` |
| **mongo** | Database Backend | `/data/db` | TCP Proxy (Port `27017`) | Stores spider state, logs, and credentials |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **crawlab-master** | `/root/.crawlab` | Crawlab workspace settings, spider code uploads, and execution state |
| **mongo** | `/data/db` | MongoDB data directory, collection indexes, task execution history, and user profiles |

> **Warning:** Do **not** remove or detach the persistent volumes mounted at `/root/.crawlab` or `/data/db` — deleting these volumes will result in permanent loss of uploaded spiders, task logs, user credentials, and database records during redeployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 2–3 minutes for both `mongo` and `crawlab-master` services and persistent volumes to provision.
4. Open the **crawlab-master** service → **Settings** → **Networking** and click the generated public domain URL.
5. Log in to the Crawlab dashboard using the default credentials:
   * **Username:** `admin`
   * **Password:** `admin`
6. **Immediately change the default administrator password** under User Settings in the Crawlab web interface.

---

#### Configuration

##### Crawlab Master Variables (`crawlab-master`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `CRAWLAB_NODE_MASTER` | `Y` | Configures container as master node in Crawlab cluster |
| `CRAWLAB_MONGO_HOST` | `${{mongo.RAILWAY_PRIVATE_DOMAIN}}` | Internal private hostname for MongoDB service |
| `CRAWLAB_MONGO_PORT` | `27017` | Internal port for MongoDB connection |
| `CRAWLAB_MONGO_DB` | `crawlab` | Database name used by Crawlab |
| `CRAWLAB_MONGO_USERNAME` | `crawlab` | Database user for Crawlab connection |
| `CRAWLAB_MONGO_PASSWORD` | `${{mongo.MONGO_INITDB_ROOT_PASSWORD}}` | Database password referenced from `mongo` service |
| `CRAWLAB_MONGO_AUTHSOURCE` | `admin` | Authentication database source |
| `PORT` | `8080` | Internal HTTP port the web console listens on |

##### MongoDB Variables (`mongo`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MONGO_INITDB_ROOT_USERNAME` | `crawlab` | Initial root database username |
| `MONGO_INITDB_ROOT_PASSWORD` | Auto-generated secret (24 chars) | Secure password for MongoDB root access |
| `MONGOHOST` | `${{RAILWAY_PRIVATE_DOMAIN}}` | Internal private network host domain |
| `MONGOPORT` | `27017` | Database port inside private network |
| `MONGO_URL` | `mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:27017` | Internal private connection URL |
| `DATABASE_URL` | Same as `MONGO_URL` | Secondary private database connection string |
| `MONGO_PUBLIC_URL` | Connection string via TCP Proxy | External connection URL for remote database tools |

##### Custom Domain

1. Open the **crawlab-master** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and follow Railway’s DNS configuration instructions.
3. Railway provisions TLS automatically.
4. Access your Crawlab console securely at `https://your.custom.domain`.

---

#### Updating Crawlab

1. Open the **crawlab-master** service → **Settings** → **Source**.
2. Update the image tag (e.g., `crawlabteam/crawlab:latest` to a specific release tag).
3. Click **Redeploy**.

All uploaded spider scripts, scheduled jobs, task logs, and user records remain safe inside the `/root/.crawlab` and `/data/db` volumes.

---

#### Traps

**Common pitfalls and failure modes:**

* **Default Login Credentials Vulnerability** — Crawlab boots with default credentials (`admin` / `admin`). Change the admin password immediately upon first login to prevent unauthorized access to your server.
* **Database Startup Timing** — During initial deployment, `crawlab-master` attempts to connect to MongoDB over private networking. If the web console fails to start, wait for `mongo` volume provisioning to finish and redeploy `crawlab-master`.
* **Missing Persistent Volumes** — Detaching or omitting the `/root/.crawlab` or `/data/db` volumes will cause all uploaded spiders, task logs, and database records to reset on container updates.
* **Spider Package Dependencies** — Custom Python (`pip`) or Node.js (`npm`) packages installed directly inside container shells will reset on image redeployments. Include dependencies in spider ZIP bundles or virtual environments saved within `/root/.crawlab`.

---

#### Why Deploy Crawlab on Railway?

Railway provides a seamless, high-availability platform for multi-tier web applications and databases. Deploying Crawlab on Railway gives you private service networking, persistent volume backups, automated HTTPS certificates, and zero-maintenance cloud container execution.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crawlab-master | `crawlabteam/crawlab:latest` | Web service |
| mongo | `mongo:4.2` | Database |
| crawlab-worker | `crawlabteam/crawlab:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | crawlab-master | 8080 | Port the Crawlab server listens on. |
| `CRAWLAB_MONGO_DB` | crawlab-master | crawlab | Name of the MongoDB database used by Crawlab. |
| `CRAWLAB_MONGO_HOST` | crawlab-master | - | Private hostname used by Crawlab to connect to MongoDB over Railway's private network. |
| `CRAWLAB_MONGO_PORT` | crawlab-master | 27017 | Default port MongoDB listens on. |
| `CRAWLAB_NODE_MASTER` | crawlab-master | Y | Enables this Crawlab instance to run as the master node. |
| `CRAWLAB_MONGO_PASSWORD` | crawlab-master | (secret) | MongoDB password retrieved from the connected MongoDB service. |
| `CRAWLAB_MONGO_USERNAME` | crawlab-master | (secret) | MongoDB username Crawlab uses to authenticate with the database. |
| `CRAWLAB_MONGO_AUTHSOURCE` | crawlab-master | admin | MongoDB authentication database used to verify the configured credentials. |
| `MONGOHOST` | mongo | - | Private hostname used to connect to MongoDB over Railway's private network. |
| `MONGOPORT` | mongo | 27017 | Default port MongoDB listens on. |
| `MONGOUSER` | mongo | - | MongoDB username, linked to the configured root username. |
| `MONGO_URL` | mongo | - | Internal MongoDB connection URL for services within Railway. |
| `DATABASE_URL` | mongo | - | MongoDB connection URL provided through the standard DATABASE_URL variable. |
| `MONGODATABASE` | mongo | railway | Name of the MongoDB database used by the application. |
| `MONGOPASSWORD` | mongo | (secret) | MongoDB password, linked to the configured root password. |
| `MONGO_PUBLIC_URL` | mongo | - | Public MongoDB connection URL using Railway's TCP proxy. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Randomly generated 24-character password for the MongoDB root administrator account. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Username for the MongoDB root administrator account. |
| `CRAWLAB_NODE_MASTER` | crawlab-worker | N | Configures this Crawlab instance to run as a worker node instead of a master node. |
| `CRAWLAB_FS_FILER_URL` | crawlab-worker | - | Internal URL used by the worker node to access the Crawlab master's file management API. |
| `CRAWLAB_GRPC_ADDRESS` | crawlab-worker | - | Private gRPC address used by the worker node to communicate with the Crawlab master service. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.crawlab`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/crawlab-master)
