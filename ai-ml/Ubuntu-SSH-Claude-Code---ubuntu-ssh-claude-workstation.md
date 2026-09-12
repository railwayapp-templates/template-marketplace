# Deploy Ubuntu SSH + Claude Code on Railway

SSH-in Ubuntu workstation with Claude Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ssh-claude-workstation)

## About

Hosting this template runs one service: an Ubuntu 24.04 container with OpenSSH and the Claude Code CLI. A TCP proxy exposes SSH publicly (`xxx.proxy.rlwy.net:PORT` — the proxy port is not 22; use `ssh -p PORT`). A volume mounted at `/home/dev` persists your home directory, Claude sessions, authorized keys, and SSH host keys across redeploys. Resource-wise, expect ~100–200 MB RAM idle, 1–2 GB comfortable with Claude Code active, and roughly $10–20/month always-on on Railway's usage-based pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| workstation | [lNamelessl/ubuntu-ssh-claude-railway-template](https://github.com/lNamelessl/ubuntu-ssh-claude-railway-template) | Database |

## Configuration

- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ubuntu-ssh-claude-workstation)
