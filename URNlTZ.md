# Deploy DeFi Options Crypto Trading Bot - Premia on Railway

Onchain options market making bot deployed to Arbitrum

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/URNlTZ)

## About

Full Quick Start Tutorial on [Github](https://github.com/Premian-Labs/range-order-bot) and [Youtube](https://youtu.be/RLrytK1lMh4)!

Prerequisites:
1) An Arbitrum Wallet (private and public key)
2) An Arbitrum RPC like [LlamaNode](https://llamanodes.com/) or [Alchemy](https://www.alchemy.com/)

Insert the Environment Variables and you are can now tell your friends your a Market Maker and Bot Trader!

But seriously, please it is recommended to watch the video and build your own container with supported tokens and strikes before promoting to production.

Disclaimer:
This software is for educational purposes only. Do not risk money which you are afraid to lose. USE THE SOFTWARE AT YOUR OWN RISK. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| range-order-bot | [Premian-Labs/range-order-bot](https://github.com/Premian-Labs/range-order-bot) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | production | To use Testnet set to development |
| `LP_PKEY` | 0x | Wallet Private Key |
| `LP_ADDRESS` | 0x | Public Wallet Address |
| `MAINNET_RPC_URL` | https://arb1.arbitrum.io/rpc | Arbitrum One Mainnet RPC URL |
| `TESTNET_RPC_URL` | https://goerli-rollup.arbitrum.io/rpc | RPC URL for Goerlia (soon to be Sepolia) |

**Category:** Bots · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/URNlTZ)
