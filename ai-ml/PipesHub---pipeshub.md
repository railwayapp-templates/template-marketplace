# Deploy PipesHub on Railway

AI context layer with enterprise search, connectors, agents, and RAG

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pipeshub)

## About

PipesHub is an open-source AI context layer for enterprise search, retrieval, connectors, and agentic workflows. This template deploys the stable `v0.6.0` release with MongoDB, Redis Streams, Qdrant, and Neo4j. The `PipesHub` service owns the public HTTPS domain on port `3000`; all databases remain private.

On first deployment, enter `PIPESHUB_ADMIN_EMAIL`. The template generates the administrator password and all cross-service secrets. A bootstrap adapter creates the single initial organization before the public health gate succeeds. Sign in with the email you entered and the `PIPESHUB_ADMIN_PASSWORD` value shown on the PipesHub service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j | [monotykamary/railway-template-pipeshub](https://github.com/monotykamary/railway-template-pipeshub) (root: /neo4j) | Database |
| PipesHub | [monotykamary/railway-template-pipeshub](https://github.com/monotykamary/railway-template-pipeshub) (root: /app) | Web service |
| Redis | [monotykamary/railway-template-pipeshub](https://github.com/monotykamary/railway-template-pipeshub) (root: /redis) | Database |
| Qdrant | [monotykamary/railway-template-pipeshub](https://github.com/monotykamary/railway-template-pipeshub) (root: /qdrant) | Database |
| MongoDB | [monotykamary/railway-template-pipeshub](https://github.com/monotykamary/railway-template-pipeshub) (root: /mongodb) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEO4J_AUTH` | Neo4j | - | Neo4j username and generated password used for first initialization. |
| `NEO4J_PLUGINS` | Neo4j | ["apoc"] | JSON list of Neo4j plugins installed at startup. |
| `PIPESHUB_NEO4J_PASSWORD` | Neo4j | (secret) | Generated password shared with the PipesHub Neo4j client. |
| `NEO4J_server_memory_heap_max__size` | Neo4j | 2G | Maximum Neo4j Java heap size. |
| `NEO4J_server_memory_pagecache_size` | Neo4j | 1G | Neo4j page-cache allocation. |
| `NEO4J_server_memory_heap_initial__size` | Neo4j | 1G | Initial Neo4j Java heap size. |
| `NEO4J_dbms_security_procedures_unrestricted` | Neo4j | apoc.* | Neo4j procedures allowed without sandbox restrictions. |
| `HOME` | PipesHub | /data/pipeshub | Writable home directory on the persistent PipesHub volume. |
| `PORT` | PipesHub | 3000 | Public HTTP port served by the PipesHub web application. |
| `HF_HOME` | PipesHub | /data/pipeshub/.cache/huggingface | Persistent Hugging Face model cache directory. |
| `NODE_ENV` | PipesHub | production | Enables production behavior in the Node.js API. |
| `REDIS_DB` | PipesHub | 0 | Redis logical database used by PipesHub. |
| `LOG_LEVEL` | PipesHub | info | Application log verbosity. |
| `MONGO_URI` | PipesHub | - | Private MongoDB connection URI using the generated database password. |
| `NEO4J_URI` | PipesHub | - | Private Neo4j Bolt endpoint. |
| `REDIS_URL` | PipesHub | - | Private authenticated Redis connection URI. |
| `DATA_STORE` | PipesHub | neo4j | Graph data-store provider selected for PipesHub. |
| `MCP_SCOPES` | PipesHub | openid,profile,email,offline_access,semantic:write,conversation:write,conversation:chat,kb:read,team:read,user:read,config:read,agent:read,agent:execute,connector:read | OAuth scopes exposed to PipesHub MCP clients. |
| `REDIS_HOST` | PipesHub | - | Redis hostname on Railway private networking. |
| `REDIS_PORT` | PipesHub | 6379 | Redis TCP port. |
| `SECRET_KEY` | PipesHub | (secret) | Generated application encryption and signing secret. |
| `QDRANT_HOST` | PipesHub | - | Qdrant hostname on Railway private networking. |
| `QDRANT_PORT` | PipesHub | 6333 | Qdrant HTTP API port. |
| `STRICT_MODE` | PipesHub | false | Keeps the upstream optional strict validation mode disabled. |
| `SANDBOX_MODE` | PipesHub | docker | Keeps untrusted code execution disabled when Railway provides no Docker daemon. |
| `KV_STORE_TYPE` | PipesHub | redis | Key-value store provider used by PipesHub. |
| `MONGO_DB_NAME` | PipesHub | es | MongoDB database name used by PipesHub. |
| `QUERY_BACKEND` | PipesHub | http://localhost:8000 | Internal all-in-one query service endpoint. |
| `REDIS_TIMEOUT` | PipesHub | 10000 | Redis operation timeout in milliseconds. |
| `MESSAGE_BROKER` | PipesHub | redis | Redis Streams message-broker provider. |
| `NEO4J_DATABASE` | PipesHub | neo4j | Neo4j database selected by PipesHub. |
| `NEO4J_PASSWORD` | PipesHub | (secret) | Generated Neo4j password referenced from the Neo4j service. |
| `NEO4J_USERNAME` | PipesHub | (secret) | Neo4j username. |
| `QDRANT_API_KEY` | PipesHub | (secret) | Generated Qdrant API key referenced from the Qdrant service. |
| `REDIS_PASSWORD` | PipesHub | (secret) | Generated Redis password referenced from the Redis service. |
| `ALLOWED_ORIGINS` | PipesHub | - | Public Railway origin allowed by application CORS policy. |
| `OMP_NUM_THREADS` | PipesHub | 2 | OpenMP thread limit for local model workloads. |
| `REDIS_KV_PREFIX` | PipesHub | pipeshub:kv: | Namespace prefix for PipesHub Redis keys. |
| `DEFER_EXTRACTION` | PipesHub | false | Processes extraction immediately rather than deferring it. |
| `INDEXING_BACKEND` | PipesHub | http://localhost:8091 | Internal all-in-one indexing service endpoint. |
| `QDRANT_GRPC_PORT` | PipesHub | 6334 | Qdrant gRPC API port. |
| `CONNECTOR_BACKEND` | PipesHub | http://localhost:8088 | Internal all-in-one connector service endpoint. |
| `PIPESHUB_DATA_DIR` | PipesHub | /data/pipeshub | Persistent directory used by the Railway bootstrap marker and app data. |
| `PIPESHUB_ORG_NAME` | PipesHub | PipesHub | Name of the initial organization created on first deployment. |
| `SKIP_DOMAIN_CHECK` | PipesHub | false | Requires normal upstream domain validation. |
| `HIDE_SECRET_CONFIG` | PipesHub | (secret) | Redacts secret configuration values from application responses. |
| `FRONTEND_PUBLIC_URL` | PipesHub | - | Generated public HTTPS URL used by the frontend and API. |
| `PIPESHUB_ADMIN_NAME` | PipesHub | Railway Admin | Display name of the initial administrator. |
| `USE_PARSING_SERVICE` | PipesHub | false | Uses the bundled parser instead of an external parsing service. |
| `EMBEDDING_SERVER_URL` | PipesHub | http://localhost:8002 | Internal all-in-one embedding service endpoint. |
| `PIPESHUB_ADMIN_EMAIL` | PipesHub | - | Required email address for the initial administrator. Enter this during deployment. |
| `REDIS_STREAMS_MAXLEN` | PipesHub | 500000 | Approximate maximum length retained for Redis Streams. |
| `SANDBOX_DOCKER_IMAGE` | PipesHub | pipeshubai/pipeshub-sandbox:0.6.0-slim | Pinned upstream sandbox image used only when a Docker daemon is available. |
| `REPLICA_SET_AVAILABLE` | PipesHub | false | Configures MongoDB as the tested single-node deployment. |
| `PIPESHUB_ADMIN_PASSWORD` | PipesHub | (secret) | Generated password for the initial administrator. Retrieve it from service variables after deployment. |
| `PIPESHUB_BOOTSTRAP_TIMEOUT` | PipesHub | 600 | Maximum seconds allowed for first-boot readiness and organization creation. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password shared with PipesHub. |
| `QDRANT_API_KEY` | Qdrant | (secret) | Generated API key shared with the PipesHub Qdrant client. |
| `QDRANT__SERVICE__API_KEY` | Qdrant | (secret) | Qdrant server API key derived from the generated service secret. |
| `QDRANT__SERVICE__GRPC_PORT` | Qdrant | 6334 | Qdrant gRPC listener port. |
| `QDRANT__SERVICE__HTTP_PORT` | Qdrant | 6333 | Qdrant HTTP listener port. |
| `QDRANT__SERVICE__MAX_REQUEST_SIZE_MB` | Qdrant | 64 | Maximum accepted Qdrant request size in megabytes. |
| `GLIBC_TUNABLES` | MongoDB | glibc.pthread.rseq=0 | Compatibility setting for MongoDB on Railway container hosts. |
| `MONGO_PASSWORD` | MongoDB | (secret) | Generated MongoDB administrator password shared with PipesHub. |
| `MONGO_USERNAME` | MongoDB | (secret) | MongoDB administrator username used in the private connection URI. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | MongoDB root password derived from the generated service secret. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root username created on first initialization. |

## Configuration

- **Volume:** `/data`
- **Healthcheck:** `/api/v1/health/services`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/pipeshub`
- **Volume:** `/qdrant/storage`
- **Volume:** `/data/db`

**Category:** AI/ML · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/pipeshub)
