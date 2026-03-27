# Deploy OpenClaw Railway Optimized (ClawdBot) on Railway

The quickest, easiest, and cheapest way to host OpenClaw on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-railway-o-1)

## About

OpenClaw Railway Optimized (ClawdBot) is a lower-memory, easier-to-use Railway deployment of OpenClaw with a faster setup flow, an auto-generated secure setup password, a simpler login flow, working Codex auth, and a simpler UI. It uses Platformatic's `node-caged` Node runtime to lower Railway spend, plus a full source install so OpenClaw can better inspect itself, understand its capabilities, and help debug issues when needed.

Hosting OpenClaw Railway Optimized (ClawdBot) on Railway gives you a single-container OpenClaw deployment with several advantages over the current most popular OpenClaw template on Railway, which has pain points including a harder setup flow and non-functioning Codex ChatGPT sign-in. This version improves on that with:
- A browser-based `/setup` wizard with automations to get you up and running faster
- Truly one-click deploy, with no pre-deploy setup on your end, and an auto-generated secure setup password
- Working Codex auth, so you can bring your own ChatGPT subscription
- A simpler login flow that is easier to follow
- A modern UI that feels lighter and faster to use

Under the hood it runs on Platformatic's `node-caged:25-slim` Node image, meaning lower RAM usage and lower costs. It uses OpenClaw's install-from-source method, which gives OpenClaw direct visibility into its own install so it can better understand available capabilities, inspect its environment, and help self-diagnose problems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | `colemandunn/openclaw_railway_optimized` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Password used to sign in to the proxy and access your OpenClaw instance. Copy it now or retrieve it later from your Railway service variables. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/openclaw-railway-o-1)
