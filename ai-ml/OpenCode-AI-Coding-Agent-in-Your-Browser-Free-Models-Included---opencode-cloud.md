# Deploy OpenCode | AI Coding Agent in Your Browser, Free Models Included on Railway

Open-source AI coding agent in your browser. Free models, SSH, saved home.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-cloud)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/opencode-cloud?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=opencode-cloud)

[OpenCode](https://opencode.ai) is the open-source AI coding agent: it reads your repo, edits files, runs commands and tests, and works with any model provider. This template runs its **web UI** on your Railway domain behind a password, on an always-on Ubuntu box with a full toolchain, so the agent keeps working when your laptop is closed and you can check in from any browser or phone. It works **the moment it deploys**: OpenCode's free Zen models need no API key.

One service, one volume. OpenCode 2's `opencode serve` (pinned version) runs on loopback behind nginx and serves the web UI and API; the generated server password protects every API call, terminal and event stream. The whole home directory `/root` is the volume, so sessions, provider logins, repos in `~/workspace`, GitHub auth and dotfiles survive every redeploy. The UI's built-in terminal tabs give you a real shell next to the chat. SSH through a Railway TCP proxy is there too, with host keys stored on the volume, and `oc` in that shell opens the OpenCode terminal UI attached to the same server, so the web UI and the TUI share sessions.

The box ships `git`, `gh`, Node 22, Python 3 + `uv`, `build-essential`, `ripgrep`, `fd`, `jq`, `tmux` and `vim`, so the agent can install dependencies, build and run your tests without extra setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenCode | [two-workspaces/opencode](https://github.com/two-workspaces/opencode) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the box. |
| `PORT` | 8080 | Port of the web UI. Do not change. |
| `GH_TOKEN` | (secret) | Optional. GitHub token so gh, git clone of private repos and git push work without a login. |
| `ROOT_PASSWORD` | (secret) | Password for ssh root@<tcp-proxy-host> -p <port>. Clear it for key-only SSH login. |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI models. |
| `AUTHORIZED_KEYS` | - | SSH public key(s), one per line, for key-based root login. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Claude models. Leave empty to use the free OpenCode Zen models or connect a provider in the UI. |
| `OPENROUTER_API_KEY` | (secret) | Optional. OpenRouter, for hundreds of models behind one key. |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Server password: sign in on the web UI with Use password. It gates an agent with a root shell - keep it strong. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/root`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/opencode-cloud)
