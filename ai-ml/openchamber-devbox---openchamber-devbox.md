# Deploy openchamber-devbox on Railway

Self-hosted AI developer workstation with OpenChamber & OpenCode

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openchamber-devbox)

## About

<p align="center">
  <img width="720" alt="OpenChamber &amp; OpenCode — open-source AI coding agent workspace" src="https://raw.githubusercontent.com/NOOBGLITCH/Opencode-on-Railway/main/assets/hero.png">
</p>

[OpenChamber](https://openchamber.dev) and [OpenCode](https://opencode.ai) provide a complete, self-hosted **AI coding agent workstation** — reading your repo, writing and editing code, executing commands, running serverless deployments, and opening pull requests. This template provisions a Railway service with **two front doors**: a **browser web UI (OpenChamber)** on a public domain, and the **`opencode` terminal TUI** over `railway ssh` — both sharing one persistent `/workspace` volume with pre-installed DevOps tools (Wrangler, GitLab CLI, GitHub CLI, Git SSH).

One container runs **`openchamber`** on a public, password-protected Railway domain; `railway ssh` into the same container gives you the **`opencode` TUI**. A `/workspace` volume keeps your repos, OpenCode settings (`opencode.json`), skills, MCP servers, Wrangler auth, and credentials across redeploys. Pre-installed tools include Cloudflare Wrangler (`wrangler`), GitLab CLI (`glab`), GitHub CLI (`gh`), and Git with auto-generated ed25519 SSH keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openchamber-devbox | [NOOBGLITCH/Opencode-on-Railway](https://github.com/NOOBGLITCH/Opencode-on-Railway) (root: opencode) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCHAMBER_UI_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openchamber-devbox)
