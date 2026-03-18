# Deploy Spacebot (Slim) on Railway

An AI agent for teams, communities, and multi-user environments.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/spacebot-slim)

## About

Hosting Spacebot involves running a Rust-based binary that coordinates multiple specialized processes: a session manager, memory system, worker pool, and messaging adapters. Connect your chosen platforms (Discord, Slack, Telegram, Twitch, Webchat, or webhook) and optionally set up persistent memory storage. A single deployment can run multiple agents with distinct identities and permission sets, making it well-suited for communities or engineering teams that need a reliable, always-on AI presence without managing complex infrastructure themselves.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Spacebot | `ghcr.io/spacedriveapp/spacebot:slim` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/spacebot-slim)
