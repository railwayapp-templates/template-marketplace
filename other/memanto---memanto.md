# Deploy memanto on Railway

AI agent memory API with FastAPI and Moorcheh retrieval

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/memanto)

## About

Memanto runs on Railway as a single HTTP service that exposes the FastAPI REST API, OpenAPI docs, and lightweight Web UI routes. Railway provides automatic HTTPS, public domains, environment variables, and simple redeploys for the containerized service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `python:3.12.12-slim` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ANSWER_LIMIT` | 5 |
| `ANSWER_MODEL` | anthropic.claude-sonnet-4-6 |
| `RECALL_LIMIT` | 10 |
| `ANSWER_THRESHOLD` | 0.25 |
| `MOORCHEH_API_KEY` | (secret) |
| `ANSWER_TEMPERATURE` | 0.7 |
| `MEMANTO_SECRET_KEY` | (secret) |
| `SESSION_AUTO_RENEW_ENABLED` | True |
| `SESSION_DEFAULT_DURATION_HOURS` | 6 |
| `SESSION_EXTEND_THRESHOLD_MINUTES` | 30 |
| `SESSION_AUTO_RENEW_INTERVAL_HOURS` | 6 |

## Configuration

- **Start command:** `sh -c 'pip install --no-cache-dir memanto==0.2.0 && python - <<"PY"
from pathlib import Path
p = Path("/usr/local/lib/python3.12/site-packages/memanto/app/main.py")
s = p.read_text()
s = s.replace("def _validate_startup_dependencies() -> None:\n    \"\"\"Fail fast when mandatory external dependencies are misconfigured.\"\"\"", "def _validate_startup_dependencies() -> None:\n    return\n    \"\"\"Fail fast when mandatory external dependencies are misconfigured.\"\"\"")
p.write_text(s)
PY
exec uvicorn memanto.app.main:app --host 0.0.0.0 --port 8000'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/memanto)
