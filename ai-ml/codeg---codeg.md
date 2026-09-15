# Deploy codeg on Railway

Multi-agent AI coding workspace for Claude Code, Codex and others

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codeg)

## About

[codeg](https://github.com/xintaofei/codeg) is a collaborative multi-agent AI coding workspace. It
aggregates sessions from Claude Code, Codex, OpenCode, Pi, Grok Build and others behind a single web
interface, so several agents can work in one place with shared projects, folders and chat.

codeg is built to run as a server, not only as a desktop app: upstream publishes multi-architecture
container images and ships its own compose file. That makes hosting it unusually simple — one
service, no proxy in front, no build from source. The server speaks plain HTTP on a port it takes
from the environment, which is exactly the shape Railway's edge expects.

Two things need care. The workspace lives in SQLite, so it belongs on a volume that outlives a
redeploy. And access is guarded by a single token: codeg generates one at first boot if you do not
supply it, which means it is never accidentally open, but on a public URL you want that token to be
a strong generated value you can read back rather than a line buried in a log. This template pins it
to a Railway secret so both are true.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codeg | [RockinPaul/codeg_railway_template](https://github.com/RockinPaul/codeg_railway_template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CODEG_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/codeg)
