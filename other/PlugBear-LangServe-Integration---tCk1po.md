# Deploy PlugBear LangServe Integration on Railway

Deploy an example LangServe app to Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tCk1po)

## About

This template provides a pre-configured LangServe application, ready for deployment. It's designed to help you easily set up and launch a custom LangChain environment, facilitating smooth integration with Slack via PlugBear. The template includes example code with a FastAPI backend, demonstrating secure request handling and environment variable management for your OpenAI API key and secret key. Deploy this to create an accessible endpoint for Slack interactions, streamlining your development workflow and enabling seamless communication with your LangChain app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plugbear-langserve-integration | [runbear-io/plugbear-langserve-example](https://github.com/runbear-io/plugbear-langserve-example) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY` | (secret) | Secret token to verify request. You can create a random string for this. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key. You can get one from https://platform.openai.com/api-keys |

## Configuration

- **Start command:** `poetry run python main.py`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python

[View on Railway →](https://railway.com/template/tCk1po)
