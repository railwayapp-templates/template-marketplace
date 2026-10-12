# Deploy Penpot | Open-Source Figma Alternative with Postgres & S3 on Railway

Collaborative design and prototyping tool, the open-source Figma alt

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/penpot-production?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=penpot-production)

[Penpot](https://penpot.app/) is the open-source design and prototyping platform, the self-hostable alternative to Figma: vector design, components and variants, design tokens, flex and grid layout, interactive prototypes and real-time multiplayer editing, with an inspect mode that hands developers CSS, SVG and HTML. Files use open standards (SVG, CSS) and you can import your Figma work. This template runs the official Penpot images, pinned, with Postgres, Valkey and a Railway bucket for every uploaded image, font and thumbnail.

The stack is five services and a bucket: Penpot (the web app), Backend, Exporter, Postgres, Valkey, and the Assets bucket.

- **Upstream's own images, pinned.** `penpotapp/frontend`, `penpotapp/backend` and `penpotapp/exporter` at a fixed release (2.18.3), not the moving `latest` tag. Upgrading is bumping the three tags together.
- **Assets in a Railway bucket.** Upstream's compose file shares one disk between the web server and the backend; Railway services cannot share a volume, so uploads go to S3 instead. The backend stores objects in the bucket and answers each request with a short-lived signed URL, which the Penpot web server fetches and streams back. Browsers only ever talk to your Penpot domain.
- **Migrations on every boot.** The backend migrates the database at start-up and Railway's health check on `/readyz` only passes once it is connected to Postgres and Valkey.
- **Survives redeploys of any service.** The web server proxies `/api`, `/assets` and websockets to the backend and exports to the exporter over the private network, re-resolving their addresses while it runs, so redeploying the backend never leaves the web app pointing at a dead address, and the web app can start before the others.
- **Exports work out of the box.** The Exporter runs a headless browser that renders PNG, JPEG, SVG and PDF exports from the web app over the private network.
- **Generated secrets.** `PENPOT_SECRET_KEY` (sessions, invitations, the exporter's key), the database password and the Valkey password are generated for each deployment. Upstream's compose file ships a publicly known `change-this-insecure-key`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Penpot | `penpotapp/frontend:2.18.3` | Web service |
| Backend | `penpotapp/backend:2.18.3` | Worker |
| Exporter | `penpotapp/exporter:2.18.3` | Worker |
| Valkey | `valkey/valkey:8.1.10-alpine` | Database |
| Postgres | `postgres:17.11-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Penpot | 8080 | Port the Penpot web server listens on - leave as is |
| `PENPOT_FLAGS` | Penpot | - | Feature flags - edit them on the Backend service |
| `BACKEND_ADDRESS` | Penpot | - | Backend API on the private network, re-resolved while running so backend redeploys never leave a stale address |
| `EXPORTER_ADDRESS` | Penpot | - | Exporter on the private network |
| `PENPOT_PUBLIC_URI` | Penpot | - | Public URL - edit it on the Backend service |
| `PENPOT_BACKEND_URI` | Penpot | http://penpot-backend | nginx upstream defined by the start command from BACKEND_ADDRESS - leave as is |
| `PENPOT_EXPORTER_URI` | Penpot | http://penpot-exporter | nginx upstream defined by the start command from EXPORTER_ADDRESS - leave as is |
| `PORT` | Backend | 6060 | Port the backend API listens on - leave as is |
| `JAVA_OPTS` | Backend | -Xms128m -Xmx1g | JVM heap limits. Without a cap the JVM sizes its heap from the host's memory; raise -Xmx for very large design files |
| `PENPOT_FLAGS` | Backend | disable-email-verification | Feature flags shared by all Penpot services. Add disable-registration once your team has signed up; add enable-smtp after setting the PENPOT_SMTP_* variables |
| `PENPOT_REDIS_URI` | Backend | - | Valkey on the private network (real-time notifications) |
| `AWS_ACCESS_KEY_ID` | Backend | - | Bucket access key |
| `PENPOT_PUBLIC_URI` | Backend | - | Public URL of Penpot (links, invitations, exports) - set it to your custom domain after adding one; the other services follow |
| `PENPOT_SECRET_KEY` | Backend | (secret) | Master key that sessions, invitations and the exporter's key are derived from. Changing it logs everyone out |
| `AWS_ENDPOINT_URL_S3` | Backend | - | Bucket endpoint, read by the AWS SDK. Deliberately not PENPOT_OBJECTS_STORAGE_S3_ENDPOINT: that one forces path-style URLs, and Railway buckets are virtual-hosted |
| `PENPOT_DATABASE_URI` | Backend | - | Postgres on the private network |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) | Bucket secret key |
| `PENPOT_HTTP_SERVER_HOST` | Backend | :: | Listen on IPv6 and IPv4 so Railway's private network can reach it |
| `PENPOT_HTTP_SERVER_PORT` | Backend | 6060 | Backend API port - must match PORT |
| `PENPOT_DATABASE_PASSWORD` | Backend | (secret) | Database password |
| `PENPOT_DATABASE_USERNAME` | Backend | (secret) | Database user |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | Backend | s3 | Uploads, images, fonts and thumbnails go to the Railway bucket |
| `PENPOT_OBJECTS_STORAGE_S3_BUCKET` | Backend | - | Bucket name |
| `PENPOT_OBJECTS_STORAGE_S3_REGION` | Backend | - | Bucket region |
| `PORT` | Exporter | 6061 | Port the exporter listens on - leave as is |
| `PENPOT_FLAGS` | Exporter | - | Feature flags - edit them on the Backend service |
| `PENPOT_REDIS_URI` | Exporter | - | Valkey on the private network (family=0 lets it connect over IPv6) |
| `PENPOT_PUBLIC_URI` | Exporter | - | Public URL - edit it on the Backend service |
| `PENPOT_SECRET_KEY` | Exporter | (secret) | Same master key as the backend, so the backend accepts the exporter's uploads |
| `PENPOT_INTERNAL_URI` | Exporter | - | The headless browser renders exports from the Penpot web server over the private network |
| `PENPOT_HTTP_SERVER_PORT` | Exporter | 6061 | Exporter port - must match PORT |
| `VALKEY_PASSWORD` | Valkey | (secret) | Auto-generated Valkey password |
| `POSTGRES_DB` | Postgres | penpot | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `POSTGRES_INITDB_ARGS` | Postgres | --data-checksums | Same initdb options as upstream's compose file |

## Configuration

- **Start command:** `/bin/bash -c "printf 'upstream penpot-backend { zone penpot-backend 64k; server %s resolve; } upstream penpot-exporter { zone penpot-exporter 64k; server %s resolve; }' $BACKEND_ADDRESS $EXPORTER_ADDRESS > /etc/nginx/overrides/http.d/railway-upstreams.conf && bash /entrypoint.sh true && sed -i 's/^worker_processes auto;/worker_processes 2;/' /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/readyz`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --requirepass $VALKEY_PASSWORD --save '' --appendonly no --maxmemory 128mb --maxmemory-policy volatile-lfu"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/penpot-production)
