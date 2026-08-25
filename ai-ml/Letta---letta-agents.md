# Deploy Letta on Railway

AI agents that remember you and get better over time

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/letta-agents)

## About

Letta is an open-source platform for stateful agents — agents that keep memory and identity instead of starting from an empty context every session. Built by the researchers behind MemGPT, it gives an agent a tiered memory hierarchy it manages itself: it decides what belongs in working context, writes lasting facts into memory blocks and revises them as it learns. Teams use it for support agents that remember a customer across months and copilots whose instructions improve with use.

Self-host Letta on Railway and you get the App Server with its local backend, so agent state, memory and tool execution stay on infrastructure you control, with no Letta Cloud account. One service exposes an OpenAI-compatible HTTP API and Letta's native WebSocket protocol behind a bearer token, and a volume holds every agent, conversation and memory file across redeploys.

![Diagram of the single Letta App Server service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787368718/letta-architecture.png)

Letta, formerly MemGPT, treats context the way an operating system treats RAM: an agent has a small working context and a much larger persistent store, and moves information between them itself rather than relying on retrieval bolted on at query time. That is what keeps an agent coherent over weeks of use.

Key capabilities:

- **Memory blocks** the agent rewrites itself, so its system prompt improves over time
- **MemFS** — agent context tracked in git, so every memory change has a commit and history
- **Skills** an agent learns and reuses, loadable globally, per project or per agent
- **Subagents**, plus **dreaming** (sleep-time compute) to consolidate memory between sessions
- **Crons and schedules** for proactive, always-on agents
- **Messaging channels** for Slack, Discord and other chat platforms, plus MCP tools

Self-host when agent memory holds customer records or internal documents that should not leave your infrastructure, and when tool execution belongs inside your own network.

The deployment is deliberately one service: the local backend stores agent state as a git-backed filesystem rather than a database, so there is no Postgres, queue or worker tier. The volume at `/root` is the whole persistence layer — agent definitions, conversations, memory repositories and the working directory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta | [gridalpha/letta-railway](https://github.com/gridalpha/letta-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4500 | HTTP and WebSocket listening port |
| `LETTA_AGENT_NAME` | Letta Agent | Name of the first-boot agent |
| `LETTA_APP_SERVER_TOKEN` | (secret) | Bearer token for authenticated routes |
| `LETTA_AGENT_PERSONALITY` | letta-code | Personality preset for that agent |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/letta-agents)
