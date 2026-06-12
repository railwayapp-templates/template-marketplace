# Deploy graphiti-mcp-but-working-railway on Railway

Railway-friendly template/fork of michabbb/graphiti-mcp-but-working

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/graphiti-mcp-but-working-railway)

## About

This template builds a fork of the michabbb/graphiti-mcp-but-working repo, but with Railway-friendly Dockerfile and variables.  No external networking by default.

This requires a running Neo4j database, Redis, and API keys for LLM's of choice.  

### Deployment Dependencies

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| graphiti-mcp-but-working-railway | [trichard3000/graphiti-mcp-but-working-railway](https://github.com/trichard3000/graphiti-mcp-but-working-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NEO4J_URI` | bolt://neo4j:7687 | URI for Neo4j Bolt service |
| `MODEL_NAME` | gpt-5-mini | LLM model name |
| `NEO4J_USER` | (secret) | User for Neo4j database |
| `REDIS_HOST` | redis | Hostname for Redis |
| `REDIS_PORT` | 6379 | Port for Redis |
| `ALLOWED_HOSTS` | graphiti-mcp-but-working-railway | Default to template name.  Needed to start. |
| `NEO4J_PASSWORD` | (secret) | Password for Neo4j database |
| `OPENAI_API_KEY` | (secret) | Key for OpenAI API |
| `REDIS_PASSWORD` | (secret) | Password for Redis instance |
| `CLEAR_GRAPH_PASSWORD` | (secret) | Password to use when clearing the Graph db |

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/graphiti-mcp-but-working-railway)
