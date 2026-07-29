# Deploy Agent Workbench | Tools over MCP, a Sandbox and a Memory That Lasts on Railway

An agent wired to MCP tools, a code sandbox and a memory it keeps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-workbench-or-tools-over-mcp-a-sand)

## About

An agent with the three things an agent actually needs: tools it discovers over MCP, a sandbox to run code in, and a memory that survives the conversation.

Four services, already wired to each other. One of them is public.

This catalogue is full of agents. OpenClaw alone is installed more than 15,000 times, and several others are in the thousands. Every one of them is a single container: the agent, and whatever it can reach on the open internet.

What is missing is everything around it. Among the four hundred most-installed templates there is not one where an agent is connected to a tool server, a place to execute code, and a memory it keeps. The parts exist separately — an MCP server here, a sandbox there, pgvector somewhere else — and joining them is a day of protocol documentation, private-network addresses and permission flags, for a result that looks obvious afterwards.

The parts here are ordinary. The wiring is the product.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:pg17` | Database |
| Agent | [ak40u/agent-workbench-railway](https://github.com/ak40u/agent-workbench-railway) | Web service |
| Sandbox | [ak40u/code-sandbox-railway-starter](https://github.com/ak40u/code-sandbox-railway-starter) | Worker |
| Tools | [ak40u/agent-workbench-railway](https://github.com/ak40u/agent-workbench-railway) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | Agent | 8080 |
| `MODEL` | Agent | gpt-4o-mini |
| `API_TOKEN` | Agent | (secret) |
| `MCP_TOKEN` | Agent | (secret) |
| `BUDGET_USD` | Agent | 5 |
| `MODEL_API_KEY` | Agent | (secret) |
| `SANDBOX_TOKEN` | Agent | (secret) |
| `MODEL_BASE_URL` | Agent | https://api.openai.com/v1 |
| `HOST` | Sandbox | :: |
| `PORT` | Sandbox | 8080 |
| `SANDBOX_TOKEN` | Sandbox | (secret) |
| `PORT` | Tools | 8080 |
| `MCP_TOKEN` | Tools | (secret) |
| `HTTP_ALLOWLIST` | Tools | * |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node dist/tools.js`

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/agent-workbench-or-tools-over-mcp-a-sand)
