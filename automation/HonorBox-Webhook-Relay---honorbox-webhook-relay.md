# Deploy HonorBox Webhook Relay on Railway

Signed Stripe webhook relay for instant HonorBox GitHub fulfillment.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/honorbox-webhook-relay)

## About

The HonorBox Webhook Relay turns successful Stripe Checkout events into immediate GitHub `repository_dispatch` events for an HonorBox private operations repository. It is the optional low-latency companion to HonorBox's default scheduled fulfillment poll.

This template packages the HonorBox v0.6.0 relay. The relay verifies Stripe's webhook signature with a five-minute replay window before contacting GitHub. It rejects request bodies over 1 MiB with HTTP `413`. It forwards no buyer identity, email, amount, or raw Checkout Session ID. GitHub receives only the event type, mode, creation timestamp, and a short hash reference. If GitHub refuses the dispatch, the relay returns `502` so Stripe retries automatically.

This template deploys the relay only. Your storefront and fulfillment workflow remain in GitHub, exactly as HonorBox's architecture requires. Keep the scheduled poll enabled as a safety net.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| HonorBox Relay | [monotykamary/railway-template-honorbox-relay](https://github.com/monotykamary/railway-template-honorbox-relay) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | HTTP port used by Railway. |
| `GITHUB_REPO` | owner/yourstore-ops | Private HonorBox ops repository in owner/name form. |
| `GITHUB_TOKEN` | (secret) | Fine-grained token restricted to the HonorBox ops repository with Contents read/write. |
| `GITHUB_EVENT_TYPE` | honorbox_sale | GitHub repository_dispatch event type. |
| `STRIPE_WEBHOOK_SECRET` | (secret) | Stripe endpoint signing secret beginning with whsec_. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/honorbox-webhook-relay)
