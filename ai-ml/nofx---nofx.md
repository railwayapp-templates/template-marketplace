# Deploy nofx on Railway

AI-Powered Trading Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nofx)

## About

Deploy NOFX - an open-source AI trading platform that lets you run multiple AI models to trade crypto, stocks, forex, and metals automatically.

  ## About Hosting

  NOFX runs as a self-contained web application with:
  - **Frontend**: React-based dashboard for configuration and monitoring
  - **Backend**: Go API server handling AI inference and trade execution
  - **Database**: SQLite for data persistence (stored in /app/data)

  The platform requires no external databases - everything runs in a single container.

  ## Why Deploy

  - **AI-Powered Trading**: Run DeepSeek, GPT, Claude, Gemini, Grok, or Kimi to make trading decisions
  - **Multi-Exchange**: Trade on Binance, Bybit, OKX, Bitget, Hyperliquid from one platform
  - **No Code Required**: Configure everything through the web interface
  - **Real-Time Dashboard**: Monitor positions, P/L, and AI decision logs
  - **Strategy Studio**: Visual builder for trading strategies with technical indicators

  ## Common Use Cases

  - Automated crypto futures trading with AI analysis
  - Multi-AI competition to find the best trading approach
  - Backtesting trading strategies with historical data
  - AI debate arena for trading decisions

  ## Dependencies for

  ### Deployment Dependencies

  - No external dependencies required
  - All services run within the container
  - Encryption keys auto-generated on first start
  - SQLite database created automatically

  Optional environment variables:
  - `DEEPSEEK_API_KEY` - For AI trading features
  - `JWT_SECRET` - Custom JWT secret (auto-generated if not set)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nofx | [NoFxAiOS/nofx](https://github.com/NoFxAiOS/nofx) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Go, TypeScript, Shell, CSS, JavaScript, Makefile, HTML

[View on Railway →](https://railway.com/template/nofx)
