# Deploy Moltis on Railway

A personal AI gateway written in Rust. One binary, no runtime, no npm.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/moltis)

## About

Moltis is a personal AI gateway written in Rust — a single binary with no runtime dependencies. It sits between you and multiple LLM providers (OpenAI Codex, GitHub Copilot, local models), offering streaming responses, tool execution in sandboxed containers, memory, hooks, and a built-in web UI.

Deploying Moltis involves running its pre-built Docker image (`ghcr.io/moltis-org/moltis:latest`) with the `--no-tls` flag, since Railway handles TLS termination. Moltis needs persistent storage for its configuration and data (SQLite databases, session history, memory). On first run, a one-time setup code is printed to logs — you'll use it to set a password or register a passkey. You'll also want to set `MOLTIS_PASSWORD` as an environment variable for cloud auth. Note that sandboxed command execution requires Docker socket access, which isn't available on Railway — chat and tool-calling still work, but shell-based tools won't.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| moltis | `ghcr.io/moltis-org/moltis` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Listen port |
| `MOLTIS_NO_TLS` | true | Disable TLS |
| `MOLTIS_DATA_DIR` | /data | Data directory |
| `MOLTIS_PASSWORD` | (secret) | Initial password |
| `MOLTIS_CONFIG_DIR` | /data/config | Config directory	 |
| `MOLTIS_DEPLOY_PLATFORM` | flyio | When set, Moltis hides local-only LLM providers |

## Configuration

- **Start command:** `moltis --bind 0.0.0.0 --port 8080 --no-tls`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/moltis)
