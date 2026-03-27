# Deploy Spacebot on Railway

Deploy and Host Spacebot with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/loyal-nurturing)

## About

Spacebot isn't a chatbot — it's an orchestration layer for autonomous AI processes. That's infrastructure, and infrastructure should be machine code.

Multiple AI processes sharing mutable state, spawning tasks, and making decisions without human oversight. Rust's strict type system and compiler enforce correctness at build time. The result is a single binary with no runtime dependencies, no garbage collector pauses, and predictable resource usage. No Docker, no server processes, no microservices.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| spacedriveapp/spacebot:latest | `ghcr.io/spacedriveapp/spacebot:latest` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/loyal-nurturing)
