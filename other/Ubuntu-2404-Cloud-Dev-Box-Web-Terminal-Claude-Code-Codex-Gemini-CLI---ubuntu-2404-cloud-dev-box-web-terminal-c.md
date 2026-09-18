# Deploy Ubuntu 24.04 Cloud Dev Box (Web Terminal + Claude Code, Codex, Gemini CLI) on Railway

Persistent Ubuntu web terminal with Claude Code, Codex & Gemini CLI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2404-cloud-dev-box-web-terminal-c)

## About

Ubuntu Cloud Dev Box is a persistent Ubuntu 24.04 LTS machine you open in your browser. It boots with Node.js 22, Python 3, git, build tools and the three major AI coding agents — **Claude Code**, **OpenAI Codex CLI** and **Google Gemini CLI** — pre-installed, behind a password-protected web terminal. Run agents on long tasks, clone repos, test scripts or just have a Linux shell from any device, including an iPad or a locked-down work laptop.

The template deploys the official `ubuntu:24.04` image with a start command that installs the toolchain on boot (about 2–3 minutes on first deploy) and then launches `ttyd`, a lightweight web terminal, on your Railway public domain with HTTP basic auth (`USERNAME` / generated `PASSWORD`). Your home directory `/root` — including `/root/workspace`, Claude Code settings, Codex and Gemini logins, SSH keys and shell history — is on a Railway volume, so everything survives restarts and redeploys. Set `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` or `GEMINI_API_KEY` to skip interactive login, or log in once inside the terminal (subscription logins persist on the volume). 1 GB RAM is plenty for CLI agents; scale up for heavy builds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu Dev Box | `ubuntu:24.04` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7681 | Port the web terminal listens on |
| `PASSWORD` | (secret) | Login password for the web terminal (generated - copy it from here) |
| `USERNAME` | (secret) | Login username for the web terminal |
| `GIT_USER_NAME` | - | Optional: git config user.name |
| `GEMINI_API_KEY` | (secret) | Optional: API key for Gemini CLI |
| `GIT_USER_EMAIL` | - | Optional: git config user.email |
| `OPENAI_API_KEY` | (secret) | Optional: API key for Codex CLI |
| `ANTHROPIC_API_KEY` | (secret) | Optional: API key so Claude Code works without /login |

## Configuration

- **Start command:** `bash -c 'set +e
export DEBIAN_FRONTEND=noninteractive
BIN=/root/.local/bin; mkdir -p "$BIN" /root/workspace
export PATH="$BIN:$PATH"
if [ ! -x "$BIN/ttyd" ]; then
  echo "[boot] fetching web terminal..."
  (command -v curl >/dev/null 2>&1 || (apt-get update -qq && apt-get install -y -qq curl ca-certificates)) >/dev/null 2>&1
  ARCH=$(uname -m); case "$ARCH" in aarch64|arm64) TA=aarch64;; *) TA=x86_64;; esac
  curl -fsSL -o "$BIN/ttyd" "https://github.com/tsl0922/ttyd/releases/download/1.7.7/ttyd.$TA" && chmod +x "$BIN/ttyd" || echo "[boot] ttyd download failed"
fi
if [ ! -f /root/.tools-installed ]; then
  echo "[boot] installing tools (first boot only, may take a few minutes)..."
  (apt-get update -qq && apt-get install -y -qq curl wget git vim nano htop tmux unzip zip jq ca-certificates gnupg build-essential python3 python3-pip python3-venv openssh-client sudo ripgrep) >/tmp/apt.log 2>&1 && touch /root/.tools-installed || { echo "[boot] some packages failed; see /tmp/apt.log"; tail -n 5 /tmp/apt.log; }
fi
if [ ! -f /root/.ai-clis-installed ]; then
  echo "[boot] installing Node 22 + AI coding CLIs..."
  (curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y -qq nodejs && npm install -g --silent @anthropic-ai/claude-code @openai/codex @google/gemini-cli) >/tmp/node.log 2>&1 && touch /root/.ai-clis-installed || { echo "[boot] AI CLI install issue; see /tmp/node.log"; tail -n 5 /tmp/node.log; }
fi
[ -n "$GIT_USER_NAME" ] && git config --global user.name "$GIT_USER_NAME"
[ -n "$GIT_USER_EMAIL" ] && git config --global user.email "$GIT_USER_EMAIL"
touch /root/.bashrc
grep -q "railway-box" /root/.bashrc || cat >> /root/.bashrc <<"BASHRC"
# railway-box
export PATH="/root/.local/bin:$PATH"
export PS1="\[\e[1;32m\]\u@railway\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ "
cd /root/workspace
echo "Ubuntu dev box | CLIs: claude, codex, gemini | files persist in /root"
BASHRC
if [ ! -x "$BIN/ttyd" ]; then echo "[boot] FATAL: web terminal binary missing; idling so you can inspect logs"; sleep infinity; fi
echo "[boot] terminal ready on port $PORT"
exec "$BIN/ttyd" -p "$PORT" -W -c "$USERNAME:$PASSWORD" -t fontSize=14 -t titleFixed="Ubuntu Dev Box" bash -l'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Other · **Tags:** ubuntu, linux, web-terminal, claude-code, codex, gemini-cli, dev-environment, ttyd, ssh

[View on Railway →](https://railway.com/deploy/ubuntu-2404-cloud-dev-box-web-terminal-c)
