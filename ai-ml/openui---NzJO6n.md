# Deploy openui on Railway

Deploy OpenUI: AI-powered UI generation with GitHub OAuth and OpenAI API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/NzJO6n)

## About

# OpenUI on Railway

This template deploys a production-ready instance of [OpenUI](https://github.com/wandb/openui) on Railway.

## Environment Variables

To run this project, you need to set the following environment variables:

| Variable | Description |
|----------|-------------|
| `GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth App Client Secret |
| `OPENAI_API_KEY` | Your OpenAI API Key |
| `OPENUI_CORS_ORIGINS` | Allowed CORS origins (comma-separated) |
| `OPENUI_ENVIRONMENT` | Environment setting (e.g., 'production') |
| `OPENUI_HOST` | Host URL for your OpenUI instance |

## Features

- Seamless deployment of OpenUI on Railway
- GitHub OAuth integration for user authentication
- OpenAI API integration for AI-powered UI generation
- Customizable CORS settings and environment configuration

## Getting Started

1. Click the "Deploy on Railway" button
2. Set up the required environment variables
3. Deploy your OpenUI instance

For more information on configuring and using OpenUI, please refer to the [official documentation](https://github.com/wandb/openui).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openui | `ghcr.io/wandb/openui:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENAI_API_KEY` | (secret) |
| `GITHUB_CLIENT_SECRET` | (secret) |

## Configuration

- **Start command:** `python -m openui --litellm --host 0.0.0.0`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/NzJO6n)
