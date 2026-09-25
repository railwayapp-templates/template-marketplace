# Deploy Nimbus Agent - 24/7 Employee on Railway

Deploy a fully autonomous 24/7 AI employee with built-in MCP tools.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nimbus-agent-247-employee)

## About

Deploy the ultimate open-source AI agent platform in one click. Nimbus doesn't just chat—it executes complex, multi-step workflows, natively integrates with your existing tools, and works autonomously in the background.

This template is an enterprise-grade, production-ready stack that automatically networks all essential microservices: 
1. **Dashboard:** The Next.js control panel for managing agents.
2. **Gateway:** The Python-based MCP execution engine.
3. **Qdrant:** Vector database for semantic memory.
4. **Redis:** Mission-critical task queuing for background jobs.
5. **PostgreSQL:** Reliable persistent storage for user data.

All internal service passwords (Database, Redis, Vector Store) are securely auto-generated out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `pgvector/pgvector:pg17` | Database |
| gateway | `ghcr.io/yoodule/nimbus/gateway:v1.2.0` | Web service |
| qdrant | `qdrant/qdrant:v1.12.4` | Database |
| dashboard | `ghcr.io/yoodule/nimbus/dashboard:v1.2.0` | Web service |
| redis | `redis:7.4.1-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | postgres | Database name |
| `POSTGRES_USER` | postgres | (secret) | Database username |
| `POSTGRES_PASSWORD` | postgres | (secret) | Database password |
| `PORT` | gateway | 8088 | Railway port |
| `REDIS_URL` | gateway | - | Redis connection |
| `NIMBUS_ENV` | gateway | production | Environment name |
| `NIMBUS_URL` | gateway | - | Dashboard URL |
| `QDRANT_URL` | gateway | http://qdrant.railway.internal:6333 | Qdrant URL |
| `GATEWAY_PORT` | gateway | 8088 | Internal port |
| `MCP_JSON_B64` | gateway | - | MCP Config |
| `POSTGRES_URL` | gateway | - | Postgres connection |
| `VNC_PASSWORD` | gateway | (secret) | Browser password |
| `NIMBUS_API_KEY` | gateway | (secret) | Internal API key |
| `QDRANT_API_KEY` | gateway | (secret) | Qdrant API key |
| `REDIS_PASSWORD` | gateway | (secret) | Redis password |
| `OLLAMA_BASE_URL` | gateway | https://ollama.com/api | Ollama URL |
| `MCP_ALLOWED_HOSTS` | gateway | - | Allowed hosts |
| `FASTMCP_DOCKET_URL` | gateway | - | Queue URL |
| `NIMBUS_SERVICE_KEY` | gateway | - | Auth key |
| `WHATSAPP_TOKEN_URL` | gateway | (secret) | WhatsApp token |
| `FASTMCP_DOCKET_NAME` | gateway | nimbus-docket | Queue name |
| `MCP_ALLOWED_ORIGINS` | gateway | - | Allowed origins |
| `WHATSAPP_PUBLIC_URL` | gateway | http://localhost:8081 | WhatsApp URL |
| `NIMBUS_PROJECTS_ROOT` | gateway | /root/.nimbus/projects | Projects path |
| `WHATSAPP_API_BASE_URL` | gateway | http://localhost:8081/api | WhatsApp API |
| `NIMBUS_USER_PROFILE_ROOT` | gateway | /root/.nimbus/projects/default | Profiles path |
| `NIMBUS_USER_PROJECTS_ROOT` | gateway | /root/.nimbus/projects/default | User projects path |
| `QDRANT__SERVICE__API_KEY` | qdrant | (secret) | Qdrant API key |
| `QDRANT__SERVICE__ENABLE_STATIC_ROUTING` | qdrant | true | Enable static UI |
| `NO_HTTPS` | dashboard | true | Disable HTTPS internally |
| `REDIS_URL` | dashboard | - | Redis connection |
| `QDRANT_URL` | dashboard | http://qdrant.railway.internal:6333 | Qdrant URL |
| `POSTGRES_URL` | dashboard | - | Postgres connection |
| `NIMBUS_API_KEY` | dashboard | (secret) | Internal API key |
| `BETTER_AUTH_URL` | dashboard | - | Auth URL |
| `OLLAMA_BASE_URL` | dashboard | https://ollama.com/api | Ollama URL |
| `TRUSTED_ORIGINS` | dashboard | - | Trusted origins |
| `BETTER_AUTH_SECRET` | dashboard | (secret) | Auth secret |
| `NIMBUS_GATEWAY_URL` | dashboard | - | Gateway URL |
| `NEXT_PUBLIC_VNC_URL` | dashboard | - | Public URL of Gateway port 6080 (noVNC desktop) |
| `NIMBUS_SIGN_UP_MODE` | dashboard | open | Signup mode |
| `NEXT_PUBLIC_VNC_PASSWORD` | dashboard | (secret) | Browser password |
| `FORCE_RESTART` | redis | 1 | Trigger restart |
| `REDIS_PASSWORD` | redis | (secret) | Redis password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "echo \"\$MCP_JSON_B64\" | base64 -d > /app/mcp.json && exec /entrypoint.sh"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/qdrant/storage`
- **Start command:** `redis-server --requirepass TGeyhZuajewBQ5ztV7amcQCoCUs8Z`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nimbus-agent-247-employee)
