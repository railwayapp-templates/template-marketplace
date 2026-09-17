# Deploy QwenPaw on Railway

Self-hosted AI assistant with memory, skills and browser automation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qwenpaw-1)

## About

[QwenPaw](https://github.com/agentscope-ai/QwenPaw) is a personal AI assistant you run yourself: a
web console with chat, long-term memory, skills, a plugin system, browser automation and an agent
that can run shell commands on your behalf. It connects to about twenty model providers, or to any
OpenAI- or Anthropic-compatible endpoint you point it at.

This template runs it on Railway with its working directory, its secrets and its backups on a single
volume, behind a login that is required rather than optional. One service, one volume, a public
domain.

QwenPaw is a single Python service. The console, the API and the agent's tool calls all travel over
one HTTP port, so there is nothing to wire together — no database, no queue, no second container and
no media path. The container also runs a small X display so the agent can drive a real Chromium for
browser automation; it is machinery, not a screen you connect to.

Everything the assistant owns lives on the volume: `working` for conversations, memory and skills,
`working.secret` for provider credentials at mode 0700, and `working.backups`. Upstream defaults all
three under `/app`, where a redeploy would discard them, so this template points them at `/data`.

The part this template takes seriously is the login. QwenPaw ships with authentication off and
upstream's container entrypoint only prints a warning about it. On a public domain that warning
describes an agent with shell, filesystem and browser tools reachable by whoever finds the URL, so a
password is generated for your deployment and the container refuses to start without one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| qwenpaw | [RockinPaul/qwenpaw_railway_template](https://github.com/RockinPaul/qwenpaw_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `QWENPAW_AUTH_PASSWORD` | (secret) | Password for the 'admin' console account, created on first boot. Read it from this service's variables after deploying. Changing it later has no effect — rotate the password inside the console instead. |
| `QWENPAW_AUTH_USERNAME` | (secret) | Name of the account created on first boot. It is only an identifier; change it here before the first deploy if you prefer another. |
| `QWENPAW_AGENT_LANGUAGE` | en | Language of the agent's persona files (AGENTS.md, SOUL.md, PROFILE.md). Chosen on first boot only — upstream will not replace those files later. One of en, zh, ru, id. |

## Configuration

- **Healthcheck:** `/api/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/qwenpaw-1)
