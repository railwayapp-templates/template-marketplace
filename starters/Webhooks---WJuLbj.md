# Deploy Webhooks on Railway

Simple webhook client and server demo apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WJuLbj)

## About

## Template
This template deploys two services - one each for the webhook server and client. The webhook server is built with Node.js and Express, while the webhook client is built with Streamlit.

## Overview
The webhook server listens on port 3000, and exposes two endpoints `/webhook-1` and `/webhook-2`. The webhook client takes Webhook URL and JSON Payload as inputs, and makes an HTTP POST request to the specified webhook endpoint URL along with the payload. Please note that this is an extremely simple example, and should not be used as-is in any production capacity without appropriate security measures.

## Learn More
* [Getting Started with Webhooks: Part 1 - Webhook Servers](https://alphasec.io/getting-started-with-webhooks-part-1-webhook-servers/)
* [Getting Started with Webhooks: Part 2 - Webhook Clients](https://alphasec.io/getting-started-with-webhooks-part-2-webhook-clients/)
* [webhook-client-server](https://github.com/alphasecio/webhook-client-server) GitHub repo

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| webhook-server | [alphasecio/webhook-client-server](https://github.com/alphasecio/webhook-client-server) (root: /server) | Web service |
| webhook-client | [alphasecio/webhook-client-server](https://github.com/alphasecio/webhook-client-server) (root: /client) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | webhook-server | 3000 |
| `PORT` | webhook-client | 8501 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `streamlit run app.py`

**Category:** Starters · **Languages:** JavaScript, Python

[View on Railway →](https://railway.com/deploy/WJuLbj)
