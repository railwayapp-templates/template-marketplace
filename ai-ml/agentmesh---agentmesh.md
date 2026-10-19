# Deploy agentmesh on Railway

Private agent mesh with control plane, router, and web console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentmesh)

## About

Agent Mesh is a private network for AI agents. Its all-in-one server combines a control plane, libp2p router, enrollment and policy APIs, and a browser console. Deploy it on Railway to give agents a simple HTTPS endpoint for identity-aware service discovery, secure routing, and operator management without assembling multiple infrastructure services.

Railway runs the pinned upstream GHCR image as one HTTP service. Railway provides the public HTTPS domain, environment-variable management, automated restarts, and a one-click deployment experience while Agent Mesh supplies its control plane, embedded router, SQLite store, and web console.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agentmesh-one | `ghcr.io/google/agentmesh-one:c34e3ca698425c6a1120c93d8d84f27d288775fc` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AGENTMESH_TOKEN` | (secret) |
| `AGENTMESH_ADMIN_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agentmesh)
