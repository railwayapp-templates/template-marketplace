# Deploy Mobius [Updated Oct '26] on Railway

Möbius — chat with an agent that builds and runs your own apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mobius-ai)

## About

Möbius is your portal to the world of AI agents — the harness and the interface for working with them. Describe the personal and work apps you need, coordinate the agents that build them, and keep everything they learn, all running on infrastructure you own outright. This template deploys the official image directly and fixes two real, reproducible bugs in the reference marketplace template's deploy configuration — not application bugs, deploy-config bugs, confirmed by reading Möbius's own source rather than guessed at.

This template runs `ghcr.io/mobius-os/mobius:main` — the project's own official image — completely unmodified. Everything this template adds lives in Railway's own service configuration: the healthcheck path, one pinned port variable, the volume mount, and a restart policy tuned to how Möbius itself expects to be restarted. No custom Dockerfile, no forked code.

Möbius serves as one container backed by a single persistent volume: your chats, apps, agent memory, and files all live there, surviving restarts and image updates. It's a progressive web app you can install on your phone or desktop, reachable over one HTTPS endpoint with nothing else to wire up — no separate database, no cache, no message queue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mobius | `ghcr.io/mobius-os/mobius:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Pins the port Möbius's Uvicorn server binds to. Möbius honors Railway's auto-injected $PORT (entrypoint.sh: _public_port=${PORT:-8000}) — left unset, Railway can assign a different port than the domain expects, leaving the deploy SUCCESS but returning 502 on the public domain. Setting this explicitly closes that gap. |
| `MOBIUS_ACCOUNT_CLIENT_ORIGIN` | - | Möbius's own .env.example recommends this exact value for Railway deployments — it makes Möbius · You account-linking work from the first deploy, before any manual domain setup. |

## Configuration

- **Healthcheck:** `/api/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mobius-ai)
