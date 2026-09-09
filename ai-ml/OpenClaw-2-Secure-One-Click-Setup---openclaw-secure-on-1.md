# Deploy OpenClaw 2 — Secure One-Click Setup on Railway

Secure OpenClaw with browser setup, persistent data, and one-click deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-secure-on-1)

## About

OpenClaw on Railway is a complete, security-focused deployment of the official OpenClaw container. It adds a protected browser setup wizard, persistent storage, health checks, and a secure handoff to the OpenClaw dashboard—without requiring users to configure a shell or copy Gateway tokens.

The template creates one OpenClaw service and a persistent volume mounted at `/data`. Railway provides the public HTTPS endpoint while the OpenClaw Gateway remains private on loopback. During first run, the user unlocks the setup dashboard with SETUP_PASSWORD, then either configures and validates an AI provider or defers provider setup until the OpenClaw dashboard. Telegram and Discord remain optional.

Configured provider and channel credentials stay in OpenClaw's private state on the persistent `/data` volume. After setup, channel DM access requests can be reviewed and approved from **Settings → Channels → DM access requests** in the official OpenClaw dashboard. The entire deployment, provider setup, channel setup, and pairing flow works in the browser—no terminal or Railway shell is required.

Configuration and workspace data persist across normal redeployments. The included `/healthz` and `/readyz` endpoints provide deployment and Gateway readiness signals.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [Timboslice212/openclaw-railway-template](https://github.com/Timboslice212/openclaw-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SETUP_PASSWORD` | (secret) | Choose a strong password with at least 12 characters to unlock the secure setup dashboard. No username required. |
| `XDG_CACHE_HOME` | /data/.cache | Persistent cache directory used by OpenClaw. |
| `XDG_CONFIG_HOME` | /data/.config | Persistent configuration directory used by OpenClaw. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Persistent OpenClaw state and credentials directory. |
| `OPENCLAW_VOLUME_ROOT` | /data | Railway persistent volume mount root. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Persistent workspace for agents and user files. |
| `OPENCLAW_INTERNAL_GATEWAY_HOST` | 127.0.0.1 | Private loopback host for the internal OpenClaw Gateway. |
| `OPENCLAW_INTERNAL_GATEWAY_PORT` | 18789 | Private port for the internal OpenClaw Gateway. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/openclaw-secure-on-1)
