# Deploy Ubuntu SSH + Claude Code on Railway

SSH-in Ubuntu workstation with Claude Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ssh-claude-workstation)

## About

Hosting this template runs one service: an Ubuntu 24.04 container with OpenSSH and the Claude Code CLI. A TCP proxy exposes SSH publicly (`xxx.proxy.rlwy.net:PORT` — the proxy port is not 22; use `ssh -p PORT`). A volume mounted at `/home/dev` persists your home directory, Claude sessions, authorized keys, and SSH host keys across redeploys. Resource-wise, expect ~100–200 MB RAM idle, 1–2 GB comfortable with Claude Code active, and roughly $10–20/month always-on on Railway's usage-based pricing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu(ssh+claudecode) | [lNamelessl/ubuntu-ssh-claude-railway-template](https://github.com/lNamelessl/ubuntu-ssh-claude-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SSH_PUBLIC_KEY` | - | Your public key; SSH stays off without it; run this command on the terminal to get your key generated and copied to clip board: ssh-keygen -t ed25519 then paste the public key here |
| `ANTHROPIC_MODEL	` | - | fill this for other non-Anthropic providers: Which model answers; openrouter.ai/models → e.g. nvidia/nemotron-3.5-lightning:free |
| `ANTHROPIC_API_KEY` | (secret) | Fill this if you are using Anthropic token; Anthropic's own key; model + billing  |
| `ANTHROPIC_BASE_URL` | - | fill this for other non-Anthropic models: The gateway endpoint; it looks like: https://openrouter.ai/api (you can copy as-is) |
| `ANTHROPIC_AUTH_TOKEN` | (secret) | fill this for other providers like OpenRouter; It looks like: → sk-or-v1...; and can be generated here: openrouter.ai/settings/keys  |

## Configuration

- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ubuntu-ssh-claude-workstation)
