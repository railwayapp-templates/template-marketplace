# Deploy openocta on Railway

OpenOcta is an AI hub that combines gateway, agent runtime, channels, cron

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openocta)

## About

[OpenOcta](https://github.com/openocta/openocta) is an open-source, enterprise-oriented operations agent platform. It packages a Gateway (HTTP + WebSocket), Agent runtime, channels, cron, and embedded Control UI into a single Go backend binary. For Railway deployment, this template uses a prebuilt image source (`docker.io/xiaosong233/openocta-railway:latest`) to avoid upstream build drift and keep runtime behavior stable.

The service listens on port `18900` by default (`openocta gateway run --port 18900`). This template maps Railway routing to that port with `PORT=18900`, while preserving upstream command behavior.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openocta-image | `xiaosong233/openocta-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 18900 |
| `ANTHROPIC_API_KEY` | (secret) |
| `OPENOCTA_RUN_MODE` | service |
| `OPENOCTA_SKIP_CRON` | 0 |
| `OPENOCTA_STATE_DIR` | /root/.openocta |
| `OPENOCTA_SKIP_CHANNELS` | 0 |
| `OPENOCTA_SKIP_PROVIDERS` | 0 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openocta)
