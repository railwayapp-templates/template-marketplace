# Deploy Calibre over Tailscale on Railway

E-book library manager running over tailscale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hWLSF8)

## About

Calibre is the one-stop solution to all your e-book needs.

Tailscale offers free, secure, easy remote access to shared resources.

This template will automatically set you up for success with Calibre over Tailscale.

### Environment Variable Configuration

- **TAILSCALE_AUTHKEY**: An API key to access your Tailscale network.
- **TZ**: The timezone you want library operations to perform in. This is helpful to ensure you see the right info in the UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| calibre | [martypenner/calibre-tailscale](https://github.com/martypenner/calibre-tailscale) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | The timezone your library manager is running in |
| `TAILSCALE_AUTHKEY` | - | Tailscale API key |

## Configuration

- **Volume:** `/config`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hWLSF8)
