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

Sign-in is a password you copy once from the service's Variables tab. Underneath it is still DSH's
own session: DSH mints a fresh launch token at every process start and trades it for a signed 30-day
cookie, and the token cannot be preset by flag, environment or config. Left alone that would mean
reading a token out of the deploy logs on every first visit, so the gateway does the exchange for
you — it holds the current token and walks your browser through DSH's ordinary sign-in the moment
you clear the password prompt. The password is a normal service variable, so it does not rotate,
and the cookie's signing secret lives on the volume, so redeploys do not sign you out. Your
workspace, sessions, settings, credentials and any toolchain you install also live on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dsh | [RockinPaul/dsh_railway_template](https://github.com/RockinPaul/dsh_railway_template) (root: /dsh) | Web service |
| longmemory | [RockinPaul/longmemory_railway_template](https://github.com/RockinPaul/longmemory_railway_template) (root: /longmemory) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DSH_GATE_USER` | dsh | (secret) | Username for that prompt. |
| `DEEPSEEK_API_KEY` | dsh | (secret) | Your DeepSeek API key (platform.deepseek.com). Optional at deploy time: you can paste it later under Settings -> Models, and the harness keeps it on the volume. |
| `DSH_GATE_PASSWORD` | dsh | (secret) | Your sign-in. Open the service domain, and the browser asks for this and DSH_GATE_USER. It also gates the automatic sign-in behind it: clear this and the deployment falls back to the token URL printed in the deploy logs. |
| `LONGMEMORY_API_KEY` | dsh | (secret) | Bearer token for that endpoint, shared from the longmemory service. Derived. |
| `LONGMEMORY_MCP_URL` | dsh | - | The LongMemory MCP endpoint on the private network. Derived; nothing to fill in. |
| `LONGMEMORY_API_KEY` | longmemory | (secret) | Protects the REST API and /mcp. Generated for this deployment; nothing to fill in. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/dsh-longmemory)
