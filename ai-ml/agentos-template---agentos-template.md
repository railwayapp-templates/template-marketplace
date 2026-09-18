# Deploy agentos-template on Railway

Self-hosted AI workforce control plane (AgentOS + OpenClaw) in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentos-template)

## About

Deploying AgentOS on Railway provisions a single supervised container that runs the AgentOS control plane and its OpenClaw Gateway runtime together, with one persistent volume for all durable state. The service listens on port `3000` behind Railway's HTTPS domain, health-checks on `/_agentos/healthz` (gateway and control-plane liveness), and restarts on failure (max 10 retries). You do not need any API key at deploy time; the deployment reaches a healthy state unconfigured and waits for you to connect a model provider.

Hosting AgentOS yourself means your agents' credentials, sessions, workspace files, and task history stay inside your own Railway project and its encrypted volume, in one region you control, instead of on a third-party SaaS. The template pins the exact upstream revision (AgentOS 0.8.0, OpenClaw Gateway 2026.9.4) in a public, reproducible repository, so your deployment is auditable and upgradable on your schedule. Interactive Chromium (Live View / Secure Browser) runs in-container on loopback only; raw VNC and CDP ports are never exposed. Plan for roughly the cost of one small always-on container plus volume storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentOS | [lNamelessl/agentos-railway-template](https://github.com/lNamelessl/agentos-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AGENTOS_API_TOKEN` | (secret) |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `AGENTOS_INITIAL_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/_agentos/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, Rust, HTML, Shell, PowerShell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/agentos-template)
