# Deploy outpost on Railway

AI coding agent with webhook automation and built-in dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outpost)

## About

Outpost is a self-hosted [OpenCode](https://opencode.ai) web UI packaged as a Docker image with a bundled webhook-to-agent pipeline. It gives you a browser-based AI coding agent that autonomously reacts to GitHub events — resolving issues, reviewing PRs, fixing CI, and responding to comments.

Outpost deploys as a single Docker container exposing the OpenCode web UI and an internal webhook server. Set at least one LLM provider key (e.g. `ANTHROPIC_API_KEY`) and a `GH_TOKEN` to get started. The bundled `opentower` plugin receives GitHub webhooks, verifies HMAC signatures, and dispatches them as agent sessions. Attach a volume at `/home/developer/dev` to persist projects and session history across redeploys. The container has no built-in auth — front it with Cloudflare Access or an equivalent proxy before exposing publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| outpost | `ghcr.io/mathuraditya724/outpost:8ead0f1d00f1189e084c08c7c84f054db98a70ff` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GH_TOKEN` | (secret) | PAT with repo, read:org, workflow scopes. Used for gh CLI and bot identity. |
| `OPENAI_API_KEY` | (secret) | API key for OpenAI models. Optional if another provider key is set. |
| `ANTHROPIC_API_KEY` | (secret) | API key for Claude. At least one LLM provider key is required. |
| `SENTRY_AUTH_TOKEN` | (secret) | Auth token for Sentry CLI. Used for non-interactive auth. |
| `OPENTOWER_API_TOKEN` | (secret) | Bearer token for the /api/* dashboard endpoints. Without this, API requests are rejected with 503. |
| `EMAIL_WEBHOOK_SECRET` | (secret) | HMAC secret for verifying email webhook deliveries from Cloudflare Email Worker. Required only if using email triggers. |
| `GITHUB_WEBHOOK_SECRET` | (secret) | HMAC secret for verifying GitHub webhook deliveries. Required to receive webhooks. |

## Configuration

- **Healthcheck:** `/global/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/developer/dev`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/outpost)
