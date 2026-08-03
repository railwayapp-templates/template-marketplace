# Deploy meshcentral on Railway

Remote device management with durable state

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/meshcentral)

## About

MeshCentral is an open-source remote device management platform for browser-based desktop, terminal, files, inventory, events, and agent administration. This template deploys stable version 1.2.4 with a generated full administrator and durable local state.

Sign in with `MESHCENTRAL_ADMIN_USER` and the generated `MESHCENTRAL_ADMIN_PASSWORD` service variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| meshcentral | [monotykamary/railway-template-meshcentral](https://github.com/monotykamary/railway-template-meshcentral) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal HTTP port behind Railway HTTPS. |
| `MESHCENTRAL_HOSTNAME` | - | Canonical public MeshCentral hostname. |
| `MESHCENTRAL_ADMIN_USER` | (secret) | Initial full administrator username. |
| `MESHCENTRAL_ADMIN_EMAIL` | admin@example.com | Initial full administrator email. |
| `MESHCENTRAL_SESSION_KEY` | - | Stable key used to secure server sessions. |
| `MESHCENTRAL_ADMIN_PASSWORD` | (secret) | Generated full administrator password. |

## Configuration

- **Healthcheck:** `/health.ashx`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Python, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/meshcentral)
