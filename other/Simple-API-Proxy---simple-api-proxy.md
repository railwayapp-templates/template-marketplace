# Deploy Simple API Proxy on Railway

Simple run, configure DNS to *.yourdomain.com and setup in UI your proxies!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/simple-api-proxy)

## About

Simple API Proxy is a template to make easy the creation of proxies, without need to use workers or other approachs.

Just install the template, generate domain and connect to your DNS provider in *.api.. Sure, you can use other methods, but use the * marker to make sure that all requests will be sent to Railway. The system will receive the request and enable to easily proxy to any other location.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| simple-api-proxy | [thelightis/simple-api-proxy](https://github.com/thelightis/simple-api-proxy) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATA_DIR` | db |
| `SECRET_KEY` | (secret) |
| `ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/db/`

**Category:** Other · **Languages:** Python, HTML, Procfile

[View on Railway →](https://railway.com/deploy/simple-api-proxy)
