# Deploy Penpot on Railway

Design and prototyping tool for UI teams, with real-time editing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-design)

## About

Penpot is an open-source design and prototyping platform built by Kaleidos, for teams who want their design files on infrastructure they control. It runs in the browser, supports real-time multiplayer editing, and stores work in open web standards — SVG, CSS and W3C design tokens — not a proprietary binary format. That matters most to regulated industries whose data cannot leave their network, and to organisations tired of per-editor seat prices for a tool designers open a few times a week.

This template runs the full production topology, not one container. Self-host Penpot on Railway with an nginx frontend serving the application and proxying everything behind it, a Clojure backend owning the API, migrations, worker and scheduler, a Chromium exporter for PNG, SVG and PDF, and Penpot's official MCP server so AI clients can read and edit design files. Postgres holds every document, Redis carries WebSocket presence and task routing, and a managed bucket keeps uploaded media, fonts and thumbnails. A capture-only Mailpit inbox means verification and invitation mail works at once, with no external SMTP account.

![Diagram of the seven Penpot services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787681190/penpot-architecture.png)

Penpot covers the whole product design loop: CSS Grid and Flex layout, components with variants, W3C DTCG design tokens, interactive prototypes, threaded comments, and a developer Inspect mode generating CSS, SVG and HTML with no paid seat attached. Because the model is web-native, a Penpot component behaves like the markup an engineer will eventually write.

- Real-time multiplayer editing with presence and comments
- Components, variants and shared team libraries
- Design tokens with import, export and library sync
- Interactive prototypes with a viewer and share links
- Free developer handoff: CSS, SVG and HTML inspection
- A plugin API and an official MCP server
- Import `.fig` and `.svg`; export PNG, SVG and PDF

