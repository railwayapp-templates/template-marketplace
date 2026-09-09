# Deploy Ubuntu Terminal | Web Shell + SSH + tmux on Railway

Ubuntu 24.04 shell in the browser and over SSH. tmux, persistent home.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-terminal)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ubuntu-terminal?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=ubuntu-terminal)

This template gives you an always-on Ubuntu 24.04 shell. Open your Railway domain for a terminal in the browser, or SSH in through Railway's TCP proxy. Both land in the same `tmux` session, so a job you start from your laptop is still running when you reconnect from your phone. Your home directory lives on a volume, so repos, GitHub auth and dotfiles survive every redeploy.

One service, one volume. The image ships `git`, `gh`, Python 3 + `uv`, `tmux`, `ripgrep`, `jq`, `vim`, build tools and an OpenSSH server. A `ttyd` web terminal (basic-auth gated) and `sshd` (password or key) both drop you into the same `tmux` session, so you can start a long job from your laptop and pick it up from your phone. SSH host keys are stored on the volume, so your client never sees a "host key changed" warning after a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-terminal | [nomideusz/terminal-railway](https://github.com/nomideusz/terminal-railway) | TCP service |

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

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/root`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-terminal)
