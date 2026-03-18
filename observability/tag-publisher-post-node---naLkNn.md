# Deploy tag-publisher-post-node on Railway

Demo for Zebra Reader Tag Data Post

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/naLkNn)

## About

This template is a demo for Zebra Reader to publish Tag Data as HTTP Post method.

This is made on NodeJs with minimal configuration for testing purpose only.

Note that, basic authentication is added. Please change where needed for username and password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tag-post-node | [morgan-redbite/tag-post-node](https://github.com/morgan-redbite/tag-post-node) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASIC_AUTH_USER` | (secret) | Username for Basic Auth |
| `BASIC_AUTH_PASSWORD` | (secret) | Password for Basic Auth |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/naLkNn)
