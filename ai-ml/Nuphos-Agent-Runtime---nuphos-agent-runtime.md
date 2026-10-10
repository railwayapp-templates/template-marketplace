# Deploy Nuphos Agent Runtime on Railway

Self-hosted Nuphos cloud agent that keeps working when your laptop sleeps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nuphos-agent-runtime)

## About

Nuphos Agent Runtime is the self-hosted cloud agent for [Nuphos](https://nuphos.ai), the agent workspace for teams. It runs Claude Code in your own Railway project, keeps working when your computer is closed, and lets you continue the conversation from your phone.

This template deploys one service from the public `ghcr.io/nuphos/runtime` image with a persistent volume at `/home/node` for the agent's sign-in, settings and workspaces, and a public HTTPS domain on port 8080. No database is required. After the first deploy, open the service's domain to set a console password (setup stays open for 30 minutes after each start), sign in to your own Claude account from the console, then press **Connect to Nuphos** to pair the agent with your workspace. The agent keeps its own sign-in; Nuphos does not store it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| runtime | `ghcr.io/nuphos/runtime:0.1.18-claude-code` | Web service |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /home/node/workspace && chown node:node /home/node /home/node/workspace && (rmdir /workspace 2>/dev/null || true) && ln -sfn /home/node/workspace /workspace && exec setpriv --reuid=node --regid=node --init-groups --no-new-privs /usr/local/bin/nuphos-runtime-start openab run -c /etc/openab/config.toml"`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/nuphos-agent-runtime)
