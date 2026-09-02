# Deploy Paperless-ngx — Self-Hosted Document Manager & OCR on Railway

Self-host Paperless-ngx — scan, OCR, tag & search documents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-ngx-documents)

## About

Paperless-ngx is the leading open-source document management system — it scans, OCRs, indexes, tags, and archives your paperwork into a searchable digital archive you fully own. Feed it invoices, receipts, contracts, and letters, and it extracts the text, auto-assigns tags and correspondents, and makes everything full-text searchable. This template deploys Paperless-ngx with PostgreSQL, Redis, an admin account, and — critically — persistent storage for your documents, so your archive is live and your scans are safe, in minutes.

---

Paperless-ngx is a multi-service app, and one persistence detail is the difference between a safe archive and lost documents — this template handles it, along with the security and wiring.

**Persist the document storage — or lose your scans.** This is the critical point: Paperless writes your original files and archived PDFs to `/usr/src/paperless/media`, and its search index and config to `/usr/src/paperless/data`. Many Paperless templates don't mount a volume for these by default, so documents vanish on redeploy. This template mounts persistent storage for both, so every scan you archive is safe across redeploys and updates.

**`PAPERLESS_SECRET_KEY` is mandatory for security.** Paperless uses `PAPERLESS_SECRET_KEY` (a long random string) to sign authentication — its own docs warn that failing to set a proper secret lets third parties forge login credentials. This template generates a strong key, so your archive is secured from the first deploy.

**Redis and Postgres aren't optional — they're the engine.** Paperless queues every OCR job through Redis (a Celery task broker) so the UI stays responsive while documents process in the background, and stores all metadata and the full-text index in PostgreSQL, which handles indexing and concurrent writes far better than SQLite. This template wires both, so OCR and search work out of the box.

**Your admin account is created for you.** `PAPERLESS_ADMIN_USER` and `PAPERLESS_ADMIN_PASSWORD` bootstrap your administrator on first boot, so you skip the manual `createsuperuser` command that trips up manual installs. Set `PAPERLESS_URL` to your Railway domain so links resolve.

**OCR is CPU-intensive — size for your volume.** Text extraction (Tesseract OCR) is genuinely CPU-heavy, so large archives or many concurrent uploads benefit from more CPU and RAM. A personal archive runs fine on a modest plan; for bulk imports of thousands of documents, scale the resources. Set `PAPERLESS_OCR_LANGUAGE` to your document language for accurate extraction.

Typical cost: **~$10–15/month** on Railway for the three services, plus storage that grows with your archive (roughly 1–10 MB per document). Paperless-ngx is GPL-3.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Paperless-ngx | `paperlessngx/paperless-ngx:latest` | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Paperless-ngx | 8000 | HTTP server listening port |
| `PAPERLESS_URL` | Paperless-ngx | - | Public URL for CORS and links |
| `PAPERLESS_REDIS` | Paperless-ngx | - | Redis connection for Celery task queue |
| `PAPERLESS_DBHOST` | Paperless-ngx | - | PostgreSQL host address |
| `PAPERLESS_DBNAME` | Paperless-ngx | - | PostgreSQL database name |
| `PAPERLESS_DBPASS` | Paperless-ngx | - | PostgreSQL password |
| `PAPERLESS_DBPORT` | Paperless-ngx | - | PostgreSQL port |
| `PAPERLESS_DBUSER` | Paperless-ngx | - | PostgreSQL username |
| `PAPERLESS_DATA_DIR` | Paperless-ngx | /data/data | Application data directory |
| `PAPERLESS_TIME_ZONE` | Paperless-ngx | UTC | Container timezone |
| `PAPERLESS_ADMIN_MAIL` | Paperless-ngx | - | Create Superuser email address |
| `PAPERLESS_ADMIN_USER` | Paperless-ngx | (secret) | Create Superuser username |
| `PAPERLESS_MEDIA_ROOT` | Paperless-ngx | /data/media | Document storage directory |
| `PAPERLESS_SECRET_KEY` | Paperless-ngx | (secret) | Django secret key for sessions |
| `PAPERLESS_OCR_LANGUAGE` | Paperless-ngx | eng | Default OCR language |
| `PAPERLESS_ADMIN_PASSWORD` | Paperless-ngx | (secret) | Create Superuser password |
| `PAPERLESS_CONSUMPTION_DIR` | Paperless-ngx | /data/consume | Document intake directory |
| `REDISHOST` | Redis | - | REDISHOST |
| `REDISPORT` | Redis | 6379 | REDISPORT |
| `REDISUSER` | Redis | default | REDISUSER |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | REDIS_PASSWORD |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/paperless-ngx-documents)
