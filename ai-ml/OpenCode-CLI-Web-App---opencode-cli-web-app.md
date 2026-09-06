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
into the same container gives you the **`opencode` TUI** — the real terminal agent, not a web
console imitating one. A `/workspace` volume keeps your repos and OpenCode credentials across
redeploys, and `git` + the GitHub CLI are preinstalled for clone / commit / PR work. Railway
provisions TLS, the domain and the volume, and restarts on failure.

Deploys come from a **prebuilt, version-pinned image**, so there is no build to sit through and
every deploy runs the exact OpenCode build that was tested — new deploys pick up the latest patched
image automatically, while a box you already have keeps running undisturbed until you redeploy it.
The web UI password is **generated for your deploy**; you never invent one or inherit a shared
default. Add a provider key on the deploy form, or run `opencode auth login` after connecting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenCode | `ghcr.io/yuting1214/opencode-railway:1.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | GPT models. Set any one provider key here, or leave all blank and run `opencode auth login` inside the box. |
| `ANTHROPIC_API_KEY` | (secret) | Claude models. Set any one provider key here, or leave all blank and run `opencode auth login` inside the box. |
| `OPENROUTER_API_KEY` | (secret) | Many providers behind a single key. Set any one provider key here, or leave all blank and run `opencode auth login` inside the box. |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Password for the web UI sign-in. A strong one is generated for you — copy it from this service's Variables tab after deploying. |
| `OPENCODE_SERVER_USERNAME` | (secret) | Username for the web UI sign-in. The default works — change it only if you want a different login name. |

## Configuration

- **Healthcheck:** `/site.webmanifest`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-cli-web-app)
