# Deploy Penpot on Railway

Open-source Figma alternative for design and prototyping

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-penpot-design-tool-on-railway)

## About

Five services (frontend, backend, exporter, Postgres, Valkey), every image pinned by tag and digest, filesystem assets on one volume, no deploy-time input. Open the URL, create an account, design. It suits small teams leaving Figma seats behind.

This template runs Penpot 2.18.3 as five services: frontend, backend, exporter, Postgres and Valkey. Design files land in a Postgres database you own, and uploads, fonts and thumbnails stay on one backend volume.

Railway handles TLS, the public domain, private networking and secret generation, so you open the URL and create an account. No seats, no per-editor billing, and no design files in someone else's cloud. Backups are a database dump plus a copy of that volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:8.1.10@sha256:640c5e62cea04b6d6f2084232651d0cc70362d31f4f805e7be94dbed6855e8f2` | Database |
| penpot-exporter | `penpotapp/exporter:2.18.3@sha256:418232d6ca3120b1c2bfde298a56a05a1f41f567cd8494deac3fe7fbc186cfbd` | Worker |
| penpot-backend | `penpotapp/backend:2.18.3@sha256:2df1b3440d2a82cc3571db211b4ffdfa2b89ccc910759e8d5e9387fb62971b5c` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.6@sha256:fcc6686a3f4f1962fe4ed77a15884553b7bd611ae1cea3204687968c5c09d517` | Database |
| penpot-frontend | `penpotapp/frontend:2.18.3@sha256:bb8abe27d53de84c95597f2c02c0e702b2779971fb0703e543f9ecf183e999f6` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Valkey | - | Valkey private hostname. |
| `REDISPORT` | Valkey | 6379 | Valkey port (6379). |
| `REDISUSER` | Valkey | default | Valkey user (default). |
| `REDIS_URL` | Valkey | - | Full Valkey connection URL for other services. |
| `VALKEY_PASSWORD` | Valkey | (secret) | Generated Valkey password. |
| `VALKEY_EXTRA_FLAGS` | Valkey | - | Server flags: password and 128 MB memory cap, as upstream. |
| `PORT` | penpot-exporter | 6061 | Port used by the /readyz healthcheck (6061). |
| `PENPOT_FLAGS` | penpot-exporter | - | Feature flags, referenced from penpot-backend. |
| `PENPOT_REDIS_URI` | penpot-exporter | - | Valkey URI, referenced from penpot-backend. |
| `PENPOT_PUBLIC_URI` | penpot-exporter | - | Public URL used in export download links. |
| `PENPOT_SECRET_KEY` | penpot-exporter | (secret) | Shared master key, referenced from penpot-backend. |
| `PENPOT_INTERNAL_URI` | penpot-exporter | - | Private URL of the web app the headless browser renders. |
| `PENPOT_HTTP_SERVER_PORT` | penpot-exporter | 6061 | Exporter HTTP port (6061). |
| `PORT` | penpot-backend | 6060 | Port used by the /readyz healthcheck (6060). |
| `JAVA_OPTS` | penpot-backend | -Xms256m -Xmx1g | JVM heap limits; raise -Xmx for very large files. |
| `PENPOT_FLAGS` | penpot-backend | enable-registration enable-login-with-password disable-email-verification enable-prepl-server | Feature flags: open sign-up, password login, no email verification. |
| `PENPOT_REDIS_URI` | penpot-backend | - | Valkey URI with password for real-time notifications. |
| `PENPOT_PUBLIC_URI` | penpot-backend | - | Public URL, referenced from penpot-frontend. |
| `PENPOT_SECRET_KEY` | penpot-backend | (secret) | Master key for sessions and invitations; generated, keep stable. |
| `PENPOT_DATABASE_URI` | penpot-backend | - | JDBC-style Postgres URI on the private network. |
| `PENPOT_HTTP_SERVER_HOST` | penpot-backend | :: | Bind address; :: listens on IPv6 and IPv4 privately. |
| `PENPOT_HTTP_SERVER_PORT` | penpot-backend | 6060 | Backend API port (6060). |
| `PENPOT_DATABASE_PASSWORD` | penpot-backend | (secret) | Postgres password, referenced from the Postgres service. |
| `PENPOT_DATABASE_USERNAME` | penpot-backend | (secret) | Postgres user, referenced from the Postgres service. |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | penpot-backend | fs | Asset storage backend; fs keeps files on the volume. |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | penpot-backend | 367001600 | Max request body size in bytes (350 MiB). |
| `PENPOT_OBJECTS_STORAGE_FS_DIRECTORY` | penpot-backend | /opt/data/assets | Volume path for uploads, fonts, thumbnails, exports. |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | penpot-backend | 367001600 | Max multipart upload size in bytes (legacy alias). |
| `POSTGRES_DB` | Postgres | railway | Database Penpot uses. |
| `DATABASE_URL` | Postgres | - | Full private connection URL. |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser name. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `PORT` | penpot-frontend | 8080 | Port nginx listens on; the public domain routes here. |
| `PENPOT_FLAGS` | penpot-frontend | - | Feature flags, referenced from penpot-backend (edit them there). |
| `PENPOT_PUBLIC_URI` | penpot-frontend | - | Public HTTPS URL of Penpot; backend and exporter reference it. |
| `PENPOT_BACKEND_URI` | penpot-frontend | http://penpot-backend | nginx upstream name for the backend; leave as is. |
| `PENPOT_BACKEND_HOST` | penpot-frontend | - | Backend private hostname, re-resolved by nginx at runtime. |
| `PENPOT_EXPORTER_URI` | penpot-frontend | http://penpot-exporter | nginx upstream name for the exporter; leave as is. |
| `PENPOT_EXPORTER_HOST` | penpot-frontend | - | Exporter private hostname, re-resolved by nginx at runtime. |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | penpot-frontend | 367001600 | Max upload size in bytes for nginx (350 MiB). |

## Configuration

- **Healthcheck:** `/readyz`
- **Start command:** `/bin/bash -c 'python3 -m http.server 6070 --bind :: --directory /opt/data/assets >/dev/null 2>&1 & exec /bin/bash run.sh'`
- **Volume:** `/opt/data/assets`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/bash -c 'printf "upstream penpot-backend { zone penpot_backend 64k; server %s:6060 resolve; }\nupstream penpot-exporter { zone penpot_exporter 64k; server %s:6061 resolve; }\nupstream penpot-assets { zone penpot_assets 64k; server %s:6070 resolve; }\n" "$PENPOT_BACKEND_HOST" "$PENPOT_EXPORTER_HOST" "$PENPOT_BACKEND_HOST" > /etc/nginx/overrides/http.d/railway-upstreams.conf && printf "location ~ ^/internal/assets/(.*)\$ { internal; proxy_pass http://penpot-assets/\$1; proxy_hide_header Content-Type; include /etc/nginx/nginx-security-headers.conf; }\n" > /etc/nginx/overrides/server.d/railway-assets.conf && exec /bin/bash /entrypoint.sh nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/deploy-penpot-design-tool-on-railway)
