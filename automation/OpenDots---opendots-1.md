# Deploy OpenDots on Railway

Your always-on AI coworkers that move between text, calls, and Slack.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendots-1)

## About

OpenDots is a self-hosted personal-agent workspace from CopilotKit. Create Dots (specialist agents), organize work into Spaces and pages, run recurring tasks, and talk to your agents from the web app, by voice, or from Slack. Conversations are persisted through CopilotKit Intelligence Threads.

This template deploys two services: the OpenDots app (a Node server plus React UI, with its SQLite database on a persistent volume) and a sandboxed Playwright browser service that is only reachable over Railway's private network. Your login token and the shared browser secret are generated automatically. After deploy, add your CopilotKit Intelligence key, model API key and model name, open the generated domain, and sign in with the `OWNER_TOKEN` shown in the OpenDots service's Variables tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Browser | [kamaravichow/opendots-railway-template](https://github.com/kamaravichow/opendots-railway-template) | Worker |
| OpenDots | [kamaravichow/opendots-railway-template](https://github.com/kamaravichow/opendots-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BROWSER_SECRET` | Browser | (secret) | Shared secret that authorizes requests from the app. Do not change. |
| `PORT` | OpenDots | 4310 | Port the OpenDots server listens on and Railway health-checks. Do not change. |
| `OWNER_ID` | OpenDots | - | Stable identity that owns your conversations. Unique per deployment; do not change after first use. |
| `APP_ORIGIN` | OpenDots | - | Exact public URL of this app. Update it if you add a custom domain. |
| `BROWSER_URL` | OpenDots | - | Private-network address of the Browser service. Do not change. |
| `OWNER_TOKEN` | OpenDots | (secret) | Password for signing in to OpenDots. Generated for you; find it in this service's Variables tab. |
| `OPENAI_MODEL` | OpenDots | - | Model identifier to use, exactly as your provider names it. |
| `BROWSER_SECRET` | OpenDots | (secret) | Shared secret the app uses to call the Browser service. Generated for you; do not change. |
| `OPENAI_API_KEY` | OpenDots | (secret) | API key for your model provider (OpenAI or any OpenAI-compatible service). |
| `OPENAI_BASE_URL` | OpenDots | https://api.openai.com/v1 | Model API endpoint. Change it only to use another OpenAI-compatible provider. |
| `INTELLIGENCE_API_KEY` | OpenDots | (secret) | CopilotKit Intelligence project key for conversation storage. Create one at https://intelligence.copilotkit.ai. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, HTML, Shell

[View on Railway →](https://railway.com/deploy/opendots-1)
