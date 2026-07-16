# Deploy hermes-agent-railway on Railway

Deploy a secure, persistent Hermes Agent from the official image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-railw-1)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-railw-1?referralCode=Pd-ldD&utm_medium=integration&utm_source=template&utm_campaign=hermes-agent)

A one-click Railway template for [Hermes Agent](https://github.com/NousResearch/hermes-agent).

Hermes is a self-hosted AI agent with a web dashboard, messaging integrations, skills, memory, and persistent sessions. This template deploys the pinned official Nous Research image directly. The repository contains reproducible Railway infrastructure, not a fork of Hermes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes-agent | `nousresearch/hermes-agent:v2026.7.7.2@sha256:9c841866021c54c4596849f6135717e8a4d52ba510b7f52c50aef1de1a283973` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) |

## Configuration

- **Start command:** `/init /opt/hermes/docker/main-wrapper.sh gateway run`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/hermes-agent-railw-1)
