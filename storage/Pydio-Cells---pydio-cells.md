# Deploy Pydio Cells on Railway

SharePoint alternative. Open-source document sharing and collaboration

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pydio-cells)

## About

Pydio Cells is an open-source document sharing and collaboration platform that gives an organisation its own file service instead of renting one. Teams use it the way they would use SharePoint, Google Drive or Dropbox Business — shared workspaces, per-folder permissions, versioning, activity feeds, expiring share links, desktop sync and WebDAV — except every byte stays on infrastructure you control. It ships under AGPL-3.0 and is aimed at the case where fine-grained access control and an audit trail matter more than a large app marketplace.

Deploy Pydio Cells on Railway and this template wires up the three pieces it needs in production. The **Cells** service runs the official `pydio/cells` image behind Railway's TLS edge and stores documents on a persistent volume at `/var/cells`. **PostgreSQL** holds users, roles, ACLs, workspaces and the datasource index. **MongoDB** is the document store: activity streams, server logs, file versions and the search index live there rather than in embedded database files, which is what Pydio recommends beyond a trial. Browser traffic reaches only the Cells service; both databases stay private.

![Pydio Cells Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786896073/b88f1484-fdc9-4409-aca5-068378018699.png)

Most self-hosted file platforms are built around syncing a folder. Pydio Cells is built around *governing* documents: who may see what, who did what, and how a file changed. That makes it a common choice in regulated settings — legal, healthcare, public sector, engineering — where a share link needs an expiry date and an auditor needs to see who downloaded it.

Key features:

- **Workspaces and cells** — publish folders to groups, then build shared spaces drawing from several workspaces at once
- **Granular permissions** — read/write/deny rules per role, group, user and path
- **Public links** — password-protected, expiring, download-limited links for outside collaborators
- **Versioning and recycle bin** — a full version history per file, on its own datasource
- **Sync and access** — desktop sync client, mobile apps, WebDAV and an S3-compatible gateway
- **Activity and audit** — activity streams, notifications and searchable server logs

The container runs the whole Cells microservice mesh under one supervisor with an embedded proxy in front, so nothing needs splitting across services. The volume holds configuration, the encryption keyring and the document bytes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cells | [gridalpha/pydio-cells-railway](https://github.com/gridalpha/pydio-cells-railway) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | cells | 8080 | Port the Cells site listens on |
| `DB_HOST` | cells | - | PostgreSQL private hostname |
| `DB_NAME` | cells | - | PostgreSQL database name |
| `DB_PORT` | cells | - | PostgreSQL port |
| `DB_USER` | cells | (secret) | PostgreSQL username |
| `MONGO_DSN` | cells | - | Document store connection string |
| `DB_PASSWORD` | cells | (secret) | PostgreSQL password |
| `CELLS_ADMIN_LOGIN` | cells | (secret) | First administrator username |
| `CELLS_LOG_TO_FILE` | cells | false | Send logs to stdout, not the volume |
| `CELLS_ADMIN_PASSWORD` | cells | (secret) | First administrator password, first boot only |
| `CELLS_APPLICATION_TITLE` | cells | Pydio Cells | Application title in the interface |
| `MONGOHOST` | MongoDB | - | Private hostname, reachable only inside the project |
| `MONGOPORT` | MongoDB | 27017 | Standard MongoDB port |
| `MONGOUSER` | MongoDB | - | Convenience alias of the root username |
| `MONGO_URL` | MongoDB | - | Private connection string, no database path — append /<db>?authSource=admin |
| `MONGOPASSWORD` | MongoDB | (secret) | Convenience alias of the root password |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public connection string over the TCP proxy, for external tools |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Generated root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot, lives in the admin database |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/cells`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pydio-cells)
