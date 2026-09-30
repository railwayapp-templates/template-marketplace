# Deploy Coral on Railway

Discussions, Journalist Identification, Moderation Tools with AI Support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coral)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/coral)

### Deploy and Host Coral Project (Talk) on Railway

**Coral** (formerly Coral Project Talk) is an open-source, highly scalable commenting platform built for newsrooms, blogs, and online communities. This Railway template provisions a full three-tier stack comprising the **Coral Talk** web and API server (`coral`), a **MongoDB** database (`mongo`), and a **Redis** in-memory cache and pub/sub engine (`redis`).

---

#### About Hosting Coral

Hosting Coral Project on Railway deploys a robust multi-container architecture:

* **Coral Talk Server (`coral`)**: Core web and API application running `coralproject/talk:9.7.0`. It listens internally on port `3000`, serving comment streams, moderation tools, and community administration interfaces. It connects seamlessly to MongoDB and Redis via Railway private networking (`${{mongo.MONGO_URL}}` and `${{redis.REDIS_URL}}`).
* **MongoDB Database (`mongo`)**: Document store running `mongo:4` that holds user accounts, comment threads, moderation flags, and site configurations. It mounts a persistent storage volume at `/data/db` and provides TCP proxying for external database management.
* **Redis Cache & Pub/Sub (`redis`)**: In-memory data store running `redis:6` used for real-time comment streaming, session caching, and background task queues. It mounts a persistent storage volume at `/data` to maintain state across deployments.

---

#### Common Use Cases

* **Engaging newsroom comment streams**: Embed fast, real-time comment sections onto articles, blog posts, and media publications.
* **AI-assisted & human moderation**: Streamline comment review with automated toxicity filters, word blocklists, user reporting, and moderator workflows.
* **Community building & user management**: Reward constructive commenters, badge staff members, manage user bans, and track user engagement metrics.
* **Data privacy & ownership**: Retain full control over reader discussions and user data on self-hosted infrastructure rather than third-party widgets.

---

#### Dependencies for Coral Hosting

* **Coral Talk image:** `coralproject/talk:9.7.0`
* **MongoDB image:** `mongo:4`
* **Redis image:** `redis:6`
* **Two persistent volumes**:
  * `/data/db` mounted on the `mongo` service
  * `/data` mounted on the `redis` service
* **Railway public domain** attached to port `3000` for `coral`
* **Auto-generated secrets**: `SIGNING_SECRET` (45 chars), `MONGO_INITDB_ROOT_PASSWORD` (16 chars), and `REDIS_PASSWORD` (32 chars)

