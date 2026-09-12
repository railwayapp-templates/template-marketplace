# Deploy Polymarket Bot [Updated Sep '26] on Railway

Polymarket Copy-Trading Bot — Self-Hosted | Buy & Sell with Auto Cashout

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/polymarket-bot)

## About

Polymarket Bot V2 is a TypeScript copy-trading bot for Polymarket — it watches selected trader wallets and mirrors their trades under your own spend limits, with optional auto-redeem once a market resolves. This template deploys a patched fork, verified live against both the actual crash the upstream reference has and the fix for it.

The bot runs as a single always-on Node.js process: it polls Polymarket's activity feed for trades from wallets you specify, applies your copy strategy (percentage of size, fixed USD, or fixed shares) within hard daily-volume and per-position caps, and optionally redeems resolved positions automatically. Nothing about your wallet or credentials passes through a third-party operator — you provide your own Polymarket-linked private key, and the bot runs entirely under your control.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| polymarket-bot | [shruti060701/polymarket-bot-railway](https://github.com/shruti060701/polymarket-bot-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | true | Verbose logs. |
| `DRY_RUN` | true | Simulate orders without sending them. Confirm your config works before setting to false. |
| `COPY_SIDE` | BOTH | BUY | SELL | BOTH. |
| `COPY_RATIO` | 0.1 | Percent multiplier for percent strategies (0.1 = 10%). |
| `STATE_FILE` | /data/state.json | Persists processed trades/redemptions to the volume across restarts. |
| `AUTO_REDEEM` | false | Auto-cashout when a market resolves. Requires RPC_URL + Builder credentials below when true. Defaulting to false here (reference defaults to true) to reduce required fields for a first deploy. |
| `PRIVATE_KEY` | - | Magic EOA private key used to sign orders. Get it from reveal.magic.link/polymarket. |
| `RELAYER_URL` | https://relayer-v2.polymarket.com | Polymarket relayer endpoint. |
| `COPY_TRADERS` | - | Comma-separated trader addresses to copy. |
| `COPY_STRATEGY` | PERCENT_USD | PERCENT_USD | PERCENT_SHARES | FIXED_USD | FIXED_SHARES. |
| `MAX_TRADE_USD` | 10 | Maximum USD per trade. |
| `MIN_TRADE_USD` | 1 | Minimum USD per trade. |
| `SIGNATURE_TYPE` | 1 | 1=Polymarket proxy (Magic, recommended default), 0=EOA, 2=Gnosis Safe. |
| `FIXED_TRADE_USD` | 10 | Fixed USD per trade when COPY_STRATEGY=FIXED_USD. |
| `PROFILE_ADDRESS` | - | Polymarket profile/proxy address visible in your account. |
| `RELAYER_TX_TYPE` | PROXY | PROXY (default) or SAFE. |
| `NPM_CONFIG_LOGLEVEL` | error | Suppresses npm warnings during build. |
| `MAX_DAILY_VOLUME_USD` | 10 | Daily USD cap for buys. |
| `MAX_POSITION_SIZE_USD` | 20 | Per-position USD cap for buys. |
| `RAILPACK_NODE_VERSION` | 22 | Forces Node 22 (some dependencies warn/fail below Node 20.10). |

## Configuration

- **Volume:** `/data`

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/polymarket-bot)
