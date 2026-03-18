# Deploy N8N (w/ pgvector) on Railway

N8N AI complete kit. N8N with Postgres pgvector enabled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/msyuqd)

## About

This template simplifies the deployment of **N8N**, a robust open-source workflow automation platform, integrated with **pgvector** on your cloud infrastructure. It's specifically designed with **system stability and cost savings** in mind. With a single click, you can set up N8N to create and manage workflows effortlessly.

Upon initial deployment, you can create and initialize your admin account by accessing the public networking URL of your N8N resource.

---

This template is designed for seamless deployment on Railway, leveraging its robust infrastructure to host your N8N instance. Railway handles the complexities of server management, allowing you to focus on building and automating your workflows.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |
| N8N | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | pgvector | railway |
| `POSTGRES_USER` | pgvector | (secret) |
| `PGPORT_PRIVATE` | pgvector | 5432 |
| `POSTGRES_PASSWORD` | pgvector | (secret) |
| `PORT` | N8N | 5678 |
| `DB_TYPE` | N8N | postgresdb |
| `NODE_OPTIONS` | N8N | --max_old_space_size=4090 |
| `EXECUTIONS_MODE` | N8N | regular |
| `DB_POSTGRESDB_USER` | N8N | (secret) |
| `N8N_LISTEN_ADDRESS` | N8N | :: |
| `EXECUTIONS_DATA_PRUNE` | N8N | true |
| `DB_POSTGRESDB_PASSWORD` | N8N | (secret) |
| `EXECUTIONS_DATA_MAX_AGE` | N8N | 168 |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | N8N | 30000 |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | N8N | true |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | N8N | true |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/msyuqd)
