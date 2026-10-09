# Deploy Cairn on Railway

Your own self-hosted coach for training, nutrition and longevity.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cairn)

## About

**Cairn** is a self-hosted wellness OS for training, nutrition and longevity. It opens to a calm read
of your day and a coach that suggests, never scores. Open source (MIT): https://github.com/zilet/cairn

This template runs the published image (`ghcr.io/zilet/cairn:latest`) on your own Railway account,
with one volume at `/data` for everything: the database, your AI provider's sign-in and its tools.
Image auto updates are on, so new releases arrive in your maintenance window.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cairn | `ghcr.io/zilet/cairn:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | The port Cairn listens on. |
| `CAIRN_PLATFORM` | railway | Tells Cairn how it was deployed. |
| `CAIRN_AUTH_TOKEN` | (secret) | Your sign-in token. Copy it from this tab to sign in; it is also your recovery key. |
| `CAIRN_FEEDBACK_URL` | https://feedback.cairn.fit | Where Send feedback delivers (only when you press Send). Delete it to open a GitHub issue instead. |
| `CAIRN_REQUIRE_AUTH` | 1 | Refuse to start without a token: a Railway URL is public. |
| `CAIRN_BLANK_PROFILE` | 1 | Start with an empty profile, with no demo data. |
| `CAIRN_SINGLE_VOLUME` | 1 | Keep sign-ins and AI tools on the one volume at /data. |
| `CAIRN_MAX_AGENT_PROCS` | 1 | Runs one background AI task at a time to keep memory low. |
| `CAIRN_SETTINGS_SECRET_KEY` | (secret) | Encrypts stored integration passwords. Leave it as generated. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/cairn)
