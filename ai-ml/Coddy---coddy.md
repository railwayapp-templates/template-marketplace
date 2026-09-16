# Deploy Coddy on Railway

AI agent with a web UI, OpenAI-compatible API, scheduler and remote mode

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coddy)

## About

[Coddy](https://github.com/coddy-project/coddy-agent) is a general-purpose AI agent in a single
static Go binary. One process serves a web UI, an OpenAI-compatible HTTP API, a cron scheduler and a
remote mode, all sharing the same sessions — so a conversation started in the browser can be
continued from your terminal or your editor.

This template runs it on Railway with its sessions and workspace on a volume, behind a password and
a bearer token generated for your deployment. One service, one volume, a public domain.

Coddy is a ReAct agent with filesystem and shell tools, MCP servers, rules, skills, subagents,
hooks, background tasks, long-term memory and context compaction. It works with any
OpenAI-compatible provider — OpenAI, Anthropic, Ollama, llama.cpp, vLLM and others — so nothing is
proxied through a third party.

Because upstream ships a static binary, the deployed image is about 57 MB and starts in a few
seconds. Everything it owns lives on the volume: sessions, skills, provider credentials, scheduler
jobs and the workspace the agent edits. No configuration file is needed to start — a provider key is
enough for a model to appear — and anything further is edited from the web UI, which saves it to the
volume.

The two credentials are the part this template takes seriously. Coddy's authentication is off by
default and it warns when it binds a public address without a token; on a Railway domain that
describes an agent with shell access reachable by anyone who finds the URL. So both a browser
password and an API bearer token are generated for your deployment, and the container refuses to
start without them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coddy | [RockinPaul/coddy_railway_template](https://github.com/RockinPaul/coddy_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the agent listens on; Railway's healthcheck and the public domain both use it. Leave it as it is. |
| `OPENAI_API_KEY` | (secret) | Optional. Any OpenAI-compatible key; other providers can be added from the web UI after signing in. |
| `CODDY_HTTP_TOKEN` | (secret) | Bearer token for the /v1 and /coddy APIs — use it with `coddy --remote` or any OpenAI-compatible client. Generated for this deployment. |
| `CODDY_HTTP_PASSWORD` | (secret) | Web UI sign-in password for the 'admin' account. Generated for this deployment; read it from the service variables afterwards. Nothing to fill in. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/coddy)
