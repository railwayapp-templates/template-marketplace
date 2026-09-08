# Deploy AList on Railway

File browser and WebDAV server for local disks and cloud drives

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alist-webdav)

## About

AList is an open-source file list and WebDAV server written in Go. It puts one browsable web interface in front of storage that would otherwise live in thirty different places: local disk, S3 buckets, SFTP and SMB shares, Google Drive, OneDrive, Dropbox, Mega, Proton Drive and a long list of Chinese cloud drives. Each backend is mounted at a path you choose, so `/Media` can be a bucket and `/Team` a Dropbox folder while readers just see folders. It previews Markdown, code, PDFs, Office documents, images and video in the browser, hands out signed download links, and re-exposes everything over WebDAV.

Self-host AList on Railway and this template gives you the production shape rather than the single-container demo. Three services are wired together before you open the URL: **alist** serves the web UI and API on a public domain with a persistent volume, **Postgres** stores users, storages, settings and shares, and **meilisearch** provides full-text search — switched on and pointed at Meilisearch during the first boot, so nothing is connected by hand.

![AList, Postgres and Meilisearch services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788734151/alist-architecture.png)

AList solves a specific problem: the files that matter end up scattered across personal drives, object storage and old servers, and none of those interfaces are pleasant to share with other people. Self-hosting AList gives you one URL, one permission model and one search box over all of it without copying a byte.

Key features:

- 30+ storage drivers, each mounted at a path you choose
- Browser previews for Markdown, code, PDF, Office documents, images and video
- WebDAV server, so any mount is a drive in Finder, Explorer, Infuse or rclone
- Per-path passwords, per-user base paths, roles and expiring share links
- Signed download URLs, folder packaging and multi-threaded transfer
- Full-text search across storages, with automatic index updates
- A complete REST API, plus optional S3, FTP and SFTP front ends

The Railway architecture is three services. `alist` is the Go binary and the SolidJS UI, with a 5 GB volume at `/opt/alist/data` for configuration, upload staging and the local storage root. `Postgres` replaces the default SQLite file, so your users, mounts and shares live in a database you can back up on its own. `meilisearch` holds the search index on its own volume, with no public domain — it is reachable only over Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meilisearch | `getmeili/meilisearch:v1` | Database |
| alist | [gridalpha/alist-railway](https://github.com/gridalpha/alist-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | meilisearch | 7700 | Port Railway health-checks |
| `MEILI_ENV` | meilisearch | production | Disables the bundled web console |
| `PRIVATE_URL` | meilisearch | http://meilisearch.railway.internal:7700 | Referenced by alist |
| `MEILI_DB_PATH` | meilisearch | /meili_data/data.ms | Index location on the volume |
| `MEILI_DUMP_DIR` | meilisearch | /meili_data/dumps | Dump location on the volume |
| `MEILI_HTTP_ADDR` | meilisearch | [::]:7700 | Dual-family bind for private peers |
| `MEILI_MASTER_KEY` | meilisearch | - | Search API key, read by the server |
| `MEILI_NO_ANALYTICS` | meilisearch | true | Disable usage telemetry |
| `MEILI_SNAPSHOT_DIR` | meilisearch | /meili_data/snapshots | Snapshot location on the volume |
| `MEILI_MAX_INDEXING_MEMORY` | meilisearch | 512 MiB | Cap indexing memory to the quota |
| `MEILI_MAX_INDEXING_THREADS` | meilisearch | 2 | Cap threads to the container quota |
| `MEILI_EXPERIMENTAL_DUMPLESS_UPGRADE` | meilisearch | true | Migrate on-disk format in place |
| `TZ` | alist | UTC | Timezone for listed timestamps |
| `ADDR` | alist | 0.0.0.0 | Listen address |
| `PORT` | alist | 5244 | Port Railway health-checks |
| `DB_HOST` | alist | - | Private Postgres hostname |
| `DB_NAME` | alist | - | Postgres database name |
| `DB_PASS` | alist | - | Postgres password |
| `DB_PORT` | alist | - | Postgres port |
| `DB_TYPE` | alist | postgres | Metadata database driver |
| `DB_USER` | alist | (secret) | Postgres user |
| `SITE_URL` | alist | - | Public base URL for links |
| `HTTP_PORT` | alist | 5244 | Port AList binds |
| `JWT_SECRET` | alist | (secret) | Signs session tokens |
| `LOG_ENABLE` | alist | false | Log to stdout, not the volume |
| `DB_SSL_MODE` | alist | require | TLS to managed Postgres |
| `MEILISEARCH_HOST` | alist | - | Private Meilisearch URL |
| `MEILISEARCH_API_KEY` | alist | (secret) | Meilisearch API key |
| `ALIST_ADMIN_PASSWORD` | alist | (secret) | First admin password, first boot only |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/alist/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/alist-webdav)
