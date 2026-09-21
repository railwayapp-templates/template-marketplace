# Deploy Ubuntu Dev Box (SSH + Claude Code) on Railway

Persistent Ubuntu 24.04 dev box: SSH + browser terminal, Claude Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)

## About

A persistent Ubuntu 24.04 LTS dev box you reach over **SSH** (from Termius, Blink, VS Code Remote or any client) or a **browser terminal**, with **Claude Code** preinstalled and your home directory on a **volume** that survives every redeploy — the thing most SSH templates here lack. One click, no inputs: the password is generated for you. Node.js 24 LTS, Python 3, git, GitHub CLI, build-essential, tmux and the usual tools are included; `dev` has passwordless `sudo`.

**Plan requirements.** Idle, the box uses about **23 MB** of RAM (measured on this image: 23 MB after five idle minutes, 31 MB peak at boot) and is well under Railway's Free and Trial limits. Claude Code sessions add a few hundred MB while they run; builds and language servers add whatever they need. Hobby is the comfortable fit for daily use. The image is pinned by digest, so what you deploy today is what you get on every redeploy.

The service runs three small processes: `sshd` on port 22 behind a Railway TCP proxy, `ttyd` (a terminal in your browser) behind `nginx` with basic auth on the public HTTPS domain, and a supervisor that exits if any of them dies so Railway's restart policy takes over. Login is user `dev` with the generated `SSH_PASSWORD` or your public key; root login is disabled, and failed logins are throttled per source address (with `fail2ban` banning a source after 5 failures when the container has the capability, sshd's own per-source limits otherwise). `/home/dev` is a Railway volume, so projects, dotfiles, Claude Code's own state (`~/.claude`), tools you install and even the SSH host keys persist across redeploys. Railway's healthcheck (`/healthz`) only passes once the terminal actually answers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-ssh:24.04-20260920b@sha256:ebaafc81557b7294a2b13d08986173efacab19d3004c2ac40074753dbcf6136c` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Optional - Timezone name such as Europe/Berlin or America/New_York. Default UTC. |
| `PORT` | 8080 | Port the browser terminal listens on. Railway's domain and healthcheck target it. Leave it as is. |
| `GITHUB_TOKEN` | (secret) | Optional - GitHub token. git clone/push over HTTPS and the gh CLI use it without a login prompt. |
| `SSH_PASSWORD` | (secret) | Password for the dev user, over SSH and in the browser terminal. Generated on deploy; read it here in the Variables tab. Change it and redeploy to rotate. fail2ban bans a source after 5 failed logins. |
| `AUTHORIZED_KEYS` | - | Optional - SSH public keys, one per line, allowed to log in as dev without the password. Password login stays on either way. |
| `ANTHROPIC_API_KEY` | (secret) | Optional - Anthropic API key for Claude Code. Leave blank to sign in with a Claude subscription instead: run claude and follow the login link. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)
