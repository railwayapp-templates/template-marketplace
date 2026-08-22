# Deploy Möbius on Railway

Your portal to the world of AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mobius)

## About

Möbius runs as one service backed by a persistent volume, so your chats, apps, memory, and files stay with you across restarts and updates. It serves a progressive web app you can install on your phone or desktop and reaches you over a single HTTPS endpoint, with no separate database or extra services to wire up. The agent runs inside the container with write access to its own apps, skills, and memory, and Railway keeps it online and the image current.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mobius | `ghcr.io/mobius-os/mobius:main` | Database |

## Configuration

- **Healthcheck:** `/recover/health`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/mobius)
