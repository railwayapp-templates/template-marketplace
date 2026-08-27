# Deploy ClawRouter on Railway

Self-hosted OpenAI-compatible LLM router with pay-per-call crypto billing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clawrouter)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container. There is no external database: wallet state and configuration are stored in a Railway persistent volume mounted at `/root/.openclaw`. Model traffic is settled with USDC micropayments from the container's own wallet, so no API keys are provisioned or stored.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawrouter | [INAPP-Mobile/clawrouter](https://github.com/INAPP-Mobile/clawrouter) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CLAWROUTER_WORKER` | 0 | Set to 1 to enable Worker Mode, which earns USDC by running BlockRun network health checks in the background. |
| `BLOCKRUN_WALLET_KEY` | - | Optional existing wallet private key (hex, 0x-prefixed) to restore a funded BlockRun wallet. Leave blank to auto-generate a new EVM + Solana wallet on first boot and back it up from the deploy logs. |
| `BLOCKRUN_WEB_SEARCH` | auto | Registration mode for BlockRun's built-in web search tool. auto enables it when supported; off disables it. |
| `CLAWROUTER_DISABLED` | false | Set to true to bypass smart routing and pass every request straight through to the upstream model. |
| `CLAWROUTER_DEBUG_HEADERS` | on | Controls x-clawrouter-* debug response headers exposing routing decisions. Set to off to suppress them. |
| `CLAWROUTER_PAYMENT_CHAIN` | solana | Chain used to settle pay-per-call model spend. Options: solana (default, cheapest fees) or base. |
| `CLAWROUTER_SOLANA_RPC_URL` | https://api.mainnet-beta.solana.com | Solana RPC endpoint used for USDC balance checks. Swap in a private RPC if you hit public rate limits. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.openclaw`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/clawrouter)
