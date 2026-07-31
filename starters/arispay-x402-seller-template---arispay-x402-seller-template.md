# Deploy arispay-x402-seller-template on Railway

Deploy a no-signup x402 seller on Base mainnet with ArisPay.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arispay-x402-seller-template)

## About

Deploy a no-signup x402 v2 seller that charges $0.01 USDC on Base mainnet and
uses `https://facilitator.arispay.app`.

The template runs one Express service with:

- `GET /health` for an unpaid health check.
- `GET /api/paid` for an x402-protected resource.
- Base mainnet (`eip155:8453`) and USDC.
- x402 v2 Bazaar discovery metadata.

There is no ArisPay account, API key, database, custody, or application secret.
The only required value is `PAY_TO_ADDRESS`, the public EVM address that
receives settled USDC.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| x402-seller | [arispay-inc/arispay-x402](https://github.com/arispay-inc/arispay-x402) (root: /templates/railway-x402-seller) | Web service |

## Configuration

- **Start command:** `npm start`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/arispay-x402-seller-template)
