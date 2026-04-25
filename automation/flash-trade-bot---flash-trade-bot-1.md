# Deploy flash-trade-bot on Railway

Deploy and Host flash-trade-bot with Railway smoothly

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flash-trade-bot-1)

## About

flash-trade-bot is a self-hosted Solana perps trading bot with a built-in setup dashboard. One deploy gives you both the trading server and a browser wizard that walks you through wallet, funding, and TradingView setup. You keep your keys.

First deploy boots in SETUP_MODE=true and serves the setup dashboard at your Railway URL. Walk the wizard, paste the generated env vars back into Railway Variables, remove SETUP_MODE, and the bot auto-redeploys in live trading mode. The same URL then shows a live status page with balance, positions, PnL, and pause/resume controls.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flash-trade-bot | [cryptoclassdev/flash-trade-bot](https://github.com/cryptoclassdev/flash-trade-bot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ASSET` | BTC | Market symbol on flash.trade. |
| `NETWORK` | mainnet-beta | Solana network. mainnet-beta for live trading; devnet is dormant. |
| `LEVERAGE` | 2 | Leverage multiplier, 1-10. |
| `SETUP_MODE` | true | Bot boots in dashboard-only mode. Remove this variable after you complete the setup wizard to enable trading. |
| `DRY_RUN_ONLY` | false | Keep false. When true, server refuses to boot — script-only mode. |
| `COLLATERAL_USDC` | 20 | Per-trade collateral in USDC. Adjustable via dashboard sliders. |
| `SLIPPAGE_EXIT_BPS` | 150 | Exit slippage tolerance, basis points. Higher than entry for reliable closes. |
| `SLIPPAGE_ENTRY_BPS` | 100 | Entry slippage tolerance, basis points (100 = 1%). |
| `MAX_DAILY_LOSS_USDC` | 15 | Daily realized-loss circuit breaker. Bot auto-halts when hit; auto-clears at UTC midnight. |
| `I_UNDERSTAND_REAL_MONEY` | yes | Must be literal 'yes' to trade on mainnet. Acknowledging real-money risk. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, Dockerfile, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/flash-trade-bot-1)
