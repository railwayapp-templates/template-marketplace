# Deploy Claw3D on Railway

A 3D virtual office for OpenClaw, Hermes, and custom AI agent runtimes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claw3d)

## About

Claw3D is a live 3D workspace for AI agents. Instead of watching agent activity through logs and dashboards, Claw3D lets you step into a virtual office where agents collaborate, review work, run tasks, and interact in real time.

It can connect to OpenClaw, Hermes, demo runtimes, and custom agent backends.

Hosting Claw3D on Railway gives you a self-hosted visual workspace for AI agent systems.

This template runs the official Claw3D container and exposes the Studio interface through Railway. Claw3D acts as the visualization and interaction layer, while the actual agent runtime remains in the connected backend.

The Studio can connect to OpenClaw Gateway, Hermes, a built-in demo runtime, or a custom HTTP runtime. Gateway credentials and runtime settings can be configured after deployment, so Claw3D can be launched even before a real agent backend is ready.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| claw3d | `ghcr.io/iamlukethedev/claw3d:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind Claw3D Studio to all container interfaces |
| `PORT` | 3000 | Public HTTP and WebSocket port used by Claw3D Studio |
| `CLAW3D_GATEWAY_URL` | - | Optional runtime WebSocket URL of an OpenClaw, Hermes, demo, or custom gateway |
| `UPSTREAM_ALLOWLIST` | - | Optional allowlist restricting upstream gateway hosts |
| `STUDIO_ACCESS_TOKEN` | (secret) | Protect the Claw3D Studio when exposed publicly |
| `CLAW3D_GATEWAY_TOKEN` | (secret) | Optional authentication token for the connected gateway |
| `CUSTOM_RUNTIME_ALLOWLIST` | - | Optional allowlist restricting custom runtime hosts |
| `CLAW3D_GATEWAY_ADAPTER_TYPE` | openclaw | Runtime backend type: openclaw, hermes, demo, local, claw3d, or custom |

## Configuration

- **Start command:** `/bin/sh -c 'npm install --no-save typescript@5 && exec node server/index.js'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.openclaw`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/claw3d)
