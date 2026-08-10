# Deploy WrenAI on Railway

GenBI stack for natural language database queries & SQL charts & AI Insight

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wrenai)

## About

WrenAI is a Generative BI platform that lets users interact with data using natural language. It can translate questions into SQL, generate charts, and provide AI-powered insights. The Railway deployment runs WrenAI as a multi-service stack consisting of Wren UI, Wren Engine, Ibis Server, Wren AI Service, and Qdrant.

Hosting WrenAI on Railway involves deploying five Docker-based services: `wren-ui`, `wren-engine`, `ibis-server`, `wren-ai-service`, and `qdrant`. The stack uses Railway private networking for communication between services, with Wren UI as the only publicly accessible service. Persistent Railway Volumes are required for Wren Engine configuration, Wren UI's SQLite database, and Qdrant's vector storage. Wren AI Service requires an OpenAI API key and a configuration file that points to the Qdrant service through its Railway private domain. No PostgreSQL or Redis service is required for this deployment. Railway provides the service networking, public HTTPS endpoint, container deployment, and persistent storage needed to run the complete WrenAI stack.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wren-ui | `ghcr.io/canner/wren-ui:latest` | Web service |
| qdrant | `qdrant/qdrant:latest` | Web service |
| wren-engine | `ghcr.io/canner/wren-engine` | Web service |
| ibis-server | `ghcr.io/canner/wren-engine-ibis:latest` | Web service |
| wren-ai-service | `ghcr.io/canner/wren-ai-service:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_TYPE` | wren-ui | sqlite |
| `SQLITE_FILE` | wren-ui | /app/data/db.sqlite3 |
| `QDRANT__LOG_LEVEL` | qdrant | INFO |
| `NODE_ENV` | wren-engine | production |
| `wren.directory` | wren-engine | /usr/src/app/etc/mdl |
| `node.environment` | wren-engine | production |
| `CONFIG_PATH` | wren-ai-service | /app/config.yaml |
| `WREN_UI_PORT` | wren-ai-service | 3000 |
| `OPENAI_API_KEY` | wren-ai-service | (secret) |
| `PYTHONUNBUFFERED` | wren-ai-service | 1 |
| `SHOULD_FORCE_DEPLOY` | wren-ai-service | 1 |
| `WREN_AI_SERVICE_PORT` | wren-ai-service | 5555 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/qdrant/storage`
- **Volume:** `/usr/src/app/etc`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wrenai)
