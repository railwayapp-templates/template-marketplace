# Deploy Hive Agent on Railway

A deployment template of hive https://github.com/aden-hive/hive

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hive-agent)

## About

Hive Agent is a goal-driven AI agent framework that helps teams build, run, and scale autonomous AI workflows. It converts plain-language goals into executable agent flows, supports major LLM providers, and includes API-first operation with persistent state and observability for production-ready deployments.

Hosting Hive Agent on Railway involves deploying the service with Docker, setting at least one LLM API key, and configuring persistent storage for agent data and logs. After deployment, your app exposes API endpoints to run built-in or custom agents. Railway handles runtime infrastructure, restart policies, and scaling, so you can focus on agent behavior and integrations. For production use, configure environment variables, attach a volume, and monitor health and logs through Railway’s dashboard for reliable operation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hive-railway | [Sands-45/hive-railway](https://github.com/Sands-45/hive-railway) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | - |
| `DEFAULT_MODEL` | gemini-2.5-flash | - |
| `HIVE_DATA_DIR` | /app/data | - |
| `GOOGLE_API_KEY` | (secret) | - |
| `OPENAI_API_KEY` | (secret) | - |
| `PYTHONUNBUFFERED` | 1 | - |
| `ANTHROPIC_API_KEY` | (secret) | - |
| `HIVE_CREDENTIALS_DIR` | (secret) | Application Settings |

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hive-agent)
