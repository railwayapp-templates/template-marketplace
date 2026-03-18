# Deploy Resend Railway SMTP Gateway on Railway

Deploy and Host Resend SMTP Gateway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/resend-railway-smtp-gateway)

## About

Resend Railway SMTP Gateway is a small Go service that accepts SMTP messages and relays them to Resend via the Resend HTTPS API. It provides a lightweight SMTP endpoint that forwards incoming mail to Resend for delivery, with configuration via environment variables and a container-ready setup.

Hosting this gateway on Railway involves building and deploying the Go service as a container or service, providing the required environment variables (notably RESEND_API_KEY), and exposing the service port so Railway routes incoming TCP traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| resend-railway-gateway | [igorrius/resend-railway-gateway](https://github.com/igorrius/resend-railway-gateway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RESEND_API_KEY` | (secret) | An API key to get access to resend.com. Get a key from https://resend.com/api-keys |
| `SMTP_LISTEN_ADDR` | 2525 | The SMTP port the server will use |

**Category:** Other · **Languages:** Go, Makefile, Dockerfile

[View on Railway →](https://railway.com/deploy/resend-railway-smtp-gateway)
