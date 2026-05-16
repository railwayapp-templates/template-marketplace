# Deploy OpenHands Coding Agent on Railway

Self-hosted autonomous AI engineer. Open-source, model-agnostic, free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-coding-agent)

## About

![OpenHands](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/OpenHands/OpenHands)

OpenHands is an open-source, model-agnostic platform for autonomous AI software development. Unlike coding assistants that suggest snippets, OpenHands runs agents that plan, write, debug, and apply changes across your entire codebase — end to end — using any frontier LLM you choose.

Hosting OpenHands requires a sandboxed Docker runtime environment where agents can safely execute terminal commands, edit files, install dependencies, and browse the web without touching your host system. The deployment exposes a browser-accessible web UI for interacting with your AI engineer, a persistent volume to retain workspace state across restarts, and environment variables for connecting your preferred LLM provider (Anthropic, OpenAI, Google, DeepSeek, or any OpenAI-compatible endpoint). Railway handles the container orchestration, public URL provisioning, and volume management so you can focus on running tasks rather than managing infrastructure.

![OpenHands Dashboard](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776595971/openhands_dashboard_ltl7nw.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [sahilrupani/OpenHands](https://github.com/sahilrupani/OpenHands) | Database |

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

- **Volume:** `/.openhands`

**Category:** Other · **Languages:** Python, TypeScript, Go Template, Jinja, Makefile, CSS, JavaScript, Shell, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/openhands-coding-agent)
