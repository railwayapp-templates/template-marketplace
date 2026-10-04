# Deploy Ubuntu Dev Box (SSH + Claude Code) on Railway

Persistent Ubuntu 24.04 dev box: SSH + browser terminal, Claude Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)

## About

![Claude Code starting in tmux on the Dev Box, with the same session attached over SSH and in the browser terminal on desktop and phone](https://bogusz.co/external/ubuntu-dev-box-banner-v1.png)

Your own always-on Ubuntu 24.04 box with Claude Code: SSH in from any client or open it in a browser, and your projects, dotfiles and Claude login survive every redeploy.

**Get started**

1. **Deploy.** Nothing to fill in; the SSH port is already exposed through a TCP proxy. Idle, it uses about 23 MB of RAM. Free and Trial volumes hold only 0.5 GB, so use Hobby for real projects.
2. **Connect.** The deploy log prints the exact `ssh dev@… -p …` line; the password is `SSH_PASSWORD` in the service's **Variables** tab. Or open the service URL for a browser terminal (user `dev`, same password).
3. **Run `claude`.** Sign in once with your Claude subscription, or set `ANTHROPIC_API_KEY`; the login is stored on the volume.

A persistent Ubuntu 24.04 LTS dev box you reach over **SSH** (from Termius, Blink, VS Code Remote or any client) or a **browser terminal**, with **Claude Code** preinstalled and your home directory on a **volume** that survives every redeploy. The service runs three small processes: `sshd` on port 22 behind a Railway TCP proxy, `ttyd` (a terminal in your browser) behind `nginx` with basic auth on the public HTTPS domain, and a supervisor that restarts any of them within seconds if it dies (say, after running out of memory), so the box stays up. Login is user `dev` with the generated `SSH_PASSWORD` or your public key; root login is disabled, sshd allows four tries per connection and throttles repeated failures per source address. `/home/dev` is a Railway volume, so projects, dotfiles, Claude Code's own state (`~/.claude`), tools you install and even the SSH host keys persist across redeploys. Railway's healthcheck (`/healthz`) only passes once the terminal actually answers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-ssh:24.04-20261003@sha256:f7231f540d36c0148d154bb43a4c46e924eb4a49a01b97dbffb94cce81e69b7c` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Optional - Timezone name such as Europe/Berlin or America/New_York. Default UTC. |
| `PORT` | 8080 | Port the browser terminal listens on. Railway's domain and healthcheck target it. Leave it as is. |
| `GITHUB_TOKEN` | (secret) | Optional - GitHub token. git clone/push over HTTPS and the gh CLI use it without a login prompt. |
| `SSH_PASSWORD` | (secret) | Password for the dev user, over SSH and in the browser terminal. Generated on deploy; read it here. Change it and redeploy to rotate. sshd allows four tries per connection and throttles repeated failures per source address. |
| `AUTHORIZED_KEYS` | - | Optional - SSH public keys, one per line, allowed to log in as dev without the password. Password login stays on either way. |
| `ANTHROPIC_API_KEY` | (secret) | Optional - Anthropic API key for Claude Code. Leave blank to sign in with a Claude subscription instead: run claude and follow the login link. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kit-ubuntu-ssh-skeleton-0919)
