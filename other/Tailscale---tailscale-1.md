# Deploy Tailscale on Railway

Deploy a Tailscale node on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tailscale-1)

## About

Stand up a Tailscale node in 10 seconds or less (assuming instantaneous CTRL+C CTRL+V). Run an exit node. Host your own DNS. The possibilities are endless.

This template will establish a Tailscale node in your Railway environment. Only the Tailscale service and a volume for persisting state (i.e., authentication) are deployed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-tailscale | [jayhale/railway-tailscale](https://github.com/jayhale/railway-tailscale) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9002 | - |
| `TS_AUTHKEY` | - | An auth key used to authenticate the container |
| `TS_STATE_DIR` | /var/lib/tailscale | - |
| `TS_ENABLE_HEALTH_CHECK` | true | - |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/var/lib/tailscale`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/tailscale-1)
