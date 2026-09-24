# Deploy x402 Facilitator Lite on Railway

Self-hosted x402 payment facilitator for USDC on Base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/x402-facilitator-l-1)

## About

Deploy and run your own facilitator. After deploy, set `EVM_PRIVATE_KEY` in the service variables.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/x402-facilitator-l-1)

Your own facilitator means 0% platform fees, sub-5ms latency, and full control over your payment rail. Once your APIs point to it, it stays — payment infrastructure should never be a single point of failure you don't control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| x402-facilitator-lite | `ghcr.io/mc9max/x402-facilitator-lite:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Server port. Railway maps this to the public domain. |
| `RPC_URL` | https://mainnet.base.org | Base mainnet RPC URL. Override if using a private RPC (Alchemy, Infura, etc.). |
| `EVM_PRIVATE_KEY` | - | EVM private key (0x-prefixed) — gas wallet for settlement transactions. Generate a new burner key; never use a main wallet. |
| `RPC_URL_SEPOLIA` | https://sepolia.base.org | Base Sepolia RPC URL (testnet). Override if using a private RPC. |
| `EVM_PAY_TO_ADDRESS` | - | Your USDC receiver address (where settled funds go). If empty, defaults to the EVM_PRIVATE_KEY address. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/x402-facilitator-l-1)
