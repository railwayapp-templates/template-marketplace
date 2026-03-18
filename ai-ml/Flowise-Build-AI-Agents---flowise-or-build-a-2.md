# Deploy Flowise | Build AI Agents on Railway

[Mar '26] Low-code developer tool for building LLM Applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-or-build-a-2)

## About

Flowise is your visual playground for building AI agents and workflows without writing code—just drag, drop, and connect your LLMs. Build chatbots that pull from your documents, chain AI calls together, or create custom workflows that talk to APIs. This template packages all that directly on Railway's infrastructure in one click.

Railway handles all the operational complexity—containerization, networking, SSL, scaling, uptime—so you can focus on building. No Docker knowledge needed. Click deploy and you're live in minutes with a working URL ready to go.

---

Hosting Flowise on Railway is genuinely straightforward—probably the simplest way to get Flowise running in production. There are really only two variables you need to care about: your username and password. And here's the best part—they're already pre-configured for you. If you want to change them later, it takes literally 30 seconds. Just hop into the Variables section of your Flowise node in the Railway dashboard, update whatever you want, and you're done.

This is truly one-click setup territory. You're not managing servers, databases, or complicated configurations. Railway handles all the operational heavy lifting while you focus on actually building your AI workflows. Deploy once, access it anywhere, modify settings whenever you need to. That's the whole philosophy here—get out of your own way and start creating.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FlowiseAI | `flowiseai/flowise` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FLOWISE_PASSWORD` | (secret) | Default passwordfor Flowise login. Can be changed in variables. |
| `FLOWISE_USERNAME` | (secret) | Default username for Flowise login. Can be changed in variables. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-or-build-a-2)
