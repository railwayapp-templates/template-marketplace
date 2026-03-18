# Deploy Railway Assistant on Railway

Send Railway alerts to Telegram & Slack with a lightweight service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railway-assistant)

## About

Railway Assistant is a lightweight webhook relay that sends Railway deployment and project events directly to Telegram and Slack. It turns Railway webhooks into clean, readable notifications so you can monitor builds, failures, and releases without constantly checking the dashboard.

Built in Go with zero external dependencies, it’s designed to be fast to deploy, cheap to run, and easy to configure.

Hosting Railway Assistant means deploying a small stateless HTTP service that listens for Railway webhook events and forwards them to your preferred messaging platforms.

After deployment, you connect your Railway project’s webhook to the service endpoint. From then on, deployments, failures, and runtime events are automatically formatted and pushed to your Telegram chat or Slack channel .

The service is fully environment-variable driven — no database, no setup scripts, and no persistent storage required. Railway handles scaling and availability while the assistant focuses solely on event processing and notification delivery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-assistant | [bzvstudio/railway-assistant](https://github.com/bzvstudio/railway-assistant) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SLACK_ENABLED` | true | Set to `true` to enable Slack notifications |
| `INCLUDE_AUTHOR` | true | Include the commit author in the alert message |
| `INCLUDE_BRANCH` | true | Include the branch name in the alert message |
| `INCLUDE_COMMIT` | true | Include the commit message in the alert message |
| `INCLUDE_STATUS` | true | Include deployment status in the alert message |
| `TELEGRAM_CHAT_ID` | your-chat-id | The ID of the telegram user or group to receive alerts |
| `TELEGRAM_ENABLED` | true | Set to `true` to enable Telegram notifications |
| `INCLUDE_WORKSPACE` | true | Include workplace in the alert message |
| `SLACK_WEBHOOK_URL` | your-slack-webhook-url | The Webhook URL from your Slack App |
| `TELEGRAM_BOT_TOKEN` | (secret) | The API token you got from Telegram BotFather |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/railway-assistant)
