# Deploy Dexter with Web UI on Railway

Dexter : autonomous financial research agent with a secure web dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dexter-with-web-ui)

## About

Dexter with Web UI is a financial research agent wrapped in a secure browser dashboard. It runs autonomous analysis on market data, saves detailed run logs, and lets you launch queries and review outputs without a terminal. It can be triggered manually or scheduled with Railway Cron.

This deployment runs a Bun-based web server that exposes a small dashboard plus an API. You provide LLM and financial data keys via Railway Variables, then start the service with `bun run web`. The UI lets you launch runs, view history, and inspect full tool logs. For persistence, mount a volume at `/app/.dexter` to keep JSONL scratchpads across deploys. For scheduled execution, add a Railway Cron that calls the dashboard’s `/api/run` endpoint using Basic or Bearer auth.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dexter | [XavTo/dexter](https://github.com/XavTo/dexter) | Web service |
| Cron | `ghcr.io/railwayapp/function-bun:1.3.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Dexter | 3000 | Web server port (Railway injects PORT if unset) |
| `DEXTER_MODEL` | Dexter | gpt-5.2 | LLM model ID used by the agent |
| `DASHBOARD_USER` | Dexter | (secret) | Dashboard username (optional if empty) |
| `OPENAI_API_KEY` | Dexter | (secret) | OpenAI API key (or use another provider key) |
| `DEXTER_PROVIDER` | Dexter | openai | LLM provider (openai, anthropic, google, etc.) |
| `EXASEARCH_API_KEY` | Dexter | (secret) | Web search (Exa) API key (optional) |
| `DASHBOARD_PASSWORD` | Dexter | (secret) | Dashboard password (required) |
| `DEXTER_MAX_ITERATIONS` | Dexter | 10 | Max agent loop iterations per run |
| `FINANCIAL_DATASETS_API_KEY` | Dexter | (secret) | Market data provider key |
| `DEXTER_QUERY` | Cron | Analyze NVDA: growth, margins, valuation, key risks, and a bull/base/bear conclusion with sources. | Query to run (required by the cron function) |
| `DASHBOARD_USER` | Cron | (secret) | Dashboard username (optional if empty) |
| `DASHBOARD_PASSWORD` | Cron | (secret) | Dashboard password (required) |
| `DEXTER_DASHBOARD_URL` | Cron | - | Public URL of the web service |
| `DASHBOARD_AUTH_SCHEME` | Cron | bearer | Auth scheme: basic or bearer |

## Configuration

- **Start command:** `bash scripts/railway-job.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.dexter`
- **Start command:** `./run.sh Ly8gUmFpbHdheSBDcm9uIChCdW4gcnVudGltZSk6IHRyaWdnZXIgRGV4dGVyIGRhc2hib2FyZCBydW4KaW1wb3J0IHsgeiB9IGZyb20gInpvZEAzIjsKCmNvbnN0IGVudiA9IHoKICAub2JqZWN0KHsKICAgIERFWFRFUl9EQVNIQk9BUkRfVVJMOiB6LnN0cmluZygpLnVybCgpLAogICAgREFTSEJPQVJEX1BBU1NXT1JEOiB6LnN0cmluZygpLm1pbigxKSwKICAgIERFWFRFUl9RVUVSWTogei5zdHJpbmcoKS5taW4oMSksCiAgICBEQVNIQk9BUkRfVVNFUjogei5zdHJpbmcoKS5vcHRpb25hbCgpLAogICAgREFTSEJPQVJEX0FVVEhfU0NIRU1FOiB6LmVudW0oWyJiYXNpYyIsICJiZWFyZXIiXSkub3B0aW9uYWwoKSwKICB9KQogIC5wYXJzZShwcm9jZXNzLmVudik7Cgpjb25zdCBiYXNlVXJsID0gZW52LkRFWFRFUl9EQVNIQk9BUkRfVVJMLnJlcGxhY2UoL1wvJC8sICIiKTsKY29uc3QgZW5kcG9pbnQgPSBgJHtiYXNlVXJsfS9hcGkvcnVuYDsKY29uc3QgYXV0aFNjaGVtZSA9IGVudi5EQVNIQk9BUkRfQVVUSF9TQ0hFTUUgPz8gImJhc2ljIjsKY29uc3QgdXNlciA9CiAgZW52LkRBU0hCT0FSRF9VU0VSICYmIGVudi5EQVNIQk9BUkRfVVNFUi5sZW5ndGggPiAwCiAgICA/IGVudi5EQVNIQk9BUkRfVVNFUgogICAgOiAiYWRtaW4iOwoKY29uc3QgYXV0aEhlYWRlciA9CiAgYXV0aFNjaGVtZSA9PT0gImJlYXJlciIKICAgID8gYEJlYXJlciAke2Vudi5EQVNIQk9BUkRfUEFTU1dPUkR9YAogICAgOiBgQmFzaWMgJHtCdWZmZXIuZnJvbShgJHt1c2VyfToke2Vudi5EQVNIQk9BUkRfUEFTU1dPUkR9YCkudG9TdHJpbmcoCiAgICAgICAgImJhc2U2NCIKICAgICAgKX1gOwoKY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQsIHsKICBtZXRob2Q6ICJQT1NUIiwKICBoZWFkZXJzOiB7CiAgICAiY29udGVudC10eXBlIjogImFwcGxpY2F0aW9uL2pzb24iLAogICAgYXV0aG9yaXphdGlvbjogYXV0aEhlYWRlciwKICB9LAogIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcXVlcnk6IGVudi5ERVhURVJfUVVFUlkgfSksCn0pOwoKaWYgKCFyZXMub2spIHsKICBjb25zdCBlcnJvclRleHQgPSBhd2FpdCByZXMudGV4dCgpLmNhdGNoKCgpID0+ICIiKTsKICB0aHJvdyBuZXcgRXJyb3IoYERleHRlciBjcm9uIGZhaWxlZCAoJHtyZXMuc3RhdHVzfSk6ICR7ZXJyb3JUZXh0fWApOwp9Cgpjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTsKY29uc3QgcGF5bG9hZFNjaGVtYSA9IHoKICAub2JqZWN0KHsKICAgIHJ1bklkOiB6LnN0cmluZygpLm9wdGlvbmFsKCksCiAgfSkKICAucGFzc3Rocm91Z2goKTsKY29uc3QgcGFyc2VkID0gcGF5bG9hZFNjaGVtYS5zYWZlUGFyc2UocGF5bG9hZCk7CmNvbnN0IHJ1bklkID0gcGFyc2VkLnN1Y2Nlc3MgPyBwYXJzZWQuZGF0YS5ydW5JZCA6IHVuZGVmaW5lZDsKY29uc29sZS5sb2coYERleHRlciBydW4gc3RhcnRlZDogJHtydW5JZCA/PyAidW5rbm93biJ9YCk7Cg==`

**Category:** AI/ML · **Languages:** TypeScript, Shell, JavaScript

[View on Railway →](https://railway.com/template/dexter-with-web-ui)
