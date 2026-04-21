# Deploy AppFlowy | Open Source AI Collaborative Workspace, Notion Alternative on Railway

Self Host AppFlowy. AI workspace with docs, databases, kanban boards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appflowy)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/appflowy?referralCode=QXdhdr)

AppFlowy is an open-source, AI-powered collaborative workspace that gives teams full control over their data while delivering Notion-like functionality — documents, databases, kanban boards, calendars, and real-time collaboration. Deploy AppFlowy on Railway to self-host a complete workspace stack with PostgreSQL (pgvector), Redis, MinIO object storage, GoTrue authentication, and an Nginx reverse proxy — all pre-configured and ready to use.

Self-host AppFlowy on Railway and eliminate per-user SaaS fees while keeping your team's documents, databases, and project boards under your own infrastructure. This template deploys eight interconnected services: AppFlowy Cloud (API server), AppFlowy Web (browser UI), AppFlowy Worker (background jobs), GoTrue (authentication), PostgreSQL with pgvector, Redis, MinIO, and Nginx.

![AppFlowy Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776705744/Appflowy-railway-architecture_a6cc0n.png)

AppFlowy is an open-source project (AGPL-3.0) built with Flutter and Rust, designed as a privacy-first alternative to Notion. It provides a rich block-based editor with slash commands, nested pages, and multi-view databases (Grid, Board, Calendar, Gallery). The platform supports offline-first usage — the desktop app writes to local SQLite and syncs when the cloud is reachable.

Key features of self-hosted AppFlowy include:

- **Real-time collaboration** with WebSocket-based sync across all connected clients
- **Multi-view databases** — Grid, Board (Kanban), Calendar, and Gallery views with formula columns, multi-select fields, and filters
- **AI integration** — plug in OpenAI, Claude, or local models (Mistral, Llama) for writing assistance and summarization
- **Cross-platform clients** — Windows, macOS, Linux, iOS, Android, and web browser
- **Full data ownership** — all data stored in your PostgreSQL instance and MinIO object storage
- **Offline-first architecture** — desktop apps work without network and sync when reconnected

