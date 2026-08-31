# Deploy PhotoPrism on Railway

AI photo library that tags and searches your pictures

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/photoprism-photos)

## About

PhotoPrism is an AI-powered photo and video library you run yourself. It indexes a folder of originals, generates thumbnails, reads Exif and XMP metadata, and uses on-device TensorFlow models to classify each picture and recognise faces — so a collection that arrived as `IMG_4821.jpg` becomes searchable by subject, place, colour, camera and date. Photographers, families and small teams self-host PhotoPrism to keep a lifetime of pictures out of Google Photos and iCloud while still getting automatic tagging, world maps and albums. It also speaks WebDAV, so Finder, Windows Explorer and sync apps such as PhotoSync upload into it directly.

This template runs PhotoPrism with the database it is designed for. Two services deploy together: **photoprism**, the Go application serving the web interface, API and WebDAV endpoint on port 2342, and **mariadb**, a MariaDB 12.3 server on the private network holding the index — photos, labels, faces, albums, users and sessions. Each service keeps its own volume: the app's holds `originals/`, `import/` and `storage/` (thumbnail cache, sidecar files and scheduled backups), the database's holds the MariaDB data directory. Only the app gets a public domain; the database is reachable solely over the private network, and a login sits in front of every route.

![Diagram of the PhotoPrism and MariaDB services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788089124/photoprism-architecture.png)

PhotoPrism solves the problem of a photo archive that has outgrown folders. It never modifies your originals unless you ask it to, keeps derived data separate, and runs its machine learning locally, so nothing about your pictures leaves the server.

- Automatic labels, face clustering and Exif-based places from bundled TensorFlow models
- Search filters for label, colour, quality, resolution, camera, country and date
- Albums, moments, calendar, folders and shareable links
- RAW conversion, video transcoding, Live Photo and HEIC support
- Built-in WebDAV server for two-way sync with desktop and mobile clients
- Scheduled sidecar and database backups on the app's volume

The **photoprism** service is the whole application: web UI, REST API, background workers, indexer and WebDAV endpoint. The **mariadb** service holds the searchable index. PhotoPrism also runs on SQLite, but SQLite locks under concurrent indexing, which is why the project recommends MariaDB for any library that will grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| photoprism | `photoprism/photoprism:latest` | Web service |
| mariadb | `mariadb:12.3` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | photoprism | 2342 | Port Railway health-checks and routes |
| `PHOTOPRISM_SITE_URL` | photoprism | - | Public URL, trailing slash required |
| `PHOTOPRISM_AUTH_MODE` | photoprism | password | Require login for every route |
| `PHOTOPRISM_HTTP_HOST` | photoprism | 0.0.0.0 | Web server bind address |
| `PHOTOPRISM_HTTP_PORT` | photoprism | 2342 | Web server port inside the container |
| `PHOTOPRISM_LOG_LEVEL` | photoprism | info | Log verbosity |
| `PHOTOPRISM_ADMIN_USER` | photoprism | (secret) | Superadmin username |
| `PHOTOPRISM_SITE_TITLE` | photoprism | PhotoPrism | Title shown in the interface |
| `PHOTOPRISM_DEFAULT_TLS` | photoprism | false | Do not mint a self-signed certificate |
| `PHOTOPRISM_DISABLE_TLS` | photoprism | true | Edge terminates TLS, not the app |
| `PHOTOPRISM_SITE_CAPTION` | photoprism | AI-Powered Photos App | Tagline shown beside the title |
| `PHOTOPRISM_DATABASE_NAME` | photoprism | photoprism | Schema holding the index |
| `PHOTOPRISM_DATABASE_USER` | photoprism | (secret) | Scoped database account |
| `PHOTOPRISM_INDEX_WORKERS` | photoprism | 4 | Parallel indexing workers |
| `PHOTOPRISM_PLACES_LOCALE` | photoprism | local | Language for place names |
| `PHOTOPRISM_TRUSTED_PROXY` | photoprism | 100.64.0.0/10,152.233.0.0/17,fd00::/8 | Railway edge ranges for client IP |
| `PHOTOPRISM_ADMIN_PASSWORD` | photoprism | (secret) | Initial superadmin password |
| `PHOTOPRISM_DEFAULT_LOCALE` | photoprism | en | Interface language |
| `PHOTOPRISM_DATABASE_DRIVER` | photoprism | mysql | MariaDB uses the mysql driver |
| `PHOTOPRISM_DATABASE_SERVER` | photoprism | - | Private database host and port |
| `PHOTOPRISM_HTTP_COMPRESSION` | photoprism | zstd,gzip | Response compression |
| `PHOTOPRISM_DATABASE_PASSWORD` | photoprism | (secret) | Database account password |
| `MARIADB_USER` | mariadb | (secret) | Application account created on first boot |
| `MARIADB_DATABASE` | mariadb | photoprism | Schema created on first boot |
| `MARIADB_PASSWORD` | mariadb | (secret) | Application account password |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Run mariadb-upgrade after a version bump |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Root password, read by the entrypoint |
| `MARIADB_INITDB_SKIP_TZINFO` | mariadb | 1 | Skip loading timezone tables on init |

## Configuration

- **Start command:** `/scripts/cmd.sh /opt/photoprism/bin/photoprism start`
- **Healthcheck:** `/api/v1/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/photoprism`
- **Start command:** `/bin/sh -c 'MAXB=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$MAXB" in ""|max|*[!0-9]*) POOL=1024;; *) POOL=$((MAXB/1024/1024/4));; esac; if [ "$POOL" -lt 256 ]; then POOL=256; fi; if [ "$POOL" -gt 4096 ]; then POOL=4096; fi; echo "mariadb: innodb_buffer_pool_size=${POOL}M"; exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --bind-address=:: --innodb-buffer-pool-size=${POOL}M --transaction-isolation=READ-COMMITTED --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --max-connections=512 --innodb-rollback-on-timeout=OFF --innodb-lock-wait-timeout=120'`
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/photoprism-photos)
