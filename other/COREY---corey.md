# Deploy COREY on Railway

View, validate, and edit IFC files with built-in MCP access for AI clients.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/corey)

## About

COREY helps project teams review, validate, and edit IFC model data in a browser-based 3D workflow. This template also includes the COREY MCP companion so approved AI clients can inspect model data through the authenticated MCP endpoint.

This template provisions a connected five-service stack:

- **COREY** — the web application, pinned to `ghcr.io/jhjhjhjh/corey:0.1.0`.
- **MCP** — the Streamable HTTP and browser-bridge companion, pinned to `ghcr.io/jhjhjhjh/corey-mcp:0.1.0`.
- **Postgres** — model metadata, validation rules, drafts, and MCP settings.
- **MinIO Bucket** — S3-compatible storage for server-backed IFC model files.
- **MinIO Console** — browser administration for the object store.

Railway generates the MCP bridge secret during deployment and wires it between COREY and MCP through reference variables. Both application images are public GHCR images; no GitHub repository deployment is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| COREY | `ghcr.io/jhjhjhjh/corey:0.1.1` | Web service |
| MCP | `ghcr.io/jhjhjhjh/corey-mcp:0.1.1` | Web service |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | COREY | 4000 | COREY application port |
| `HOSTNAME` | COREY | :: | Bind on Railway private networking |
| `S3_BUCKET` | COREY | corey-models | S3/MinIO bucket used to store IFC model files |
| `S3_REGION` | COREY | ap-southeast-1 | S3 region used by the storage client |
| `S3_ENDPOINT` | COREY | - | Private internal MinIO/S3 endpoint |
| `DATABASE_URL` | COREY | - | PostgreSQL database connection URL |
| `S3_ACCESS_KEY` | COREY | - | S3/MinIO access key |
| `S3_SECRET_KEY` | COREY | (secret) | S3/MinIO secret key |
| `DOCS_EXTERNAL_URL` | COREY | https://coreyifc.com/docs | Public documentation URL |
| `COREY_APP_PUBLIC_URL` | COREY | - | Public COREY application URL |
| `COREY_MCP_BRIDGE_URL` | COREY | - | Public WebSocket endpoint for the browser-to-MCP bridge |
| `COREY_MCP_PUBLIC_URL` | COREY | - | Public MCP Streamable HTTP endpoint |
| `COREY_MAX_MODEL_BYTES` | COREY | 262144000 | Maximum IFC model upload size in bytes |
| `COREY_MCP_ADMIN_USERS` | COREY | local | Comma-separated COREY user IDs allowed to manage MCP access |
| `COREY_MCP_INTERNAL_URL` | COREY | - | Private MCP service URL used by COREY |
| `COREY_MCP_BRIDGE_SECRET` | COREY | (secret) | Shared secret used to authenticate the COREY browser bridge |
| `PORT` | MCP | 4001 | Railway public service port |
| `COREY_BASE_URL` | MCP | - | Private URL of the COREY application service |
| `COREY_MCP_BIND` | MCP | :: | Bind on Railway private networking |
| `COREY_MCP_PORT` | MCP | 4001 | COREY MCP HTTP and WebSocket port |
| `COREY_USER_HEADER` | MCP | x-forwarded-user | Trusted user identity header sent to COREY |
| `COREY_APP_PUBLIC_URL` | MCP | - | Public COREY application URL used by MCP OAuth |
| `COREY_MCP_PUBLIC_URL` | MCP | - | Public MCP Streamable HTTP endpoint |
| `COREY_MCP_TRUST_PROXY` | MCP | 1 | Number of trusted Railway ingress proxy hops |
| `COREY_MCP_BRIDGE_SECRET` | MCP | (secret) | Generated secret shared with the COREY application bridge |
| `COREY_MCP_ALLOWED_ORIGINS` | MCP | - | Allowed browser origin for the COREY bridge |
| `COREY_MCP_INDEX_CACHE_ENTRIES` | MCP | 3 | Maximum number of cached IFC indexes |
| `PORT` | Bucket | - | Application internal port |
| `MINIO_ROOT_USER` | Bucket | (secret) | MinIO root/admin username |
| `MINIO_PUBLIC_HOST` | Bucket | - | Public Railway domain for MinIO access |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | Public HTTPS port for MinIO access |
| `MINIO_PRIVATE_HOST` | Bucket | - | Private Railway domain for internal MinIO access |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private internal MinIO API port |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | MinIO root/admin password |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Public MinIO API endpoint |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private internal MinIO API endpoint |
| `MINIO_BROWSER_REDIRECT_URL` | Bucket | - | MinIO console/browser redirect URL |
| `PORT` | Console | 9090 | Port |
| `PASSWORD` | Console | (secret) | Password |
| `USERNAME` | Console | (secret) | Username |
| `CONSOLE_MINIO_SERVER` | Console | - | Endpoint |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/corey)
