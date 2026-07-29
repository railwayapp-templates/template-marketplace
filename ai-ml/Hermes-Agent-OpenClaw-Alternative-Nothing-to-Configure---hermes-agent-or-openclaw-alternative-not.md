# Deploy Hermes Agent | OpenClaw Alternative, Nothing to Configure on Railway

Self-improving Nous Research agent. Nothing to fill in, gated dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-or-openclaw-alternative-not)

## About

Hermes Agent is Nous Research's self-improving AI agent: it builds skills from experience, refines them as it works, searches its own past conversations, and keeps a persistent model of you across sessions. It is the open-source, self-hosted answer to OpenClaw and the other hosted agent products — the same always-on assistant, running on infrastructure you own, with no per-seat pricing and nobody else holding your agent's memory.

This template deploys it with **nothing to configure**. The deploy form has a single field, the dashboard password, and it arrives pre-filled with a generated secret. There is no port to pick, no admin username to invent, no data path to type. Click deploy, then sign in.

Three things decide whether a self-hosted Hermes is any good, and all three are settled here before you click deploy.

**Memory has to survive.** The whole premise of Hermes is continuity — it is supposed to remember what it learned and get better at your work over time. All of that lives under `HERMES_HOME` at `/opt/data`: learned skills, session history, identity, configuration. Deploy it without a volume and you get an agent with amnesia that rebuilds nothing and remembers no one. This template mounts a volume there, so the agent that exists next week is the one you trained this week.

**The dashboard has to be gated, and it fails closed.** Hermes ships an auth gate that engages automatically on any non-loopback bind, and it refuses to start at all without a registered auth provider. As of the June 2026 hardening, `HERMES_DASHBOARD_INSECURE` no longer disables that gate — it is accepted and ignored — because unauthenticated public dashboards were the entry point for a real credential-persistence campaign. So an empty password is not "an open dashboard", it is "no dashboard". This template registers the bundled password provider with an `admin` user and a generated password; if you clear the field entirely, the image generates one, persists it on the volume, and prints it to the deploy logs rather than crash-looping.

**The listening port has to match Railway's.** Railway assigns the port your service is reached on, and the dashboard follows it — so the public URL works on the first deploy instead of returning `Application failed to respond`.

Rather than ask you to supply those settings, they are baked into the image this template deploys: a thin, open wrapper around Nous Research's own published build (`nousresearch/hermes-agent`), rebuilt weekly to track upstream releases. Hermes runs under s6 supervision inside the container, which is what keeps the dashboard alive independently of the agent process.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | `ghcr.io/bon5co/hermes-agent-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-or-openclaw-alternative-not)
