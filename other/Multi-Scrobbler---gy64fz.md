# Deploy Multi-Scrobbler on Railway

 Scrobble music from multiple sources to multiple clients 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gy64fz)

## About

Multi-Scrobbler now supports extensive configuration of sources and clients via environment variables, eliminating the need for standalone config files in many scenarios. A complete list of supported environment variables can be found [here](https://foxxmd.github.io/multi-scrobbler/docs/configuration/). If a config file is required for your installation, check out the [Railway CLI](https://docs.railway.com/guides/cli) to access the container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Multi-Scrobbler | `foxxmd/multi-scrobbler` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `BASE_URL` | The public service or customer domain |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/gy64fz)
