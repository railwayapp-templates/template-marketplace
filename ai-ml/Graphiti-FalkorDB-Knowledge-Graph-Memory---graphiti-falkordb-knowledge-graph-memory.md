# Deploy Graphiti + FalkorDB Knowledge Graph Memory on Railway

Real-time temporal knowledge-graph MCP server on low-RAM FalkorDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/graphiti-falkordb-knowledge-graph-memory)

## About

[Graphiti](https://github.com/getzep/graphiti) (by **Zep**) builds **real-time, temporally-aware
knowledge graphs** for AI agents — it extracts entities, relationships, and *when each fact was
true* from the text you feed it, so your agent gets memory that updates incrementally instead of
being re-indexed from scratch. This template runs Graphiti's **MCP server** so any Model Context
Protocol client (Claude, Cursor, Windsurf, your own app) can add episodes and search the graph
over plain HTTP — backed by [**FalkorDB**](https://www.falkordb.com/), an ultra-fast, Redis-based
graph database that is far lighter on RAM than Neo4j.

This template provisions **two linked services**: the official **`falkordb/falkordb`** container
as a persistent graph store (with its own volume and an optional web browser UI), and the
**Graphiti MCP server** (`zepai/knowledge-graph-mcp`) exposed on `/mcp/` over HTTP. Railway wires
them over its private network, generates a unique database password as a sealed secret, attaches
the volume, provisions TLS and a public domain, and restarts on failure. The graph store is never
left open and survives redeploys. You bring only an LLM API key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| falkordb | `falkordb/falkordb` | Web service |
| graphiti | `zepai/knowledge-graph-mcp:standalone` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | falkordb | 3000 |
| `BROWSER` | falkordb | 1 |
| `FALKORDB_PORT` | falkordb | 16379 |
| `FALKORDB_PASSWORD` | falkordb | (secret) |
| `PORT` | graphiti | 8000 |
| `MODEL_NAME` | graphiti | gpt-5.4-mini-2026-03-17 |
| `OPENAI_API_KEY` | graphiti | (secret) |
| `SEMAPHORE_LIMIT` | graphiti | 10 |
| `FALKORDB_DATABASE` | graphiti | default_db |
| `FALKORDB_PASSWORD` | graphiti | (secret) |
| `GRAPHITI_GROUP_ID` | graphiti | main |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/falkordb/data`
- **Start command:** `uv run --no-sync python -c 'import mcp.server.fastmcp as f; from mcp.server.transport_security import TransportSecuritySettings as T; f.FastMCP.__init__=(lambda _o: lambda self,*a,**k: _o(self,*a,**{**k,"transport_security":T(enable_dns_rebinding_protection=False)}))(f.FastMCP.__init__); import runpy; runpy.run_path("main.py", run_name="__main__")'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/graphiti-falkordb-knowledge-graph-memory)
