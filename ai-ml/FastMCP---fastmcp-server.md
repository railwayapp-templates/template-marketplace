# Deploy FastMCP on Railway

A server that gives AI assistants tools and memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fastmcp-server)

## About

FastMCP is the standard Python framework for building Model Context Protocol servers — the services that give Claude, ChatGPT, Cursor and any other MCP client real tools, data and prompts. Maintained by Prefect, it turns a Python function into a fully described MCP tool: schema, validation and docs come from the signature and docstring. Some version of it sits behind most MCP servers in the wild. The hard part was never writing the tools — it was hosting them where your assistant can reach them.

Deploy FastMCP on Railway and that part is done. This template runs a complete, authenticated MCP server over streamable HTTP, with Postgres for state and Redis for stream resumability. It ships a working toolset — a searchable notes and memory store — so the deployment is useful immediately, plus a playground for calling those tools before you wire up a client. Requests reach the FastMCP service, which authenticates each one against your API key, reads and writes notes in Postgres over the private network, and records streamed events in Redis so a dropped client resumes. Replace the tools in `app/server.py` with your own and push.

![Diagram of the FastMCP, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787450309/fastmcp-architecture.png)

An MCP server is only as useful as it is reachable. Running one locally over stdio ties it to one machine and one client; hosting it over HTTP makes the same tools available to every assistant you use, on any device, over one shared store — and raises the questions any public endpoint does: who may call it, where state lives, and what happens when a long call drops.

Key features of the deployed server:

- Streamable HTTP on `/mcp`, the transport modern remote MCP clients speak
- Bearer-token auth on every request, compared in constant time
- Optional JWT/JWKS verification alongside the API key
- Postgres-backed tools with full-text search, scoped per credential
- Redis-backed event store, so a cut stream resumes and replicas are safe
- An anonymous `/health` route and a playground, neither able to read your data

The architecture is three services. **FastMCP** is the only public one: a Python 3.13 container running under uvicorn, holding no state on disk. **Postgres** stores the notes and their search index over the private network. **Redis** stores replayable stream events with a short TTL, letting the server deliberately close an idle connection — the trick that keeps long tool calls alive behind load balancers — and the client resume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| fastmcp | [gridalpha/fastmcp-railway](https://github.com/gridalpha/fastmcp-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | fastmcp | 8000 | HTTP listening port |
| `REDIS_URL` | fastmcp | - | Redis connection string for the event store |
| `PUBLIC_URL` | fastmcp | - | Public base URL advertised to clients |
| `MCP_API_KEY` | fastmcp | (secret) | Bearer token clients must send |
| `DATABASE_URL` | fastmcp | - | Postgres connection string |
| `MCP_SERVER_NAME` | fastmcp | FastMCP on Railway | Server name shown to MCP clients |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/fastmcp-server)
