# Deploy Hermes Agent (Official Image) on Railway

Official Hermes image with persistent storage and OpenAI Codex OAuth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hermes-agent-official-image)

## About

Hermes Agent is an open-source AI agent by Nous Research. This template deploys the official Hermes container image with an authenticated web dashboard, persistent state, and native OpenAI Codex/ChatGPT OAuth support.

The template creates one Railway service from the public `otopba/hermes-railway-template` repository, exposes dashboard port `9119` over HTTPS, and mounts a persistent volume at Hermes' upstream data path `/opt/data`.

Dashboard username, password, and session signing are configured automatically. The password and signing secret are independently generated for every deployment. The optional OpenAI-compatible API server stays disabled by default.

After Railway reports `SUCCESS`, reveal `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` in the service Variables tab and sign in to the generated domain as `admin`.

To connect a ChatGPT subscription, open the service shell and run:

```sh
hermes auth add openai-codex
```

Complete the device-code sign-in shown by Hermes. Credentials are written to `/opt/data` and survive redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hermes | [otopba/hermes-railway-template](https://github.com/otopba/hermes-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | Public dashboard port used by Railway. |
| `HERMES_DASHBOARD` | 1 | Enables the Hermes web dashboard. |
| `API_SERVER_ENABLED` | false | Keeps the optional OpenAI-compatible API server disabled. |
| `HERMES_DASHBOARD_HOST` | 0.0.0.0 | Binds the dashboard to all container interfaces. |
| `HERMES_DASHBOARD_PORT` | 9119 | Dashboard listen port. |
| `HERMES_DASHBOARD_BASIC_AUTH_SECRET` | (secret) | Generated secret used to sign dashboard sessions. |
| `HERMES_DASHBOARD_BASIC_AUTH_PASSWORD` | (secret) | Generated password for the admin dashboard login. |
| `HERMES_DASHBOARD_BASIC_AUTH_USERNAME` | (secret) | Initial dashboard username. |

## Configuration

- **Start command:** `/opt/hermes/docker/entrypoint-dispatch.sh gateway run`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/hermes-agent-official-image)
