# Deploy Hermes Agent on Railway

Run Hermes Agent on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-railway)

## About

Hermes Agent is the self-improving AI agent built by Nous Research. It runs
autonomously on your own server, creates skills from experience, and remembers
what it learns across sessions. It connects to platforms like Telegram,
Discord, and Slack, and ships with 60+ built-in tools and MCP support.

Hosting Hermes Agent gives the agent a persistent, always-on home, so it can
run scheduled tasks, hold long-lived memory, and stay reachable across chat
platforms. The template deploys with no required variables, so the service
starts as soon as you click Deploy. Once it's running, you open a shell into
the service from the Railway dashboard to authenticate an LLM provider, connect
chat platforms, and edit configuration on the service's filesystem. Hermes
writes skills and memory to disk over time, and the template includes a volume
to keep that data across deploys and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent:latest` | Database |

## Configuration

- **Start command:** `/init /opt/hermes/docker/main-wrapper.sh gateway run`
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-railway)
