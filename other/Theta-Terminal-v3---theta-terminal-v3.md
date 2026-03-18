# Deploy Theta Terminal v3 on Railway

Theta Terminal running inside a Docker container for easy deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/theta-terminal-v3)

## About

Theta Terminal v3 is a high-performance market data gateway connecting to Theta Data's proprietary feed. It exposes a low-latency REST API for real-time and historical options and equity data.

**Note:** This is for **Theta Terminal v3**. If you are looking for v2, this is not the correct repository.
This is an unofficial template and is not affiliated with, endorsed by, or connected to Theta Data. It is a community-provided tool to help deploy the official Theta Terminal software. Users are responsible for ensuring they comply with Theta Data's Terms of Service. The official documentation is linked below under the deployment dependencies section

Hosting Theta Terminal v3 runs a lightweight bridge between Theta Data servers and your applications. It handles authentication and data streaming, providing a stable local API endpoint for your trading bots or analysis tools within your private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Theta-Terminal-v3 | [EzraMoussa/Theta-Terminal-v3](https://github.com/EzraMoussa/Theta-Terminal-v3) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `THETA_V3_PASS` | - | The password to your Theta Data account for authentication |
| `THETA_V3_USER` | (secret) | The username/email used for your Theta Data account |
| `THETA_V3_JAR_URL` | https://download-unstable.thetadata.us/ThetaTerminalv3.jar | The download url to the latest Theta Terminal |
| `THETA_INTERNAL_URL` | - | The url you can use to make requests to the the terminal inside railway through private networking |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/theta-terminal-v3)
