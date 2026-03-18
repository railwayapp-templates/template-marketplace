# Deploy Caude Code SSH on Railway

Run Claude Code safely from anywhere via SSH in 2 simple steps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/claude-code-mobile)

## About

Claude Code SSH gives you instant SSH access to Anthropic's Claude Code CLI from any device — phone, tablet, or laptop. Deploy on Railway in minutes and start AI-powered coding from anywhere, with persistent sessions that survive disconnects.

Claude Code is powerful, but it requires a terminal. That's fine at your desk — not so much from your phone on the couch, or your tablet at a coffee shop. Claude Code SSH solves this by packaging Claude Code into a secure, always-on Railway service you can SSH into from any device. Your coding sessions persist through WiFi switches, app closures, and even Railway redeployments. Just reconnect and pick up where you left off. Set one Railway variable (your SSH key), enable the TCP proxy, attach a volume, and you're coding with Claude in under 5 minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claude-code-ssh | [Ntelikatos/claude-code-ssh](https://github.com/Ntelikatos/claude-code-ssh) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Timezone (e.g. America/New_York, Europe/London). Defaults to UTC. |
| `GITHUB_TOKEN` | (secret) | 	Fine-grained PAT for cloning private repos. Scoped to specific repos only. |
| `NODE_VERSION` | - | 	Node.js version (e.g. 22, 20.18.0). Uses n to switch at boot. Default to v24 LTS. |
| `PNPM_VERSION` | - | pnpm version (e.g. 9.15.0, 10). Uses corepack to switch at boot. Defaults to the latest version. |
| `SSH_PUBLIC_KEY` | - | 	Ed25519 public key(s) for SSH auth. Multiple keys supported, one per line. |
| `ANTHROPIC_API_KEY` | (secret) | Claude API key. Alternative to claude login. |

## Configuration

- **TCP Proxies:** 22
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/claude-code-mobile)
