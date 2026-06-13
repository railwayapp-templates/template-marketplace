# Deploy Hermes Agent [Jun 26'] - Login Gate Extension on Railway

Hermes Agent Template - Login Gate Extension

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-5)

## About

**Railway Title:** `Hermes Agent w/ Login Gate [Updated June '26]`
**Railway Description:** `Hermes Agent [June '26] (Self-Improving Hermes AI Agent with Learning Loop) Self Host`
**Spreadsheet Title:** `Hermes Agent (Open-Source Self-Improving AI Agent & Automation Platform)`
**GitHub Description:** `Hermes Agent — self-improving AI agent by Nous Research. Deploy on Railway with one click.`

---

![Hermes AI agent open source self-improving platform by Nous Research](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1777723506/hermes-og-image_y56bdc.png "Hosting Hermes AI open source agent on Railway")

Self hosting Hermes Agent means your conversations, memories, skills, and API keys stay on infrastructure you control. There is no dependency on cloud AI providers that may limit usage or access your data. With Railway, the full Hermes AI stack deploys automatically — the gateway, web dashboard (WebUI), persistent volume for Honcho memories and skills, all provisioned with private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | [JHJHJHJH/hermes-railway](https://github.com/JHJHJHJH/hermes-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Web server port |
| `ADMIN_PASSWORD` | (secret) | Login password — if unset, a random password is printed to logs |
| `ADMIN_USERNAME` | (secret) | Login username |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-5)
