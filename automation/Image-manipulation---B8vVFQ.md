# Deploy Image manipulation on Railway

Powerfull image handling and manipulation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/B8vVFQ)

## About

Source code of wsrv.nl (formerly images.weserv.nl), to be used on your own server(s). weserv/images leverages powerful libraries like [libvips](https://github.com/libvips/libvips) (for image handling and manipulation) and [nginx](https://github.com/nginx/nginx) (used as web server, forward proxy and HTTP cache).

API docs: https://wsrv.nl/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| weserv/images | `ghcr.io/weserv/images` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/B8vVFQ)
