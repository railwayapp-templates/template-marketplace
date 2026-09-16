# Deploy Octop on Railway

Self-hosted multi-user AI assistant with agents, knowledge base and cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octop)

## About

[Octop](https://github.com/TencentCloud/Octop) is an open-source, self-hosted AI assistant from
Tencent Cloud: multi-user, multi-agent, with a web dashboard, an expert library, MBTI personas, a
RAG knowledge base, MCP connectors, IM channels and cron automation — all in one process, with every
conversation and credential kept on your own deployment.

This template runs it on Railway with its state on a volume and an admin password generated for your
deployment. One service, one volume, a public domain.

Octop is a single Python process that serves the React dashboard, the HTTP/SSE/WebSocket API, the IM
channel bridge and the scheduler from one control-plane database — SQLite by default, so there is no
second service to run. Everything it owns lives under `~/.octop`, which this template puts on the
volume: the database of users, agents and providers, the JWT signing secret, each agent's workspace,
installed plugins and logs.

Two details are handled for you. Octop's server is uvicorn on asyncio, which can bind only one
address family at a time, so the server listens on loopback and a small TCP relay in front of it
serves both — which is what Railway's edge and private network each need. And the admin account is
created on first boot from a generated password held in the service variables, rather than written
to a file inside the container that you would need a shell to read.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| octop | [RockinPaul/octop_railway_template](https://github.com/RockinPaul/octop_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the service listens on; Railway's healthcheck and the public domain both use it. Leave it as it is. |
| `OPENAI_API_KEY` | (secret) | Optional. Any model provider can also be configured in the dashboard after signing in. |
| `OCTOP_DEFAULT_PASSWORD` | (secret) | First-run password for the 'admin' account. Generated for this deployment; read it from the service variables after deploying. Nothing to fill in. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/octop)
