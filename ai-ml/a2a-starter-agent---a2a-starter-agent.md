# Deploy a2a-starter-agent on Railway

Minimal, LLM-agnostic A2A protocol agent for any A2A client

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/a2a-starter-agent)

## About

A minimal [A2A protocol](https://a2aproject.github.io/A2A/) agent, backed by an LLM of your choice. Deploy it, paste the resulting URL into any A2A client (e.g. [AgentChat Hub](https://agent-chat-hub.com)), and start chatting immediately.

This template runs a small FastAPI server exposing the two endpoints an A2A client needs: `GET /.well-known/agent.json` (the agent card) and `POST /a2a` (JSON-RPC `message/send`). Incoming chat messages are forwarded to the LLM you configure above, and the reply is returned in A2A's message format. There's no database, no queue, and no other services — just one web process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| a2a-starter-agent | [AnanyaBanerjee/a2a-starter-agent](https://github.com/AnanyaBanerjee/a2a-starter-agent) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/a2a-starter-agent)
