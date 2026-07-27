# Deploy Hermes Agent on Railway

Nous Research Hermes Agent, memory on a volume and dashboard auth gated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-7)

## About

Hermes Agent is Nous Research's self-improving AI agent: it builds skills from experience, refines them as it works, searches its own past conversations, and keeps a persistent model of you across sessions. This template deploys the official Hermes image with its web dashboard exposed and its memory on a persistent volume.

The whole premise of Hermes is continuity — it is supposed to remember what it learned and get better at your work over time. All of that lives under `HERMES_HOME` at `/opt/data`: learned skills, session history, identity, and configuration. Deploy it without a volume and you get an agent with amnesia that rebuilds nothing and remembers no one. This template mounts a volume there so the agent that exists next week is the one you trained this week.

The dashboard is the part that needs care. Hermes ships an auth gate that engages automatically on any non-loopback bind, and it fails closed: without a registered auth provider the dashboard refuses to start at all. As of the June 2026 hardening, `HERMES_DASHBOARD_INSECURE` no longer disables that gate — it is accepted and ignored — because unauthenticated public dashboards were the entry point for a real credential-persistence campaign. This template registers the bundled password provider with an `admin` user and a generated password, so the dashboard comes up properly gated. Reaching it presents a sign-in page rather than the agent.

Hermes runs under s6 supervision inside the container, which is what keeps the dashboard service alive independently of the agent CLI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | `nousresearch/hermes-agent:v2026.7.20` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `/init /opt/hermes/docker/main-wrapper.sh sleep infinity`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-7)
