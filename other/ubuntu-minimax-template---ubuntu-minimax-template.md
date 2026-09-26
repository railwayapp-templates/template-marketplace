# Deploy ubuntu-minimax-template on Railway

Ubuntu 24.04 SSH workstation with MiniMax mcode agent — BYOK, persistent

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-minimax-template)

## About

One Railway service (Dockerfile build from the public repo), one persistent volume mounted at `/home/dev`, one Railway-provided HTTP domain routed to the healthz stub on `PORT` 8000, and one TCP proxy routed to sshd on port 22 for public SSH access. SSH host keys regenerate per redeploy (a one-time `known_hosts` update is expected); everything in the home volume persists. The service runs ~$5–10/mo at hobby scale plus your own MiniMax plan or API spend.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-minimax | [lNamelessl/ubuntu-minimax-railway-template](https://github.com/lNamelessl/ubuntu-minimax-railway-template) | TCP service |

## Configuration

- **Start command:** `/opt/entrypoint.sh`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** Other · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/ubuntu-minimax-template)
