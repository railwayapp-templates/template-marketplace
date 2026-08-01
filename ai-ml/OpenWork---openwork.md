# Deploy OpenWork on Railway

OpenWork w/ OpenCode, persistent storage, remote access. openwork open work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openwork)

## About

OpenWork is an open-source, local-first AI workspace powered by OpenCode. It provides a permissioned interface for running agentic workflows, working with files, managing skills and plugins, and connecting desktop or web clients to a local or remote worker without exposing the underlying OpenCode service directly.

Hosting OpenWork on Railway creates a private remote worker containing both the OpenWork server and its managed OpenCode runtime. The template deploys one long-running service, exposes the OpenWork API over HTTPS, and stores the workspace, server configuration, OpenCode state, and scoped tokens on a persistent Railway volume mounted at `/data`. Access is protected by separate client and host tokens. Railway builds the included Dockerfile, routes traffic to port `8787`, and checks `/health` before activating a deployment. This template is intended for a single persistent remote workspace rather than the complete multi-user OpenWork Cloud control plane.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openwork | [XavTo/openwork](https://github.com/XavTo/openwork) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | Public port used by Railway to route traffic. |
| `OPENWORK_PORT` | 8787 | Internal port used by the OpenWork server. |
| `OPENWORK_TOKEN` | (secret) | Client token used by OpenWork apps and collaborators. |
| `OPENWORK_HOST_TOKEN` | (secret) | Owner token used for approvals and token management. |
| `OPENWORK_TOKEN_STORE` | (secret) | Persistent storage file for scoped access tokens. |
| `OPENWORK_CORS_ORIGINS` | * | Origins allowed to access the OpenWork API. |
| `OPENWORK_APPROVAL_MODE` | manual | Requires manual approval before privileged agent actions. |
| `OPENWORK_SERVER_CONFIG` | /data/openwork-orchestrator/server.json | Persistent OpenWork server configuration file. |
| `OPENWORK_APPROVAL_TIMEOUT_MS` | 30000 | Approval request timeout in milliseconds. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, MDX, CSS, Shell, Swift, PowerShell, HTML, Go Template, Dockerfile, NSIS

[View on Railway →](https://railway.com/deploy/openwork)
