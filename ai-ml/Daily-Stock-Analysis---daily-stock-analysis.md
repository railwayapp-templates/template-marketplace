# Deploy Daily Stock Analysis on Railway

AI daily reports over your stock watchlist, with a secured dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/daily-stock-analysis)

## About

Daily Stock Analysis is a widely used open-source AI research assistant for China A-share (and other market)
watchlists: scheduled reports with citations, a market-review summary, a web dashboard for configuration and
history, and push notifications. This is a community-maintained template; it is not affiliated with the
project.

Daily Stock Analysis is a Python/FastAPI service with a React dashboard, storing everything in SQLite, and
pulling from several market-data sources with automatic fallback. Its own Docker guide runs two containers
(a scheduler and a web service) and, out of the box, serves the dashboard with password protection off — the
toggle for it is also read only from a config file, so setting it as an ordinary Docker environment variable
silently has no effect.

This template runs it as one Railway service with authentication mandatory and enforced at every start, the
admin password set from the deploy form before the dashboard is ever reachable, and the daily scheduled
analysis running in the same process. Bring at least one LLM provider key; everything else (which stocks,
which schedule, which notification channel) is configurable from the dashboard after your first sign-in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/youssefsiam38/dailystockanalysis-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Asia/Shanghai | Timezone; also drives the A-share trading-day and market-hours checks. |
| `PORT` | 8000 | - |
| `STOCK_LIST` | 600519,300750,002594 | Comma-separated stock codes to analyse. Also editable from the dashboard. |
| `GOOGLE_CX_KEY` | - | Google Custom Search engine id (used with GOOGLE_API_KEY). |
| `SCHEDULE_TIME` | 18:00 | Daily run time, in TZ (HH:MM). |
| `GEMINI_API_KEY` | (secret) | Google Gemini API key. |
| `GOOGLE_API_KEY` | (secret) | Google Custom Search API key. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. At least one LLM provider key is required for any analysis to run. |
| `OWNER_PASSWORD` | (secret) | The admin dashboard's password, generated. Copy it from here to sign in. |
| `TAVILY_API_KEY` | (secret) | Tavily search API key, for richer news context. |
| `OPENAI_BASE_URL` | - | An OpenAI-compatible endpoint instead of api.openai.com. |
| `DEEPSEEK_API_KEY` | (secret) | DeepSeek API key. |
| `SCHEDULE_ENABLED` | true | true runs the analysis daily. Also editable from the dashboard's Settings page. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key. |
| `FIRECRAWL_API_KEY` | (secret) | Firecrawl search API key. |
| `OWNER_RESET_PASSWORD` | (secret) | Set true with a new OWNER_PASSWORD to reset the admin password; remove it afterwards. |
| `SCHEDULE_RUN_IMMEDIATELY` | false | false waits for SCHEDULE_TIME; the dashboard's Run now button triggers an on-demand run. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/daily-stock-analysis)
