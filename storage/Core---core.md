# Deploy Core on Railway

Your Personal Memory Layer for AI Apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/core)

## About

CORE is an open-source unified, persistent memory layer for all your AI tools. Your context follows you from Cursor to Claude to ChatGPT to Claude Code. One knowledge graph remembers who said what, when, and why. Connect once, remember everywhere. Stop managing context and start building.

Deploying core includes configuring your AI providers (OpenAI, Anthropic, etc.). Currently it's defaulted to OpenAI

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg18-trixie` | Database |
| Redis | `redis:8.2.1` | Database |
| core | `redplanethq/core:0.5.9` | Web service |
| neo4j | `redplanethq/neo4j:0.1.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `MODEL` | core | gpt-4.1-2025-04-14 | Model on which CORE will run |
| `APP_ENV` | core | production | - |
| `VERSION` | core | 0.1.32 | - |
| `NODE_ENV` | core | production | - |
| `NEO4J_URI` | core | bolt://neo4j:7687 | - |
| `NEO4J_AUTH` | core | neo4j/27192e6432564f4788d55c15131bd5ac | - |
| `LOGIN_ORIGIN` | core | (secret) | - |
| `POSTGRES_USER` | core | (secret) | - |
| `ENCRYPTION_KEY` | core | 2818143646516f6fffd707b36f334bbb | - |
| `GRAPH_PROVIDER` | core | neo4j | - |
| `NEO4J_PASSWORD` | core | (secret) | - |
| `NEO4J_USERNAME` | core | (secret) | - |
| `OPENAI_API_KEY` | core | (secret) | - |
| `QUEUE_PROVIDER` | core | bullmq | - |
| `REDIS_PASSWORD` | core | (secret) | - |
| `SESSION_SECRET` | core | (secret) | - |
| `EMBEDDING_MODEL` | core | text-embedding-3-small | - |
| `VECTOR_PROVIDER` | core | pgvector | - |
| `MAGIC_LINK_SECRET` | core | (secret) | - |
| `POSTGRES_PASSWORD` | core | (secret) | - |
| `ENABLE_EMAIL_LOGIN` | core | (secret) | - |
| `REDIS_TLS_DISABLED` | core | true | - |
| `EMBEDDING_MODEL_SIZE` | core | 1536 | - |
| `NEO4J_AUTH` | neo4j | neo4j/27192e6432564f4788d55c15131bd5ac | - |
| `NEO4J_apoc_export_file_enabled` | neo4j | true | - |
| `NEO4J_apoc_import_file_enabled` | neo4j | true | - |
| `NEO4J_server_memory_heap_max__size` | neo4j | 4G | - |
| `NEO4J_server_memory_heap_initial__size` | neo4j | 2G | - |
| `NEO4J_apoc_import_file_use_neo4j_config` | neo4j | true | - |
| `NEO4J_dbms_security_procedures_allowlist` | neo4j | gds.*,apoc.* | - |
| `NEO4J_dbms_security_procedures_unrestricted` | neo4j | gds.*,apoc.* | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/core)
