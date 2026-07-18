# Deploy Hermes Agent on Railway

Self-hosted Hermes Agent with admin UI, dashboard, metrics & backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-4)

## About

Hermes Agent is the open-source autonomous agent from [NousResearch](https://github.com/NousResearch/hermes-agent). This template deploys a full, self-hosted instance in one click — pinned to a known-good release and wrapped in a polished admin UI that supervises the agent gateway and the native Hermes dashboard behind a single login.

Hosting Hermes Agent means running the agent gateway (`hermes gateway`) and the native React dashboard (`hermes dashboard`) as long-lived processes, fronted by an admin server that handles authentication, a setup wizard, live metrics, and file management. This template packages all of that into a single container: `tini` reaps zombies as PID 1, a Starlette admin app reverse-proxies the native dashboard, and everything the agent writes — config, keys, sessions, skills, memories, logs, cron, and workspace — is persisted to a `/data` volume. Providers, models, channel tokens, and keys are all configured through the web UI, so there are no config files to hand-edit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent-railway-advanced | [nick-choudhary/hermes-agent-railway-advanced](https://github.com/nick-choudhary/hermes-agent-railway-advanced) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hermes-agent-4)
