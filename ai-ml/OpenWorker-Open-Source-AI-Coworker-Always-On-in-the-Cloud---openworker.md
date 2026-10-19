# Deploy OpenWorker | Open-Source AI Coworker, Always On in the Cloud on Railway

Open-source AI coworker, always on: web app, any model, 25+ connectors

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openworker)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/openworker?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=openworker)

[OpenWorker](https://github.com/andrewyng/openworker) is an open-source AI coworker. It's MIT-licensed and comes from the `andrewyng` GitHub organization. You give it an outcome, such as a security review of a repo, a report from your CRM, or a reply in a Slack thread. It plans the steps, uses your tools, checks in before anything consequential, and delivers the finished file or message. It works with any model: OpenAI, Anthropic, Gemini, DeepSeek, Qwen, Kimi, Mistral, Grok, OpenRouter and more. It connects to 25+ apps (GitHub, Slack, Jira, Notion, Linear, HubSpot, Gmail, Google Calendar and others) plus any MCP server.

The official builds are desktop apps for macOS and Windows. This template runs the same agent server and the same React interface as a web app on Railway. It keeps running while your laptop is closed, so scheduled automations and Slack mentions get answered at any hour.

It's one service with a Railway volume. Sessions, settings, model keys, connector tokens, memory and the agent's workspace all live on the volume at `/data`.

- **Password-protected web app.** Open the Railway domain and sign in with `OPENWORKER_USER` and `OPENWORKER_PASSWORD`, which is generated at deploy.
- **API locked as well.** The OpenWorker server requires an API token on every call and WebSocket. A fresh token is created at each boot, and the gateway hands it to the browser only after the password check. Nothing reaches the agent without both.
- **Its own Linux box.** The agent's shell and file tools run inside this container, with `git`, `curl`, `ripgrep` and Python available. They work in `/data/workspace`, so cloned repos and generated files survive redeploys.
- **Pinned release.** The image builds OpenWorker `v0.3.1` from source, the server plus the web interface. To upgrade, change `OPENWORKER_VERSION` in the Dockerfile of your fork.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openworker | [two-workspaces/openworker](https://github.com/two-workspaces/openworker) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the web gateway behind the Railway domain - leave as is. |
| `OPENWORKER_USER` | (secret) | Username for the web app sign-in. |
| `OPENWORKER_PASSWORD` | (secret) | Password for the web app (username below). The agent can run shell commands in this container, so keep it long. |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openworker)
