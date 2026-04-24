# Deploy OpenHands on Railway

Openhands: AI agent for coding and deployment. open hands

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands)

## About

OpenHands is an open-source AI software engineer that plans, writes, runs, and
debugs code through a web UI. It uses tools, executes commands, and keeps
context across sessions, helping teams ship features, fix bugs, and automate
repetitive engineering work while keeping control of data and models.

Hosting OpenHands means running the web UI, the backend API, and a sandbox
runtime where the agent executes tools. On Railway, you deploy a container, set
LLM credentials, and optionally mount a volume so ~/.openhands data persists
across deploys. You can expose a public URL for callbacks and web access. Most
configuration options map to environment variables, so Railway variables are the
primary way to tune behavior. WebSocket streaming is supported, and this fork
prefers HTTP message sends with a WebSocket fallback for proxy reliability. If
you use OpenHands Secrets, custom secrets are exported as env vars in the agent
runtime.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [XavTo/OpenHands-Fork](https://github.com/XavTo/OpenHands-Fork) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RUNTIME` | local | Runtime mode |
| `WEB_HOST` | - | Public host URL |
| `OH_WEB_URL` | - | Public web URL |
| `OH_SECRET_KEY` | (secret) | App secret key |
| `OH_ENABLE_BROWSER` | false | Disable browser |
| `OH_PERSISTENCE_DIR` | /.openhands | Persistent data dir |
| `OPENHANDS_BASIC_AUTH_USER` | (secret) | auth admin |
| `OPENHANDS_BASIC_AUTH_PASSWORD` | (secret) | auth password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.openhands`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, Jinja, Go Template, JavaScript, Makefile, CSS, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/openhands)
