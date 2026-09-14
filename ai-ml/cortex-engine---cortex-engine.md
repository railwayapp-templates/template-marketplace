# Deploy cortex-engine on Railway

Persistent memory for AI agents: belief graph, REST API, your own LLM key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cortex-engine)

## About

cortex-engine is an open-source (MIT) memory engine for AI agents. Instead of a chat log or a plain vector store, it keeps a semantic graph of beliefs, patterns, observations and open questions, gates new claims by prediction error, checks them against what the agent already believes, lets unused memories fade, and consolidates them in a scheduled dream pass. Built by the Fozikio org and used daily by a persistent agent.

This template runs the engine's REST server from the official Dockerfile with a SQLite store on a Railway volume mounted at /data. Embeddings are computed in-process, so there is no external embedding service to provision. The LLM-backed tools (reflect, digest, dream, query expansion) use an API-key provider: OpenAI by default, or set CORTEX_LLM to anthropic, gemini or kimi and supply the matching key. The server refuses to start without CORTEX_API_TOKEN, which the template generates for you; clients send it as the x-cortex-token header. The health check hits /health. Expect a few seconds of downtime on redeploys while the volume moves to the new deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cortex-engine | [Fozikio/cortex-engine](https://github.com/Fozikio/cortex-engine) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CORTEX_LLM` | openai | LLM provider for reflect, digest, dream and query expansion: openai, anthropic, gemini or kimi. Supply the matching API key variable. |
| `CORTEX_EMBED` | built-in | Embedding provider. built-in runs in-process and needs nothing else; ollama or vertex need their own service. |
| `OPENAI_API_KEY` | (secret) | Your OpenAI API key, used when CORTEX_LLM=openai. For another provider, set CORTEX_LLM and add that provider's key variable as named in the cortex-engine README. |
| `CORTEX_API_TOKEN` | (secret) | Token the REST server requires on every request; generated for you. Clients send it as the x-cortex-token header. Rotate it here if it leaks. |
| `CORTEX_SQLITE_PATH` | /data/cortex.db | Where the SQLite store lives. Keep it on the /data volume so memory survives redeploys. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, Shell, JavaScript, Python, Dockerfile, PowerShell, Tape

[View on Railway →](https://railway.com/deploy/cortex-engine)
