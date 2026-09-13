# Deploy LongMemory on Railway

Persistent memory for LLM apps and agents, with MCP and a dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/longmemory)

## About

[LongMemory](https://github.com/CaviraOSS/LongMemory) is an open-source persistent memory store for
LLM applications. It gives assistants and agents somewhere to remember things between sessions,
through a REST API and an MCP endpoint that Claude Desktop, GitHub Copilot, Codex and other MCP
clients connect to directly.

This template deploys two services: the memory server and its web dashboard. There is no external
database to run, because LongMemory keeps everything in SQLite on a volume, which makes this a
genuinely small deployment for what it does. The server gets a public HTTPS domain so MCP clients
can reach it, the dashboard gets its own, and the two talk over Railway's private network. An API
key is generated for you and the server refuses to start without one, so the deployment is never
briefly open while you configure it.

One thing is worth doing before you rely on it. LongMemory can use OpenAI, Gemini, AWS Bedrock or
Ollama for embeddings, and none of them is required, but without one it falls back to a built-in
provider that hashes words into vectors. That never raises an error, so it looks like it is working,
yet only queries repeating a memory's actual words retrieve it reliably. Set an embedding key on
the server and recall becomes semantic; until you do, every boot logs a warning saying so.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashboard | [RockinPaul/longmemory_railway_template](https://github.com/RockinPaul/longmemory_railway_template) (root: /dashboard) | Web service |
| longmemory | [RockinPaul/longmemory_railway_template](https://github.com/RockinPaul/longmemory_railway_template) (root: /longmemory) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LONGMEMORY_API_KEY` | dashboard | (secret) |
| `LONGMEMORY_API_KEY` | longmemory | (secret) |

## Configuration

- **Healthcheck:** `/api/settings`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/longmemory)
