# Deploy Hermes Gateway via Tailscale on Railway

Private Hermes AI agent secured by Tailscale with no public URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-gateway-via-tailscale)

## About

Deploys a [Hermes](https://github.com/NousResearch/hermes-agent) AI agent as a Slack-native assistant, with [Tailscale](https://tailscale.com/) running inside the container for private SSH access. Each agent registers as its own tailnet node, with persistent memory and skills that survive redeploys via a mounted volume. No public ingress required — Slack runs over Socket Mode, maintainer access is tailnet-only.

The template provisions one Hermes service per Railway project. On boot, the container starts Tailscale in userspace networking mode (no `NET_ADMIN` capability required, no privilege escalation), registers with your tailnet using a reusable auth key, enables Tailscale SSH, then hands off to the upstream Hermes entrypoint. Hermes connects to Slack over Socket Mode with no inbound network surface. State — conversation history, learned skills, Tailscale machine identity — persists at `/opt/data/` on a Railway volume across redeploys, so the agent keeps the same MagicDNS hostname and memory between deployments. To run multiple agents, duplicate the service inside the project and override the per-agent variables (`TS_HOSTNAME`, `SLACK_BOT_TOKEN`, `SLACK_APP_TOKEN`, `SLACK_ALLOWED_USERS`).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [echobind/rome-on-rails](https://github.com/echobind/rome-on-rails) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | reusable Tailscale key  |
| `TS_HOSTNAME` | - | make unique for multi-agent deployments |
| `GOOGLE_API_KEY` | (secret) | add if using Google LLM |
| `OPENAI_API_KEY` | (secret) | add if using Open API |
| `SLACK_APP_TOKEN` | (secret) | provided in Slack app manager (https://api.slack.com/apps) |
| `SLACK_BOT_TOKEN` | (secret) | provided in Slack app manager (https://api.slack.com/apps) |
| `ANTHROPIC_API_KEY` | (secret) | add if using Anthropic |
| `OPENROUTER_API_KEY` | (secret) | add if using Open Router |
| `SLACK_HOME_CHANNEL` | - | a channel ID where Hermes will deliver scheduled messages, cron job results, etc. |
| `SLACK_ALLOWED_USERS` | - | comma delimited list of Slack user IDs |

## Configuration

- **Volume:** `/opt/data`

**Category:** Bots · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-gateway-via-tailscale)
