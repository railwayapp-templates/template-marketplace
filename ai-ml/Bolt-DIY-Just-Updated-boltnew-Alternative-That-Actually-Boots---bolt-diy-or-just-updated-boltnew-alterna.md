# Deploy Bolt DIY | (Just Updated) bolt.new Alternative That Actually Boots on Railway

bolt.new alternative that boots, with your API keys behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bolt-diy-or-just-updated-boltnew-alterna)

## About

Bolt DIY is the open-source alternative to bolt.new: describe an app in chat and it writes, runs and previews a full-stack project in your browser, using whichever LLM provider you connect — OpenAI, Anthropic, Google, Groq, OpenRouter, Ollama and more. This template deploys the current upstream build behind HTTP basic authentication, on a container that actually starts and that binds the port Railway gives it.

This template runs Bolt DIY as a single service with no database and no volume, because the app keeps chat history in your browser's own storage rather than on the server. Two things are fixed relative to a stock deployment. Upstream's production image prunes development dependencies but its start command still invokes one of them, so the container exits within seconds of starting; this image reinstalls that dependency at upstream's own pinned version, so the newest code boots. Upstream's start command also hardcodes its listening port, which means Railway's healthcheck — which dials the injected port — can never succeed; here the application runs on loopback behind a small reverse proxy that binds Railway's port and answers `/healthz` without credentials. Everything else requires a password, generated per deployment, and the container refuses to start if that password is empty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| boltdiy | `ghcr.io/bon5co/boltdiy-railway:2026.02.07` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BOLT_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bolt-diy-or-just-updated-boltnew-alterna)
