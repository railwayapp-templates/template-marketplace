# Deploy Debian 13 Web Terminal (Browser Shell) on Railway

Persistent Debian shell in your browser, password-protected. No SSH needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-13-web-terminal-browser-shell)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/debian-13-web-terminal-browser-shell?referralCode=20H68q)

A Debian 13 (trixie) shell you open in any browser. The shell runs in tmux, so your session and running commands survive closed tabs and dropped connections. A generated password protects it, and your home directory sits on a persistent volume. git, Python, Node.js, build tools and editors come preinstalled.

A web terminal needs a long-running Linux container with a terminal server, real authentication in front of it, TLS, and storage that outlives rebuilds. This community template builds on the official `debian:13.7` image and serves the shell with ttyd 1.7.7. nginx stands in front of ttyd and checks a password that Railway generates at deploy. You work as a normal user, `debian`, with sudo, and `/home` is a Railway volume. Railway's edge provides HTTPS. Each browser tab attaches to a tmux session, so long jobs keep running after you close the tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Terminal | [baranberkay96/debian-terminal-railway](https://github.com/baranberkay96/debian-terminal-railway) (branch: main) (root: /services/terminal) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone of the shell, e.g. Europe/Istanbul. |
| `PORT` | 8080 | Port of the auth proxy (nginx). The public domain and healthcheck use it. ttyd stays on 127.0.0.1:7681. |
| `PASSWORD` | (secret) | Browser login password, generated at deploy (copy it from this variable). Min 12 chars. The terminal does not start without it. |
| `USERNAME` | (secret) | Browser login name (letters, digits, . _ -). The Linux account is always 'debian', with sudo. |
| `APT_PACKAGES` | - | Optional. Debian packages (space-separated) reinstalled in the background at every start, since apt installs reset on redeploy. |
| `TERMINAL_TMUX` | true | true: each tab attaches to a tmux session that survives closed tabs and reconnects. false: a new bash per tab. |
| `TERMINAL_FONT_SIZE` | 15 | Font size of the browser terminal (8-40). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home`

**Category:** Other · **Tags:** debian, terminal, web-terminal, ttyd, tmux · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/debian-13-web-terminal-browser-shell)
