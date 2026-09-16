# Deploy Yao Agents on Railway

Self-hosted AI agent hub: workspaces, task board, Open API and mobile apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yao-agents)

## About

[Yao](https://github.com/YaoApp/yao) is a self-hosted hub for AI agents: isolated workspaces, a
task board that turns conversations into tracked work, a dashboard, an Open API with SSE and
WebSocket, built-in MCP tools, and desktop and Android clients that connect to the server you
run. This template deploys the upstream Yao image (1.0.0-rc22) on Railway, with one addition that
a public URL requires: the root account's password is yours, generated for this deployment.

Yao publishes a production container image and installs its own application on first start —
database migration, roles, menus and a root user included — so there is nothing to build. What it
does not do is choose a root password for you: the bundled setup script creates
`root@yaoagents.com` with the same constant password on every installation. This template's
entrypoint runs that first-boot install, then re-hashes the root password from a Railway-generated
secret before the server accepts a connection, and re-applies it on every boot. It also writes the
production mode and loopback bind into the application's own `.env` (which overrides the process
environment) and fronts the IPv4-only engine with a dual-stack relay, so both the public edge and
Railway's private network reach it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yao | [RockinPaul/yao_railway_template](https://github.com/RockinPaul/yao_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `YAO_ROOT_PASSWORD` | (secret) | Password for the root account root@yaoagents.com, applied on every boot. Generated for this deployment; read it from the service variables. Nothing to fill in. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/yao-agents)
