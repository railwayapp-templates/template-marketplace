# Deploy No-as-a-Service on Railway

A simple API that returns a random rejection reason.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/no-as-a-service)

## About

![no](https://raw.githubusercontent.com/hotheadhacker/no-as-a-service/main/assets/imgs/naas-with-no-logo-bunny.png)

No-as-a-Service (NaaS) is a lightweight HTTP API that returns a random rejection reason in JSON format. It provides generic, creative, and often humorous ways to say “no,” making it useful for demos, bots, developer tools, landing pages, and playful integrations that need a realistic or witty refusal.

Hosting No-as-a-Service is intentionally minimal. The project is a small Express-based Node.js server that exposes a single `/no` endpoint backed by a static JSON file containing over 1,000 curated rejection reasons. Deployment involves running a single process with no external state, databases, or background workers. Railway handles process orchestration, port management, and scaling automatically, allowing you to deploy the service with near-zero configuration. Optional rate limiting is already built into the app, making it safe to expose publicly without additional infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| No-as-a-Service | [hotheadhacker/no-as-a-service](https://github.com/hotheadhacker/no-as-a-service) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Application port. |

## Configuration

- **Healthcheck:** `/no`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/no-as-a-service)
