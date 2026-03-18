# Deploy Clawdbot on Railway

The AI that actually does things.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/clawdbot)

## About

Deploy the template and then follow the steps [here](https://farazpatankar.com/p/clawdbot-on-railway).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clawdbot | [clawdbot/clawdbot](https://github.com/clawdbot/clawdbot) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CLAWDBOT_STATE_DIR` | /data/.clawdbot |
| `CLAWDBOT_GATEWAY_TOKEN` | (secret) |

## Configuration

- **Start command:** `node dist/index.js gateway --allow-unconfigured --port 18789 --bind lan`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, Swift, JavaScript, Kotlin, Shell, CSS, Python, HTML, Dockerfile, Ruby

[View on Railway →](https://railway.com/template/clawdbot)
