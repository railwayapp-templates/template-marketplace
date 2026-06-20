# Deploy pumplexity-dex-agent on Railway

Pumplexity DEX Agent is a self-hosted Solana trading agent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pumplexity-dex-agent)

## About

pumplexity-dex-agent is a self-hosted Solana trading agent. It receives signals from the Pumplexity API and executes them on-chain via Jupiter using your own wallet. Funds, keys, and the open-position ledger stay in your Railway service — non-custodial by design. One agent serves any number of strategy subscriptions.

The agent runs as a long-lived Node.js v22 Fastify service. It exposes POST /execute for the Pumplexity API to dispatch trade events, and calls back to pumplexity-api for swap quotes and trigger-order placement. Both directions are authenticated by a single AGENT_KEY issued at agent registration. Your SOLANA_PRIVATE_KEY is held only in this service's environment and signs each trade locally before broadcasting. A small SOL balance in the agent wallet covers transaction fees and the auto-topped-up $PLEX gas reserve. Mount a Railway volume at /data if you want the open-position ledger to survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pumplexity-dex-agent | [pumplexity/pumplexity-dex-agent](https://github.com/pumplexity/pumplexity-dex-agent) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AGENT_KEY` | - | Agent key — register your agent at app.pumplexity.com/agents and copy the key shown ONCE on creation. |
| `SOLANA_RPC_URL` | https://api.mainnet-beta.solana.com | Solana RPC. Defaults to the public mainnet RPC, which rate-limits at  ~10 RPS and drops sendRawTransaction broadcasts under load — fine for # testing, NOT recommended for production trading. For reliable fills get  a free Helius URL (60 seconds, 5M req/month free):  https://www.helius.dev/  → sign up → copy Mainnet RPC URL → paste here |
| `AGENT_LEDGER_PATH` | /data/agent-ledger.json | Ledger storage path. Persists open positions + per-tranche state across restarts. Default is ./data/agent-ledger.json |
| `PUMPLEXITY_API_URL` | https://api.pumplexity.com | Pumplexity API base URL. |
| `SOLANA_PRIVATE_KEY` | - | Solana — agent's own keypair (base58 private key). Keep this secret. This wallet executes trades on your behalf and needs a small SOL balance to pay for transactions. The wallet pubkey is what you register in the Agent UI as the "agent wallet". |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/pumplexity-dex-agent)
