# Deploy peek on Railway

Self-hosted public URLs for localhost.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/peek)

## About

`peek` gives your local server a public URL through your own hosted relay.

This template deploys the peek relay on Railway. After deploy, add your domain and wildcard domain, then use the peek CLI to expose a local app.

Set `PEEK_DOMAIN` to your domain, without `https://`.

Example:

`example.link`

Add both domains to the Railway service:

`example.link`  
`*.example.link`

Then add the DNS records Railway gives you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| peek:latest | `ghcr.io/sasicodes/peek:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PEEK_DOMAIN` | - | Public domain for this peek relay, without https://. Example: peek.example.com. Public tunnel URLs will be created as https://{subdomain}.PEEK_DOMAIN. |
| `PEEK_AUTH_TOKEN` | (secret) | Secret token required by the peek CLI to create tunnels on this relay. Use the same value when running: peek localhost:3000 --domain PEEK_DOMAIN --token PEEK_AUTH_TOKEN. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/peek)
