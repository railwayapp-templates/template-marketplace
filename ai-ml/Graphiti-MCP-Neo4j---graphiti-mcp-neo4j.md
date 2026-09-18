# Deploy Graphiti MCP + Neo4j on Railway

Knowledge-graph memory MCP server for AI agents, with persistent Neo4j

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/graphiti-mcp-neo4j)

## About

Graphiti is the open-source temporal knowledge graph engine from Zep. Its MCP server turns that graph into long-term memory for AI agents: `add_memory` ingests text, chat messages, or JSON and extracts entities and relationships with bi-temporal validity, and `search_memory_facts` and `search_nodes` retrieve them with hybrid semantic, keyword, and graph search. Any MCP client, including Claude Code, Cursor, VS Code, and Claude Desktop, can use it as persistent memory across sessions.

Hosting the Graphiti MCP server means running the official `zepai/knowledge-graph-mcp:1.1.0-standalone` image next to a Neo4j 5.26 Community database that keeps the graph on a persistent volume. This template pins both images, selects the Neo4j backend and an IPv6 dual-stack bind through the server's own configuration overrides (no custom start command or config file mount), wires the two services together over Railway private networking, generates the Neo4j password, and uses `/health` and Neo4j's HTTP discovery endpoint for health checks. The MCP endpoint is served over streamable HTTP at `/mcp` on a public domain so remote MCP clients can connect. Graphiti needs an LLM and an embedder to extract knowledge, so an `OPENAI_API_KEY` is required at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Neo4j | `neo4j:5.26.30-community` | Database |
| Graphiti MCP | `zepai/knowledge-graph-mcp:1.1.0-standalone` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Neo4j | 7474 | Neo4j HTTP connector port; Railway's healthcheck probes GET / on $PORT (the unauthenticated discovery endpoint). Bolt stays on 7687. |
| `NEO4J_AUTH` | Neo4j | - | Initial credentials in the image's user/password format. |
| `GRAPH_DB_USER` | Neo4j | (secret) | Admin username. The Docker image only accepts neo4j here (NEO4J_AUTH rejects any other user). Named without the NEO4J_ prefix: the Neo4j entrypoint turns every NEO4J_* variable into a config setting and refuses to start on unknown ones. |
| `GRAPH_BOLT_URL` | Neo4j | - | Private-network Bolt URL for other services in this project (IPv6, port included). |
| `GRAPH_DB_PASSWORD` | Neo4j | (secret) | Generated admin password (Neo4j requires at least 8 characters). Applied only on the first start of an empty volume; change it later with ALTER USER, not by editing this variable. |
| `NEO4J_server_memory_heap_max__size` | Neo4j | 512m | JVM heap max. Raise together with the pagecache when the graph grows (upstream compose uses 1G). |
| `NEO4J_server_memory_pagecache_size` | Neo4j | 256m | Page cache for graph data. Keep heap + pagecache below the service memory limit. |
| `NEO4J_server_default__listen__address` | Neo4j | :: | Bind Bolt and HTTP on IPv6 dual-stack so *.railway.internal (IPv6-only) works. The image default 0.0.0.0 is IPv4-only. |
| `NEO4J_server_memory_heap_initial__size` | Neo4j | 512m | JVM heap initial size. Upstream compose uses 512m. |
| `PORT` | Graphiti MCP | 8000 | MCP server listen port (config server.port is 8000). Railway's healthcheck and edge proxy probe $PORT, so keep it at 8000. |
| `NEO4J_URI` | Graphiti MCP | - | Bolt URI of the Neo4j service over Railway private networking (IPv6, port 7687 included). |
| `MODEL_NAME` | Graphiti MCP | gpt-4.1-mini | LLM used for entity and relationship extraction (upstream .env.example default). The image's config.yaml default is gpt-5.5; any OpenAI chat model with structured output works. |
| `NEO4J_USER` | Graphiti MCP | (secret) | Neo4j username (always neo4j for the initial admin user). |
| `SERVER__HOST` | Graphiti MCP | 0.0.0.0 | Bind address. Keep 0.0.0.0: uvicorn binds '::' as IPv6-only and Railway's healthcheck never connects. MCP clients use the public HTTPS domain. |
| `LLM__PROVIDER` | Graphiti MCP | openai | LLM provider: openai, azure_openai, anthropic, gemini or groq. Non-OpenAI providers need their own key (ANTHROPIC_API_KEY, GOOGLE_API_KEY, GROQ_API_KEY) and still need OPENAI_API_KEY unless the embedder is gemini (see README). |
| `EMBEDDER_MODEL` | Graphiti MCP | text-embedding-3-small | Embedding model (1536 dimensions). Changing dimensions after data exists requires clearing the graph. |
| `GOOGLE_API_KEY` | Graphiti MCP | (secret) | Optional. Only used when LLM__PROVIDER=gemini or EMBEDDER__PROVIDER=gemini. |
| `NEO4J_DATABASE` | Graphiti MCP | neo4j | Neo4j database name. Community Edition only has the default database, so leave it as neo4j. |
| `NEO4J_PASSWORD` | Graphiti MCP | (secret) | Neo4j password, generated on the Neo4j service. |
| `OPENAI_API_KEY` | Graphiti MCP | (secret) | REQUIRED to boot. Graphiti needs an LLM plus an embedder to extract entities, and the server builds an OpenAI reranker client at startup that fails without a key. Used for MODEL_NAME (LLM), EMBEDDER_MODEL (embeddings) and reranking. |
| `OPENAI_API_URL` | Graphiti MCP | - | Optional. OpenAI-compatible base URL (for example a LiteLLM gateway). Default https://api.openai.com/v1. |
| `VOYAGE_API_KEY` | Graphiti MCP | (secret) | Optional. Only used when EMBEDDER__PROVIDER=voyage. |
| `SEMAPHORE_LIMIT` | Graphiti MCP | 10 | Max episodes processed concurrently. Lower it (1-2) on free/low OpenAI tiers to avoid 429s; raise it on Tier 4+. |
| `ANTHROPIC_API_KEY` | Graphiti MCP | (secret) | Optional. Only used when LLM__PROVIDER=anthropic. |
| `GRAPHITI_GROUP_ID` | Graphiti MCP | main | Default graph namespace (group_id) for episodes added without an explicit group. |
| `SERVER__TRANSPORT` | Graphiti MCP | http | MCP transport. http = streamable HTTP at /mcp/ (upstream default and recommended). sse (/sse) is deprecated upstream. |
| `DATABASE__PROVIDER` | Graphiti MCP | neo4j | Graph database backend. The image's config.yaml defaults to falkordb; this override selects the Neo4j service in this template. |
| `EMBEDDER__PROVIDER` | Graphiti MCP | openai | Embedder provider: openai, azure_openai, gemini or voyage. |
| `GRAPHITI_TELEMETRY_ENABLED` | Graphiti MCP | false | Disables graphiti-core anonymous telemetry (PostHog). |

