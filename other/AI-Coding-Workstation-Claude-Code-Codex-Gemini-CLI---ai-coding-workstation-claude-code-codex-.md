# Deploy AI Coding Workstation (Claude Code, Codex, Gemini CLI) on Railway

Browser VS Code and terminal with AI coding CLIs and a persistent home.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-coding-workstation-claude-code-codex-)

## About

A cloud development box with VS Code in the browser (code-server), a full terminal and optional SSH. Claude Code, OpenAI Codex CLI, Gemini CLI and OpenCode come preinstalled, along with Node.js, Python, uv, git, gh and build tools. Your home directory, projects and CLI logins live on a persistent volume.

AI coding agents work best on a machine that stays online: long tasks keep running after you close your laptop, and you can check in from any browser or phone. Hosting one yourself means maintaining a Linux box with an IDE, the agent CLIs, language runtimes, secure remote access and storage that survives rebuilds. This template builds on the official code-server image (Ubuntu 24.04 LTS), installs each AI CLI from its vendor's official npm package at a pinned version, mounts a Railway volume at `/home`, protects the IDE with a generated password and offers SSH through a Railway TCP proxy. You bring your own subscriptions or API keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Workstation | [baranberkay96/ai-coding-workstation-railway](https://github.com/baranberkay96/ai-coding-workstation-railway) (branch: main) (root: /services/workstation) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for shells and tools (e.g. Europe/Istanbul). |
| `PORT` | 8080 | Port code-server listens on; the public domain targets it. |
| `GIT_REPO` | - | Optional repository URL cloned once into ~/workspace on first start (private repos need GITHUB_TOKEN). |
| `PASSWORD` | (secret) | Login password for the browser IDE (code-server). Generated at deploy; copy it from this variable. Minimum 12 characters. |
| `SSH_PORT` | 2222 | Port sshd listens on inside the container; the TCP proxy targets it. |
| `GITHUB_TOKEN` | (secret) | Optional GitHub token for gh and HTTPS git (configured as git credential helper at start). |
| `SSH_PASSWORD` | (secret) | Password for SSH as user 'coder' through the TCP proxy. Clear it to allow key-only SSH; with no password and no keys, sshd is not started. |
| `GIT_USER_NAME` | - | Optional git user.name for commits. |
| `GEMINI_API_KEY` | (secret) | Optional. Gemini CLI uses it instead of a Google login. |
| `GIT_USER_EMAIL` | - | Optional git user.email for commits. |
| `OPENAI_API_KEY` | (secret) | Optional. Codex CLI uses it instead of a ChatGPT login (codex login --device-auth). |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Claude Code uses it instead of a Claude.ai login. Leave empty to log in with your Pro/Max subscription. |
| `OPENROUTER_API_KEY` | (secret) | Optional. Lets OpenCode use OpenRouter models. |
| `SSH_AUTHORIZED_KEYS` | - | Optional SSH public keys (one per line) allowed to log in as 'coder'. Keys you add to ~/.ssh/authorized_keys also persist. |
| `WORKSTATION_ENV_PASSTHROUGH` | - | Optional comma-separated names of extra variables to expose in SSH sessions (the browser terminal sees all variables). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 2222
- **Volume:** `/home`

**Category:** Other · **Tags:** code-server, vscode, claude-code, codex, gemini-cli · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ai-coding-workstation-claude-code-codex-)
