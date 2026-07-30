# Deploy Hermes Agent Template on Railway

Deploy Hermes Agent as a secure web dashboard with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-template)

## About

Deploy [Hermes Agent](https://github.com/NousResearch/hermes-agent), the self-improving AI agent by Nous Research, as a secure web dashboard on Railway.

This template uses the official `nousresearch/hermes-agent:v2026.7.20` image and a persistent volume so Hermes keeps its sessions, memory, skills, configuration, and workspace across deploys. It starts the equivalent of `hermes dashboard --host 0.0.0.0 --port $PORT --no-open`.

Railway runs Hermes's browser-based management dashboard on a public HTTPS domain. Railway provides durable storage for agent state and a managed restart policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | `nousresearch/hermes-agent:v2026.7.20` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_USER` | (secret) |
| `HERMES_DASHBOARD_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "exec /init /opt/hermes/docker/main-wrapper.sh dashboard --host 0.0.0.0 --port $PORT --no-open"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-template)
