# Deploy Hermes Agent on Railway

Self-host Hermes Agent, the open-source AI agent from Nous Research

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-hermes-agent)

## About

Hermes Agent is an open-source AI agent from Nous Research that grows with the person using it. It pairs a chat interface with a real toolchain — shell access, file editing, web search, browser automation and Model Context Protocol servers — and a learning loop that turns past work into reusable skills. Developers and small teams run it as a personal alternative to ChatGPT or Claude, with one difference: it is yours, the history sits on your own disk, and you point it at whichever model provider you want using your own API keys.

Self-host Hermes Agent on Railway and one container runs the whole product: the web dashboard on port 9119, the agent runtime, the cron scheduler, and the messaging gateway that can connect Telegram, Discord or Slack. All state — configuration, API keys, sessions, memories and the skill library — lives on a persistent volume at `/opt/data`, so restarts keep your history. A mandatory sign-in gate means nothing is exposed without a password.

![Hermes Agent Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787075602/bd23345b-8cac-41ad-9716-3e78691882e1.png)

Hosted AI assistants keep your prompts and history on someone else's servers and lock you to one vendor's models. Hermes Agent inverts that: a single MIT-licensed application you run yourself, talking to whichever provider you choose. Teams self-host it when they want an assistant that can touch their own systems — run commands, read repositories, call internal APIs through MCP — without that traffic crossing a third-party product.

Key features:

- **Learning loop** — the agent writes and refines its own skills from experience
- **77 bundled skills** across documents, research, diagrams, media and software development
- **Cron automations** — run any prompt on a schedule and deliver the result to a channel
- **Messaging gateways** for Telegram, Discord and Slack via each platform's official bot API
- **MCP support** for connecting external tool servers
- **Multi-provider model routing**, switchable per session
- **Profiles** — several independent agents from one install

This template is deliberately one service. Upstream's compose file splits the dashboard and gateway into containers sharing a host network and one data directory, which a container platform cannot reproduce — and the project's own documentation recommends a single container hosting everything, supervised internally so a crashed gateway restarts on its own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | `nousresearch/hermes-agent:v2026.8.18` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Health check target port |
| `HERMES_DASHBOARD` | 1 | Enable the supervised web dashboard |
| `API_SERVER_ENABLED` | false | OpenAI-compatible API server disabled |
| `FORWARDED_ALLOW_IPS` | * | Trust proxy X-Forwarded-Proto header |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 | Dashboard bind address |
| `HERMES_DASHBOARD_PORT` | 9119 | Dashboard listening port |
| `HERMES_DASHBOARD_PUBLIC_URL` | - | Public URL for links and callbacks |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Signs stateless session tokens |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Dashboard sign-in password |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Dashboard sign-in username |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh gateway run`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-hermes-agent)
