# Deploy COREY on Railway

View, Validate, Edit IFC files - Official railway template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/corey)

## About

COREY helps project teams review IFC model data visually for IFC data validation workflows. It lets users open IFC files, inspect elements in 3D, configure checking clauses, validate model data, export issues to Excel, batch-edit values, import corrections, and validate again before submissions.

Hosting COREY involves deploying the Next.js application and configuring its optional backend services. COREY can run local-first in the browser, where IFC files do not leave the user’s computer. 

For a shared or self-hosted deployment, the backend stores model metadata in PostgreSQL and model files in S3-compatible object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Bucket | [railwayapp-templates/minio](https://github.com/railwayapp-templates/minio) | Worker |
| COREY | [JHJHJHJH/COREY](https://github.com/JHJHJHJH/COREY) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
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
| `PORT` | COREY | 4000 | Application server port |
| `S3_BUCKET` | COREY | corey-models | S3/MinIO bucket used to store IFC model files |
| `S3_REGION` | COREY | ap-southeast-1 | S3 region used by the storage client |
| `S3_ENDPOINT` | COREY | - | Private internal MinIO/S3 endpoint |
| `DATABASE_URL` | COREY | - | PostgreSQL database connection URL |
| `S3_ACCESS_KEY` | COREY | - | S3/MinIO access key |
| `S3_SECRET_KEY` | COREY | (secret) | S3/MinIO secret key |
| `DOCS_EXTERNAL_URL` | COREY | https://coreyifc.com/docs | Public documentation URL |
| `COREY_MAX_MODEL_BYTES` | COREY | 262144000 | Maximum IFC model upload size in bytes |
| `PORT` | Console | 9090 | Port |
| `PASSWORD` | Console | (secret) | Password |
| `USERNAME` | Console | (secret) | Username |
| `CONSOLE_MINIO_SERVER` | Console | - | Endpoint |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, JavaScript, TypeScript, MDX, CSS

[View on Railway →](https://railway.com/deploy/corey)
