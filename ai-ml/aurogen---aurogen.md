# Deploy aurogen on Railway

Aurogen is a modular multi-agent platform inspired by OpenClaw

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aurogen)

## About

[Aurogen](https://github.com/UniRound-Tec/Aurogen) is an open-source, modular multi-agent platform that reimplements the OpenClaw interaction model with dynamic configuration for agents, channels, providers, skills, and group workflows. It ships a Python backend, built frontend assets, and optional channel bridges in one runtime image.

This Railway setup deploys Aurogen as a **single HTTP service** using a prebuilt Docker image (`xiaosong233/aurogen-railway:v0.2.0post2-amd64fix1`) based on upstream `UniRound-Tec/Aurogen`. The app listens on container port `8000`, and persistent runtime data is stored under `/app/aurogen/.workspace`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| aurogen | `xiaosong233/aurogen-railway:v0.2.0post2-amd64fix1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `DEPLOY_STAMP` | 20260326D |

## Configuration

- **Healthcheck:** `/system/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/aurogen/.workspace`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/aurogen)
