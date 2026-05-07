# Deploy Letta Code Remote on Railway

Run a Letta Code agent 24/7. No inbound ports, just deploy.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/letta-code-remote)

## About

Letta Code Remote runs a persistent Letta Code agent on a cloud server. It opens an outbound WebSocket connection to Letta Cloud, so your agent stays online 24/7 without any inbound ports, reverse proxies, or domain names. Access it from the Letta Code desktop app or chat.letta.com.

Deploying takes three steps. First, deploy this template and add a persistent volume mounted at `/root`. Second, open the deploy logs to find the OAuth authorization URL and approve it in your browser. Third, open the Letta Code desktop app or chat.letta.com and select your new remote environment from the environment picker in the bottom left. Your agent is now running on Railway and accessible from anywhere. Auth tokens are persisted to the mounted volume, so redeploys and restarts reconnect automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| letta-code-server-deployment | [letta-ai/letta-code-server-deployment](https://github.com/letta-ai/letta-code-server-deployment) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV_NAME` | railway | The name of the remote environment. |

## Configuration

- **Volume:** `/root`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/letta-code-remote)
