# Deploy Tallylamp on Railway

MCP browsers with saved profiles, human takeover, guest links and proxies.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tallylamp)

## About

Give your AI agent a browser you can watch and take over.

[Tallylamp](https://tallylamp.dev) gives your agent full, headed Chrome with a
display and Chrome's normal user agent. Each browser saves its own profile by
default, including cookies, logins, and local storage. Your agent can come back
to that profile for its next task instead of starting with an empty browser.

Your agent drives the browser through MCP. You can watch the same browser live,
take control to sign in or finish a verification step, then return it to the agent.
Websites can still expire logins or ask you to sign in again.

Tallylamp is open source under the MIT license. You pay Railway for the
infrastructure your deployment uses.

One prebuilt container with Chrome, Xvfb, and Node.js, plus a persistent volume
at `/data`. The volume holds browser profiles and the SQLite database.
The service provides an authenticated dashboard and an MCP endpoint at `/mcp`.

The template generates a unique `ADMIN_SECRET` for each deployment.
After deploying, copy that value from your service's Railway variables, open
the public domain, and use it to sign into the dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tallylamp | `ghcr.io/nxfi777/tallylamp@sha256:60a5beebc1bd40c316c400311a2259af37b426c65f15380f821fc37d9efed03f` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_SECRET` | (secret) |
| `TALLYLAMP_OAUTH` | 1 |
| `TALLYLAMP_SANDBOX` | auto |
| `TALLYLAMP_ADMIN_BEARER` | 0 |
| `TALLYLAMP_ALLOW_PRIVATE_NETWORK` | 0 |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tallylamp)
