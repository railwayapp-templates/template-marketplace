# Deploy ElizaOS — Self-Hosted AI Agent with Memory on Railway

Self-host an ElizaOS agent — character AI with pgvector memory

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elizaos-ai-agent)

## About

ElizaOS is the open-source, TypeScript framework for building autonomous AI agents with personality — character-driven agents that hold conversations, remember context across sessions, use plugins, and operate across Discord, Telegram, X, and the web. This template deploys an authenticated ElizaOS agent backed by OpenAI and persistent pgvector memory, so your agent's knowledge and conversation history survive redeploys and its API isn't left open. Define an agent's character, give it long-term memory, and run it 24/7 on your own infrastructure.

---

ElizaOS is a powerful agent framework, and three specifics make this a production-ready deploy rather than an exposed demo — all handled here.

**The agent API is authenticated — not left open.** A common ElizaOS mistake is exposing the agent's API publicly with no protection, letting anyone query or drive it. This template secures the agent endpoint so only authenticated requests reach it, which matters because the agent holds your keys and can act. Set a strong secret and keep the endpoint access-controlled.

**Memory needs pgvector, not stock Postgres.** ElizaOS stores long-term memory as vector embeddings and retrieves relevant context by similarity — which requires the pgvector extension. Standard PostgreSQL can't do vector search, so this template uses the `pgvector/pgvector` image, ensuring memory retrieval works. Conversation history and knowledge persist in that database, so your agent remembers across redeploys instead of resetting to a blank slate each deploy.

**Character files define the agent.** ElizaOS agents are driven by a character definition — name, personality, backstory, knowledge, and behavior. This is the core of what makes an Eliza agent distinct: you're not just picking a model, you're authoring a persona. Edit the character configuration to shape how your agent talks, what it knows, and how it behaves, then redeploy.

**Bring your own OpenAI key.** The agent uses OpenAI for responses and for the embeddings that power memory — set `OPENAI_API_KEY`, and you pay OpenAI directly for usage. ElizaOS also supports other providers and local models through its plugin system if you want to swap later.

**Multi-platform through plugins.** ElizaOS connects to Discord, Telegram, X, and the web through plugins, so one agent can operate across channels. Add the plugin and credentials for each platform you want, and the agent maintains memory across them.

Typical cost: **~$10–15/month** on Railway for the agent and pgvector database, plus your OpenAI usage. ElizaOS is MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elizaos | [monotykamary/railway-template-elizaos](https://github.com/monotykamary/railway-template-elizaos) | Worker |
| pgvector | `pgvector/pgvector:0.8.1-pg17-bookworm` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SECRET_SALT` | elizaos | (secret) | - |
| `OPENAI_API_KEY` | elizaos | (secret) | OpenAI API key used by the bundled agent. |
| `BASIC_AUTH_PASSWORD` | elizaos | (secret) | - |
| `BASIC_AUTH_USERNAME` | elizaos | (secret) | - |
| `ELIZA_SERVER_AUTH_TOKEN` | elizaos | (secret) | - |
| `POSTGRES_DB` | pgvector | eliza | - |
| `POSTGRES_USER` | pgvector | (secret) | - |
| `POSTGRES_PASSWORD` | pgvector | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** JavaScript, TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/elizaos-ai-agent)
