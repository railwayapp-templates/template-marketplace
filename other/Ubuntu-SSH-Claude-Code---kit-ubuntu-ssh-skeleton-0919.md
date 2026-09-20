# Deploy Ubuntu SSH + Claude Code on Railway

Ubuntu 24.04 SSH box with Claude Code, browser terminal and persistent home

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)

## About

An Ubuntu 24.04 LTS box you reach over **SSH** or a **browser terminal**, with **Claude Code** preinstalled and your home directory on a **volume** that survives every redeploy. One click, no inputs: the password is generated for you. Node.js 24 LTS, Python 3, git, GitHub CLI, build-essential, tmux and the usual tools are included; `dev` has passwordless `sudo`.

**Plan requirements.** Idle, the box uses about **25 MB** of RAM (measured on this image: 22 MB after five idle minutes, 38 MB peak at boot) and is well under Railway's Free and Trial limits. Claude Code sessions add a few hundred MB while they run; builds and language servers add whatever they need. Hobby is the comfortable fit for daily use. The image is pinned by digest, so what you deploy today is what you get on every redeploy.

The service runs three small processes: `sshd` on port 22 behind a Railway TCP proxy, `ttyd` (a terminal in your browser) behind `nginx` with basic auth on the public HTTPS domain, and a supervisor that exits if any of them dies so Railway's restart policy takes over. Login is user `dev` with the generated `SSH_PASSWORD`; root login is disabled. `/home/dev` is a Railway volume, so projects, dotfiles, Claude Code's own state (`~/.claude`), tools you install and even the SSH host keys persist across redeploys. Railway's healthcheck (`/healthz`) only passes once the terminal actually answers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-ssh:24.04-20260920@sha256:bbc252159de55b79a62a13f58e9d659b8be2303cd36720e3b622942dabc30c52` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Optional - Timezone name such as Europe/Berlin or America/New_York. Default UTC. |
| `PORT` | 8080 | Port the browser terminal listens on. Railway's domain and healthcheck target it. Leave it as is. |
| `GITHUB_TOKEN` | (secret) | Optional - GitHub token. git clone/push over HTTPS and the gh CLI use it without a login prompt. |
| `SSH_PASSWORD` | (secret) | Password for the dev user, over SSH and in the browser terminal. Generated on deploy; read it here in the Variables tab. Change it and redeploy to rotate. |
| `AUTHORIZED_KEYS` | - | Optional - SSH public keys, one per line, allowed to log in as dev without the password. Password login stays on either way. |
| `ANTHROPIC_API_KEY` | (secret) | Optional - Anthropic API key for Claude Code. Leave blank to sign in with a Claude subscription instead: run claude and follow the login link. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)
