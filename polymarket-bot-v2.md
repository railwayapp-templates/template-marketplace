# Deploy Polymarket Bot Copy-Trading V2 on Railway

Simple Bot Polymarket copy-trading (buy & sell) with auto cashout

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/polymarket-bot-v2)

## About

Polymarket Bot V2 is a lightweight, TypeScript copy‑trading bot that mirrors trades from selected Polymarket traders while enforcing spend limits and optional auto‑cashout (redeem) after resolution. It runs continuously, polls Polymarket activity, and executes trades with clear risk controls and a minimal configuration surface.

Hosting Polymarket Bot V2 on Railway means running a long‑lived Node.js process with a small local state file. You’ll configure environment variables for the wallet, traders to copy, and risk limits. If you enable auto‑redeem, you’ll also provide a Polygon RPC URL and Polymarket Builder credentials. Railway handles deployment, restarts, and logs, while you attach a volume to persist state across restarts. Once deployed, the bot keeps polling and mirroring trades automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Polymarket Bot V2 | [XavTo/Bot-Polymarket](https://github.com/XavTo/Bot-Polymarket) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | true | verbose logs |
| `DRY_RUN` | true | simulate orders without sending them |
| `RPC_URL` | https://xxx | Polygon RPC endpoint |
| `COPY_SIDE` | BOTH | BUY | SELL | BOTH |
| `COPY_RATIO` | 0.1 | percent multiplier (0.1 = 10%) |
| `AUTO_REDEEM` | true | auto cashout when a market resolves |
| `PRIVATE_KEY` | 0x... | Magic EOA private key used to sign orders |
| `RELAYER_URL` | https://relayer-v2.polymarket.com | Polymarket relayer endpoint |
| `COPY_TRADERS` | 0xabc...,0xdef... | comma-separated trader addresses to copy |
| `COPY_STRATEGY` | PERCENT_USD | PERCENT_USD | PERCENT_SHARES | FIXED_USD | FIXED_SHARES |
| `MAX_TRADE_USD` | 10 | maximum USD per trade |
| `MIN_TRADE_USD` | 1 | minimum USD per trade |
| `SIGNATURE_TYPE` | 1 | 1=Polymarket proxy (Magic), 0=EOA, 2=Gnosis Safe |
| `BUILDER_API_KEY` | (secret) | Builder API key from polymarket.com/settings?tab=builder |
| `FIXED_TRADE_USD` | 10 | fixed USD per trade when COPY_STRATEGY=FIXED_USD |
| `PROFILE_ADDRESS` | 0x... | Polymarket profile/proxy address (visible in your account) |
| `RELAYER_TX_TYPE` | PROXY | PROXY (default) or SAFE |
| `BUILDER_API_SECRET` | (secret) | Builder API secret |
| `NPM_CONFIG_LOGLEVEL` | error | avoid fake railway crash at deploy |
| `MAX_DAILY_VOLUME_USD` | 10 | daily USD cap for buys |
| `MAX_POSITION_SIZE_USD` | 20 | per-position USD cap for buys |
| `RAILPACK_NODE_VERSION` | 22 | force Node 22 on Railway |
| `BUILDER_API_PASSPHRASE` | ... | Builder API passphrase |

## Configuration

- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/polymarket-bot-v2)
