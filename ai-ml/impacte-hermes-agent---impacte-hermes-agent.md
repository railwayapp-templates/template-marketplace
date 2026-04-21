# Deploy impacte-hermes-agent on Railway

The simplest curated setup for an Hermes Agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/impacte-hermes-agent)

## About

Deploy [Hermes Agent](https://github.com/NousResearch/hermes-agent) on [Railway](https://railway.app) with a web-based admin dashboard for configuration, gateway management, and user pairing.

 ## Why Deploy
&gt; Hermes Agent is an autonomous AI agent by [Nous Research](https://nousresearch.com/) that lives on your server, connects to your messaging channels (Telegram, Discord, Slack, etc.), and gets more capable the longer it runs.

We recommend Railway as infrastructure provider

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hermes Agent | [impacte-tech/hermes-agent-template](https://github.com/impacte-tech/hermes-agent-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Filled in by Railway automatically |
| `ADMIN_PASSWORD` | (secret) | Your Hermes Agent setup admin password |
| `ADMIN_USERNAME` | (secret) | Your Hermes Agent setup admin username  |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/impacte-hermes-agent)
