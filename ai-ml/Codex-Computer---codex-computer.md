# Deploy Codex Computer on Railway

Deploy a private, persistent Codex computer on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-computer)

## About

Give OpenAI Codex a persistent, private computer on Railway. This template deploys one Codex-ready Linux service with a persistent volume mounted at `/data`. Codex authentication, configuration, sessions, skills, and repositories survive redeploys. The template does not create a public domain or TCP proxy.

Codex Computer packages the OpenAI Codex CLI, Railway CLI, GitHub CLI, Git, tmux, ripgrep, Python, Node.js, and common development tools into a durable remote environment. User projects live in `/data/workspace`, Codex state lives in `/data/home/.codex`, and a loopback-only `agentd` process exposes health and runtime metadata for the future Agent Computer control plane.

The service remains private. The Agent Computer web app will connect through an authenticated private Railway transport. Railway SSH remains available as an optional direct-access and recovery path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codex-computer | [m-abdelwahab/codex-computer](https://github.com/m-abdelwahab/codex-computer) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/codex-computer)
