# Deploy Codex CLI - Terminal and Browser on Railway

Run the OpenAI Codex CLI on a persistent Railway box, TUI or browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-cli-terminal-and-browser)

## About

[Codex CLI](https://github.com/openai/codex) is **OpenAI's coding agent for the terminal** — it reads
your repo, writes and edits code, runs commands, and opens pull requests. This template runs the real
`codex` TUI on a persistent Railway box with **two ways in**: `railway ssh` from your terminal, or a
**browser terminal** on a public domain — both attached to the same tmux session, with repos, auth
and sessions on a volume that survives redeploys.

One container runs the **actual Codex CLI**, not a reimplementation of it. `ttyd` serves a persistent
`tmux` session on a password-protected Railway domain, and `railway ssh --session codex` attaches to
that very same session — so a dropped connection, a closed tab, or a switch from laptop to phone
never loses your place. A `/workspace` volume keeps repos, `config.toml`, `auth.json` and your Codex
session history across redeploys, so `codex resume` still works. `git` and the GitHub CLI are
preinstalled, and the Codex version is pinned so two deploys of the same commit build the same agent.
The deploy form asks for no credentials at all — you authenticate inside the box the same way you do
locally, with `codex login --device-auth` on your ChatGPT plan, or by adding an `OPENAI_API_KEY`
variable if you would rather bill at API rates.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codex | [yuting1214/codex-railway](https://github.com/yuting1214/codex-railway) (root: /codex) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CODEX_WEB_PASSWORD` | (secret) |
| `CODEX_WEB_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/codex-cli-terminal-and-browser)
