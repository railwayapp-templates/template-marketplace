# Deploy Ubuntu Web Terminal on Railway

Ubuntu 24.04 Linux terminal in your browser: persistent home, no setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-web-terminal)

## About

![Ubuntu Web Terminal in a browser tab: tmux with Node 24, Python 3.12 and Claude Code, two cloned repos and a passing test run](https://bogusz.co/external/ubuntu-web-terminal-banner-v1.png)

A real Ubuntu 24.04 shell in any browser tab — laptop, phone or locked-down work machine — with your home directory on a volume, so files and installed tools survive every redeploy.

**Get started**

1. **Deploy.** Nothing to fill in. Idle, it uses about 20 MB of RAM and runs on every plan; Free and Trial volumes hold only 0.5 GB, so move to Hobby once you install toolchains or clone real projects.
2. **Sign in.** Open the service URL. Username `dev`; the password is `PASSWORD` in the service's **Variables** tab.
3. **Start working.** You land in `tmux` with Node.js 24, Python 3, git, `gh` and Claude Code installed. Run `claude`, clone a repo, or start a long job and close the tab — reopening the URL reattaches.

The service runs two small processes: `ttyd` (a terminal over WebSocket) on loopback and `nginx` on the public HTTPS domain with basic auth in front of it. The healthcheck `/healthz` is open and only passes once the terminal actually answers, so Railway routes traffic to a new deployment only when it is ready. The shell attaches to a `tmux` session named `main`, so closing the tab does not kill what you were running — reopen the URL and you are back where you left off. `/home/dev` is a Railway volume: projects, dotfiles, `~/.local`, `~/.npm-global` and Claude Code's login all persist. The image is built from a public Dockerfile and pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ghcr.io/will-bogusz/railway-ubuntu-ssh:24.04-20261003@sha256:f7231f540d36c0148d154bb43a4c46e924eb4a49a01b97dbffb94cce81e69b7c` | Web service |

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
