# Deploy Hermes Agent on NixOS | (Just Updated) Self-Improving Agent, Memory Persists on Railway

Self-improving agent on nix. Memory and skills survive redeploys. 1 GB min.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-on-nixos-or-just-updated-se)

## About

Hermes Agent is a self-hosted, self-improving AI agent: it keeps memory and identity across sessions,
builds and refines its own skills from experience, and is reachable from Telegram, Discord, Slack,
WhatsApp, Signal, email or a web dashboard. It does real work with real tools — terminal, files,
browser, MCP servers — rather than only answering questions.

This template runs it on **nix**, which is the difference that matters. The agent has all of nixpkgs
available at runtime: `nix run nixpkgs#ffmpeg`, `nix profile add nixpkgs#pandoc`, no image rebuild
and no redeploy. A self-improving agent that can also acquire new tools mid-task improves along an
axis it otherwise cannot.

Hermes is built to run continuously — it holds channel connections, remembers across sessions, and
accumulates skills. That needs persistent storage, and it needs the *right* storage: upstream puts
everything under `HERMES_HOME`, which defaults to `/opt/data`. A volume mounted on the home directory
would not cover that path, so config, keys, sessions, skills and memory would silently reset on every
redeploy while appearing to be persisted. **This template relocates `HERMES_HOME` under the home
directory** so a single volume genuinely holds the agent's identity.

**Memory floor: 1 GB.** Measured: the Free plan's 0.5 GB is OOM-killed unpacking the nixpkgs channel.
The dashboard idles near 113 MB here, so 1 GB leaves comfortable headroom. Browser-driving tools are
not bundled in this image; upstream suggests 2–4 GB if you add them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | `ghcr.io/bon5co/hermes-nixos-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/hermes`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-on-nixos-or-just-updated-se)
