# Deploy Carrier relay on Railway

A blind, end-to-end-encrypted relay for the Carrier private messenger.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/carrier-relay)

## About

Carrier relay is the blind store-and-forward server behind [Carrier](https://thecarrier.org), a private end-to-end encrypted messenger. The relay holds ciphertext for your contacts while their phones are offline and wakes them with content-free push. It never holds keys and cannot read anything.

One small Node service from a digest-pinned public image, one volume at `/data` (undelivered mail, push subscriptions, the relay's own keys), one public TLS domain. Paste the claim code from the Carrier app into `CLAIM_TOKEN`, deploy, and go back to the app - it finds the new relay and makes your phone the admin automatically. Leave the other variables at their defaults. Runs comfortably in the smallest instance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| carrier-relay | `ghcr.io/lukasthedude/carrier-relay@sha256:e1f1dea662b66061e860938f768c1ec37b8a057d484eee3a4a0fa1f7290b87d7` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CLAIM_TOKEN` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/carrier-relay)
