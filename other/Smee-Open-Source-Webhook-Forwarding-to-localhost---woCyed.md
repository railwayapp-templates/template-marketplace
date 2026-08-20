# Deploy Smee | Open Source Webhook Forwarding to localhost on Railway

Forward webhooks to your laptop — self-hosted smee.io server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/woCyed)

## About

Smee forwards webhooks to a machine that has no public address. Point GitHub, Stripe or any other provider at a channel URL on your deployment, run the client on your laptop, and the payloads arrive on `localhost` — no tunnel, no port forwarding, no firewall exception.

A single stateless service, the same one that runs `smee.io`. Channels are created by visiting a URL; deliveries are streamed to connected clients over server-sent events and never stored.

Running your own is not about scale. It is that webhook payloads carry signing secrets, customer records and internal identifiers, and on the public instance they pass through infrastructure you do not control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smee | `ghcr.io/probot/smee.io:v2.0.1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/woCyed)
