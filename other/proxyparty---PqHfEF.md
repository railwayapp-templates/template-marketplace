# Deploy proxyparty on Railway

It's like proxyparty.hackclub.com, but in Caddy!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PqHfEF)

## About

Build your own `proxyparty.hackclub.com` backend, but with Caddy on Docker, for use in your projects to keep links from being broken. After using this template, you should go into your fork and edit `docker/Caddyfile` to configure redirect and proxying setups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxyparty-caddy | [recaptime-dev/proxyparty-caddy](https://github.com/recaptime-dev/proxyparty-caddy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CF_R2_ACCESS_KEY` | - | Cloudflare R2 access key ID for data storage |
| `CF_R2_ACCOUNT_ID` | - | Cloudflare R2 account ID |
| `CF_R2_ACCESS_SECRET` | (secret) | Cloudflare R2 access key secret for data storage |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/PqHfEF)
