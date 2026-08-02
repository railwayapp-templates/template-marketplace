# Deploy 2Apifare on Railway

GeminiCLI into OpenAI,GEMINI API, supporting Antigravity models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2apifare)

## About

2Apifare is an API gateway that converts Gemini CLI into OpenAI-compatible and Gemini-native APIs. It supports Antigravity models, multi-account management, automatic account rotation, and a built-in web control panel, allowing existing OpenAI applications to use Gemini and other supported models with minimal configuration.

Railway provides a simple way to deploy 2Apifare using the official Docker image. The service exposes an HTTP API and web-based control panel while Railway automatically manages HTTPS, networking, deployments, and environment variables. A Railway Volume mounted at `/app/creds` stores authentication credentials and session data, ensuring account information persists across redeployments and restarts. Once deployed, you can access the control panel to configure Gemini CLI accounts, monitor requests, and manage automatic account rotation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 2apifare | `ghcr.io/axibayuit-a11y/2apifare:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | 0.0.0.0 | Bind to all interfaces for Railway. |
| `PORT` | 7861 | Internal application listening port. |
| `DOMAIN` | - | Service access domain provided by Railway. |
| `PASSWORD` | (secret) | User password for accessing API and control panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/2apifare)
