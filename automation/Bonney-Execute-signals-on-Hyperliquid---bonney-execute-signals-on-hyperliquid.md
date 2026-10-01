# Deploy Bonney – Execute signals on Hyperliquid on Railway

Easy way to execute TradingView Strategies on Hyperliquid – HIP-3 supported

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bonney-execute-signals-on-hyperliquid)

## About

Bonney is designed to be swiftly set up directly from your phone — from start to executing your Strategy’s signals within minutes.

Bonney places your TradingView strategy’s trades on Hyperliquid perpetuals. TradingView sends your strategy’s alerts straight to your own deployment. Bonney places each order on Hyperliquid and reports to you in Telegram. Bonney trades with an agent wallet that can place orders but can never withdraw or transfer funds, and trades only on your strategy’s alerts.

The easiest setup process begins at https://bonney.app where you will create your private Telegram bot first.

Alternatively, deploy the template from here. There is nothing to fill in. Open the deployment’s URL and tap Start in Telegram to connect a bot. Your new bot then messages you the setup link. In setup, choose the asset your strategy trades, connect the wallet that owns your Hyperliquid account, and approve. Finally, paste the webhook URL and the alert message Bonney shows you into your strategy’s TradingView alert — and you are done.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bonney | `ghcr.io/bonneyapp/bonney-app:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PAIR_TICKET` | - | Filled in by your Bonney bot's deploy link — leave it as it is. Empty is fine. |
| `KEY_ENCRYPTION_SECRET` | (secret) | Encrypts your keys at rest. Generated for you — leave it as it is. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/bonney-execute-signals-on-hyperliquid)
