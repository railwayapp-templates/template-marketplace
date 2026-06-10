# Deploy decap-proxy on Railway

A proxy for GitHub login in Decap CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/decap-proxy)

## About

This is a GitHub auth proxy based on [decap-proxy for Cloudflare Worker](https://github.com/sterlingwes/decap-proxy), allowing your Decap CMS page to sign in with GitHub.

Simply deploy this to Railway and host your Decap CMS page statically. Configure Decap like this to use the proxy:

```yml

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| decap-proxy | [hlysine/decap-proxy](https://github.com/hlysine/decap-proxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal port for the proxy to listen on |
| `GITHUB_OAUTH_ID` | - | Create an OAuth app in GitHub and copy the app ID here |
| `GITHUB_OAUTH_SECRET` | (secret) | Create an OAuth app in GitHub and copy the app secret here |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/decap-proxy)
