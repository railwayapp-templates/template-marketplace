# Deploy Grok API Wrapper on Railway

Deploy your personal Grok Reverse Proxy site with one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grok-mirror)

## About

Grok Mirror is an open-source self-hosted Grok mirror platform that enables multiple users to securely share and manage Grok accounts through a unified web interface. It provides the same experience as the official Grok website while exposing an OpenAI-compatible Chat Completions API for applications, AI clients, and automation tools.

Deploying Grok Mirror on Railway provides a simple way to self-host a multi-user Grok gateway without managing servers or infrastructure. Railway automatically provisions HTTPS, networking, and persistent storage while Grok Mirror lets you manage multiple Grok SSO tokens, user access, and API authentication through an intuitive web interface. Once deployed, simply add your Grok SSO token(s), configure optional API authentication, and begin using both the web UI and the OpenAI-compatible API endpoint from your own Railway domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dairoot/grok-gateway:latest | `dairoot/grok-gateway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_HATD` | "false" | - |
| `WEB_HATD` | "false" | - |
| `GOOGLEADS` | None | - |
| `ADMIN_PASSWORD` | (secret) | - |
| `ADMIN_USERNAME` | (secret) | - |
| `ALLOW_REGISTER` | "true" | - |
| `PROXY_URL_POOL` | None | SKip value if you dont have |
| `VOICE_PROXY_URL` | None | - |
| `ENABLE_MIRROR_API` | "true" | - |
| `MIRROR_API_PREFIX` | None | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.cache_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/grok-mirror)
