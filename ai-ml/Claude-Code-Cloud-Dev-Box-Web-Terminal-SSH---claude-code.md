# Deploy Claude Code | Cloud Dev Box (Web Terminal + SSH) on Railway

Claude Code, git, gh, Node, Python. Browser terminal + SSH, home persists.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-code)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/claude-code?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=claude-code)

This template gives you an always-on Ubuntu 24.04 workstation with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) pre-installed. Open your Railway domain for a terminal in the browser, or SSH in through Railway's TCP proxy. Your home directory lives on a volume, so repos, Claude login, GitHub auth and dotfiles survive every redeploy.

One service, one volume. The image ships `claude`, `git`, `gh`, Node 22, Python 3 + `uv`, `tmux`, `ripgrep`, `jq`, `vim`, build tools and an OpenSSH server. A `ttyd` web terminal (basic-auth gated) and `sshd` (password or key) both drop you into the same `tmux` session, so you can start a long Claude Code run from your laptop and pick it up from your phone. SSH host keys are stored on the volume, so your client never sees a "host key changed" warning after a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claude-code | [nomideusz/claude-code-railway](https://github.com/nomideusz/claude-code-railway) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the box. |
| `PORT` | 7681 | Port of the browser terminal. Do not change. |
| `GH_TOKEN` | (secret) | Optional. GitHub token so `gh` and git pushes work without an interactive login. |
| `WEB_USER` | (secret) | Username for the browser terminal login. |
| `WEB_PASSWORD` | (secret) | Password for the browser terminal login. This gates root access to the box - keep it strong. |
| `ROOT_PASSWORD` | (secret) | Password for `ssh root@<tcp-proxy-host> -p <port>`. Clear it to allow key-only SSH login. |
| `AUTHORIZED_KEYS` | - | SSH public key(s), one per line, for key-based root login. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Anthropic API key, if you prefer pay-as-you-go over a subscription login. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Token from `claude setup-token` on your own machine (Pro/Max subscription). Leave empty to run /login inside the box instead. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/root`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-code)
