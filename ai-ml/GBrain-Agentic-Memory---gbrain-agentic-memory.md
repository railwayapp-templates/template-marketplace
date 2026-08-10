# Deploy GBrain Agentic Memory on Railway

Get your own self hosted gbrain agentic memory in 2 simple steps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gbrain-agentic-memory)

## About

Your AI agent forgets everything the moment the conversation ends. GBrain is the memory it has been missing: a knowledge base your agent can search, write to and reason over, at a URL any MCP client can reach.

Most search tools hand back a list of pages and leave the reading to you. GBrain reads them and writes the answer, with citations, and tells you what it doesn't know yet. Every page it stores is wired into a knowledge graph as you go.

[GBrain](https://github.com/garrytan/gbrain) was built by Garry Tan to run his own agents, on his own infrastructure. This template is the shortest path to that. One Railway service with the database built in. No second service, no connection string, nothing that phones home.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gbrain | [Ntelikatos/gbrain-hosted-agentic-memory](https://github.com/Ntelikatos/gbrain-hosted-agentic-memory) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GITHUB_TOKEN` | (secret) | Fine-grained GitHub PAT with read/write Contents access. Only needed if BRAIN_REPO_URL points at a private repo. |
| `BRAIN_REPO_URL` | - | Git URL of a GitHub repo to mirror your brain's markdown into, so it's readable and portable outside Railway. Empty keeps the brain repo local to the volume. |
| `EMBEDDING_MODEL` | openai:text-embedding-3-large | Which embedding model builds the search index, as provider:model. Change the provider here if you are not using OpenAI. Pick before your first ingest; changing it later means re-embedding everything. |
| `ANTHROPIC_API_KEY` | (secret) | Lets gbrain think write a cited answer instead of returning search results. Memory, search, and the knowledge graph all work without it. |
| `EMBEDDING_API_KEY` | (secret) | Your API key for the provider named in EMBEDDING_MODEL. OpenAI keys start with sk-. Search cannot work without one, so the service will not start until this is set. |
| `GBRAIN_HTTP_CORS_ORIGIN` | https://claude.ai,https://chatgpt.com | Browser origins allowed to complete the OAuth handshake. Needed for Claude Desktop and ChatGPT; CLI clients like Claude Code work without it. Add to the list rather than replacing it. |
| `GBRAIN_ADMIN_BOOTSTRAP_TOKEN` | (secret) | Password for the /admin dashboard. Generated per-deploy — read it from this variable rather than the deploy logs. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gbrain-agentic-memory)
