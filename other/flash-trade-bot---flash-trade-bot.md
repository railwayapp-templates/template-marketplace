# Deploy flash-trade-bot on Railway

Trade crypto automatically using your TradingView alerts. Your wallet only.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flash-trade-bot)

## About

flash-trade-bot is a self-hosted bot that turns TradingView strategy alerts into real perpetual-futures trades on flash.trade (Solana mainnet). It authenticates incoming webhooks, derives open/close/flip intents from position transitions, signs Solana transactions locally with your keypair, and notifies you on Telegram. You hold the keys. You bring the Pine strategy. One deploy, one trader.

Deploying flash-trade-bot on Railway gives you an always-on Express server behind Railway's HTTPS edge, a SQLite audit ledger on a mounted persistent volume, auto-restart on failure, graceful shutdown on redeploys, and a public webhook URL your TradingView alerts POST to. You bring a freshly generated Solana wallet, a paid RPC endpoint, a Telegram bot for notifications, and your own Pine strategy. The bot boots with `I_UNDERSTAND_REAL_MONEY=no` by default so you can verify `/health`, `/status`, and the full pipeline end-to-end before flipping the switch on live trading.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flash-trade-bot | [cryptoclassdev/flash-trade-bot](https://github.com/cryptoclassdev/flash-trade-bot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ASSET` | BTC | - |
| `NETWORK` | mainnet-beta | - |
| `LEVERAGE` | 2 | Leverage multiplier, 1-10. |
| `SETUP_MODE` | true | - |
| `DRY_RUN_ONLY` | false | Keep false. Script-only mode; server refuses to boot when true. |
| `WEBHOOK_SECRET` | (secret) | - |
| `COLLATERAL_USDC` | 20 | Per-trade collateral, USD. Adjustable via dashboard sliders. |
| `SLIPPAGE_EXIT_BPS` | 150 | Exit slippage tolerance, basis points. Higher than entry. |
| `SLIPPAGE_ENTRY_BPS` | 100 | Entry slippage tolerance, basis points. 100 = 1%. |
| `TELEGRAM_BOT_TOKEN` | (secret) | - |
| `MAX_DAILY_LOSS_USDC` | 15 | Daily realized-loss circuit breaker. Bot auto-halts when hit; auto-clears at UTC midnight. |
| `I_UNDERSTAND_REAL_MONEY` | yes | Must be literal yes to trade on mainnet. You are acknowledging real-money risk. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/flash-trade-bot)
