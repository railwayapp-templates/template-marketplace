# Deploy Möbius on Railway

An AI agent that builds the app it lives in.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mobius)

## About

Möbius is a self-hosted AI agent platform where you chat with Claude to build mini-apps, modify the interface, and automate tasks — all from your phone or browser. The agent edits its own source code and rebuilds live.

Möbius runs as a single Docker container: FastAPI serves the API and frontend, the Claude Code CLI runs as a subprocess for each chat message, and esbuild compiles mini-apps on the fly. All data — chats, apps, credentials, and theme — lives on a persistent volume at `/data`. Railway handles HTTPS automatically. After deploying, a setup wizard walks you through account creation and signing in with your Claude subscription. No additional configuration needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mobius | [hamzamerzic/mobius](https://github.com/hamzamerzic/mobius) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, JavaScript, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mobius)
