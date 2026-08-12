# Deploy Cloudreve — Self-Hosted Cloud Storage & File Sharing on Railway

Self-host Cloudreve — Google Drive alternative with WebDAV

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudreve-cloud-storage)

## About

Cloudreve is a powerful open-source cloud storage and file-sharing platform — a self-hosted alternative to Google Drive, Dropbox, and Nextcloud, built in Go with a fast React interface. Its standout strength is multi-backend storage: keep files on a local volume or distribute them across S3, Cloudflare R2, Backblaze B2, OneDrive, and more, with WebDAV access, in-browser file preview, multi-user management, and shareable links. This template deploys Cloudreve v4 with PostgreSQL and Redis pre-wired, so you have a private, scalable cloud drive in minutes.

---

Cloudreve v4 is a serious file platform, and a few specifics make it deploy cleanly and scale — all handled here.

**Three services, pre-wired — the setup that's fiddly by hand.** Cloudreve v4 wants PostgreSQL for metadata and Redis for caching and sessions, not the default SQLite, for real performance. This template wires all three over the private network, so you skip the start-order races and connection config that trip up manual deployments and get a production-grade stack from the first deploy.

**Environment config locks in on first boot.** This is the key thing to know: the database and Redis settings you pass as environment variables build Cloudreve's `conf.ini` on first start, and can't be changed later by editing variables. To change core configuration afterward, you redeploy while keeping the same `/cloudreve/data` volume mounted, so your data carries over. Get the connections right at first deploy — this template does.

**Offload large storage to S3 — the smart scaling move.** Cloudreve's best feature for Railway is that it doesn't have to store files on the Railway volume. Point it at an S3-compatible bucket — Cloudflare R2, Backblaze B2, MinIO, AWS S3 — and your files live in cheap object storage while Cloudreve manages them, keeping the Railway volume light. For a large drive, this is far more economical than fat block storage; local volume storage suits smaller or temporary use.

**Create your admin on first visit.** Cloudreve v4 dropped default admin credentials in favor of a signup flow: the first account you register through the web UI becomes the administrator. Open your Railway URL, create that account, then configure storage policies and add users.

**WebDAV, previews, and sharing.** Mount Cloudreve as a network drive over WebDAV from Finder, Windows Explorer, or mobile sync apps; preview and edit documents, images, video, audio, and ePub in the browser; and generate shareable links with permissions. A full Drive replacement, not just storage.

Typical cost: **~$10–15/month** on Railway for the three services, plus object storage if you use S3. Cloudreve Community is GPL-3.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| cloudreve | [Shinyduo/cloudreve-railway](https://github.com/Shinyduo/cloudreve-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | cloudreve | 5212 | - |
| `AWS_SECRET_ACCESS_KEY` | cloudreve | (secret) | - |
| `CR_CONF_Database.Name` | cloudreve | railway | - |
| `CR_CONF_Database.Port` | cloudreve | 5432 | - |
| `CR_CONF_Database.Type` | cloudreve | postgres | - |
| `CR_CONF_Redis.Password` | cloudreve | (secret) | - |
| `CR_CONF_Database.Password` | cloudreve | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/cloudreve/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/cloudreve-cloud-storage)
