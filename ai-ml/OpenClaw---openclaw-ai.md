# Deploy OpenClaw on Railway

The personal AI assistant that really does things.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-ai)

## About

OpenClaw is an open-source personal AI assistant that runs on infrastructure you control and meets you in the chat apps you already use. It connects language-model providers, a growing library of tools, skills, and plugins, and messaging channels — Telegram, Discord, Slack, WhatsApp, Signal, iMessage, and more — through a single Gateway with a browser-based Control UI. Developers, tinkerers, and privacy-minded teams self-host OpenClaw to get a capable assistant that keeps conversations, credentials, and files on their own servers instead of a vendor's cloud. Deploy OpenClaw on Railway and you get that Gateway running in minutes, without wiring up Node, volumes, and reverse proxies by hand.

This template runs the official `openclaw/openclaw` image as one Gateway service. Railway terminates HTTPS at its edge and forwards traffic to the container, which serves both the Control UI and the gateway API on a single port. A persistent volume at `/data` holds your configuration, per-agent auth profiles, sessions, and workspace, so everything survives redeploys. Access is protected by an admin token you set once, and the container runs unprivileged after fixing up volume ownership at boot. To self-host OpenClaw this way you supply only a gateway token — the template handles ports, storage paths, binding, and the Control UI origin allowlist for you.

![OpenClaw Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787183184/23ac05ac-7fad-4f9d-98ae-7a592bba7e9d.png)

OpenClaw is a self-hosted assistant platform built for a single operator. Instead of a chatbot locked inside one app, it is a Gateway that bridges the models, tools, and channels you already use, reachable from your terminal, a web dashboard, and your chat apps. Teams self-host it when they want an assistant that can run real actions and hold context without shipping their data to a third party.

Key features:

- **Bring-your-own models** — connect hosted providers or local models; you own the keys and the bills.
- **Messaging channels** — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Google Chat, and more through one Gateway.
- **Tools, skills, and plugins** — extend what the assistant can do, with a plugin SDK and the ClawHub registry.
- **Own your data** — configuration, sessions, and files live on your volume, not a vendor cloud.
- **One control plane** — the Gateway manages sessions, tools, events, and channel connections behind token auth.

Architecture on Railway is deliberately simple: a single Gateway container does all of the work, and a Railway volume mounted at `/data` provides durable storage. There is no separate database to operate — OpenClaw keeps its state on disk, which is why the volume is the one piece of infrastructure that matters.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [gridalpha/openclaw-railway](https://github.com/gridalpha/openclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /home/node | Home directory for the runtime user |
| `PORT` | 8080 | Public port Caddy listens on |
| `OPENCLAW_HOME` | /home/node | OpenClaw home directory |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Persisted config, auth, sessions |
| `OPENCLAW_GATEWAY_PORT` | 8081 | Internal gateway port behind Caddy |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Admin secret protecting the gateway |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Persisted assistant workspace |
| `OPENCLAW_DISABLE_BONJOUR` | 1 | Disable mDNS, unused on Railway |
| `OPENCLAW_AUTH_PROFILE_SECRET_DIR` | (secret) | Persisted channel auth keys |

## Configuration

- **Healthcheck:** `/startupz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-ai)
