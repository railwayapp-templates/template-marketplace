# Deploy Mobius — Personal AI OS on Railway

Your self-hosted AI agent that builds apps, learns, and gets things done.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mobius-personal-ai-os)

## About

Möbius is a self-hosted AI agent workspace designed to do more than chat. It can build apps, work with files, maintain memory, use skills, run goals and scheduled tasks, coordinate subagents, and connect to coding agents such as Claude Code and Codex.

This template deploys Möbius as a single persistent service on Railway, giving you a personal AI operating environment that runs on infrastructure you control.

Möbius combines the AI agent, interface, memory, applications, files, skills, and workspace into one self-hosted environment.

Instead of treating every conversation as an isolated session, Möbius is designed around persistent work. Its agent can retain useful context, build mini-apps, manage longer-running goals, execute scheduled tasks, and delegate work to other agents.

This template uses Möbius' built-in SQLite database and persistent application storage, so no external PostgreSQL, Redis, or other database service is required.

The upstream project explicitly supports a single application container for managed hosting platforms such as Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mobius | `ghcr.io/mobius-os/mobius:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Railway public service port for Möbius |
| `DOMAIN` | - | Public domain assigned by Railway |
| `DATA_DIR` | /data | Persistent Möbius application data directory |
| `SECRET_KEY` | (secret) | Persistent secret used for JWT signing and application cryptography |
| `DATABASE_URL` | sqlite:////data/db/ultimate.db | Persistent SQLite database |
| `FRONTEND_ORIGIN` | - | Public browser-facing origin |
| `MOBIUS_AGENT_SUDO` | 1 | Allow the built-in AI agent to use elevated privileges inside the container |
| `MOBIUS_ACCOUNT_ORIGIN` | https://www.mobius.you | Default Möbius account service |
| `MOBIUS_ACCOUNT_CLIENT_ORIGIN` | - | Client origin used when linking a Möbius account |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mobius-personal-ai-os)
