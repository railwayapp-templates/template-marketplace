# Deploy tclip (Tailscale Pastebin) on Railway

https://github.com/tailscale-dev/tclip

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HzYDtl)

## About

One-click deploy for https://github.com/tailscale-dev/tclip, gives all users on your Tailscale tailnet access to a shared pastebin-like service.

Instructions are available inside the GitHub repo, but you'll need a TS_AUTHKEY which you can generate inside the Tailscale admin console (https://login.tailscale.com/admin/settings/keys).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tclip | `ghcr.io/tailscale-dev/tclip:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | - |
| `TS_AUTHKEY` | - | Generate in admin panel |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/HzYDtl)
