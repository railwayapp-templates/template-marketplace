# Deploy FlowiseAI on Railway

Open-source low-code tool to build AI agents and LLM workflows visually

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowiseai-1)

## About

Flowise is an open-source, low-code tool for building AI agents, chatbots and LLM workflows with a drag &amp; drop interface. Connect models, vector stores, tools and memory visually, then expose your flows through an API or an embeddable chat widget.

&gt; **Note:** The upstream Flowise repository was archived on Aug 13, 2026 and is no longer actively maintained. This template deploys the last available image. Use it at your own discretion and keep it behind authentication.

Hosting Flowise means running a single Node.js service (the official `flowiseai/flowise` image) that serves both the UI and the API on one HTTP port. By default it stores data in SQLite and uploads on local disk, so you need a persistent volume mounted at `/home/node/.flowise` to avoid losing flows, credentials and files on redeploy. For production, you can switch to Postgres or MySQL with the `DATABASE_*` variables, use S3, GCS or Azure Blob for uploads, and set `FLOWISE_SECRETKEY_OVERWRITE` so your encryption key survives redeploys. Railway handles the build, networking, HTTPS and volumes for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Flowise | `flowiseai/flowise` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | Flowise | 3000 | Flowise app port |
| `STORAGE_TYPE` | Flowise | s3 | Type of storage for uploaded files |
| `DATABASE_HOST` | Flowise | - | Database host URL or IP address |
| `DATABASE_NAME` | Flowise | - | Database name |
| `DATABASE_PORT` | Flowise | - | Database port |
| `DATABASE_TYPE` | Flowise | postgres | Type of database to store the flowise data |
| `DATABASE_USER` | Flowise | (secret) | Database username |
| `S3_ENDPOINT_URL` | Flowise | - | Custom Endpoint for S3 |
| `FLOWISE_PASSWORD` | Flowise | (secret) | Flowise password |
| `FLOWISE_USERNAME` | Flowise | (secret) | Flowise username |
| `DATABASE_PASSWORD` | Flowise | (secret) | Database password |
| `S3_STORAGE_REGION` | Flowise | - | Region for S3 bucket |
| `S3_STORAGE_BUCKET_NAME` | Flowise | - | Bucket name |
| `S3_STORAGE_ACCESS_KEY_ID` | Flowise | - | AWS Access Key |
| `S3_STORAGE_SECRET_ACCESS_KEY` | Flowise | (secret) | AWS Secret Key |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.flowise`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowiseai-1)
