# Deploy pocketbase-stripe on Railway

Pocketbase + Stripe | FastPocket Freebie

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/izeSvS)

## About

1. Fill your environment variables from Stripe
2. Update the endpoints with your own callbacks
3. Click Load from JSON file and grab the schema file from pb_bootstrap/pb_schema.json
4. Start creating products

Go to the Github for a lot more detail:
 https://github.com/mrwyndham/pocketbase-stripe

Use a prebuilt next.js frontend if it takes your fancy by purchasing https://fastpocket.dev

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketbase-stripe | [mrwyndham/pocketbase-stripe](https://github.com/mrwyndham/pocketbase-stripe) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | - |
| `PORT` | 8090 | - |
| `STRIPE_WHSEC` | - | Your webhook pointing to the Raleway hosted pocketbase not to your site |
| `STRIPE_CANCEL_URL` | https://fastpocket.dev/pricing | - |
| `STRIPE_SECRET_KEY` | (secret) | Your live restricted key for Stripe |
| `STRIPE_SUCCESS_URL` | https://fastpocket.dev/account | - |
| `STRIPE_BILLING_RETURN_URL` | https://fastpocket.dev/account | - |

## Configuration

- **TCP Proxies:** 8090

**Category:** Starters · **Languages:** Go, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/izeSvS)