## Configuration

- **Healthcheck:** `/`
- **Volume:** `/data`
- **Start command:** `sh -c 'echo IyBSYWlsd2F5IGxhdW5jaGVyIGZvciB0aGUgR3JhcGhpdGkgTUNQIHNlcnZlciAoZW1iZWRkZWQgYmFzZTY0IGluIHRoZSB0ZW1wbGF0ZSBzdGFydCBjb21tYW5kKS4KIyBUaGUgc2VydmVyIGJ1aWxkcyBGYXN0TUNQIHdpdGggdGhlIFNESydzIGRlZmF1bHQgaG9zdCAxMjcuMC4wLjEsIHdoaWNoIGF1dG8tZW5hYmxlcyBETlMtcmViaW5kaW5nCiMgcHJvdGVjdGlvbiB3aXRoIGEgbG9jYWxob3N0LW9ubHkgSG9zdCBhbGxvdy1saXN0LiBCZWhpbmQgUmFpbHdheSdzIHB1YmxpYyBwcm94eSB0aGUgSG9zdCBoZWFkZXIgaXMgdGhlCiMgc2VydmljZSBkb21haW4sIHNvIGV2ZXJ5IC9tY3AgcmVxdWVzdCB3b3VsZCBnZXQgIjQyMSBJbnZhbGlkIEhvc3QgaGVhZGVyIi4gRGlzYWJsZSB0aGF0IGNoZWNrIChpdCBndWFyZHMKIyBsb2NhbGhvc3Qgc2VydmVycywgbm90IGEgcHVibGljIGVuZHBvaW50KSBhbmQgc3RhcnQgdGhlIHVwc3RyZWFtIHNlcnZlciB1bmNoYW5nZWQuCmltcG9ydCBzeXMKCnN5cy5wYXRoLmluc2VydCgwLCAiL2FwcC9tY3Avc3JjIikKaW1wb3J0IGdyYXBoaXRpX21jcF9zZXJ2ZXIgYXMgZyAgIyBub3FhOiBFNDAyCmZyb20gbWNwLnNlcnZlci50cmFuc3BvcnRfc2VjdXJpdHkgaW1wb3J0IFRyYW5zcG9ydFNlY3VyaXR5U2V0dGluZ3MgICMgbm9xYTogRTQwMgoKZy5tY3Auc2V0dGluZ3MudHJhbnNwb3J0X3NlY3VyaXR5ID0gVHJhbnNwb3J0U2VjdXJpdHlTZXR0aW5ncyhlbmFibGVfZG5zX3JlYmluZGluZ19wcm90ZWN0aW9uPUZhbHNlKQpnLm1haW4oKQo= | base64 -d > /tmp/railway-launch.py && exec uv run --no-sync python /tmp/railway-launch.py'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/graphiti-mcp-neo4j)
