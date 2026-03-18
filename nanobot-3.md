# Deploy Nanobot on Railway

Nanobot 1-Click Deploy for Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nanobot-3)

## About

**Nanobot** is a lightweight, customizable AI agent framework designed for building autonomous bots that can interact with APIs, users, and external systems. It enables rapid development of task-oriented agents with memory, tool usage, and extensibility, making it ideal for prototyping and deploying intelligent workflows.

Hosting Nanobot involves deploying a backend service that runs your AI agent logic, manages state, and integrates with external APIs or services. This typically includes configuring environment variables (API keys, model providers), setting up a runtime, and optionally connecting a database for persistence. Railway simplifies this by handling infrastructure, scaling, and deployment pipelines. With minimal setup, you can deploy Nanobot as a production-ready service that automatically updates via GitHub integration and scales based on demand.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-nanobot-template | [TheGreatAxios/nanobot-railway-template](https://github.com/TheGreatAxios/nanobot-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_PASSWORD` | (secret) | Your password to access |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** HTML, Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/nanobot-3)
