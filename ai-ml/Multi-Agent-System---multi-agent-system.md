# Deploy Multi Agent System on Railway

Deploy a multi-agent system on Railway, each agent as a service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multi-agent-system)

## About

A multi-agent system uses multiple specialized AI agents that collaborate on tasks. Each agent has a specific role — researcher, writer, reviewer — and calls an LLM API to reason through its part of the work. Agents communicate by reading and writing shared state in a database and message queue.

Hosting a multi-agent system requires running multiple independent services that coordinate through shared infrastructure. Each agent runs as its own process, pulling tasks from a Redis queue, calling an LLM provider like OpenAI, and writing results to Postgres. An orchestrator service receives HTTP requests and dispatches work across agents. This template handles the full setup: a FastAPI orchestrator, two specialized agents (researcher and writer), PostgreSQL for task state, Redis for message passing, and a one-shot init service that creates the database schema automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| multi-agent-system | [railwayapp-templates/multi-agent-system](https://github.com/railwayapp-templates/multi-agent-system) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | - |
| `STARTUP_DELAY_SECONDS` | 5 | Staggered startup to avoid rate limits |

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/multi-agent-system)
