# Deploy Webhooks on Railway

Simple webhook client and server demo apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WJuLbj)

## About

A minimal but realistic webhook client-server demo. The server receives signed webhook payloads and verifies them using HMAC-SHA256. The client provides a Streamlit UI to send signed or unsigned requests to any webhook endpoint — a practical introduction to the full webhook security pattern.

This Railway template deploys two services: a Node.js/Express webhook server and a Streamlit webhook client. The server exposes a parameterised `/webhook/:event` endpoint that accepts any event name, optionally verifies an HMAC-SHA256 signature against a shared secret, logs the event type and payload, and returns the received data as JSON. The client sends HTTP POST requests with a configurable URL, event type, JSON payload, and optional shared secret — if a secret is provided, the payload is signed automatically before sending. Both services are pre-configured to communicate over Railway's private internal network.

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
