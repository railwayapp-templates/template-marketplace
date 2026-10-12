# Deploy Penpot 2 Design and Prototyping on Railway

Open-source Figma alternative for design and prototyping, fully yours.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-2-design-and-prototyping)

## About

Penpot is an open-source design and prototyping platform for product teams, built on open standards like SVG, CSS and HTML. This community template runs Penpot 2 on Railway with its backend, exporter, MCP server, PostgreSQL, Valkey and a Railway Bucket for images and fonts.

Penpot consists of an nginx frontend that serves the web app and routes requests, a JVM backend with the API and real-time collaboration, an exporter that renders PNG, SVG and PDF exports with a headless browser, and an MCP server for AI agents. It needs PostgreSQL and a Redis-compatible store (Valkey). Uploaded images, fonts and thumbnails go to object storage: this template stores them in a Railway Bucket through a small private S3 gateway, because Penpot's S3 client uses an addressing style Railway Buckets do not accept. The frontend image is adjusted for Railway: nginx workers follow the container's CPU quota, internal services are re-resolved after redeploys, and a local healthcheck keeps deploys independent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| S3 Gateway | [baranberkay96/penpot-railway](https://github.com/baranberkay96/penpot-railway) (branch: main) (root: /services/s3-gateway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Valkey | `valkey/valkey:8.1.10` | Database |
| Backend | `penpotapp/backend:2.18.3` | Worker |
| MCP | `penpotapp/mcp:2.18.3` | Worker |
| Exporter | `penpotapp/exporter:2.18.3` | Worker |
| Frontend | [baranberkay96/penpot-railway](https://github.com/baranberkay96/penpot-railway) (branch: main) (root: /services/frontend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | S3 Gateway | 9000 | Port of the S3 API on the private network. |
| `BUCKET_NAME` | S3 Gateway | - | Railway Bucket name (S3 API name). |
| `BUCKET_PREFIX` | S3 Gateway | - | Optional folder inside the Bucket for all gateway data (empty = Bucket root). |
| `BUCKET_REGION` | S3 Gateway | - | Railway Bucket region. |
| `BUCKET_ENDPOINT` | S3 Gateway | - | Railway Bucket S3 endpoint. |
| `GATEWAY_BUCKETS` | S3 Gateway | penpot | Space-separated logical buckets created as folders at start. |
| `GATEWAY_LOG_LEVEL` | S3 Gateway | NOTICE | rclone log level (ERROR, NOTICE, INFO, DEBUG). |
| `GATEWAY_ACCESS_KEY` | S3 Gateway | - | Access key Penpot signs with (generated). |
| `GATEWAY_SECRET_KEY` | S3 Gateway | (secret) | Secret key Penpot signs with (generated). |
| `BUCKET_ACCESS_KEY_ID` | S3 Gateway | - | Railway Bucket access key. |
| `BUCKET_FORCE_PATH_STYLE` | S3 Gateway | false | Railway Buckets use virtual-hosted URLs; set true only if the Bucket's Credentials tab says path-style. |
| `BUCKET_SECRET_ACCESS_KEY` | S3 Gateway | (secret) | Railway Bucket secret key. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres (private network). |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `VALKEY_URL` | Valkey | - | Connection URL on the private network. |
| `VALKEY_PASSWORD` | Valkey | (secret) | Valkey password (generated). |
| `PORT` | Backend | 6060 | Backend port (healthcheck). |
| `JVM_OPTS` | Backend | -Xms256m -Xmx2g | JVM heap limits. Raise -Xmx for very large files. |
| `PENPOT_FLAGS` | Backend | enable-registration enable-login-with-password disable-email-verification enable-prepl-server enable-mcp | Feature flags shared by frontend, backend and exporter (registration, login, MCP...). Edit here only. |
| `PENPOT_REDIS_URI` | Backend | - | Valkey (notifications, rate limits, exporter queue). |
| `AWS_ACCESS_KEY_ID` | Backend | - | Gateway access key. |
| `PENPOT_PUBLIC_URI` | Backend | - | Public URL of Penpot. Change it here for a custom domain; the other services reference it. |
| `PENPOT_SECRET_KEY` | Backend | (secret) | Signs sessions and tokens; shared with the exporter. Never change after first boot. |
| `PENPOT_DATABASE_URI` | Backend | - | Postgres JDBC-style URI (private network). |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) | Gateway secret key. |
| `PENPOT_HTTP_SERVER_HOST` | Backend | :: | Listen on IPv4 and IPv6. |
| `PENPOT_HTTP_SERVER_PORT` | Backend | 6060 | Backend HTTP port. |
| `PENPOT_DATABASE_PASSWORD` | Backend | (secret) | Database password. |
| `PENPOT_DATABASE_USERNAME` | Backend | (secret) | Database user. |
| `PENPOT_TELEMETRY_ENABLED` | Backend | false | Anonymous usage statistics to Penpot (set true to help the project). |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | Backend | s3 | Store images, fonts and thumbnails in S3 (the Railway Bucket via S3 Gateway). |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Backend | 367001600 | Max request size (350 MiB, upstream default). |
| `PENPOT_OBJECTS_STORAGE_S3_BUCKET` | Backend | penpot | Logical bucket = folder in the Railway Bucket; must be in the gateway's GATEWAY_BUCKETS. |
| `PENPOT_OBJECTS_STORAGE_S3_REGION` | Backend | us-east-1 | Region used to sign requests to the gateway. |
| `PENPOT_OBJECTS_STORAGE_S3_ENDPOINT` | Backend | - | S3 Gateway on the private network. |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | Backend | 367001600 | Max upload size (350 MiB, upstream default). |
| `PENPOT_MCP_SERVER_HOST` | MCP | :: | Listen on IPv4 and IPv6 (image default is IPv4 only). |
| `PENPOT_MCP_SERVER_PORT` | MCP | 4401 | MCP HTTP port (proxied by the frontend at /mcp/stream and /mcp/sse). |
| `PENPOT_MCP_WEBSOCKET_PORT` | MCP | 4402 | Plugin websocket port (proxied at /mcp/ws). |
| `PORT` | Exporter | 6061 | Exporter port (healthcheck). |
| `PENPOT_FLAGS` | Exporter | - | Same flags as the backend. |
| `PENPOT_REDIS_URI` | Exporter | - | Same Valkey as the backend. |
| `PENPOT_PUBLIC_URI` | Exporter | - | Same public URL as the backend. |
| `PENPOT_SECRET_KEY` | Exporter | (secret) | Same secret key as the backend. |
| `PENPOT_INTERNAL_URI` | Exporter | - | Frontend on the private network; the headless browser renders exports from it. |
| `PENPOT_HTTP_SERVER_HOST` | Exporter | :: | Listen on IPv4 and IPv6. |
| `PENPOT_HTTP_SERVER_PORT` | Exporter | 6061 | Exporter HTTP port. |
| `PORT` | Frontend | 8080 | nginx port (domain and healthcheck). |
| `PENPOT_FLAGS` | Frontend | - | Same flags as the backend (baked into the web app's config.js). |
| `PENPOT_MCP_URI` | Frontend | - | MCP server HTTP endpoint (private network). |
| `PENPOT_MCP_URI_WS` | Frontend | - | MCP server websocket endpoint (private network). |
| `PENPOT_PUBLIC_URI` | Frontend | - | Same public URL as the backend. |
| `PENPOT_BACKEND_URI` | Frontend | - | Backend on the private network. |
| `PENPOT_EXPORTER_URI` | Frontend | - | Exporter on the private network. |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Frontend | - | Max request size, same as the backend. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --requirepass $VALKEY_PASSWORD --maxmemory 128mb --maxmemory-policy volatile-lfu --appendonly no"`
- **Healthcheck:** `/readyz`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** penpot, design, prototyping, figma-alternative, ui-design · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/penpot-2-design-and-prototyping)
