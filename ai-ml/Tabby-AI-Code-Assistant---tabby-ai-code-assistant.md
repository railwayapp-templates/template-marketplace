# Deploy Tabby AI Code Assistant on Railway

TabbyML Self-hosted AI code completion server using OpenAI. tabby

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tabby-ai-code-assistant)

## About

Tabby is a professional-grade, self-hosted AI coding assistant designed as a private, open-source alternative to GitHub Copilot. It features real-time code completion, a robust chat interface, and repository indexing. By delegating LLM processing to high-performance APIs like OpenAI, Tabby provides sub-second latency for a seamless developer experience.

This deployment is optimized for Railway's infrastructure, utilizing a **Dynamic Configuration Injection** method. Unlike standard setups, this template uses a custom Bash entrypoint to bridge Railway's environment variables with Tabby's `config.toml`.

It mounts a persistent **Railway Volume at `/data`**, ensuring that your user accounts, indexed repositories, and settings survive redeployments. The architecture is "Compute-Light": by offloading the heavy lifting to OpenAI's servers, the instance runs efficiently on minimal CPU/RAM while delivering the power of modern LLMs. Security is baked in with an automated **Hexadecimal UUID Generator** for JWT signing, keeping your private assistant accessible only to you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tabby | `tabbyml/tabby:20260119` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port on which the Tabby web server listens for incoming traffic. |
| `TABBY_MODEL` | gpt-4o-mini | The OpenAI model ID used for code completion and chat functions. |
| `OPENAI_API_KEY` | (secret) | Your secret OpenAI API key required for model authentication. |
| `TABBY_ENDPOINT` | https://api.openai.com/v1 | The base URL for the OpenAI-compatible API endpoint. |
| `TABBY_WEBSERVER_JWT_TOKEN_SECRET` | (secret) | A unique UUID used to sign and secure JWT authentication tokens. |

## Configuration

- **Start command:** `/bin/bash -c "export TABBY_ROOT=/data && printf '[model.completion.http]\\nkind = \"openai/completion\"\\nmodel_name = \"%s\"\\napi_key = \"%s\"\\napi_endpoint = \"%s\"\\n\\n[model.chat.http]\\nkind = \"openai/chat\"\\nmodel_name = \"%s\"\\napi_key = \"%s\"\\napi_endpoint = \"%s\"\\n\\n[model.embedding.http]\\nkind = \"openai/embedding\"\\nmodel_name = \"text-embedding-3-small\"\\napi_key = \"%s\"\\napi_endpoint = \"%s\"\\n' \"$TABBY_MODEL\" \"$OPENAI_API_KEY\" \"$TABBY_ENDPOINT\" \"$TABBY_MODEL\" \"$OPENAI_API_KEY\" \"$TABBY_ENDPOINT\" \"$OPENAI_API_KEY\" \"$TABBY_ENDPOINT\" > /data/config.toml && /opt/tabby/bin/tabby serve --device cpu --host 0.0.0.0 --port $PORT"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tabby-ai-code-assistant)
