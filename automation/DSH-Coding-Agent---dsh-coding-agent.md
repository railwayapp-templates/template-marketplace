# Deploy DSH Coding Agent on Railway

Self-host DeepSeek Harness, DeepSeek's coding agent, behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dsh-coding-agent)

## About

DSH is the agent harness DeepSeek publishes as [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness): a full coding agent with file editing, a shell, file and web search, skills, planning, goals, subagents and workflows, driven from a browser instead of a terminal. This template runs it as a persistent web app on Railway, behind a password you set, with your DeepSeek API key already wired in.

Upstream ships DSH as an npm package you run on your own laptop, and it deliberately refuses to serve itself to a network. Ask it to bind a public address and it stops with `--host 0.0.0.0 is intentionally not supported yet for safety: it would expose remote code execution to the network`. That refusal is correct: the harness drives an agent that runs shell commands, and the product has no login of its own.

Hosting it therefore means adding the missing layer rather than removing the guard. In this template the harness still binds loopback exactly as upstream intends, and a Caddy reverse proxy holds the public port with HTTP basic auth in front of it. Everything that reaches the agent has already passed a password. The proxy also rewrites the forwarded Host to the loopback authority, which is what keeps the Settings, Models and credential pages working: upstream pins that privileged plane to a loopback caller, so a naive proxy serves a UI that loads and then refuses to configure anything.

The result is a single container with a volume, an agent that keeps its sessions and your files across redeploys, and a login you control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dsh | `ghcr.io/hmseeb/deepseek-harness-railway:0.1.0-rc.7-r7` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public port. Caddy listens here with basic auth and forwards to the harness on loopback. |
| `DSH_HOME` | /data/.dsh | Harness home: sessions, settings and the credential store. On the volume. |
| `DSH_WORKSPACE` | /data/workspace | Directory the agent works in. On the volume, so it survives redeploys. |
| `DSH_UI_USERNAME` | (secret) | Username you will log in with. |
| `DSH_UI_USERPASS` | - | Password you will log in with, minimum 12 characters. This is the ONLY thing between the internet and an agent that can run shell commands on this container, so make it unguessable and do not reuse one. The container refuses to start if it is shorter than 12 characters. |
| `DEEPSEEK_API_KEY` | (secret) | Optional. Your key from platform.deepseek.com. Paste it here to have the agent ready on first load, or leave it blank and add it under Settings > Models once the app is up. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dsh-coding-agent)
