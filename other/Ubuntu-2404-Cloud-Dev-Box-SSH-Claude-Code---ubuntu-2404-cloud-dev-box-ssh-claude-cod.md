# Deploy Ubuntu 24.04 Cloud Dev Box (SSH + Claude Code) on Railway

Always-on Ubuntu box with SSH, tmux and AI coding CLIs on persistent disk.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2404-cloud-dev-box-ssh-claude-cod)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2404-cloud-dev-box-ssh-claude-cod?referralCode=20H68q)

An always-on Ubuntu 24.04 machine you reach over SSH. It comes with tmux, build tools, Node.js, Python and uv, and the AI coding CLIs Claude Code, OpenAI Codex CLI, Gemini CLI and OpenCode. Your home directory, projects and CLI logins live on a persistent volume.

A remote dev box earns its keep when it stays online: agents keep working in tmux after you close your laptop, and you can connect from any computer, tablet or editor. Running one yourself means maintaining a Linux host, SSH access, tooling and storage that survives rebuilds. This community template builds a pinned Ubuntu 24.04 image, runs OpenSSH behind a Railway TCP proxy for the user `dev` (passwordless sudo, no root login), generates the passwords at deploy and keeps the SSH host keys on the volume, so clients never see "host key changed" after a redeploy. A small password-protected status page and an optional browser terminal run on the public URL. You bring your own AI subscriptions or API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dev Box | [baranberkay96/ubuntu-devbox-railway](https://github.com/baranberkay96/ubuntu-devbox-railway) (branch: main) (root: /services/devbox) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for shells and tools, e.g. Europe/Istanbul. |
| `PORT` | 8080 | HTTP port for the healthcheck, status page and web terminal; the public domain targets it. |
| `GIT_REPO` | - | Optional repository URL cloned once into ~/workspace on first start (private repos need GITHUB_TOKEN). |
| `APT_PACKAGES` | - | Optional space-separated Ubuntu packages reinstalled in the background at every start (apt installs do not survive redeploys). |
| `GITHUB_TOKEN` | (secret) | Optional GitHub token for gh and HTTPS git (set up as git credential helper at start). |
| `SSH_PASSWORD` | (secret) | Password for SSH as user 'dev', generated at deploy. Clear it for key-only SSH (then set SSH_AUTHORIZED_KEYS). Minimum 12 characters. |
| `WEB_PASSWORD` | (secret) | Password (user 'dev') for the status page and web terminal on the public URL. Generated at deploy; only /healthz is public. Minimum 12 characters. |
| `WEB_TERMINAL` | true | Browser terminal (ttyd) at /terminal/ behind WEB_PASSWORD. Set to false to keep only the status page. |
| `GIT_USER_NAME` | - | Optional git user.name for commits. |
| `GEMINI_API_KEY` | (secret) | Optional. Gemini API key (Google AI Studio) for Gemini CLI; the simplest login on a remote box. |
| `GIT_USER_EMAIL` | - | Optional git user.email for commits. |
| `OPENAI_API_KEY` | (secret) | Optional. OpenAI API key for Codex CLI (alternative to `codex login --device-auth` with ChatGPT). |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Claude Code uses this Anthropic API key instead of a Claude subscription login. |
| `OPENROUTER_API_KEY` | (secret) | Optional. Lets OpenCode use OpenRouter models. Other providers: run `opencode auth login`. |
| `SSH_AUTHORIZED_KEYS` | - | Recommended. Your SSH public key(s) for user 'dev', one per line (several on one line also work). Keys added to ~/.ssh/authorized_keys persist too. |
| `DEVBOX_ENV_PASSTHROUGH` | - | Optional comma-separated names of extra variables to expose in SSH and web terminal shells. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Long-lived Claude subscription token from `claude setup-token`, for headless use without the login prompt. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home`

**Category:** Other · **Tags:** ubuntu, ssh, devbox, tmux, claude-code · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-2404-cloud-dev-box-ssh-claude-cod)
