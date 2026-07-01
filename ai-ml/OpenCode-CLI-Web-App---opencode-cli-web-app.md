# Deploy OpenCode CLI + Web App on Railway

OpenCode web UI on a public URL + SSH TUI, all in one Railway box

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-cli-web-app)

## About

<p align="center">
  <img width="720" alt="OpenCode — open-source AI coding agent" src="https://raw.githubusercontent.com/yuting1214/opencode-railway/f96aaa0af904d4c13a8207598bd4c82420640984/assets/hero.png">
</p>

[OpenCode](https://opencode.ai) is **the open-source AI coding agent** (think Claude Code, but open
and provider-agnostic) — it reads your repo, writes and edits code, runs commands, and opens pull
requests. This template runs it as a Railway service with **two front doors**: a **browser web UI**
on a public domain, and the **`opencode` terminal UI** over `railway ssh` — both sharing one
`/workspace`, auth, and repos that persist on a volume.

One container runs **`opencode web`** on a public, password-protected Railway domain; `railway ssh`
into the same container gives you the **`opencode` TUI**. A `/workspace` volume keeps your repos and
OpenCode credentials across redeploys, and `git` + the GitHub CLI are preinstalled for clone /
commit / PR work. Railway builds the image, provisions TLS and the domain, and restarts on failure.
Bring an LLM API key (or run `opencode auth login` after connecting).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [yuting1214/opencode-railway](https://github.com/yuting1214/opencode-railway) (root: /opencode) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCODE_SERVER_PASSWORD` | (secret) |
| `OPENCODE_SERVER_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode-cli-web-app)
