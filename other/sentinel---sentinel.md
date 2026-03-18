# Deploy sentinel on Railway

Deploy and Host sentinel with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sentinel)

## About

`sentinel` monitors your Tailscale network and emits events when peers change state (online/offline, runtime, and identity changes). It supports structured routing to sinks like stdout, webhooks, and Discord. You can run it continuously with minimal config and onboard automatically using Tailscale auth credentials.

Hosting `sentinel` on Railway is straightforward: deploy the container, provide a Tailscale auth credential, and optionally configure notification routing (for example Discord). The app keeps local state, joins your tailnet, polls or streams network state, detects changes, and sends notifications. For Railway templates, keep required variables minimal and mark sensitive values as secrets. Most other settings can stay unset and use sane defaults. If you want custom routing, provide `SENTINEL_NOTIFIER_SINKS` and `SENTINEL_NOTIFIER_ROUTES` as JSON env vars. For local parity, use your compose template and the same env names.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sentinel | [jaxxstorm/sentinel](https://github.com/jaxxstorm/sentinel) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SENTINEL_STATE_PATH` | /data/state.json | Persistent state for sentinel, by default stored on a railway volume |
| `SENTINEL_NOTIFIER_SINKS` | [{"name":"stdout-debug","type":"stdout"},{"name":"discord-primary","type":"discord","url":"${SENTINEL_DISCORD_WEBHOOK_URL}"}] | - |
| `SENTINEL_NOTIFIER_ROUTES` | [{"event_types":["*"],"severities":[],"sinks":["stdout-debug","discord-primary"]}] | - |
| `SENTINEL_TSNET_STATE_DIR` | /data/tsnet | Directory for the tailscale state, by default is stored on a railway volume |
| `SENTINEL_TAILSCALE_AUTH_KEY` | (secret) | Auth key to authenticate sentinel to your tailnet |
| `SENTINEL_DISCORD_WEBHOOK_URL` | - | Discord webhook URL |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/sentinel)