The architecture uses Nginx as a reverse proxy routing traffic to specialized backend services, with GoTrue (a Supabase Auth fork) handling authentication via JWT tokens.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nginx | `nginx:latest` | Web service |
| MinIO | `minio/minio:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| pgvector | `pgvector/pgvector:pg18` | Web service |
| AppFlowy-Web | `appflowyinc/appflowy_web:latest` | Worker |
| AppFlowy-Cloud | `appflowyinc/appflowy_cloud:latest` | Worker |
| GoTrue | `appflowyinc/gotrue:latest` | Worker |
| AppFlowy-Worker | `appflowyinc/appflowy_worker:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Nginx | 80 | Nginx listen port |
| `WEB_HOST` | Nginx | - | Web frontend internal host |
| `CLOUD_HOST` | Nginx | - | API service internal host |
| `MINIO_HOST` | Nginx | - | MinIO internal host |
| `GOTRUE_HOST` | Nginx | - | Auth service internal host |
| `NGINX_CONFIG_B64` | Nginx | ZXZlbnRzIHsKICAgIHdvcmtlcl9jb25uZWN0aW9ucyAxMDI0Owp9CgpodHRwIHsKICAgIHJlc29sdmVyIF9fUkVTT0xWRVJfXyB2YWxpZD0xMHMgaXB2Nj1vZmY7CgogICAgbWFwICRodHRwX3VwZ3JhZGUgJGNvbm5lY3Rpb25fdXBncmFkZSB7CiAgICAgICAgZGVmYXVsdCB1cGdyYWRlOwogICAgICAgICcnIGNsb3NlOwogICAgfQoKICAgIHNlcnZlciB7CiAgICAgICAgbGlzdGVuIDgwOwogICAgICAgIGNsaWVudF9tYXhfYm9keV9zaXplIDEwTTsKICAgICAgICB1bmRlcnNjb3Jlc19pbl9oZWFkZXJzIG9uOwoKICAgICAgICBsb2NhdGlvbiAvZ290cnVlLyB7CiAgICAgICAgICAgIHNldCAkZ290cnVlX3Vwc3RyZWFtIF9fR09UUlVFX0hPU1RfXzo5OTk5OwogICAgICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly8kZ290cnVlX3Vwc3RyZWFtOwogICAgICAgICAgICByZXdyaXRlIF4vZ290cnVlKC8uKikkICQxIGJyZWFrOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGh0dHBfaG9zdDsKICAgICAgICAgICAgcHJveHlfcGFzc19yZXF1ZXN0X2hlYWRlcnMgb247CiAgICAgICAgfQoKICAgICAgICBsb2NhdGlvbiAvd3MgewogICAgICAgICAgICBzZXQgJGNsb3VkX3Vwc3RyZWFtIF9fQ0xPVURfSE9TVF9fOjgwMDA7CiAgICAgICAgICAgIHByb3h5X3Bhc3MgaHR0cDovLyRjbG91ZF91cHN0cmVhbTsKICAgICAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBVcGdyYWRlICRodHRwX3VwZ3JhZGU7CiAgICAgICAgICAgIHByb3h5X3NldF9oZWFkZXIgQ29ubmVjdGlvbiAiVXBncmFkZSI7CiAgICAgICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLUZvciAkcHJveHlfYWRkX3hfZm9yd2FyZGVkX2ZvcjsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byAkc2NoZW1lOwogICAgICAgICAgICBwcm94eV9yZWFkX3RpbWVvdXQgODY0MDBzOwogICAgICAgIH0KCiAgICAgICAgbG9jYXRpb24gL2FwaSB7CiAgICAgICAgICAgIHNldCAkY2xvdWRfdXBzdHJlYW0gX19DTE9VRF9IT1NUX186ODAwMDsKICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJGNsb3VkX3Vwc3RyZWFtOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVxdWVzdC1JZCAkcmVxdWVzdF9pZDsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBIb3N0ICRodHRwX2hvc3Q7CgogICAgICAgICAgICBsb2NhdGlvbiB+KiBeL2FwaS93b3Jrc3BhY2UvKFthLXpBLVowLTlfLV0rKS9wdWJsaXNoJCB7CiAgICAgICAgICAgICAgICBzZXQgJGNsb3VkX3Vwc3RyZWFtMiBfX0NMT1VEX0hPU1RfXzo4MDAwOwogICAgICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJGNsb3VkX3Vwc3RyZWFtMjsKICAgICAgICAgICAgICAgIHByb3h5X3JlcXVlc3RfYnVmZmVyaW5nIG9mZjsKICAgICAgICAgICAgICAgIGNsaWVudF9tYXhfYm9keV9zaXplIDI1Nk07CiAgICAgICAgICAgIH0KCiAgICAgICAgICAgIGxvY2F0aW9uIC9hcGkvY2hhdCB7CiAgICAgICAgICAgICAgICBzZXQgJGNsb3VkX3Vwc3RyZWFtMyBfX0NMT1VEX0hPU1RfXzo4MDAwOwogICAgICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJGNsb3VkX3Vwc3RyZWFtMzsKICAgICAgICAgICAgICAgIHByb3h5X2h0dHBfdmVyc2lvbiAxLjE7CiAgICAgICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIENvbm5lY3Rpb24gIiI7CiAgICAgICAgICAgICAgICBjaHVua2VkX3RyYW5zZmVyX2VuY29kaW5nIG9uOwogICAgICAgICAgICAgICAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICAgICAgICAgICAgICAgIHByb3h5X2NhY2hlIG9mZjsKICAgICAgICAgICAgICAgIHByb3h5X3JlYWRfdGltZW91dCA2MDBzOwogICAgICAgICAgICAgICAgcHJveHlfY29ubmVjdF90aW1lb3V0IDYwMHM7CiAgICAgICAgICAgICAgICBwcm94eV9zZW5kX3RpbWVvdXQgNjAwczsKICAgICAgICAgICAgfQoKICAgICAgICAgICAgbG9jYXRpb24gL2FwaS9pbXBvcnQgewogICAgICAgICAgICAgICAgc2V0ICRjbG91ZF91cHN0cmVhbTQgX19DTE9VRF9IT1NUX186ODAwMDsKICAgICAgICAgICAgICAgIHByb3h5X3Bhc3MgaHR0cDovLyRjbG91ZF91cHN0cmVhbTQ7CiAgICAgICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVxdWVzdC1JZCAkcmVxdWVzdF9pZDsKICAgICAgICAgICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaHR0cF9ob3N0OwogICAgICAgICAgICAgICAgcHJveHlfcmVhZF90aW1lb3V0IDYwMHM7CiAgICAgICAgICAgICAgICBwcm94eV9jb25uZWN0X3RpbWVvdXQgNjAwczsKICAgICAgICAgICAgICAgIHByb3h5X3NlbmRfdGltZW91dCA2MDBzOwogICAgICAgICAgICAgICAgcHJveHlfcmVxdWVzdF9idWZmZXJpbmcgb2ZmOwogICAgICAgICAgICAgICAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICAgICAgICAgICAgICAgIHByb3h5X2NhY2hlIG9mZjsKICAgICAgICAgICAgICAgIGNsaWVudF9tYXhfYm9keV9zaXplIDJHOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBsb2NhdGlvbiAvbWluaW8tYXBpLyB7CiAgICAgICAgICAgIHNldCAkbWluaW9fdXBzdHJlYW0gX19NSU5JT19IT1NUX186OTAwMDsKICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJG1pbmlvX3Vwc3RyZWFtOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgX19NSU5JT19IT1NUX186OTAwMDsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLUZvciAkcHJveHlfYWRkX3hfZm9yd2FyZGVkX2ZvcjsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byAkc2NoZW1lOwogICAgICAgICAgICByZXdyaXRlIF4vbWluaW8tYXBpLyguKikgLyQxIGJyZWFrOwogICAgICAgICAgICBwcm94eV9jb25uZWN0X3RpbWVvdXQgMzAwczsKICAgICAgICAgICAgcHJveHlfcmVhZF90aW1lb3V0IDYwMHM7CiAgICAgICAgICAgIHByb3h5X3NlbmRfdGltZW91dCA2MDBzOwogICAgICAgICAgICBwcm94eV9yZXF1ZXN0X2J1ZmZlcmluZyBvZmY7CiAgICAgICAgICAgIHByb3h5X2h0dHBfdmVyc2lvbiAxLjE7CiAgICAgICAgICAgIHByb3h5X3NldF9oZWFkZXIgQ29ubmVjdGlvbiAiIjsKICAgICAgICAgICAgY2h1bmtlZF90cmFuc2Zlcl9lbmNvZGluZyBvZmY7CiAgICAgICAgICAgIGNsaWVudF9tYXhfYm9keV9zaXplIDA7CiAgICAgICAgfQoKICAgICAgICBsb2NhdGlvbiAvYWkvIHsKICAgICAgICAgICAgc2V0ICRjbG91ZF91cHN0cmVhbTUgX19DTE9VRF9IT1NUX186ODAwMDsKICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJGNsb3VkX3Vwc3RyZWFtNTsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlcXVlc3QtSWQgJHJlcXVlc3RfaWQ7CiAgICAgICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaHR0cF9ob3N0OwogICAgICAgIH0KCiAgICAgICAgbG9jYXRpb24gLyB7CiAgICAgICAgICAgIHNldCAkd2ViX3Vwc3RyZWFtIF9fV0VCX0hPU1RfXzo4MDsKICAgICAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJHdlYl91cHN0cmVhbTsKICAgICAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVNjaGVtZSAkc2NoZW1lOwogICAgICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgICAgICAgfQogICAgfQp9Cg== | Base64 of the full Nginx config. Feel free to update this to another base64 string |
| `PORT` | MinIO | 9001 | Railway domain routing port |
| `MINIO_ROOT_USER` | MinIO | (secret) | Admin console and API username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Admin console and API password |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | pgvector | railway | Name of the database created on startup. |
| `DATABASE_URL` | pgvector | - | Full public connection string for Postgres. |
| `POSTGRES_USER` | pgvector | (secret) | Postgres superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private internal domain for Postgres in Railway. |
| `PGPORT_PRIVATE` | pgvector | 5432 | Private internal port for Postgres. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Full private connection string for internal services. |
| `APPFLOWY_BASE_URL` | AppFlowy-Web | - | Public base URL |
| `APPFLOWY_WS_BASE_URL` | AppFlowy-Web | - | WebSocket URL |
| `APPFLOWY_GOTRUE_BASE_URL` | AppFlowy-Web | - | Public auth URL |
| `PORT` | AppFlowy-Cloud | 8000 | API listen port |
| `RUST_LOG` | AppFlowy-Cloud | info | Log level |
| `REDIS_HOST` | AppFlowy-Cloud | - | Redis internal host (legacy convenience) |
| `REDIS_PORT` | AppFlowy-Cloud | 6379 | Redis port |
| `POSTGRES_DB` | AppFlowy-Cloud | - | Postgres database name |
| `POSTGRES_HOST` | AppFlowy-Cloud | - | Postgres internal host (legacy convenience) |
| `POSTGRES_PORT` | AppFlowy-Cloud | 5432 | Postgres port |
| `POSTGRES_USER` | AppFlowy-Cloud | (secret) | Postgres user |
| `APPFLOWY_WEB_URL` | AppFlowy-Cloud | - | Public web URL |
| `POSTGRES_PASSWORD` | AppFlowy-Cloud | (secret) | Postgres password |
| `APPFLOWY_REDIS_URI` | AppFlowy-Cloud | - | Redis connection URL |
| `APPFLOWY_S3_BUCKET` | AppFlowy-Cloud | appflowy | S3 bucket name |
| `APPFLOWY_S3_REGION` | AppFlowy-Cloud | us-east-1 | S3 region (any valid value) |
| `APPFLOWY_ENVIRONMENT` | AppFlowy-Cloud | production | Runtime environment |
| `APPFLOWY_DATABASE_URL` | AppFlowy-Cloud | - | Postgres connection |
| `APPFLOWY_S3_MINIO_URL` | AppFlowy-Cloud | - | Internal MinIO URL |
| `APPFLOWY_S3_USE_MINIO` | AppFlowy-Cloud | true | Use MinIO as S3 backend |
| `APPFLOWY_S3_ACCESS_KEY` | AppFlowy-Cloud | - | MinIO access key |
| `APPFLOWY_S3_SECRET_KEY` | AppFlowy-Cloud | (secret) | MinIO secret key |
| `APPFLOWY_ACCESS_CONTROL` | AppFlowy-Cloud | true | Enable RBAC |
| `APPFLOWY_CLOUD_BASE_URL` | AppFlowy-Cloud | - | Public API base URL |
| `APPFLOWY_GOTRUE_BASE_URL` | AppFlowy-Cloud | - | Internal GoTrue URL |
| `APPFLOWY_MAILER_SMTP_HOST` | AppFlowy-Cloud | - | SMTP host — reused from GoTrue |
| `APPFLOWY_MAILER_SMTP_PORT` | AppFlowy-Cloud | - | SMTP port — reused from GoTrue |
| `APPFLOWY_GOTRUE_JWT_SECRET` | AppFlowy-Cloud | (secret) | Shared JWT signing key |
| `APPFLOWY_MAILER_SMTP_EMAIL` | AppFlowy-Cloud | - | "From" email — reused from GoTrue |
| `APPFLOWY_GOTRUE_ADMIN_EMAIL` | AppFlowy-Cloud | - | Admin account email |
| `APPFLOWY_MAILER_SMTP_PASSWORD` | AppFlowy-Cloud | (secret) | SMTP password — reused from GoTrue |
| `APPFLOWY_MAILER_SMTP_TLS_KIND` | AppFlowy-Cloud | - | TLS mode: "wrapper" for port 465, "required" for 587 |
| `APPFLOWY_MAILER_SMTP_USERNAME` | AppFlowy-Cloud | (secret) | SMTP user — reused from GoTrue |
| `APPFLOWY_GOTRUE_ADMIN_PASSWORD` | AppFlowy-Cloud | (secret) | Shared admin password |
| `APPFLOWY_WEBSOCKET_MAILBOX_SIZE` | AppFlowy-Cloud | 6000 | WebSocket buffer size |
| `APPFLOWY_DATABASE_MAX_CONNECTIONS` | AppFlowy-Cloud | 40 | Postgres connection pool cap |
| `PORT` | GoTrue | 9999 | GoTrue listen port |
| `DATABASE_URL` | GoTrue | - | Postgres with auth schema |
| `GOTRUE_JWT_EXP` | GoTrue | 604800 | JWT expiration in seconds (7 days) |
| `GOTRUE_SITE_URL` | GoTrue | - | Public site URL |
| `API_EXTERNAL_URL` | GoTrue | - | External auth API path |
| `GOTRUE_DB_DRIVER` | GoTrue | postgres | Database driver |
| `GOTRUE_LOG_LEVEL` | GoTrue | info | Log level |
| `GOTRUE_SMTP_HOST` | GoTrue | - | SMTP server hostname (e.g. smtp.resend.com, smtp.gmail.com) |
| `GOTRUE_SMTP_PASS` | GoTrue | - | SMTP password or provider API key |
| `GOTRUE_SMTP_PORT` | GoTrue | - | SMTP port — 465 for implicit TLS, 587 for STARTTLS |
| `GOTRUE_SMTP_USER` | GoTrue | (secret) | SMTP username (Gmail address, or "resend" for Resend) |
| `GOTRUE_JWT_SECRET` | GoTrue | (secret) | JWT signing key (64-byte hex) |
| `GOTRUE_ADMIN_EMAIL` | GoTrue | - | Create Admin account email |
| `GOTRUE_DATABASE_URL` | GoTrue | - | Same Postgres, auth schema |
| `GOTRUE_ADMIN_PASSWORD` | GoTrue | (secret) | Create Admin account password |
| `GOTRUE_DISABLE_SIGNUP` | GoTrue | false | Allow user registration |
| `GOTRUE_SMTP_ADMIN_EMAIL` | GoTrue | - | "From" address shown to recipients (must be authorized sender) |
| `GOTRUE_SMTP_SENDER_NAME` | GoTrue | AppFlowy | Display name in the From header |
| `GOTRUE_MAILER_AUTOCONFIRM` | GoTrue | true | Skip email verification |
| `GOTRUE_MAILER_EXTERNAL_HOSTS` | GoTrue | - | Public host allowed in email link URLs |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | GoTrue | true | Enable email login |
| `GOTRUE_MAILER_URLPATHS_INVITE` | GoTrue | /gotrue/verify | Invite acceptance email path |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | GoTrue | /gotrue/verify | Password recovery email path |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | GoTrue | /gotrue/verify | Signup confirmation email path |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | GoTrue | /gotrue/verify | Email-change confirmation path |
| `RUST_LOG` | AppFlowy-Worker | info | Log level |
| `REDIS_HOST` | AppFlowy-Worker | - | Redis host (legacy convenience) |
| `REDIS_PORT` | AppFlowy-Worker | 6379 | Redis port |
| `POSTGRES_DB` | AppFlowy-Worker | - | Postgres database name |
| `POSTGRES_HOST` | AppFlowy-Worker | - | Postgres host (legacy convenience) |
| `POSTGRES_PORT` | AppFlowy-Worker | 5432 | Postgres port |
| `POSTGRES_USER` | AppFlowy-Worker | (secret) | Postgres user |
| `POSTGRES_PASSWORD` | AppFlowy-Worker | (secret) | Postgres password |
| `APPFLOWY_REDIS_URI` | AppFlowy-Worker | - | Legacy Redis URL (kept for compatibility) |
| `APPFLOWY_S3_BUCKET` | AppFlowy-Worker | appflowy | S3 bucket name |
| `APPFLOWY_S3_REGION` | AppFlowy-Worker | us-east-1 | S3 region |
| `APPFLOWY_ENVIRONMENT` | AppFlowy-Worker | production | Runtime environment |
| `APPFLOWY_DATABASE_URL` | AppFlowy-Worker | - | Legacy DB URL (kept for compatibility) |
| `APPFLOWY_S3_MINIO_URL` | AppFlowy-Worker | - | Internal MinIO URL |
| `APPFLOWY_S3_USE_MINIO` | AppFlowy-Worker | true | Use MinIO as S3 backend |
| `APPFLOWY_S3_ACCESS_KEY` | AppFlowy-Worker | - | MinIO access key |
| `APPFLOWY_S3_SECRET_KEY` | AppFlowy-Worker | (secret) | MinIO secret key |
| `APPFLOWY_GOTRUE_BASE_URL` | AppFlowy-Worker | - | Internal GoTrue URL |
| `APPFLOWY_WORKER_REDIS_URL` | AppFlowy-Worker | - | Worker Redis connection |
| `APPFLOWY_GOTRUE_JWT_SECRET` | AppFlowy-Worker | (secret) | Shared JWT signing key |
| `APPFLOWY_WORKER_ENVIRONMENT` | AppFlowy-Worker | production | Worker runtime environment |
| `APPFLOWY_WORKER_DATABASE_URL` | AppFlowy-Worker | - | Worker Postgres connection |
| `APPFLOWY_WORKER_DATABASE_NAME` | AppFlowy-Worker | - | Worker database name |

## Configuration

- **Start command:** `/bin/sh -c 'echo "$NGINX_CONFIG_B64" | base64 -d > /etc/nginx/nginx.conf && RESOLVER=$(grep -m1 nameserver /etc/resolv.conf | cut -d" " -f2) && case $RESOLVER in *:*) RESOLVER=[$RESOLVER] ;; esac && sed -i "s|__RESOLVER__|$RESOLVER|g" /etc/nginx/nginx.conf && sed -i "s|__GOTRUE_HOST__|$GOTRUE_HOST|g" /etc/nginx/nginx.conf && sed -i "s|__CLOUD_HOST__|$CLOUD_HOST|g" /etc/nginx/nginx.conf && sed -i "s|__MINIO_HOST__|$MINIO_HOST|g" /etc/nginx/nginx.conf && sed -i "s|__WEB_HOST__|$WEB_HOST|g" /etc/nginx/nginx.conf && nginx -g "daemon off;"'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `minio server /data --console-address :9001`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/appflowy)
