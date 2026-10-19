# Deploy agentmesh on Railway

Secure all-in-one mesh control plane, router, API, and web console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmesh-1)

## About

Agent Mesh One is an all-in-one secure mesh server combining the Agent Mesh control plane, an authenticated libp2p router, SQLite-backed state, and a browser console in one container. It provides policy-aware enrollment, token exchange, service discovery, and administration for small deployments that need a zero-trust mesh and a straightforward web entry point.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmesh-1)

Railway runs the published, version-pinned GHCR image as a single HTTP service. Railway supplies TLS, a public domain, health visibility, regional scheduling, and generated template secrets, so the console and API are available immediately after deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmesh-one | `ghcr.io/google/agentmesh-one:v0.1.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AGENTMESH_TOKEN` | (secret) |
| `AGENTMESH_ADMIN_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/agentmesh-1)
