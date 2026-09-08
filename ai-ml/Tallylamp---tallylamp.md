# Deploy Tallylamp on Railway

Persistent Chrome for MCP agents. Watch live and take control when needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tallylamp)

## About

Give your AI agent a browser you can watch and take over.

Tallylamp runs Chrome on your server and keeps its profile between sessions.
Your agent drives the browser through MCP. You can watch it live, take control
to sign in or finish a verification step, then return control to the agent.

Tallylamp is open source under the MIT license. You pay Railway for the
infrastructure used by your deployment.

One prebuilt container with Chrome, Xvfb, and Node.js, plus a persistent volume
at `/data`. The volume holds browser profiles and the SQLite database.
The service provides an authenticated dashboard and an MCP endpoint at `/mcp`.

The template generates a unique `ADMIN_SECRET` for each deployment.
After deploying, copy that value from your service's Railway variables, open
the public domain, and use it to sign into the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tallylamp | `ghcr.io/nxfi777/tallylamp@sha256:2326b4961e1c84228538a8b8b8b91fe3f1fb749115924f8f4152ebf8418ae268` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_SECRET` | (secret) |
| `TALLYLAMP_OAUTH` | 1 |
| `TALLYLAMP_SANDBOX` | auto |
| `TALLYLAMP_ADMIN_BEARER` | 0 |
| `TALLYLAMP_MAX_BROWSERS` | 2 |
| `TALLYLAMP_ALLOW_PRIVATE_NETWORK` | 0 |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tallylamp)
