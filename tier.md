# Deploy Tier (Open-Source Pricing, Billing & Subscription Tool) on Railway

Tier [Mar ’26] (Manage Subscriptions & Pricing Models) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tier)

## About

Tier is a powerful, open-source billing and pricing management platform that helps developers and startups handle subscription billing, usage-based pricing, and payment integrations seamlessly. Available on GitHub, Tier provides a developer-friendly alternative to complex enterprise billing systems like Stripe Billing or Chargebee.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tier | `tierrun/tier` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `TIER_LIVE` | 0 | If using with Stripe Sync, change to 1 |
| `STRIPE_API_KEY` | (secret) | Change TIER_LIVE to 1, if using real Stripe key and want to sync in real time. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/tier)
