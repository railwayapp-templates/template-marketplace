# Deploy Personal pastebin over tailnet on Railway

Store snippets privately over your own tailnet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VMGRyO)

## About

# tclip on Railway

This template uses [the `tclip` Docker image](https://github.com/tailscale-dev/tclip/pkgs/container/tclip) from Tailscale. Due to data persistence requirements, you need to immediately add a volume for `/data` directory.

## Requirements

1. A data volume to `/data` (or any location, as controlled by `DATA_DIR` variable).
2. [Tailscale authkey for your tailnet](https://login.tailscale.com/admin/settings/keys) for `TS_AUTHKEY` variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gmemstr/tclip:latest | `ghcr.io/gmemstr/tclip:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | Data storage directory, must match the mounted volume |
| `TS_AUTHKEY` | - | Your Tailscale authkey for tclip. If you enabled tailnet lock, sign your authkey first. |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/VMGRyO)
