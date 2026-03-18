# Deploy NOFX | Self-Hosted AI Crypto Trading System on Railway

Self Host NOFX: Autonomous AI trader: multi-model, multi-exchange.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nofx-ai-trading)

## About

NOFX is an open-source autonomous AI trading system that connects to crypto exchanges, selects AI models automatically, and executes trades — all without manual configuration. Unlike traditional bots where you write Python strategies or wrangle API keys, NOFX's AI perceives the market, picks the model, and decides when to trade. 

Self-host NOFX on Railway with this two-service template: a Go backend (API server + SQLite) and an nginx frontend (React dashboard) — pre-wired with private networking, persistent storage, and encrypted credential handling out of the box.

![NOFX Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773775386/nofx_railway_arch_fvbxcw.png)

---

NOFX is a full-stack AI trading OS built with Go (backend) and React/TypeScript (frontend). It routes market data through an MCP AI client layer that supports 41+ models — DeepSeek, GPT, Claude, Qwen — and connects to 8 exchanges via unified adapters.

Key features:
- **Multi-exchange support**: Binance, Bybit, OKX, Bitget, KuCoin, Gate, Hyperliquid, Aster DEX
- **AI Debate Arena**: Multiple models argue Bull/Bear/Analyst roles before a trade is placed
- **AI Competition Mode**: Two AI traders run in parallel with separate accounts — compare ROI live
- **Strategy Studio**: Visual builder for coin sources, indicators, and risk controls — no JSON editing
- **Backtest Lab**: Replay strategies against historical data with full equity curve reporting
- **x402 micropayments**: Pay per AI request with a USDC wallet — no API key management needed
- **Chain-of-Thought logs**: Full AI reasoning visible in the dashboard, updated every 10 seconds
- **SQLite persistence**: All data (users, trades, strategies, backtest history) stored on a mounted volume

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nofx | `ghcr.io/nofxaios/nofx/nofx-backend:stable` | Database |
| Nofx UI | `ghcr.io/nofxaios/nofx/nofx-frontend:stable` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | nofx | UTC | Server timezone configuration value |
| `HOST` | nofx | 0.0.0.0 | Bind server to all interfaces |
| `JWT_SECRET` | nofx | (secret) | Secret for JWT token signing |
| `AI_MAX_TOKENS` | nofx | (secret) | Maximum tokens for AI responses |
| `RSA_PRIVATE_KEY` | nofx | - | Generate 2048-bit {PKCS #8} RSA private key (use generator: https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/); self-generate recommended (see setup guide: https://railway.com/deploy/nofx-ai-trading) |
| `DATA_ENCRYPTION_KEY` | nofx | - | Key for encrypting stored data |
| `NOFX_ADMIN_PASSWORD` | nofx | (secret) | Admin panel authentication password |
| `TRANSPORT_ENCRYPTION` | nofx | false | Enable transport layer encryption |
| `PORT` | Nofx UI | 80 | HTTP server listening port |
| `BACKEND_URL` | Nofx UI | - | Internal backend service base URL |

## Configuration

- **Volume:** `/app/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/nofx-ai-trading)
