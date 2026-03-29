# Deploy holyclaude on Railway

HolyClaude is a browser-capable Claude Code environment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/holyclaude)

## About

HolyClaude bundles Claude Code CLI, CloudCLI web UI, browser tooling, and common developer utilities into a single containerized environment. It is intended for remote, browser-based coding sessions where users need an AI-assisted workspace. Railway is a managed hosting platform that simplifies Docker deployment, public networking, HTTPS access, and environment-based configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| holyclaude | `coderluii/holyclaude:1.1.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PGID` | 1000 |
| `PORT` | 3001 |
| `PUID` | 1000 |
| `NODE_OPTIONS` | --max-old-space-size=4096 |
| `GIT_USER_NAME` | HolyClaude User |
| `GIT_USER_EMAIL` | noreply@holyclaude.local |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/holyclaude)
