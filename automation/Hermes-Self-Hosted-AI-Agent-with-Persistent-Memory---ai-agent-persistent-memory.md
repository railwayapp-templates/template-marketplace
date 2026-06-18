# Deploy Hermes — Self-Hosted AI Agent with Persistent Memory on Railway

Self-host an AI agent with persistent memory. No per-call fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-agent-persistent-memory)

## About

![Hermes AI Agent dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1777189955/c6e0f435-b614-4c09-b71e-ebdf42f172c3.png)

Hermes is an open-source AI agent framework with persistent memory, multi-step tool use, and
a fully LLM-agnostic design — connect OpenAI, Anthropic, Groq, Ollama, or any OpenAI-compatible
endpoint without changing a line of agent logic. This template deploys Hermes as a
production-ready agent service on Railway in under 5 minutes, with PostgreSQL-backed memory
and Redis session handling pre-configured out of the box.

Self-host for ~$5–10/month flat — bring your own LLM key and pay only for the tokens you use,
with every conversation and memory stored on infrastructure you own.

---

Running a production AI agent requires a persistent runtime with database-backed memory,
secure credential management for LLM API keys, and a public HTTPS endpoint for integrations
and webhooks. Without a managed host, you're configuring Docker, inter-service networking,
SSL, and environment variables manually.

Railway provisions all of it automatically. Hermes runs as an always-on agent service —
persistent memory, secret management, and HTTPS handled out of the box. The agent's memory
and session state survive every redeploy.

Typical cost: **~$5–10/month** on Railway's Hobby plan for the full three-service stack.
The OpenAI Assistants API charges per tool call and per session-second on top of token costs.
Hermes gives you unlimited agent sessions at flat compute pricing — you pay only your own
LLM token usage.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | [Shinyduo/hermes-agent](https://github.com/Shinyduo/hermes-agent) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9119 |
| `HERMES_HOME` | /opt/data |
| `GATEWAY_ALLOW_ALL_USERS` | true |

## Configuration

- **Volume:** `/opt/data`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/ai-agent-persistent-memory)
