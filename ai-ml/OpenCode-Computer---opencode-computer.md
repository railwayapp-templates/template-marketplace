# Deploy OpenCode Computer on Railway

Deploy a private, persistent OpenCode computer on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-computer)

## About

Give OpenCode a persistent, private computer on Railway. This template deploys one OpenCode-ready Linux service with a persistent volume mounted at `/data`. Provider authentication, configuration, sessions, plugins, skills, and repositories survive redeploys. The template does not create a public domain or TCP proxy.

OpenCode Computer is an independent project. It is not built by, maintained by, or affiliated with the OpenCode team.

OpenCode Computer packages the pinned OpenCode CLI and server, Railway CLI, GitHub CLI, Git, tmux, ripgrep, Python, Node.js, and common development tools into a durable remote environment. User projects live in `/data/workspace`; OpenCode's complete XDG config, data, state, and cache hierarchy lives beneath `/data/home`; global skills are available at `/data/skills`.

The native OpenCode server is password-protected and listens only on `127.0.0.1:4096`. Railway health uses a separate listener that exposes only `/livez` and `/readyz`. The future Agent Computer app will reach OpenCode through an authenticated bridge. Railway SSH remains available as an optional direct-access and recovery path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode-computer | [m-abdelwahab/opencode-computer](https://github.com/m-abdelwahab/opencode-computer) | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode-computer)
