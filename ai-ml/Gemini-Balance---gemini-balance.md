# Deploy Gemini Balance on Railway

Gemini API Proxy and Load Balancer

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gemini-balance)

## About

Gemini Balance is an open-source proxy and load balancer for the Google Gemini API. It lets you manage multiple Gemini API keys with automatic rotation, authentication, request retries, model filtering, monitoring, image generation, and OpenAI-compatible API endpoints—all through a simple web interface.

Deploying Gemini Balance on Railway provides a fast and reliable way to host your own Gemini API gateway without managing infrastructure. Railway automatically handles networking, HTTPS, and persistent storage, while Gemini Balance manages API key rotation, authentication, usage monitoring, retries, and model synchronization. The included web dashboard allows you to manage keys, monitor their health, and update settings without restarting the application. Once deployed, simply configure your Gemini API key(s) and authentication token to start using OpenAI-compatible and Gemini-compatible endpoints for AI applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snailyp/gemini-balance:latest | `ghcr.io/snailyp/gemini-balance:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEYS` | (secret) | Add here or configure later |
| `BASE_URL` | https://generativelanguage.googleapis.com/v1beta | - |
| `TIMEZONE` | Asia/Shanghai | - |
| `TIME_OUT` | 300 | - |
| `LOG_LEVEL` | info | - |
| `AUTH_TOKEN` | (secret) | Please copy value to login |
| `TEST_MODEL` | gemini-1.5-flash | - |
| `MAX_RETRIES` | 3 | - |
| `MAX_FAILURES` | 10 | - |
| `DATABASE_TYPE` | sqlite | - |
| `SQLITE_DATABASE` | /data/default_db.sqlite | - |
| `SHOW_SEARCH_LINK` | true | - |
| `FAKE_STREAM_ENABLED` | True | - |
| `URL_CONTEXT_ENABLED` | false | - |
| `CHECK_INTERVAL_HOURS` | 1 | - |
| `SHOW_THINKING_PROCESS` | true | - |
| `AUTO_DELETE_ERROR_LOGS_DAYS` | 7 | - |
| `TOOLS_CODE_EXECUTION_ENABLED` | false | - |
| `AUTO_DELETE_ERROR_LOGS_ENABLED` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gemini-balance)