**Upstream:** [Coral Project Site](https://coralproject.net) · [GitHub (coralproject/talk)](https://github.com/coralproject/talk)

##### Implementation Details

| Service | Image | Role | Internal Port | Volume Mount |
| ------ | ------ | ------ | ------ | ------ |
| **coral** | `coralproject/talk:9.7.0` | Core Web Server & API | `3000` | None |
| **mongo** | `mongo:4` | Primary Document Database | `27017` | `/data/db` |
| **redis** | `redis:6` | Cache & Real-Time Pub/Sub | `6379` | `/data` |

---

#### Topology

| Service | Role | Volume | Public | Notes |
| ------ | ------ | ------ | ------ | ------ |
| **coral** | Commenting Server & Admin UI | None | Yes (Port `3000`) | Main entry point for readers & admins |
| **mongo** | MongoDB Data Store | `/data/db` | TCP Proxy (`27017`) | Holds comments, users & site configs |
| **redis** | Session & Real-Time Cache | `/data` | TCP Proxy (`6379`) | Manages pub/sub events & task queues |

###### Volumes (drives) — what to mount

| Service | Mount path | What is stored |
| ------ | ------ | ------ |
| **mongo** | `/data/db` | MongoDB BSON files, collections, indices, user accounts, and comment records |
| **redis** | `/data` | Redis append-only file (AOF) / RDB persistence snapshots for queues and session cache |

> **Warning:** Do **not** remove or detach the persistent volumes mounted on `mongo` (`/data/db`) or `redis` (`/data`) — deleting these volumes will result in permanent loss of comments, user accounts, and moderation history across deployments.

---

#### Quick Start

1. Click the **[Deploy on Railway](https://railway.com/deploy)** button above.
2. Sign in (or create a free Railway account) and click **Deploy**.
3. Wait 2–3 minutes for `mongo`, `redis`, and `coral` services and persistent volumes to provision.
4. Open the **coral** service → **Settings** → **Networking** and click the generated public domain URL.
5. Access the Coral initial wizard at `https://your-domain.up.railway.app/admin/install` (or follow on-screen setup prompts) to configure your organization, initial admin user, and allowed domain origins.

---

#### Configuration

##### Coral Application Variables (`coral`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MONGODB_URI` | `${{mongo.MONGO_URL}}` | MongoDB connection string provided via private network |
| `REDIS_URI` | `${{redis.REDIS_URL}}` | Redis connection string provided via private network |
| `SIGNING_SECRET` | Auto-generated secret (45 chars) | Secret key for signing JWT tokens and authentication sessions |
| `NODE_ENV` | `production` | Node execution environment |
| `PORT` | `3000` | HTTP port the Coral server listens on |

##### MongoDB Database Variables (`mongo`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `MONGODB_DATABASE` | `railway` | Default database name |
| `MONGO_INITDB_ROOT_USERNAME` | `${MONGO_USER}` | MongoDB root administrative user |
| `MONGO_INITDB_ROOT_PASSWORD` | Auto-generated secret (16 chars) | MongoDB root administrative password |
| `MONGO_URL` | `mongodb://${{MONGO_INITDB_ROOT_USERNAME}}:${{MONGO_INITDB_ROOT_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:27017` | Internal private MongoDB connection URL |
| `MONGO_PUBLIC_URL` | TCP Proxy connection URL | External URL for database management tools |

##### Redis Cache Variables (`redis`)

| Variable | Default / Source | Description / Notes |
| ------ | ------ | ------ |
| `REDISUSER` | `default` | Default Redis user |
| `REDIS_PASSWORD` | Auto-generated secret (32 chars) | Redis authentication password |
| `REDIS_URL` | `redis://default:${{REDIS_PASSWORD}}@${{RAILWAY_PRIVATE_DOMAIN}}:6379` | Internal private Redis connection string |
| `REDIS_PUBLIC_URL` | TCP Proxy connection URL | External connection URL for Redis tools |

##### Custom Domain & CORS Origin Setup

1. Open the **coral** service → **Settings** → **Networking** → **Custom Domain**.
2. Add your custom domain and complete DNS setup.
3. In the Coral Admin UI under **Configure** → **Permitted Domains**, add your embedding website's domain name so Coral comment streams can render cross-origin.

---

#### Updating Coral

1. Open the **coral** service → **Settings** → **Source**.
2. Update the image tag (e.g., `coralproject/talk:9.7.0` to a newer release tag).
3. Click **Redeploy**.

Database records in `/data/db` and cache state in `/data` will remain safe across updates.

---

#### Traps

**Common pitfalls and failure modes:**

* **Unpermitted Domain Embedding (CORS Errors)** — Coral enforces domain checks for embedded comment streams. If your embedding site URL is not added to Coral's allowed domains in the admin console, comment streams will fail to load.
* **Volume Detachment Data Loss** — Detaching or deleting the `/data/db` volume on the `mongo` service will erase all comments, user profiles, and moderation logs.
* **Database / Cache Startup Race Condition** — On cold deploys, `coral` requires `mongo` and `redis` to accept connections. If `coral` starts before MongoDB or Redis is fully initialized, wait for healthchecks to settle and trigger a quick redeploy on `coral`.
* **Missing SIGNING_SECRET Rotation Notice** — Changing `SIGNING_SECRET` invalidates active user sessions and admin login cookies across your community.

---

#### Why Deploy Coral on Railway?

Railway provides seamless multi-tier container orchestration, automated private service networking, persistent storage mounts, and SSL certificates out of the box. Hosting Coral on Railway gives newsrooms and community managers a scalable, zero-maintenance commenting platform that stays online 24/7.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo | `mongo:4` | Database |
| coral | `coralproject/talk:9.7.0` | Web service |
| redis | `redis:6` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | mongo | - | Private hostname used to connect to MongoDB over Railway's private network. |
| `MONGOPORT` | mongo | 27017 | Default port MongoDB listens on. |
| `MONGOUSER` | mongo | - | MongoDB username, linked to the configured root username. |
| `MONGO_URL` | mongo | - | Internal MongoDB connection URL for services within Railway. |
| `DATABASE_URL` | mongo | - | MongoDB connection URL provided through the standard DATABASE_URL variable. |
| `MONGODATABASE` | mongo | railway | Name of the MongoDB database used by the application. |
| `MONGOPASSWORD` | mongo | (secret) | MongoDB password, linked to the configured root password. |
| `MONGO_PUBLIC_URL` | mongo | - | Public MongoDB connection URL using Railway's TCP proxy. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Randomly generated 16-character password for the MongoDB root administrator account. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | Username for the MongoDB root administrator account. |
| `PORT` | coral | 3000 | Port the application server listens on. |
| `NODE_ENV` | coral | production | Sets the Node.js environment to production mode. |
| `REDIS_URI` | coral | - | Redis connection URL provided by the connected Redis service. |
| `MONGODB_URI` | coral | - | MongoDB connection URL provided by the connected MongoDB service. |
| `SIGNING_SECRET` | coral | (secret) | Randomly generated 45-character secret used to sign and secure application data. |
| `REDISHOST` | redis | - | Private hostname used to connect to Redis over Railway's private network. |
| `REDISPORT` | redis | 6379 | Default port Redis listens on. |
| `REDISUSER` | redis | default | Redis username used to authenticate with the Redis server. |
| `REDIS_URL` | redis | - | Internal Redis connection URL for services within Railway. |
| `REDISPASSWORD` | redis | (secret) | Redis password, linked to the configured REDIS_PASSWORD variable. |
| `REDIS_PASSWORD` | redis | (secret) | Randomly generated 32-character password used to secure the Redis server. |
| `REDIS_PUBLIC_URL` | redis | - | Public Redis connection URL using Railway's TCP proxy. |

## Configuration

- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/coral)
