# Deploy Codewhale | Cloud Coding Agent (Web Terminal + SSH) on Railway

Codewhale coding agent, git, gh, Node, Python. Browser terminal + SSH.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codewhale)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/codewhale?utm_medium=integration&amp;utm_source=button&amp;utm_campaign=codewhale)

[Codewhale](https://github.com/Hmbown/Codewhale) (formerly `deepseek-tui`) is an open-source coding agent written in Rust. It reads your project, edits files, runs commands and checks its own work, using DeepSeek, OpenRouter, Anthropic, OpenAI, Kimi or any other provider you connect. This template runs it on an always-on Ubuntu 24.04 box that you reach from a terminal in your browser or over SSH. Your home directory lives on a volume, so repos, Codewhale config and sessions survive every redeploy.

One service, one volume at `/root`. The image contains:

- `codewhale`, `git`, `gh`, Node 22, Python 3 with `uv`, `tmux`, `ripgrep`, `jq`, `vim` and build tools
- a `ttyd` web terminal behind a basic-auth login
- an OpenSSH server (password or key login)

The web terminal and SSH both drop you into the same `tmux` session. You can start a long Codewhale run from your laptop and check on it from your phone. SSH host keys are stored on the volume, so your client never shows a "host key changed" warning after a redeploy.

Codewhale's own `codewhale web` client is loopback-only by design, and upstream says not to expose it through a public reverse proxy. The password-protected browser terminal is the safe way to use it remotely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codewhale | [nomideusz/codewhale-railway](https://github.com/nomideusz/codewhale-railway) | TCP service |

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
| `DEEPSEEK_API_KEY` | (secret) | Optional. DeepSeek API key (platform.deepseek.com), Codewhale's default provider. Or connect any provider later with /provider. |
| `OPENROUTER_API_KEY` | (secret) | Optional. OpenRouter API key for hundreds of models through one key. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/root`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/codewhale)
