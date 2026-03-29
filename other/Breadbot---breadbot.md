# Deploy Breadbot on Railway

Crypto trading bot + web panel. Scans Solana & Base 24/7.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/breadbot)

## About

# Deploy Breadbot — Trading Bot + Web Panel

Breadbot is a fully automated crypto trading system that deploys as a single Railway service. It runs the trading bot, the MCP server, and a browser-based web control panel all in one container. No separate services, no cross-service configuration.

## What You Get

**Trading bot** scans Solana and Base every 5 minutes, runs automated rug checks via GoPlus and RugCheck, scores each token 0–100 for security, and sends Telegram alerts to your phone with recommended position sizes.

**Web control panel** is accessible at your Railway service URL immediately after deploy. It shows live alerts with Buy/Skip buttons, open positions, yield rates across 6 platforms, strategy controls (grid trading, funding rate arb, yield rebalancer), and a full P&L performance history with charts.

**Telegram control** runs simultaneously — every alert, trade confirmation, and status update flows through your bot. Commands include /status, /yields, /positions, /pause, /resume.

## Strategies Included

- Scanner with automated rug detection (Solana + Base DEX)
- Yield monitor across Coinbase, Aave, Compound, Kraken, Morpho, and liquid staking
- Yield rebalancer — alerts or auto-moves funds to the highest APY
- Grid trading engine with RSI trend guard
- Funding rate arbitrage (Coinbase CFM for US residents, Drift Protocol for DEX)
- Pendle Finance fixed-yield vaults
- Robinhood Crypto connector

## What You Need Before Deploying

- Telegram bot token from @BotFather and your numeric chat ID from @userinfobot
- Breadbot license key from your purchase confirmation
- MCP_SECRET — any strong random string (openssl rand -hex 32)
- WHOP_API_KEY — create at whop.com → Developer → API Keys
- RAILWAY_API_TOKEN — create at railway.app → Account Settings → Tokens
- Exchange API keys (Coinbase, Kraken, or both) — View + Trade permissions only, never Transfer

## After Deploying

Your Railway service URL is the web panel. Visit it, enter your license key, set a panel password, and the dashboard is live. The bot starts scanning immediately and will mes#s aDgeep lyooyu rB rTeealdebgorta m—  Twrhaedni nigt  Bfoitn d+s  Waenb  oPpapnoerlt
u
nBirteya.d
b
oEtx cihsa nag ef uAlPlIy  kaeuytso maantde dr icsrky psteot ttirnagdsi ncga ns ybset eump dtahtaetd  daenpyltoiymse  afsr oam  stihneg lpea nReali lSweatyt isnegrsv ipcaeg.e  Iwti trhuonust  trheed etprlaodyiinngg .bot, the MCP server, and a browser-based web control panel all in one container. No separate services, no cross-service configuration.

## What You Get

**Trading bot** scans Solana and Base every 5 minutes, runs automated rug checks via GoPlus and RugCheck, scores each token 0–100 for security, and sends Telegram alerts to your phone with recommended position sizes.

**Web control panel** is accessible at your Railway service URL immediately after deploy. It shows live alerts with Buy/Skip buttons, open positions, yield rates across 6 platforms, strategy controls (grid trading, funding rate arb, yield rebalancer), and a full P&L performance history with charts.

**Telegram control** runs simultaneously — every alert, trade confirmation, and status update flows through your bot. Commands include /status, /yields, /positions, /pause, /resume.

## Strategies Included

- Scanner with automated rug detection (Solana + Base DEX)
- Yield monitor across Coinbase, Aave, Compound, Kraken, Morpho, and liquid

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| breadbot-deploy | [getbreadbot/breadbot-deploy](https://github.com/getbreadbot/breadbot-deploy) | Worker |
| breadbot-panel | [getbreadbot/breadbot-deploy](https://github.com/getbreadbot/breadbot-deploy) (root: panel) | Worker |

**Category:** Other · **Languages:** Python, JavaScript, HTML, CSS, Shell, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/breadbot)