The **frontend** is nginx: it serves the compiled application and reverse-proxies `/api`, `/ws/notifications`, `/assets` and `/mcp/*`, so it is the only service needing a public domain. The **backend** owns the API, migrations, worker and cron scheduler, coordinated through Postgres row locks so replicas and overlapping deploys stay safe. The **exporter** runs headless Chromium, and the **MCP server** works in multi-user mode, so tool calls act only for a token issued from Penpot's Integrations page. **Postgres** stores documents and sessions, **Redis** fans out notifications and routes MCP tasks, and the **bucket** holds images, fonts and thumbnails.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| penpot-frontend | [gridalpha/penpot-railway](https://github.com/gridalpha/penpot-railway) | Web service |
| penpot-exporter | `penpotapp/exporter:2.17.1` | Worker |
| Redis | `redis:8.2` | Database |
| penpot-mcp | `penpotapp/mcp:2.17.1` | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| penpot-backend | `penpotapp/backend:2.17.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | penpot-frontend | 8080 | nginx listening port |
| `PENPOT_FLAGS` | penpot-frontend | enable-smtp enable-mcp | Feature switches, space-separated |
| `PENPOT_MCP_URI` | penpot-frontend | - | MCP HTTP upstream |
| `PENPOT_MCP_URI_WS` | penpot-frontend | - | MCP WebSocket upstream |
| `PENPOT_PUBLIC_URI` | penpot-frontend | - | Public base URL |
| `PENPOT_BACKEND_URI` | penpot-frontend | - | Backend upstream |
| `PENPOT_EXPORTER_URI` | penpot-frontend | - | Exporter upstream |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | penpot-frontend | 367001600 | Max upload size in bytes |
| `PORT` | penpot-exporter | 6061 | Health-check port |
| `NODE_OPTIONS` | penpot-exporter | --dns-result-order=ipv6first | Prefer IPv6 on private lookups |
| `PENPOT_FLAGS` | penpot-exporter | enable-smtp enable-mcp | Feature switches, space-separated |
| `PENPOT_REDIS_URI` | penpot-exporter | - | Redis connection string |
| `PENPOT_PUBLIC_URI` | penpot-exporter | - | Public base URL |
| `PENPOT_SECRET_KEY` | penpot-exporter | (secret) | Must match the backend key |
| `PENPOT_INTERNAL_URI` | penpot-exporter | - | Frontend render target |
| `PENPOT_HTTP_SERVER_PORT` | penpot-exporter | 6061 | Exporter listening port |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | penpot-mcp | 4403 | Health-check port |
| `NODE_OPTIONS` | penpot-mcp | --dns-result-order=ipv6first | Prefer IPv6 on private lookups |
| `PENPOT_MCP_LOG_LEVEL` | penpot-mcp | info | Log verbosity |
| `PENPOT_MCP_REDIS_URI` | penpot-mcp | - | Routes tasks between instances |
| `PENPOT_MCP_REPL_PORT` | penpot-mcp | 4403 | Debug REPL port, private only |
| `PENPOT_MCP_REMOTE_MODE` | penpot-mcp | true | Disable local filesystem access |
| `PENPOT_MCP_SERVER_HOST` | penpot-mcp | :: | Dual-stack bind, required for private networking |
| `PENPOT_MCP_SERVER_PORT` | penpot-mcp | 4401 | MCP HTTP and SSE port |
| `PENPOT_MCP_WEBSOCKET_PORT` | penpot-mcp | 4402 | Plugin WebSocket port |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Credentials the backend sends |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Ring-buffer size |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the web inbox |
| `MAILPIT_PASSWORD` | mailpit | (secret) | Shared inbox and SMTP password |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth on the plain listener |
| `PORT` | penpot-backend | 6060 | Health-check port |
| `JVM_OPTS` | penpot-backend | -XX:MaxRAMPercentage=70 -Djava.net.preferIPv6Addresses=true | Heap ceiling and IPv6 preference |
| `PENPOT_FLAGS` | penpot-backend | enable-smtp enable-mcp | Feature switches, space-separated |
| `PENPOT_SMTP_SSL` | penpot-backend | false | Plain listener, no implicit TLS |
| `PENPOT_SMTP_TLS` | penpot-backend | false | Plain listener, no STARTTLS |
| `PENPOT_REDIS_URI` | penpot-backend | - | Redis connection string |
| `PENPOT_SMTP_HOST` | penpot-backend | - | SMTP host |
| `PENPOT_SMTP_PORT` | penpot-backend | 1025 | SMTP port |
| `AWS_ACCESS_KEY_ID` | penpot-backend | - | Bucket access key |
| `PENPOT_PUBLIC_URI` | penpot-backend | - | Public base URL |
| `PENPOT_SECRET_KEY` | penpot-backend | (secret) | Master key for sessions and invitations |
| `PENPOT_DATABASE_URI` | penpot-backend | - | Postgres target |
| `PENPOT_SMTP_PASSWORD` | penpot-backend | (secret) | SMTP password |
| `PENPOT_SMTP_USERNAME` | penpot-backend | (secret) | SMTP username |
| `AWS_SECRET_ACCESS_KEY` | penpot-backend | (secret) | Bucket secret key |
| `PENPOT_HTTP_SERVER_HOST` | penpot-backend | :: | Dual-stack bind, required for private networking |
| `PENPOT_HTTP_SERVER_PORT` | penpot-backend | 6060 | API listening port |
| `PENPOT_DATABASE_PASSWORD` | penpot-backend | (secret) | Postgres password |
| `PENPOT_DATABASE_USERNAME` | penpot-backend | (secret) | Postgres user |
| `PENPOT_SMTP_DEFAULT_FROM` | penpot-backend | - | From address |
| `PENPOT_TELEMETRY_ENABLED` | penpot-backend | false | Anonymous usage reporting, off by default |
| `PENPOT_SMTP_DEFAULT_REPLY_TO` | penpot-backend | - | Reply-to address |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | penpot-backend | s3 | Use object storage, not a volume |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | penpot-backend | 367001600 | Max upload size in bytes |
| `PENPOT_OBJECTS_STORAGE_S3_BUCKET` | penpot-backend | - | Bucket name |
| `PENPOT_OBJECTS_STORAGE_S3_REGION` | penpot-backend | - | Bucket region |
| `PENPOT_OBJECTS_STORAGE_S3_ENDPOINT` | penpot-backend | - | Bucket endpoint |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/readyz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Healthcheck:** `/livez`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/penpot-design)
