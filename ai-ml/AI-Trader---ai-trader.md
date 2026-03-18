# Deploy AI-Trader on Railway

AI-Trader with MCP tools, UI dashboard. AI Trader IA Trader

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-trader)

## About

AI-Trader is an autonomous trading benchmark that lets multiple LLM agents compete in historical market simulations. Agents research market context, analyze price data, and execute simulated trades using a tool-driven (MCP) architecture. It includes a lightweight web dashboard to visualize portfolio performance, trades, and leaderboard comparisons across models.

This template deploys AI-Trader as a single Railway service using Docker. The container starts all MCP tool services (math, search, trade execution, local price lookup, and crypto tools), runs a configured trading simulation, and serves the static UI dashboard over Railway’s public HTTP port.

A persistent Railway Volume is mounted at `/app/data` to store datasets and run outputs (price caches, agent positions, transactions, and logs), ensuring results persist across restarts and redeploys. To run real agent decisions, you must provide an OpenAI-compatible API key, and optionally keys for external search and market data providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AI-Trader | [XavTo/AI-Trader](https://github.com/XavTo/AI-Trader) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `END_DATE` | 2026-01-12 | Simulation end date (YYYY-MM-DD) |
| `INIT_DATE` | 2026-01-01 | Simulation start date (YYYY-MM-DD) |
| `CONFIG_PATH` | /app/configs/default_config.json | Scenario config to run (US market, daily). Use /app/configs/default_hour_config.json for hourly runs |
| `JINA_API_KEY` | (secret) | Jina API key used by the Search/market-intelligence tool (leave empty to disable external search) |
| `AGENT_MAX_STEP` | 30 | Max number of reasoning/action steps the agent can take per trading day (higher = more tool calls/cost) |
| `MATH_HTTP_PORT` | 8000 | MCP Math service port (calculations/metrics) |
| `OPENAI_API_KEY` | (secret) | OpenAI API key (required to run the agent) |
| `OPENAI_API_BASE` | https://api.openai.com/v1 | OpenAI-compatible API base URL (must end with /v1) |
| `TRADE_HTTP_PORT` | 8002 | MCP TradeTools service port (buy/sell simulation) |
| `CRYPTO_HTTP_PORT` | 8005 | MCP CryptoTradeTools service port (crypto tools) |
| `RESET_AGENT_DATA` | 0 | Set to 1 to wipe ./data/agent_data before running a new simulation |
| `RUNTIME_ENV_PATH` | /app/runtime_env.json | Runtime environment config file path used by the app (generated/consumed at startup) |
| `SEARCH_HTTP_PORT` | 8001 | MCP Search/market intelligence service port (news/search) |
| `FORCE_REFRESH_DATA` | 0 | Set to 1 to force re-download/refresh of price data on boot (can hit API rate limits) |
| `GETPRICE_HTTP_PORT` | 8003 | MCP LocalPrices service port (local price lookup) |
| `ALPHAVANTAGE_API_KEY` | (secret) | Alpha Vantage API key (used to download/update stock prices when local cache is missing) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ai-trader)
