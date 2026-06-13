# Deploy OpenViking : OpenAI [Jun 26'] - Context Database for Hermes, Openclaw, AI Agents on Railway

Self-Hosted Context Database for Hermes, Openclaw, AI Agents. OpenAI Embeds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openviking-openai-jun-26-context-databas)

## About

OpenViking is a context database for AI agents. It gives agents a structured way to store, retrieve, and load project context using a filesystem-like `viking://` path model. 

This Railway template deploys OpenViking with OpenAI embeddings so tools like Hermes, OpenClaw, and custom agents can maintain long-running memory across sessions.

Hosting OpenViking on Railway gives you a managed, always-on context service for your AI agent workflows. The deployment runs the OpenViking server as an HTTP service, exposes a health endpoint, and configures the required OpenAI embedding provider through environment variables. Once deployed, your agents can connect to OpenViking to write project files, retrieve relevant context, and load different levels of memory depending on the task. This is useful when local agent memory becomes messy, temporary, or hard to share across tools and environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenViking | [JHJHJHJH/openviking-railway](https://github.com/JHJHJHJH/openviking-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1933 | Openviking default port |
| `OPENAI_API_KEY` | (secret) | OpenAI API Key |
| `OPENVIKING_ROOT_API_KEY` | (secret) | Super secret root API Key |

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openviking-openai-jun-26-context-databas)
