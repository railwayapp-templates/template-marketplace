# Deploy Horizon on Railway

AI reads your news sources and writes a daily briefing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/horizon-aug-26-ai-news-radar)

## About

Horizon is an AI-powered news radar that watches your favorite sources — Hacker News, Reddit, RSS feeds, Telegram channels, GitHub trending — and runs everything through an LLM to score, filter, and summarize what matters. Every morning you get a clean briefing in English or Chinese, covering just the stories worth reading. Point it at the sources you care about, set your LLM API key, and let it run.

Horizon runs as a single Python service with a web dashboard. It uses a scheduled pipeline to fetch articles from your configured sources, score them with your LLM, filter out noise, and generate a summary page. You need an API key for your preferred LLM provider (OpenAI, Anthropic, or any compatible endpoint). Optionally connect a Telegram bot to receive briefings there. The service stores its data locally and serves the dashboard over HTTP.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Horizon | [Thysrael/Horizon](https://github.com/Thysrael/Horizon) | Worker |

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/horizon-aug-26-ai-news-radar)
