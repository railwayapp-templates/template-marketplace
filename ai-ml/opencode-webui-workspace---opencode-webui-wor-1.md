# Deploy opencode-webui-workspace on Railway

OpenCode dev container: Bun, Wrangler, gh, glab, persistent volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-webui-wor-1)

## About

Self-hosted OpenCode coding environment with a full dev toolchain, served as a
password-protected web UI with projects persisted on an attached volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-webui-wor-1)

No image to build, no VPS to manage. The template provisions the service, the
workspace volume, and prompts for the server password on deploy.

The service builds this repo's `Dockerfile` (Ubuntu 26.04: Python 3.14,
Node 24 LTS, Bun, Go, Rust, uv, glab, gh, Wrangler) and runs
`opencode serve` on port 4096. Workspace repos, session data, and projects
persist on the attached volume mounted at `/home/opencode/workspace`.
Railway auto-detects the `Dockerfile`; the service domain targets port 4096.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [NOOBGLITCH/opencode-webui-workspace](https://github.com/NOOBGLITCH/opencode-webui-workspace) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCODE_SERVER_PASSWORD` | (secret) |
| `OPENCODE_SERVER_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/opencode/workspace`

**Category:** AI/ML · **Languages:** Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/opencode-webui-wor-1)
