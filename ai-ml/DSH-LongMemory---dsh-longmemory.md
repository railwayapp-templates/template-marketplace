# Deploy DSH + LongMemory on Railway

DSH, DeepSeek's coding agent, with LongMemory as its MCP memory server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dsh-longmemory)

## About

[DSH](https://github.com/deepseek-ai/deepseek-harness) is DeepSeek Harness, DeepSeek's open-source
coding agent: a model that reads your files, runs shell commands and keeps working through a long
task, with a browser UI. This template runs DSH 0.1.5-rc.1 on Railway and pairs it with a
[LongMemory](https://github.com/CaviraOSS/LongMemory) server as an MCP tool server, so the agent
can recall, store decisions and track task state across sessions. Built on DeepSeek Harness; not
affiliated with or endorsed by DeepSeek.

DSH's web surface is built to run on your own machine: it binds loopback only and refuses to listen
on all interfaces. This template therefore puts Caddy in the same container, answering the platform
health check itself and forwarding to the harness. The forwarding has one non-negotiable property —
the browser's `Host` header passes through untouched — because DSH checks every API call and
WebSocket against a trust fence that requires the request `Host` to be a trusted authority and any
`Origin` to match it. The template registers your Railway domain as trusted at boot.

Sign-in is DSH's own. Each start prints a one-time URL carrying a token; opening it sets a signed
30-day cookie. That cookie's signing secret lives on the volume, so a redeploy prints a new token but
does not sign you out. Your workspace, sessions, settings, credentials and any toolchain you install
also live on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dsh | [RockinPaul/dsh_railway_template](https://github.com/RockinPaul/dsh_railway_template) (root: /dsh) | Web service |
| longmemory | [RockinPaul/longmemory_railway_template](https://github.com/RockinPaul/longmemory_railway_template) (root: /longmemory) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEEPSEEK_API_KEY` | dsh | (secret) | Your DeepSeek API key (platform.deepseek.com). Optional at deploy time: you can paste it later under Settings -> Models, and the harness keeps it on the volume. |
| `LONGMEMORY_API_KEY` | dsh | (secret) | Bearer token for that endpoint, shared from the longmemory service. Derived. |
| `LONGMEMORY_MCP_URL` | dsh | - | The LongMemory MCP endpoint on the private network. Derived; nothing to fill in. |
| `LONGMEMORY_API_KEY` | longmemory | (secret) | Protects the REST API and /mcp. Generated for this deployment; nothing to fill in. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/dsh-longmemory)
