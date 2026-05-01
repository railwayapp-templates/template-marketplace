# Deploy TradingAgents By Tauric Research | Open Source Multi-Agent Stock Analysis on Railway

Self-host TradingAgents. Multi-agent stock analysis w/ OpenAI/Claude/Gemini

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trading-agents)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trading-agents?referralCode=QXdhdr)

TradingAgents is an open-source multi-agent LLM framework by Tauric Research that mirrors the dynamics of a real trading firm — analysts, researchers, traders, and risk managers debate and converge on a buy/hold/sell recommendation for any ticker. Self-host TradingAgents on Railway to run the full agent graph through a clean web UI and REST API, without exposing your LLM API keys to a third-party service.

This Railway template wraps the upstream Python package in a FastAPI service so you can submit `(ticker, date)` analyses from a browser, poll job status, and inspect decisions through `/docs`. It bundles a persistent volume for analysis logs, agent memory, and market-data cache so multi-day research stays available across redeploys.

TradingAgents orchestrates seven specialized LLM agents through a LangGraph state machine: fundamentals analyst, sentiment analyst, news analyst, technical analyst, bull researcher, bear researcher, and a trader who weighs all four reports against a risk manager. Each agent has its own prompt, tool access, and memory.

Key features:
- Multi-provider LLM support (OpenAI, Anthropic, Google, DeepSeek, Qwen, GLM, OpenRouter, local Ollama)
- Configurable debate depth — more rounds = more deliberation, more tokens
- yfinance built in (free); Alpha Vantage optional for premium data
- Persistent agent memory + decision log on disk
- Built-in checkpoints — resume long analyses after a redeploy

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| TradingAgents | [praveen-ks-2001/TradingAgents-Railway-Template](https://github.com/praveen-ks-2001/TradingAgents-Railway-Template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP port (Railway overrides) |
| `XAI_API_KEY` | (secret) | Grok / xAI key (optional) |
| `GOOGLE_API_KEY` | (secret) | Google Gemini key (optional) |
| `OPENAI_API_KEY` | (secret) | OpenAI key (default provider) |
| `DEEPSEEK_API_KEY` | (secret) | DeepSeek key (optional) |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic Claude key (optional) |
| `OPENROUTER_API_KEY` | (secret) | OpenRouter key (optional) |
| `ALPHA_VANTAGE_API_KEY` | (secret) | Premium market data (optional) |
| `TRADINGAGENTS_MEMORY_LOG` | /data/memory/trading_memory.md | Persistent agent memory |
| `TRADINGAGENTS_RESULTS_DIR` | /data/logs | Decision log directory |
| `TRADINGAGENTS_DATA_CACHE_DIR` | /data/cache | Market-data cache directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/trading-agents)
