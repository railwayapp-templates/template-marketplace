# Deploy AFFiNE — Self-Hosted Notion & Miro Alternative on Railway

Self-host AFFiNE — docs, whiteboards & databases in one canvas

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/affine-workspace)

## About

AFFiNE is an open-source, all-in-one workspace that combines documents, whiteboards, and databases on a single canvas — a privacy-first, self-hostable alternative to Notion and Miro (with a bit of Linear). Write docs, sketch on an infinite whiteboard, and build databases and Kanban boards, all in one tool, on infrastructure you own. This template deploys AFFiNE with PostgreSQL, Redis, and the required migration step wired as a pre-deploy — so the database is migrated before the app starts and your workspace comes up clean on the first deploy.

---

AFFiNE is a capable multi-service app, and a couple of specifics decide whether it deploys cleanly — both handled here.

**The migration must run before the server — handled as a pre-deploy.** AFFiNE ships a separate migration step (`self-host-predeploy.js`) that has to complete *before* the main server starts; if the server boots against an unmigrated database, it fails. This template runs that migration as Railway's pre-deploy command, so the schema is prepared first and the server comes up cleanly — this is the "auto migrations" that make upgrades and first deploys reliable instead of manual.

**Three services, wired over the private network.** AFFiNE needs PostgreSQL for data and Redis for caching and real-time collaboration, connected through `DATABASE_URL` and `REDIS_SERVER_HOST`. This template wires all three via Railway references — and uses a current Railway environment so Redis's internal networking resolves correctly (a known requirement for AFFiNE's backend to find Redis).

**Set the external URL to your domain.** `AFFINE_SERVER_EXTERNAL_URL` must be your Railway (or custom) public domain, or shared links, invitations, and internal navigation resolve to the wrong host. This template wires it to your domain so links and sharing work correctly from the start.

**Create your admin at `/admin`.** After deploy, open your Railway URL at `/admin` to create the first administrator account, which owns the instance. From there, invite your team and start creating workspaces, docs, and whiteboards.

**Your data and uploads persist.** Documents, workspaces, and users live in PostgreSQL, while uploaded files and configuration live on volumes at AFFiNE's storage and config paths — all surviving redeploys. PostgreSQL and blob storage are the components to back up.

**One canvas, three tools.** AFFiNE's edge is that docs, whiteboards, and databases aren't separate apps — a page can be a document, an infinite canvas, or a table view of the same content, so you plan, write, and diagram in one place, without switching tools or paying two subscriptions.

Typical cost: **~$10–15/month** on Railway for the three services — a solo workspace fits comfortably in about 1 GB RAM, while teams with many concurrent editors should raise the server and Postgres memory. AFFiNE is free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |
| Redis | `redis:8.2` | Database |
| Affine | `ghcr.io/toeverything/affine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | railway | Name of the database created on startup. |
| `DATABASE_URL` | pgvector | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | PGHOST_PRIVATE |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string for internal services. |
| `REDISHOST` | Redis | - | Host |
| `REDISPORT` | Redis | 6379 | Port |
| `REDISUSER` | Redis | default | User |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Password |
| `REDIS_PASSWORD` | Redis | (secret) | Password |
| `PORT` | Affine | 3010 | HTTP port Railway routes traffic to |
| `NODE_ENV` | Affine | production | Node.js runtime mode |
| `DATABASE_URL` | Affine | - | Postgres connection string |
| `REDIS_SERVER_HOST` | Affine | - | Redis private hostname |
| `REDIS_SERVER_PORT` | Affine | 6379 | Redis port |
| `REDIS_SERVER_USER` | Affine | (secret) | Redis AUTH username |
| `AFFINE_ADMIN_EMAIL` | Affine | - | Create Bootstrap admin email |
| `AFFINE_CONFIG_PATH` | Affine | /root/.affine/config | Config directory inside volume |
| `AFFINE_SERVER_HOST` | Affine | 0.0.0.0 | Bind to all interfaces inside container |
| `AFFINE_SERVER_PORT` | Affine | 3010 | Internal listener port |
| `AFFINE_SERVER_HTTPS` | Affine | false | Railway edge terminates TLS |
| `AFFINE_ADMIN_PASSWORD` | Affine | (secret) | Create Admin password (alteast 1 uppercase + 2 digits + 2 specials) |
| `REDIS_SERVER_PASSWORD` | Affine | (secret) | Redis AUTH password |
| `AFFINE_INDEXER_ENABLED` | Affine | false | Disable search indexer (needs Manticore/ES) |
| `AFFINE_SERVER_EXTERNAL_URL` | Affine | - | Public-facing app URL |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.affine`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/affine-workspace)
