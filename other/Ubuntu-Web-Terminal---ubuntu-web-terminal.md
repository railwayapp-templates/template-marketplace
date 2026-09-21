# Deploy Ubuntu Web Terminal on Railway

Ubuntu 24.04 terminal in your browser: persistent home volume, no setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-web-terminal)

## About

A full Ubuntu 24.04 LTS shell in your browser: open the service's URL on a laptop, phone or locked-down machine, enter the generated password, and you are at a `bash` prompt inside `tmux` on an always-on Linux box. Your home directory lives on a **volume**, so files, dotfiles and installed tools survive every redeploy — unlike most terminal templates, which lose everything when the container restarts. One click, **no inputs**: the password is generated for you. Node.js 24 LTS, Python 3, git, the GitHub CLI, build-essential, tmux, Claude Code and the usual tools are preinstalled; user `dev` has passwordless `sudo`.

**Plan requirements.** Idle, the box uses about **20 MB** of RAM (measured on this image after five idle minutes; 28 MB peak at boot), well inside Railway's Free and Trial limits. What you run inside it is what costs: a Node build or a Claude Code session adds a few hundred MB while it runs. Hobby is the comfortable fit for daily use. The image is pinned by digest, so what you deploy today is what you get on every redeploy.

The service runs two small processes: `ttyd` (a terminal over WebSocket) on loopback and `nginx` on the public HTTPS domain with basic auth in front of it. The healthcheck `/healthz` is open and only passes once the terminal actually answers, so Railway routes traffic to a new deployment only when it is ready. The shell attaches to a `tmux` session named `main`, so closing the tab does not kill what you were running — reopen the URL and you are back where you left off. `/home/dev` is a Railway volume: projects, dotfiles, `~/.local`, `~/.npm-global` and Claude Code's login all persist. The image is built from a public Dockerfile and pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-ssh:24.04-20260920b@sha256:ebaafc81557b7294a2b13d08986173efacab19d3004c2ac40074753dbcf6136c` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Optional - Timezone name such as Europe/Berlin or America/New_York. Default UTC. |
| `PORT` | 8080 | Port the browser terminal listens on. Railway's domain and healthcheck target it. Leave it as is. |
| `PASSWORD` | (secret) | Password for the terminal (user dev). Generated on deploy; read it here in the Variables tab. Change it and redeploy to rotate. |
| `DEVBOX_SSH` | off | off = browser terminal only (this template). Set to on and add a TCP proxy for port 22 under Settings -> Networking to also get SSH. |
| `GITHUB_TOKEN` | (secret) | Optional - GitHub token. git clone/push over HTTPS and the gh CLI use it without a login prompt. |
| `ANTHROPIC_API_KEY` | (secret) | Optional - Anthropic API key for Claude Code. Leave blank to sign in with a Claude subscription instead: run claude and follow the login link. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-web-terminal)
