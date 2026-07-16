# Deploy Ubuntu SSH + Claude on Railway

ARA TM —SSH server with root access + Claude Code pre-installed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ssh-claude)

## About

Deploy your own **Ubuntu 24.04 cloud workstation** on Railway in one click. This template builds from the Dockerfile in `parham7991/railway-ubuntu-ssh-claude`, starts `sshd` on port 22, and automatically exposes it via **Railway TCP Proxy**. 

**Steps:**
1. Set `ROOT_PASSWORD` (required) in Variables
2. Click Deploy
3. Go to Service → Settings → Networking → copy your TCP Proxy domain and port
4. Connect: `ssh root@ -p `

The container configures root password, optional sudo user, authorized_keys, and injects `ANTHROPIC_AUTH_TOKEN` on every boot. No manual VPS setup.

This template hosts a **persistent SSH server** inside Railway's container runtime:

- **Base:** Ubuntu 24.04 LTS minimal
- **Service:** OpenSSH Server (sshd) running on port 22
- **Access:** Direct root login with password or key auth (`AUTHORIZED_KEYS`)
- **Tooling:** git, curl, wget, vim, nano, micro, tmux, screen, zsh, htop, btop, bat, ripgrep, jq, Python 3, Node.js + npm, build-essential
- **AI:** Claude Code (Anthropic official CLI) pre-installed, managed via `claude-settings.json` (OpenRouter-ready by default)
- **UX:** `cl` / `زم` command opens a persistent tmux session `claude` running Claude Code, ARA TM welcome banner, bilingual EN/FA support via `APP_LANG`

Hosting is ephemeral by design (Docker), not a traditional VPS. Use Railway Volumes if you need persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu(ssh+claude) | [parham7991/railway-ubuntu-ssh-claude](https://github.com/parham7991/railway-ubuntu-ssh-claude) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_LANG` | en | Runtime message language: en or fa. / زبان پیام‌ها: en یا fa. |
| `SSH_PASSWORD` | (secret) | Password for the optional user. / رمز کاربر اختیاری. |
| `SSH_USERNAME` | (secret) | Optional secondary sudo user. Must be set together with SSH_PASSWORD. / کاربر sudo ثانویه اختیاری. باید با SSH_PASSWORD ست شود. |
| `ROOT_PASSWORD` | (secret) | Password for the root user. Mandatory — the container will not start without it. / رمز کاربر root. الزامی — بدون آن کانتینر اجرا نمی‌شود. |
| `AUTHORIZED_KEYS` | - | SSH public key(s) for root key-based auth (password login stays on). / کلید(های) عمومی SSH برای root. |
| `ANTHROPIC_AUTH_TOKEN` | (secret) | Token for Claude Code (OpenRouter / Anthropic). Applied on every deploy. / توکن Claude Code. روی هر دیپلوی اعمال می‌شود. |

## Configuration

- **TCP Proxies:** 22

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-ssh-claude)
