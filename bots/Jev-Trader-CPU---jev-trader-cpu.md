# Deploy Jev Trader CPU on Railway

CPU paper-trading bot: local AI market-makes MON-USDC on Monad

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jev-trader-cpu)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/jev-trader-cpu?utm_campaign=jev-trader-cpu)

**Jev Trader CPU** — an AI market-making bot for the Kuru MON-USDC book on Monad, making one buy-or-sell decision per ~300 ms block with a **local JevOS model on CPU** ($0 inference, no API key). Every block it reads the live order book, asks the model, and posts one post-only limit order just inside the touch, so fills earn the spread instead of paying it. A live dashboard streams each block, decision, quote, fill and paper P&L.

Deploys in **dry-run (paper trading)**: real book, real local AI decisions, simulated fills. No private keys, no API keys, zero form fields.

Two services, deployed together with one click:

- **trader** — the Bun bot plus a self-contained live dashboard (SSE, no build step, no external assets) on `/`
- **jevos** — the local CPU decision model ([mc9max/jevos](https://github.com/mc9max/jevos)), reachable only over Railway's private network; no public domain, no key required

The trader discovers the model at `http://${{jevos.RAILWAY_PRIVATE_DOMAIN}}:${{jevos.PORT}}` automatically. Stateless: block history is in-memory (last 1000 events), nothing is written to disk, no volume is mounted. The dashboard doubles as the healthcheck (`GET /`, 200, unauthenticated).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trader | [mc9max/jev-trader-cpu](https://github.com/mc9max/jev-trader-cpu) | Web service |
| jevos | [mc9max/jevos](https://github.com/mc9max/jevos) | Worker |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots · **Languages:** TypeScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/jev-trader-cpu)
