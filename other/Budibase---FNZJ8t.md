# Deploy Budibase on Railway

Open-source low-code platform for agents, apps, and automations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FNZJ8t)

## About

**Budibase** is an open-source, low-code platform that empowers teams to build internal tools, forms, dashboards, and workflows rapidly. With its intuitive drag-and-drop interface and support for various data sources, Budibase enables the creation of custom applications without extensive coding knowledge.

This Railway template uses the official Budibase all-in-one Docker image and includes the supporting services required for the application, object storage, databases, background processing, and AI model integration.

Budibase offers flexible hosting options to suit different needs. You can self-host Budibase using Docker, Kubernetes, or cloud infrastructure, providing control over your applications and data.

This Railway template simplifies self-hosting Budibase on Railway by including the following services in a single deployment:

- Budibase application
- Budibase worker
- Redis
- CouchDB
- MinIO object storage
- PostgreSQL for LiteLLM
- LiteLLM for AI model integration

The template uses persistent storage mounted at `/data`, allowing application data and service files to remain available after container restarts and redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Budibase | `budibase/budibase:v3.45.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `APPS_URL` | http://127.0.0.1:4001 | - |
| `APP_PORT` | 4001 | - |
| `DATA_DIR` | /data | - |
| `NODE_ENV` | production | - |
| `LOG_LEVEL` | warn | - |
| `MINIO_URL` | http://127.0.0.1:9000 | - |
| `REDIS_URL` | 127.0.0.1:6379 | - |
| `JWT_SECRET` | (secret) | - |
| `MINIO_PORT` | 9000 | - |
| `WORKER_URL` | http://127.0.0.1:4002 | ========================================================= |
| `LITELLM_URL` | http://127.0.0.1:4000 | - |
| `SELF_HOSTED` | 1 | - |
| `TARGETBUILD` | single | - |
| `WORKER_PORT` | 4002 | - |
| `ARCHITECTURE` | amd | - |
| `CLUSTER_PORT` | 80 | - |
| `COUCHDB_USER` | (secret) | - |
| `DATABASE_URL` | - | ========================================================= |
| `HTTP_LOGGING` | false | ========================================================= |
| `LITELLM_HOST` | 0.0.0.0 | - |
| `LITELLM_PORT` | 4000 | - |
| `MINIO_BUCKET` | prod-budi-app-assets | - |
| `REDIS_CONFIG` | /etc/redis/redis.conf | ========================================================= |
| `COUCH_DB_USER` | (secret) | - |
| `MINIO_ENDPOINT` | http://127.0.0.1 | - |
| `REDIS_PASSWORD` | (secret) | - |
| `COUCHDB_VERSION` | 3.3.3 | - |
| `LITELLM_DB_NAME` | litellm | - |
| `LITELLM_DB_PORT` | 5432 | - |
| `LITELLM_DB_USER` | (secret) | - |
| `MINIO_ROOT_USER` | (secret) | - |
| `COUCHDB_PASSWORD` | (secret) | - |
| `COUCH_DB_SQL_URL` | http://127.0.0.1:4984 | ========================================================= |
| `INTERNAL_API_KEY` | (secret) | ========================================================= |
| `MINIO_SECRET_KEY` | (secret) | - |
| `COUCH_DB_PASSWORD` | (secret) | - |
| `USE_PRISMA_MIGRATE` | True | - |
| `LITELLM_DB_PASSWORD` | (secret) | - |
| `LITELLM_INTERNAL_DB` | true | - |
| `MINIO_ROOT_PASSWORD` | (secret) | ========================================================= |
| `BUDIBASE_ENVIRONMENT` | PRODUCTION | - |

## Configuration

- **Start command:** `/bin/sh -c 'pm2 delete litellm || true; pm2 start /opt/venv/litellm/bin/litellm --name litellm --interpreter /opt/venv/litellm/bin/python -- -c /litellm/config.yaml --host 0.0.0.0 --port 4000; exec /runner.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/FNZJ8t)
