# Deploy OpenClaw on NixOS | (Just Updated) AI Agent That Installs Its Own Tools on Railway

Self-hosted AI agent on nix. Installs any tool at runtime. 1 GB RAM min.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-on-nixos-or-just-updated-ai-age)

## About

OpenClaw is a self-hosted personal AI assistant gateway: one long-running process that bridges your
chat channels (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Matrix, Teams) to an LLM backend
and a set of tool plugins, so you talk to one assistant from wherever you already are.

This template runs it on **nix**, which is the part that makes it different. The agent has the whole
nixpkgs collection available at runtime — `nix run nixpkgs#ffmpeg`, `nix profile add nixpkgs#pandoc`
— without you rebuilding an image or redeploying. An agent that can reach for any tool mid-task is a
meaningfully more capable agent than one boxed into whatever its image shipped with.

OpenClaw wants to be always-on: it holds channel connections open and answers whenever you message
it, which is exactly the workload a laptop is bad at and a small always-on container is good at. The
gateway keeps config, credentials, session history and its workspace on disk, so it needs persistent
storage to stay itself across restarts. This template mounts a volume over the entire home directory
rather than a single config folder — OpenClaw splits state across `~/.openclaw` and
`~/.config/openclaw` (the second holds the OAuth-token encryption key), and a narrower mount quietly
loses key material on redeploy.

**Memory floor: 1 GB.** Measured, not guessed. The Free plan's 0.5 GB is OOM-killed while unpacking
the nixpkgs channel; on 1 GB this image idles around 290–365 MB with headroom for the channel spike.
Deploy it on Trial or Hobby.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | `ghcr.io/bon5co/openclaw-nixos-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-on-nixos-or-just-updated-ai-age)
