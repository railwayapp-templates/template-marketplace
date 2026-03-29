# Deploy Claw-Relay on Railway

Secure browser relay for AI agents. Token auth, permissions, audit logs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claw-relay)

## About

Claw Relay is a secure relay that gives AI agents controlled access to a real Chrome browser. Token auth, scoped permissions, site allowlists, rate limits, and full audit logging — all enforced before anything touches the browser.

This template deploys Claw Relay with a bundled headless Chromium instance. On first deploy, it auto-generates secure tokens for agent auth and dashboard access (printed to logs). Set AGENT_TOKEN and ADMIN_TOKEN environment variables to use your own. Agents connect over WebSocket using the public Railway URL. The dashboard runs on a separate port for monitoring connected agents and reviewing audit logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claw-relay | [AndreaGriffiths11/claw-relay](https://github.com/AndreaGriffiths11/claw-relay) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9333 | Relay WebSocket port |
| `GENT_TOKEN` | (secret) | gent auth token. Auto-generated on first deploy if empty. |
| `ADMIN_TOKEN` | (secret) | ashboard admin token. Auto-generated on first deploy if empty. |
| `DASHBOARD_PORT` | 9334 | Dashboard UI port |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, HTML, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/claw-relay)
